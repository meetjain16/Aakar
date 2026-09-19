import { ArrowRight } from 'lucide-react';

import SectionHeading from './SectionHeading';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { products, type SectionId } from '../lib/site';

interface ProductsSectionProps {
  /** Called with the product name so the contact form can be pre-filled. */
  onRequestQuote?: (productName: string) => void;
  onNavigate?: (section: SectionId) => void;
}

export default function ProductsSection({
  onRequestQuote,
  onNavigate,
}: ProductsSectionProps) {
  return (
    <section
      aria-labelledby="products-heading"
      className="border-t border-border bg-muted/40 py-20 lg:py-28"
      data-testid="section-products"
    >
      <div className="section-shell">
        <SectionHeading
          id="products-heading"
          eyebrow="Products"
          title="Six mineral grades, milled to your specification"
          description="Every grade below is available across a range of mesh sizes. Tell us your application and we will recommend the cut that suits it."
        />

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.slug} className="flex">
              <Card
                className="lift group flex w-full flex-col overflow-hidden p-0"
                data-testid={`card-product-${product.slug}`}
              >
                <div className="relative overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={`${product.name} sample`}
                    loading="lazy"
                    decoding="async"
                    width={1024}
                    height={768}
                    className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>

                <CardContent className="flex flex-1 flex-col p-6">
                  <h3
                    className="font-heading text-lg font-semibold text-foreground"
                    data-testid={`text-product-name-${product.slug}`}
                  >
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  {/* Concrete specs rather than adjectives — this is what a
                      procurement engineer actually scans for. */}
                  <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">{spec.label}</dt>
                        <dd className="font-medium tabular-nums text-foreground">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {/* What the grade is actually bought for, in the plant's
                      own words — more use to a buyer than another adjective. */}
                  <div className="mt-5 border-t border-border pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Applications
                    </h4>
                    <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                      {product.applications.map((application) => (
                        <li key={application} className="flex gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary"
                          />
                          {application}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* mt-auto keeps the tags and CTA on a common baseline across
                      cards whose copy runs to different lengths. */}
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {product.industries.map((industry) => (
                      <Badge
                        key={industry}
                        variant="secondary"
                        data-testid={`badge-industry-${product.slug}-${industry}`}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="mt-6 w-full"
                    onClick={() => onRequestQuote?.(product.name)}
                    data-testid={`button-quote-${product.slug}`}
                  >
                    Request a quote
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
          <h3 className="font-heading text-xl font-semibold text-foreground">
            Need a grade that isn't listed?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            We mill to custom mesh, brightness and moisture targets. Send us the
            spec sheet and we will tell you honestly whether we can hit it.
          </p>
          <Button
            className="mt-6"
            onClick={() => onNavigate?.('contact')}
            data-testid="button-custom-specs"
          >
            Discuss custom specifications
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
