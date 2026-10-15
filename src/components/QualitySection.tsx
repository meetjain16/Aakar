import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  Clock,
  Microscope,
  Settings2,
  Truck,
  Users,
} from 'lucide-react';

import { Link } from 'wouter';

import SectionHeading from './SectionHeading';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';
import { routes } from '../lib/site';

const capabilities = [
  {
    icon: BarChart3,
    value: '10,000',
    unit: 'tonnes / month',
    title: 'Production capacity',
  },
  {
    icon: CheckCircle2,
    value: '100%',
    unit: 'of lots tested',
    title: 'Batch testing',
  },
  { icon: Clock, value: '3–5', unit: 'days', title: 'Typical dispatch' },
  { icon: Users, value: '50+', unit: 'professionals', title: 'On the team' },
];

const pillars = [
  {
    icon: Microscope,
    title: 'In-house laboratory',
    description:
      'Every lot is analysed before it leaves the gate, and the report travels with the consignment.',
    details: [
      'Chemical assay',
      'Particle size distribution',
      'Moisture content',
      'Brightness & whiteness',
    ],
  },
  {
    icon: Settings2,
    title: 'Modern milling',
    description:
      'Ball mills with air classification hold the cut point steady across long production runs.',
    details: [
      'Air-classified grinding',
      'Automated bagging',
      'Magnetic separation',
      'Dust-controlled plant',
    ],
  },
  {
    icon: Truck,
    title: 'Dependable logistics',
    description:
      'Stock held against forecast so repeat orders ship the week they are placed, not the month.',
    details: [
      'Pan-India delivery',
      '25 / 50 kg & jumbo bags',
      'Custom quantities',
      'Order tracking',
    ],
  },
  {
    icon: Award,
    title: 'Documented compliance',
    description:
      'Certificates of analysis, MSDS and specification sheets available for every grade we ship.',
    details: [
      'Certificate of analysis',
      'MSDS on request',
      'Periodic audits',
      'Full traceability',
    ],
  },
];

interface QualitySectionProps {
  /** Home page shows the capability figures only. */
  preview?: boolean;
}

export default function QualitySection({ preview = false }: QualitySectionProps) {
  return (
    <section
      aria-labelledby={preview ? 'quality-heading' : undefined}
      aria-label={preview ? undefined : 'Quality and facilities'}
      className={cn('border-t border-border bg-muted/40 pb-20 lg:pb-28', preview ? 'pt-20 lg:pt-28' : 'pt-12 lg:pt-14')}
      data-testid="section-quality"
    >
      <div className="section-shell">
        {preview && (
          <SectionHeading
            id="quality-heading"
            eyebrow="Quality & facilities"
            title="Consistency is a process, not a promise"
            description="Grinding minerals is easy. Grinding them to the same specification for years is what our plant, lab and paperwork are built around."
          />
        )}

        {/* Capability figures */}
        <dl className={cn('grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4', preview && 'mt-16')}>
          {capabilities.map(({ icon: Icon, value, unit, title }) => (
            <div
              key={title}
              className="bg-card p-6 text-center sm:p-8"
              data-testid={`card-capability-${title}`}
            >
              <Icon
                className="mx-auto h-5 w-5 text-primary"
                aria-hidden="true"
              />
              <dd className="mt-3">
                <span className="block font-heading text-3xl font-bold text-foreground">
                  {value}
                </span>
                <span className="mt-0.5 block text-xs uppercase tracking-wide text-muted-foreground">
                  {unit}
                </span>
              </dd>
              <dt className="mt-3 text-sm font-medium text-foreground">
                {title}
              </dt>
            </div>
          ))}
        </dl>

        {/* Pillars — full page only. */}
        {!preview && (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, description, details }) => (
            <Card
              key={title}
              className="lift"
              data-testid={`card-quality-${title}`}
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-success"
                        aria-hidden="true"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        )}

        {preview ? (
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild data-testid="button-quality-more">
              <Link href={routes.quality}>
                How we hold that standard
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        ) : (
        <div className="mt-14 rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              Want the certificate of analysis before you commit?
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              We would rather you checked. Ask for the current COA and a sample
              for the grade you are evaluating, and test it against your own
              acceptance criteria before placing a first order.
            </p>
            <Button className="mt-6" asChild data-testid="button-request-coa">
              <Link href={routes.contact}>Request a COA or sample</Link>
            </Button>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
