interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * Compact masthead for inner pages.
 *
 * The home page opens with the full-bleed HeroSection; every other page needs
 * something shorter that still states where you are. It reuses the hero's warm
 * tokens so the top of each page stays in the same material.
 */
export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-[var(--hero-bg)]">
      <div className="section-shell py-14 lg:py-20">
        <p className="eyebrow text-[var(--hero-accent)]">
          <span className="h-px w-8 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
        {/* The page's single h1 — the section component below renders an h2. */}
        <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold tracking-tight text-[var(--hero-foreground)] sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--hero-foreground-muted)]">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
