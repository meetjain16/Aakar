import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

import { cn } from '../lib/utils';

/** Appears once the visitor is a screen or two down a very long single page. */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      // Kept out of the tab order while hidden so it isn't a focus trap.
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        })
      }
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full',
        'border border-border bg-card text-foreground shadow-lg',
        'transition-all duration-300 hover-elevate active-elevate-2',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0',
      )}
      style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))' }}
      data-testid="button-back-to-top"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
