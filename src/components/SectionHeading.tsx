import { cn } from '../lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Rendered heading level — sections use h2 under the page's single h1. */
  id?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Shared section header. Each section previously hand-rolled its own gradient
 * heading, which is why type sizes and spacing drifted between them.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'max-w-3xl',
        centered && 'mx-auto text-center',
        className,
      )}
    >
      <p className={cn('eyebrow', centered && 'justify-center')}>
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
