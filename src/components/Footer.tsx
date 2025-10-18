
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
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white" data-testid="footer">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text" data-testid="text-footer-company">
                  AAKAR MINERAL INDUSTRY
                </h3>
                <p className="text-xs text-white/70">Quality Mineral Powders</p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Leading manufacturer of high-quality mineral powders, serving industries across 
              India with over 10 years of expertise from Udaipur, Rajasthan.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-white/80 hover:text-white transition-colors">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Udaipur, Rajasthan, India</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/80 hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-green-400" />
                <span>+91 294 2525252</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/80 hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-purple-400" />
                <span>info@aakarmineral.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text mb-6" data-testid="text-footer-quick-links">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavigationClick(link.id)}
                    className="text-sm text-white/80 hover:text-white transition-colors text-left hover:translate-x-1 transform duration-200"
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
            <h4 className="text-lg font-semibold text-transparent bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text mb-6" data-testid="text-footer-products">
              Our Products
            </h4>
            <ul className="space-y-3">
              {productLinks.map((product, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigationClick('products')}
                    className="text-sm text-white/80 hover:text-white transition-colors text-left hover:translate-x-1 transform duration-200"
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
            <h4 className="text-lg font-semibold text-transparent bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text mb-6" data-testid="text-footer-industries">
              Industries Served
            </h4>
            <ul className="space-y-3 mb-8">
              {industries.map((industry, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigationClick('industries')}
                    className="text-sm text-white/80 hover:text-white transition-colors text-left hover:translate-x-1 transform duration-200"
                    data-testid={`button-footer-industry-${index}`}
                  >
                    {industry}
                  </button>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="text-sm font-semibold text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text mb-4">Follow Us</h5>
              <div className="flex space-x-3">
                <Button 
                  className="h-10 w-10 glass hover:bg-blue-500/20 hover-scale transition-all duration-300" 
                  onClick={() => console.log('Facebook clicked')}
                  data-testid="button-social-facebook"
                >
                  <Facebook className="h-5 w-5 text-blue-400" />
                </Button>
                <Button 
                  className="h-10 w-10 glass hover:bg-cyan-500/20 hover-scale transition-all duration-300" 
                  onClick={() => console.log('Twitter clicked')}
                  data-testid="button-social-twitter"
                >
                  <Twitter className="h-5 w-5 text-cyan-400" />
                </Button>
                <Button 
                  className="h-10 w-10 glass hover:bg-blue-600/20 hover-scale transition-all duration-300" 
                  onClick={() => console.log('LinkedIn clicked')}
                  data-testid="button-social-linkedin"
                >
                  <Linkedin className="h-5 w-5 text-blue-500" />
                </Button>
                <Button 
                  className="h-10 w-10 glass hover:bg-pink-500/20 hover-scale transition-all duration-300" 
                  onClick={() => console.log('Instagram clicked')}
                  data-testid="button-social-instagram"
                >
                  <Instagram className="h-5 w-5 text-pink-400" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-white/70" data-testid="text-copyright">
            © 2024 AAKAR MINERAL INDUSTRY. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-white/70">
            <button 
              className="hover:text-white transition-colors hover:underline"
              onClick={() => console.log('Privacy Policy clicked')}
              data-testid="button-privacy-policy"
            >
              Privacy Policy
            </button>
            <button 
              className="hover:text-white transition-colors hover:underline"
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