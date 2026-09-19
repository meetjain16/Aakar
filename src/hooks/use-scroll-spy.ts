import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view.
 *
 * The nav previously only changed its highlight when a link was clicked, so it
 * went stale the moment the user scrolled by hand. An IntersectionObserver
 * keeps it honest, and `rootMargin` biases the "active" band to just under the
 * sticky header rather than the raw viewport edge.
 */
export function useScrollSpy(
  sectionIds: ReadonlyArray<string>,
  { headerOffset = 96 }: { headerOffset?: number } = {},
): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Intersection ratios are unreliable for sections taller than the viewport,
    // so track visibility per element and pick the topmost visible one.
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        const firstVisible = sectionIds.find((id) => visible.has(id));
        if (firstVisible) {
          setActiveId(firstVisible);
          return;
        }

        // Nothing intersecting the band (e.g. scrolled past the last section):
        // fall back to the last section whose top is above the header line.
        const scrolled = window.scrollY + headerOffset + 1;
        let fallback = sectionIds[0];
        for (const el of elements) {
          if (el.offsetTop <= scrolled) fallback = el.id;
        }
        setActiveId(fallback);
      },
      {
        // Active band: from just below the header down to 55% of the viewport.
        rootMargin: `-${headerOffset}px 0px -45% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, headerOffset]);

  return activeId;
}
