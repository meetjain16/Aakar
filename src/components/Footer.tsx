
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface FooterProps {
  onSectionChange?: (section: string) => void;
}

export default function Footer({ onSectionChange }: FooterProps) {
  const handleNavigationClick = (section: string) => {
    onSectionChange?.(section);
    console.log(`Footer navigation clicked: ${section}`);
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products' },
    { id: 'industries', label: 'Industries' },
    { id: 'quality', label: 'Quality & Facilities' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const productLinks = [
    'Dolomite Powder',
    'Talc Powder',
    'Calcite Powder',
    'Limestone Powder',
    'Silica Powder',
    'China Clay'
  ];

  const industries = [
    'Paints & Coatings',
    'Plastics',
    'Ceramics',
    'Rubber Industry',
    'Paper Industry',
    'Construction'
  ];

  return (
    <footer className="bg-card border-t" data-testid="footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground" data-testid="text-footer-company">
                  AAKAR MINERAL INDUSTRY
                </h3>
                <p className="text-xs text-muted-foreground">Quality Mineral Powders</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading manufacturer of high-quality mineral powders, serving industries across 
              India with over 10 years of expertise from Udaipur, Rajasthan.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Udaipur, Rajasthan, India</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 294 2525252</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@aakarmineral.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4" data-testid="text-footer-quick-links">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigationClick(link.id)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                    data-testid={`button-footer-nav-${link.id}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4" data-testid="text-footer-products">
              Our Products
            </h4>
            <ul className="space-y-2">
              {productLinks.map((product, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigationClick('products')}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                    data-testid={`button-footer-product-${index}`}
                  >
                    {product}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4" data-testid="text-footer-industries">
              Industries Served
            </h4>
            <ul className="space-y-2 mb-6">
              {industries.map((industry, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigationClick('industries')}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                    data-testid={`button-footer-industry-${index}`}
                  >
                    {industry}
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="text-sm font-semibold text-foreground mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => console.log('Facebook clicked')}
                  data-testid="button-social-facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => console.log('Twitter clicked')}
                  data-testid="button-social-twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => console.log('LinkedIn clicked')}
                  data-testid="button-social-linkedin"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => console.log('Instagram clicked')}
                  data-testid="button-social-instagram"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © 2024 AAKAR MINERAL INDUSTRY. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <button 
              className="hover:text-primary transition-colors"
              onClick={() => console.log('Privacy Policy clicked')}
              data-testid="button-privacy-policy"
            >
              Privacy Policy
            </button>
            <button 
              className="hover:text-primary transition-colors"
              onClick={() => console.log('Terms of Service clicked')}
              data-testid="button-terms"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}