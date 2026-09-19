import { useEffect, useId, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock, Mail, MapPin, Phone, Send, UserRound } from 'lucide-react';

import SectionHeading from './SectionHeading';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { cn } from '../lib/utils';
import { company, inquiryTypes } from '../lib/site';

/** Endpoint is configurable per environment; the literal is only a fallback. */
const FORM_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ?? 'https://formspree.io/f/xwpyvlrl';

const SUBMIT_TIMEOUT_MS = 20000;

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const emptyForm: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  inquiryType: '',
  subject: '',
  message: '',
};

/**
 * Deliberately permissive: this only catches obvious typos. Anything stricter
 * rejects valid addresses, and the real check is whether the reply lands.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts +91 / 0 prefixes, spaces, dashes and brackets; 7–15 digits. */
const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

function validate(values: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Please tell us your name.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!values.email.trim()) {
    errors.email = 'We need an email address to reply to.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That email address does not look right.';
  }

  // Optional, but validated when supplied.
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  // The label has always been marked required — now it actually is.
  if (!values.inquiryType) {
    errors.inquiryType = 'Please choose what your enquiry is about.';
  }

  if (!values.subject.trim()) {
    errors.subject = 'Please add a short subject.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please describe what you need.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'A little more detail will get you a better answer.';
  }

  return errors;
}

