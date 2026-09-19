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

import SectionHeading from './SectionHeading';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { images, industries, type SectionId } from '../lib/site';

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
  onNavigate?: (section: SectionId) => void;
}

export default function IndustriesSection({ onNavigate }: IndustriesSectionProps) {
  return (
    <section
      aria-labelledby="industries-heading"
      className="border-t border-border bg-background py-20 lg:py-28"
      data-testid="section-industries"
    >
      <div className="section-shell">
        <SectionHeading
          id="industries-heading"
          eyebrow="Industries we serve"
          title="Nine sectors, one standard of consistency"
          description="The grade that works in a wall putty is not the grade that works in a masterbatch. We match the mineral to the process."
        />

        {/* Feature banner */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="grid lg:grid-cols-2">
            <img
              src={images.paintApplication}
              alt="Mineral filler being used in a paint manufacturing line"
              loading="lazy"
              decoding="async"
              width={1024}
              height={768}
              className="h-full min-h-56 w-full object-cover"
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
                <Button
                  onClick={() => onNavigate?.('contact')}
                  data-testid="button-industry-consultation"
                >
                  Talk to a technical advisor
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate?.('products')}
                  data-testid="button-industry-products"
                >
                  Browse grades
                </Button>
              </div>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
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

        <p className="mt-10 text-center text-muted-foreground">
          Working in a sector that isn't listed?{' '}
          <button
            type="button"
            onClick={() => onNavigate?.('contact')}
            className="rounded font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            Tell us about your application
          </button>
          .
        </p>
      </div>
    </section>
  );
}
