import {
  ArrowRight,
  Boxes,
  Building2,
  Droplets,
  FileText,
  FlaskConical,
  Palette,
  Pill,
  Sparkles,
  Layers,
  type LucideIcon,
} from 'lucide-react';

import { Link } from 'wouter';

import SectionHeading from './SectionHeading';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { cn } from '../lib/utils';
import { images, industries, routes } from '../lib/site';

/** Icons live here rather than in site.ts so the data module stays view-free. */
const industryIcons: Record<string, LucideIcon> = {
  'paints-coatings': Palette,
  plastics: Boxes,
  ceramics: FlaskConical,
  rubber: Layers,
  paper: FileText,
  adhesives: Droplets,
  detergents: Sparkles,
  construction: Building2,
  pharmaceuticals: Pill,
};

interface IndustriesSectionProps {
  /** Home page shows a trimmed grid without the feature banner. */
  preview?: boolean;
  limit?: number;
}

export default function IndustriesSection({
  preview = false,
  limit,
}: IndustriesSectionProps) {
  const shown = limit ? industries.slice(0, limit) : industries;
  return (
    <section
      aria-labelledby={preview ? 'industries-heading' : undefined}
      aria-label={preview ? undefined : 'Industries we serve'}
      className={cn('border-t border-border bg-background pb-20 lg:pb-28', preview ? 'pt-20 lg:pt-28' : 'pt-12 lg:pt-14')}
      data-testid="section-industries"
    >
      <div className="section-shell">
        {preview && (
          <SectionHeading
            id="industries-heading"
            eyebrow="Industries we serve"
            title="Nine sectors, one standard of consistency"
            description="The grade that works in a wall putty is not the grade that works in a masterbatch. We match the mineral to the process."
          />
        )}

        {/* Feature banner — full page only; the home teaser stays compact. */}
        {!preview && (
        <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="grid lg:grid-cols-2">
            <img
              src={images.paintApplication}
              alt="Mineral filler being used in a paint manufacturing line"
              loading="lazy"
              decoding="async"
              width={1024}
              height={768}
              className="photo-warm h-full min-h-56 w-full object-cover"
            />
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                Built into products you have already used today
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our minerals end up in the paint on the wall, the pipe under the
                floor and the tablet in the blister pack. Customers stay because
                their formulations do not need re-tuning between deliveries.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild data-testid="button-industry-consultation">
                  <Link href={routes.contact}>
                    Talk to a technical advisor
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" asChild data-testid="button-industry-products">
                  <Link href={routes.products}>Browse grades</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        )}

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((industry) => {
            const Icon = industryIcons[industry.slug] ?? Boxes;
            return (
              <li key={industry.slug} className="flex">
                <Card
                  className="lift w-full"
                  data-testid={`card-industry-${industry.slug}`}
                >
                  <CardContent className="p-6">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3
                      className="mt-4 font-heading text-base font-semibold text-foreground"
                      data-testid={`text-industry-title-${industry.slug}`}
                    >
                      {industry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {industry.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {industry.products.map((product) => (
                        <Badge key={product} variant="outline">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>

        {preview ? (
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild data-testid="button-all-industries">
              <Link href={routes.industries}>
                Explore all {industries.length} industries
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        ) : (
        <p className="mt-10 text-center text-muted-foreground">
          Working in a sector that isn't listed?{' '}
          <Link
            href={routes.contact}
            className="rounded font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            Tell us about your application
          </Link>
          .
        </p>
        )}
      </div>
    </section>
  );
}
