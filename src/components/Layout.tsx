import type { ReactNode } from 'react';

import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import { usePageMeta } from '../hooks/use-page-meta';
import { navItemById, type SectionId } from '../lib/site';

interface LayoutProps {
  /** Which nav entry this page corresponds to; drives the active state and meta. */
  page: SectionId;
  children: ReactNode;
}

/**
 * Chrome shared by every page. Previously the header, footer and skip link
 * lived inside the one long Home page; with real routes they belong here so
 * each page renders only its own content.
 */
export default function Layout({ page, children }: LayoutProps) {
  const item = navItemById[page];
  usePageMeta({
    title: item.title,
    description: item.description,
    path: item.path,
  });

  return (
    <div className="flex min-h-svh flex-col bg-background">
      {/* Keyboard users can jump past the nav; visible only when focused. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <Header activePage={page} />

      <main id="main" className="flex-1 outline-none">
        {children}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
