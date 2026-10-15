import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

import { Button } from './ui/button';
import { company, routes } from '../lib/site';

interface CallToActionProps {
  title: string;
  description: string;
  primaryLabel?: string;
}

/**
 * Closing band so no page is a dead end — every one offers a next step and a
 * direct phone number for buyers who would rather just call.
 */
export default function CallToAction({
  title,
  description,
  primaryLabel = 'Request a quote',
}: CallToActionProps) {
  return (
    <section className="border-t border-border bg-muted/40 py-16 lg:py-20">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={routes.contact}>
                {primaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`tel:${company.phoneE164}`}>Call {company.phoneDisplay}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