const contactChannels = [
  {
    icon: MapPin,
    title: 'Plant & office',
    value: company.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(company.address)}`,
    external: true,
  },
  {
    icon: UserRound,
    title: 'Contact person',
    value: `${company.contactPerson.name} · ${company.contactPerson.role}`,
    href: `tel:${company.phoneE164}`,
    external: false,
  },
  {
    icon: Phone,
    title: 'Phone',
    value: company.phoneDisplay,
    href: `tel:${company.phoneE164}`,
    external: false,
  },
  {
    icon: Mail,
    title: 'Email',
    value: company.email,
    href: `mailto:${company.email}`,
    external: false,
  },
];

interface ContactSectionProps {
  /** Pre-fills the subject when a visitor clicks "Request a quote" on a product. */
  prefill?: { subject?: string; inquiryType?: string } | null;
}

export default function ContactSection({ prefill }: ContactSectionProps) {
  const [values, setValues] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const fieldId = useId();
  const id = (field: string) => `${fieldId}-${field}`;

  // Honeypot: a real visitor never fills this, bots usually do.
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (!prefill) return;
    setValues((current) => ({
      ...current,
      subject: prefill.subject ?? current.subject,
      inquiryType: prefill.inquiryType ?? current.inquiryType,
    }));
  }, [prefill]);

  // Abort an in-flight request if the component unmounts, so the response
  // handler never calls setState on a dead component.
  useEffect(() => () => abortRef.current?.abort(), []);

  const setField = <K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear the error as soon as the visitor starts fixing it.
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current,
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setField(e.target.name as keyof ContactFormData, e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus('idle');
      // Move focus to the first problem rather than leaving the visitor to
      // hunt for it — especially important on a long form.
      formRef.current
        ?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    // Silently succeed for bots so they don't retry.
    if (honeypot) {
      setStatus('success');
      setValues(emptyForm);
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...values,
          _subject: `[Website enquiry] ${values.subject}`,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus('success');
      setValues(emptyForm);
      setErrors({});
      toast({
        title: 'Message sent',
        description: "Thanks — we'll get back to you within one business day.",
      });
    } catch (error) {
      setStatus('error');
      // Show a message a customer can act on; keep the raw error in the console
      // for debugging rather than surfacing it in the UI.
      console.error('Contact form submission failed:', error);
      toast({
        variant: 'destructive',
        title: "Message couldn't be sent",
        description: `Please try again, or email us directly at ${company.email}.`,
      });
    } finally {
      window.clearTimeout(timeout);
      abortRef.current = null;
      setIsSubmitting(false);
    }
  };

  const renderError = (field: keyof ContactFormData) =>
    errors[field] ? (
      <p
        id={id(`${field}-error`)}
        className="flex items-center gap-1.5 text-sm text-destructive"
      >
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null;

  /** Shared props for a field that may be showing an error. */
  const fieldProps = (field: keyof ContactFormData) => ({
    id: id(field),
    name: field,
    'data-field': field,
    'aria-invalid': errors[field] ? (true as const) : undefined,
    'aria-describedby': errors[field] ? id(`${field}-error`) : undefined,
    className: cn(errors[field] && 'border-destructive focus-visible:ring-destructive'),
  });

  return (
    <section
      aria-labelledby="contact-heading"
      className="border-t border-border bg-background py-20 lg:py-28"
      data-testid="section-contact"
    >
      <div className="section-shell">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Tell us what you need to make"
          description="Send the specification, the volume and the timeline. You will get a real answer from someone who knows the plant — usually within one business day."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Channels */}
          <div className="space-y-5 lg:col-span-2">
            <ul className="space-y-4">
              {contactChannels.map(({ icon: Icon, title, value, href, external }) => (
                <li key={title}>
                  <a
                    href={href}
                    {...(external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="lift flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-foreground">
                        {title}
                      </span>
                      <span className="mt-0.5 block break-words text-sm text-muted-foreground">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <Card>
              <CardContent className="p-6">
                <h3 className="flex items-center gap-2 font-heading text-base font-semibold text-foreground">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  Business hours
                </h3>
                <dl className="mt-4 space-y-2 text-sm">
                  {company.hours.map(({ days, time }) => (
                    <div key={days} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{days}</dt>
                      <dd className="font-medium text-foreground">{time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
                  All times IST (UTC+5:30).
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <h3 className="font-heading text-xl font-semibold text-foreground">
                  Send us a message
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fields marked{' '}
                  <span aria-hidden="true" className="text-destructive">
                    *
                  </span>{' '}
                  <span className="sr-only">with an asterisk </span>
                  are required.
                </p>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="mt-6 space-y-5"
                >
                  {/* Honeypot — hidden from people, visible to bots. */}
                  <div className="absolute left-[-9999px]" aria-hidden="true">
                    <label htmlFor={id('website')}>
                      Leave this field empty
                      <input
                        id={id('website')}
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={id('name')}>
                        Full name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        {...fieldProps('name')}
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={handleInputChange}
                        placeholder="Priya Sharma"
                      />
                      {renderError('name')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={id('email')}>
                        Email address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        {...fieldProps('email')}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleInputChange}
                        placeholder="priya@company.com"
                      />
                      {renderError('email')}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={id('phone')}>Phone number</Label>
                      <Input
                        {...fieldProps('phone')}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                      />
                      {renderError('phone')}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={id('company')}>Company</Label>
                      <Input
                        {...fieldProps('company')}
                        type="text"
                        autoComplete="organization"
                        value={values.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                      />
                      {renderError('company')}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={id('inquiryType')}>
                      Type of enquiry <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={values.inquiryType}
                      onValueChange={(value) => setField('inquiryType', value)}
                    >
                      <SelectTrigger
                        id={id('inquiryType')}
                        data-field="inquiryType"
                        aria-invalid={errors.inquiryType ? true : undefined}
                        aria-describedby={
                          errors.inquiryType ? id('inquiryType-error') : undefined
                        }
                        className={cn(
                          errors.inquiryType &&
                            'border-destructive focus-visible:ring-destructive',
                        )}
                      >
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {renderError('inquiryType')}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={id('subject')}>
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      {...fieldProps('subject')}
                      type="text"
                      value={values.subject}
                      onChange={handleInputChange}
                      placeholder="Calcite powder, 400 mesh, 20 T/month"
                    />
                    {renderError('subject')}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={id('message')}>
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      {...fieldProps('message')}
                      rows={6}
                      value={values.message}
                      onChange={handleInputChange}
                      placeholder="Grade, mesh size, monthly volume, delivery location and any specification limits you need us to meet."
                      className={cn(
                        'resize-y',
                        errors.message &&
                          'border-destructive focus-visible:ring-destructive',
                      )}
                    />
                    {renderError('message')}
                  </div>

                  {/* Status is announced to assistive tech, not just shown. */}
                  <div role="status" aria-live="polite">
                    {status === 'success' && (
                      <p className="flex items-start gap-2 rounded-lg border border-success/30 bg-success/10 p-4 text-sm font-medium text-success">
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 translate-y-0.5"
                          aria-hidden="true"
                        />
                        Message sent. We'll reply within one business day.
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-medium text-destructive">
                        <AlertCircle
                          className="h-4 w-4 shrink-0 translate-y-0.5"
                          aria-hidden="true"
                        />
                        We couldn't send that. Please try again, or email{' '}
                        <a className="underline" href={`mailto:${company.email}`}>
                          {company.email}
                        </a>
                        .
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                    data-testid="button-submit-contact"
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
