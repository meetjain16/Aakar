import { Eye, Shield, Target, Zap } from 'lucide-react';

import SectionHeading from './SectionHeading';
import { Card, CardContent } from './ui/card';
import { company, images, industries, products, yearsInBusiness } from '../lib/site';

const values = [
  {
    icon: Target,
    title: 'Our mission',
    description:
      'Supply mineral powders that match the specification on the purchase order, every single batch.',
  },
  {
    icon: Eye,
    title: 'Our vision',
    description:
      'To be the mineral supplier Indian manufacturers name first when consistency matters more than price.',
  },
  {
    icon: Shield,
    title: 'Quality commitment',
    description:
      'Chemical and particle-size analysis on every lot, with the test report shipped alongside the goods.',
  },
  {
    icon: Zap,
    title: 'Continuous improvement',
    description:
      'Ongoing investment in milling, classification and lab capability as customer tolerances tighten.',
  },
];

export default function AboutSection() {
  const stats = [
    { value: `${yearsInBusiness}+`, label: 'Years in operation' },
    { value: String(products.length), label: 'Mineral grades' },
    { value: String(industries.length), label: 'Industries served' },
    { value: '500+', label: 'Customers supplied' },
  ];

  return (
    <section
      aria-labelledby="about-heading"
      className="border-t border-border bg-background py-20 lg:py-28"
      data-testid="section-about"
    >
      <div className="section-shell">
        <SectionHeading
          id="about-heading"
          eyebrow="About us"
          title={`Mineral processing from ${company.city}, since ${company.foundedYear}`}
          description={`A trusted name in mineral powder manufacturing, producing dolomite, talc, calcite, limestone, silica and china clay for the diverse requirements of industries across India and beyond.`}
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="overflow-hidden rounded-2xl border border-border shadow-md">
              <img
                src={images.facility}
                alt={`The ${company.name} processing facility in ${company.city}`}
                loading="lazy"
                decoding="async"
                width={1024}
                height={768}
                className="aspect-4/3 w-full object-cover"
              />
            </div>

            <div className="mt-8 space-y-4 text-muted-foreground">
              <h3 className="font-heading text-xl font-semibold text-foreground">
                Our story
              </h3>
              <p>
                Based in {company.city}, {company.region}, {company.name} is a
                trusted name in the field of mineral powder manufacturing with
                over {yearsInBusiness} years of expertise. We specialise in
                producing a wide range of high-quality mineral powders —
                dolomite, talc, calcite, limestone, silica and china clay —
                catering to the diverse requirements of industries across India
                and beyond.
              </p>
              <p>
                Our modern facilities and skilled team ensure that every batch of
                mineral powder is manufactured with accuracy to meet strict
                industrial standards. This commitment allows us to serve critical
                applications in industries such as paints, plastics, ceramics,
                rubber, paper, adhesives, detergents, construction and
                pharmaceuticals.
              </p>
              <p>
                With a vision for excellence and customer satisfaction, we
                continue to expand our reach while staying rooted in our core
                values of quality, trust and professionalism.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="lift h-full">
                <CardContent className="p-6">
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card p-6 text-center sm:p-8">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-heading text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
