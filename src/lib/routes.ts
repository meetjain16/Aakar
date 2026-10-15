/**
 * Route paths, kept free of any asset or React imports so that build tooling
 * (vite.config.ts, the sitemap generator) can import this module directly.
 * site.ts re-exports these alongside the richer per-page metadata.
 */
export type SectionId =
  | 'home'
  | 'about'
  | 'products'
  | 'industries'
  | 'quality'
  | 'contact';

export const routes: Record<SectionId, string> = {
  home: '/',
  about: '/about',
  products: '/products',
  industries: '/industries',
  quality: '/quality',
  contact: '/contact',
};

/** Relative crawl priority, highest first. */
export const sitemapEntries: ReadonlyArray<{ path: string; priority: string }> = [
  { path: routes.home, priority: '1.0' },
  { path: routes.products, priority: '0.9' },
  { path: routes.contact, priority: '0.8' },
  { path: routes.industries, priority: '0.7' },
  { path: routes.quality, priority: '0.7' },
  { path: routes.about, priority: '0.6' },
];

export const SITE_ORIGIN = 'https://www.aakarmineral.com';
