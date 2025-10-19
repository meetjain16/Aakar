import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      inquiryType: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          inquiryType: ''
        });
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us directly.",
        // variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      details: 'Udaipur, Rajasthan, India',
      color: 'text-blue-400'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      details: '+91 294 2525252',
      color: 'text-green-400'
    },
    {
      icon: Mail,
      title: 'Email Address',
      details: 'info@aakarmineral.com',
      color: 'text-purple-400'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50/50 via-gray-50/50 to-zinc-50/50" data-testid="section-contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 bg-clip-text mb-6" data-testid="text-contact-title">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to discuss your mineral powder requirements? Contact us for quotes, technical support, or any inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text mb-6">
                Contact Information
              </h3>
              <p className="text-muted-foreground mb-8">
                We're here to help with your mineral powder needs. Reach out to us through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="glass backdrop-blur-md border-0 shadow-lg hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500/20 to-gray-500/20 flex items-center justify-center`}>
                        <info.icon className={`h-6 w-6 ${info.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                        <p className="text-muted-foreground">{info.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Hours */}
            <Card className="glass backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-transparent bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text">
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-transparent bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text">
                  Send Us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="glass border-white/20 focus:border-purple-400"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="glass border-white/20 focus:border-purple-400"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="glass border-white/20 focus:border-purple-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="glass border-white/20 focus:border-purple-400"
                        placeholder="Enter your company name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType" className="text-sm font-medium">Type of Inquiry *</Label>
                    <Select value={formData.inquiryType} onValueChange={handleSelectChange}>
                      <SelectTrigger className="glass border-white/20 focus:border-purple-400">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quote">Request Quote</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="product">Product Information</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="glass border-white/20 focus:border-purple-400"
                      placeholder="Enter message subject"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="glass border-white/20 focus:border-purple-400 resize-none"
                      placeholder="Enter your message here..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      * Required fields
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="gradient-primary text-white border-0 shadow-lg hover-lift px-8 py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Failed to send message. Please try again.</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
