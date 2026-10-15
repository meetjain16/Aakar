import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

import { Button } from './ui/button';
import SectionHeading from './SectionHeading';
import { company, images, industries, products, routes, yearsInBusiness } from '../lib/site';

const stats = [
  { value: `${yearsInBusiness}+`, label: 'Years in operation' },
  { value: String(products.length), label: 'Mineral grades' },
  { value: String(industries.length), label: 'Industries served' },
  { value: '500+', label: 'Customers supplied' },
];

/**
 * Home-page introduction. Deliberately shorter than the About page: it states
 * who we are and hands off, rather than repeating the full story.
 */
export default function HomeAbout() {
  return (
    <section
      aria-labelledby="home-about-heading"
      className="border-t border-border bg-background py-20 lg:py-28"
    >
      <div className="section-shell">
        <SectionHeading
          id="home-about-heading"
          eyebrow="About us"
          title={`Mineral processing from ${company.city}, since ${company.foundedYear}`}
          description="A trusted name in mineral powder manufacturing, supplying consistent, batch-tested material to producers the length of the country."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-2xl border border-border shadow-md">
            <img
              src={images.facility}
              alt={`The ${company.name} processing facility in ${company.city}`}
              loading="lazy"
              decoding="async"
              width={1280}
              height={960}
              className="photo-warm aspect-4/3 w-full object-cover"
            />
          </div>

          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              What began as a single grinding line is now a plant shipping
              thousands of tonnes a year — to paints, plastics, ceramics, rubber,
              paper, construction and pharmaceutical manufacturers across India.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We remain a supplier that answers the phone. Technical questions
              reach the people who actually run the mills, not a call queue.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-primary/30 pl-4">
                  <dd className="font-heading text-2xl font-bold text-foreground">
                    {stat.value}
                  </dd>
                  <dt className="mt-0.5 text-sm text-muted-foreground">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            <Button variant="outline" className="mt-10" asChild data-testid="button-home-about">
              <Link href={routes.about}>
                Read our story
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
