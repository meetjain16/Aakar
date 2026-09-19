import { useEffect, useId, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';

import { Button } from './ui/button';
import { LogoTile } from './Logo';
import ThemeToggle from './ui/theme-toggle';
import { cn } from '../lib/utils';
import { company, navItems, type SectionId } from '../lib/site';

interface HeaderProps {
  activeSection?: SectionId | string;
  onSectionChange?: (section: SectionId) => void;
}

export default function Header({
  activeSection = 'home',
  onSectionChange,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Give the bar a solid background and a border once the page has moved, so
  // it stays legible over the hero imagery instead of washing out.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile panel on Escape and return focus to the trigger.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isMenuOpen]);

  // Prevent the page behind the open panel from scrolling.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  // A viewport change can cross the breakpoint while the panel is open, which
  // would leave it mounted but invisible with the body still locked.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const handleNavClick = (sectionId: SectionId) => {
    onSectionChange?.(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        isScrolled || isMenuOpen
          ? 'border-b border-border bg-background/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-background/40 backdrop-blur-md',
      )}
    >
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="flex shrink-0 items-center gap-3 rounded-md"
          data-testid="link-company-home"
        >
          <LogoTile className="shadow-sm" />
          <span className="min-w-0">
            <span
              className="block truncate font-heading text-[0.95rem] font-bold leading-tight tracking-tight text-foreground sm:text-base"
              data-testid="text-company-name"
            >
              {company.legalName}
            </span>
            <span className="block text-xs text-muted-foreground">
              {company.tagline}
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                    data-testid={`button-nav-${item.id}`}
                  >
                    {item.shortLabel}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`tel:${company.phoneE164}`}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground xl:inline-flex"
            data-testid="link-header-phone"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {company.phoneDisplay}
          </a>

          {/* Theme control stays reachable at every width — it used to vanish
              below the md breakpoint. */}
          <ThemeToggle />

          <Button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex"
            data-testid="button-enquire-now"
          >
            Enquire Now
          </Button>

          <Button
            ref={toggleRef}
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id={menuId}
        ref={panelRef}
        // Kept mounted and hidden so aria-controls always resolves to a node.
        hidden={!isMenuOpen}
        className="border-t border-border bg-background lg:hidden"
      >
        <nav aria-label="Mobile" className="section-shell py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-4 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted',
                    )}
                    data-testid={`button-mobile-nav-${item.id}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 space-y-2 border-t border-border pt-4">
            <Button
              className="w-full"
              onClick={() => handleNavClick('contact')}
              data-testid="button-mobile-enquire"
            >
              Enquire Now
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href={`tel:${company.phoneE164}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
