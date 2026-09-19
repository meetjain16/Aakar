import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Award, ChevronLeft, ChevronRight, Factory, Truck } from 'lucide-react';

import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useReducedMotion } from '../hooks/use-reduced-motion';
import { company, products, yearsInBusiness, type SectionId } from '../lib/site';

const SLIDE_INTERVAL_MS = 6000;

/** One slide per showcase product, so the images are never duplicated. */
const slides = products.slice(0, 4).map((product) => ({
  id: product.slug,
  image: product.image,
  name: product.name,
}));

const trustPoints = [
  {
    icon: Award,
    value: `${yearsInBusiness}+ years`,
    label: 'Milling minerals in Udaipur',
  },
  {
    icon: Factory,
    value: '10,000 T',
    label: 'Monthly production capacity',
  },
  {
    icon: Truck,
    value: '3–5 days',
    label: 'Typical pan-India dispatch',
  },
];

interface HeroSectionProps {
  onNavigate?: (section: SectionId) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // Autoplay pauses on hover, on keyboard focus inside the carousel, while the
  // tab is hidden, and entirely when reduced motion is requested.
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setIndex((current) => (current + 1) % slides.length);
      }
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[oklch(0.215_0.016_28)]"
    >
      {/* Background slideshow. Decorative: the product names are announced by
          the live region on the carousel below, not by these images. */}
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image}
            alt=""
            aria-hidden="true"
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out',
              i === index ? 'opacity-40' : 'opacity-0',
            )}
          />
        ))}

        {/* Two-stop scrim: keeps text contrast well above 4.5:1 no matter which
            image is showing. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.175_0.015_28)] via-[oklch(0.175_0.015_28)]/85 to-[oklch(0.175_0.015_28)]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.175_0.015_28)] via-transparent to-[oklch(0.175_0.015_28)]/60" />
        <div className="texture-grid absolute inset-0 opacity-[0.15]" />
      </div>

      <div className="section-shell py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="eyebrow text-[oklch(0.83_0.062_58)]">
              <span className="h-px w-8 bg-current" aria-hidden="true" />
              {company.city}, {company.region} · Since {company.foundedYear}
            </p>

            <h1
              id="hero-heading"
              className="mt-5 max-w-2xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Industrial mineral powders you can specify once and forget about.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              With over {yearsInBusiness} years of expertise, we deliver
              premium mineral powders — dolomite, talc, calcite, limestone,
              silica and china clay — crafted with precision to power industries
              across India and beyond.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                onClick={() => onNavigate?.('contact')}
                data-testid="button-hero-enquire"
              >
                Request a quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>

              {/* Previously a dead button — now scrolls to the catalogue. */}
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate?.('products')}
                className="border-white/25 bg-white/5 text-white hover:bg-white/10"
                data-testid="button-hero-products"
              >
                View products
              </Button>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              {trustPoints.map(({ icon: Icon, value, label }) => (
                <div key={value} className="border-l-2 border-white/20 pl-4">
                  <Icon
                    className="h-5 w-5 text-[oklch(0.83_0.062_58)]"
                    aria-hidden="true"
                  />
                  <dt className="mt-2 font-heading text-xl font-bold text-white">
                    {value}
                  </dt>
                  <dd className="mt-0.5 text-sm text-white/65">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Product carousel */}
          <div className="hidden lg:col-span-5 lg:block">
            <div
              ref={regionRef}
              role="group"
              aria-roledescription="carousel"
              aria-label="Featured products"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocusCapture={() => setIsPaused(true)}
              onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setIsPaused(false);
                }
              }}
              onKeyDown={onKeyDown}
              className="glass-on-dark relative rounded-2xl p-3"
            >
              <div className="relative aspect-4/3 overflow-hidden rounded-xl">
                {slides.map((slide, i) => (
                  <img
                    key={slide.id}
                    src={slide.image}
                    alt={slide.name}
                    loading="lazy"
                    decoding="async"
                    aria-hidden={i !== index}
                    className={cn(
                      'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
                      i === index ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                ))}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-10">
                  <p className="font-heading text-lg font-semibold text-white">
                    {slides[index].name}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous product"
                className="absolute left-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next product"
                className="absolute right-5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/65"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Announces slide changes to screen readers without moving focus. */}
              <p aria-live="polite" aria-atomic="true" className="sr-only">
                {`Slide ${index + 1} of ${slides.length}: ${slides[index].name}`}
              </p>

              <div className="mt-3 flex justify-center gap-2">
                {slides.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show ${slide.name}`}
                    aria-current={i === index}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      i === index ? 'w-7 bg-white' : 'w-3 bg-white/40 hover:bg-white/70',
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
