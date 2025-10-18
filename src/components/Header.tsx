import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import ThemeToggle from './ui/theme-toggle';

interface HeaderProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export default function Header({ activeSection = 'home', onSectionChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'industries', label: 'Industries We Serve' },
    { id: 'quality', label: 'Quality & Facilities' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (sectionId: string) => {
    onSectionChange?.(sectionId);
    setIsMobileMenuOpen(false);
    console.log(`Navigation clicked: ${sectionId}`);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg hover-scale transition-transform">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold logo-gradient" data-testid="text-company-name">
              AAKAR MINERAL INDUSTRY
            </h1>
            <p className="text-xs text-muted-foreground">Quality Mineral Powders</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover-scale ${
                activeSection === item.id 
                  ? 'gradient-primary text-white shadow-lg' 
                  : 'text-foreground hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10'
              }`}
              data-testid={`button-nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button + theme toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <Button 
            onClick={() => handleNavClick('contact')}
            data-testid="button-enquire-now"
            className="gradient-accent text-white border-0 shadow-lg hover-lift animate-pulse-glow"
          >
            Enquire Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-b border-white/20">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-3 px-4 text-sm font-medium rounded-lg transition-all duration-300 hover-scale ${
                  activeSection === item.id 
                    ? 'gradient-primary text-white shadow-lg' 
                    : 'text-foreground hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10'
                }`}
                data-testid={`button-mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <Button 
              className="w-full mt-4 gradient-accent text-white border-0 shadow-lg hover-lift" 
              onClick={() => handleNavClick('contact')}
              data-testid="button-mobile-enquire"
            >
              Enquire Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}