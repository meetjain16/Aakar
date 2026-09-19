import { useCallback, useState } from 'react';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductsSection from '../components/ProductsSection';
import IndustriesSection from '../components/IndustriesSection';
import QualitySection from '../components/QualitySection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useScrollSpy } from '../hooks/use-scroll-spy';
import { navItems, type SectionId } from '../lib/site';

const sectionIds = navItems.map((item) => item.id);

export default function Home() {
  // Derived from scroll position rather than from clicks, so the nav highlight
  // stays correct when the visitor scrolls by hand.
  const activeSection = useScrollSpy(sectionIds);
  const [quotePrefill, setQuotePrefill] =
    useState<{ subject: string; inquiryType: string } | null>(null);

  const scrollToSection = useCallback((section: SectionId) => {
    const element = document.getElementById(section);
    if (!element) return;

    element.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });

    // Keep the URL in step so the section is linkable and the back button works.
    history.replaceState(null, '', `#${section}`);
  }, []);

  const handleRequestQuote = useCallback(
    (productName: string) => {
      // Each click gets a fresh object so the effect in ContactSection re-runs
      // even when the same product is requested twice.
      setQuotePrefill({
        subject: `Quote request: ${productName}`,
        inquiryType: 'quote',
      });
      scrollToSection('contact');
    },
    [scrollToSection],
  );

  return (
    <div className="min-h-svh bg-background">
      {/* Keyboard users can jump past the nav; visible only when focused. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <Header activeSection={activeSection} onSectionChange={scrollToSection} />

      <main id="main">
        {/* scroll-mt clears the sticky header; html { scroll-padding-top }
            covers native anchor jumps, this covers scrollIntoView. */}
        <section id="home" className="scroll-mt-20">
          <HeroSection onNavigate={scrollToSection} />
        </section>

        <div id="about" className="scroll-mt-20">
          <AboutSection />
        </div>

        <div id="products" className="scroll-mt-20">
          <ProductsSection
            onRequestQuote={handleRequestQuote}
            onNavigate={scrollToSection}
          />
        </div>

        <div id="industries" className="scroll-mt-20">
          <IndustriesSection onNavigate={scrollToSection} />
        </div>

        <div id="quality" className="scroll-mt-20">
          <QualitySection onNavigate={scrollToSection} />
        </div>

        <div id="contact" className="scroll-mt-20">
          <ContactSection prefill={quotePrefill} />
        </div>
      </main>

      <Footer onSectionChange={scrollToSection} />
      <BackToTop />
    </div>
  );
}
