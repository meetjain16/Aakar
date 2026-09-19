import { Mail, MapPin, Phone } from 'lucide-react';

import { LogoTile } from './Logo';
import { Separator } from './ui/separator';
import {
  company,
  industries,
  navItems,
  products,
  type SectionId,
} from '../lib/site';

interface FooterProps {
  onSectionChange?: (section: SectionId) => void;
}

export default function Footer({ onSectionChange }: FooterProps) {
  const year = new Date().getFullYear();

  const goTo = (section: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault();
    onSectionChange?.(section);
  };

  return (
    <footer
      className="border-t border-border bg-muted/60"
      data-testid="footer"
    >
      <div className="section-shell py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Company */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <LogoTile />
              <span>
                <span
                  className="block font-heading text-base font-bold leading-tight text-foreground"
                  data-testid="text-footer-company"
                >
                  {company.legalName}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {company.tagline}
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Manufacturer of industrial mineral powders in {company.city},{' '}
              {company.region}. Supplying consistent, batch-tested minerals to
              producers across India since {company.foundedYear}.
            </p>

            {/* Real links rather than plain text, so a tap dials or opens mail. */}
            <address className="mt-6 space-y-3 text-sm not-italic">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(company.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {company.address}
              </a>
              <a
                href={`tel:${company.phoneE164}`}
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {company.email}
              </a>
            </address>
          </div>

          {/* Navigation — all three lists read from the shared data module, so
              they can no longer drift from what the sections actually show. */}
          <nav aria-label="Footer" className="lg:col-span-8">
            <div className="grid gap-10 sm:grid-cols-3">
              <div>
                <h2 className="font-heading text-sm font-semibold text-foreground">
                  Explore
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={goTo(item.id)}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        data-testid={`button-footer-nav-${item.id}`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-sm font-semibold text-foreground">
                  Products
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {products.map((product) => (
                    <li key={product.slug}>
                      <a
                        href="#products"
                        onClick={goTo('products')}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        data-testid={`button-footer-product-${product.slug}`}
                      >
                        {product.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-sm font-semibold text-foreground">
                  Industries
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {industries.slice(0, 6).map((industry) => (
                    <li key={industry.slug}>
                      <a
                        href="#industries"
                        onClick={goTo('industries')}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        data-testid={`button-footer-industry-${industry.slug}`}
                      >
                        {industry.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p data-testid="text-copyright">
            © {year} {company.legalName}. All rights reserved.
          </p>
          <p>
            {company.city}, {company.region}, {company.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
