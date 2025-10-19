import { useState } from 'react';
import AboutSection from '../components/AboutSection';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import IndustriesSection from '../components/IndustriesSection';
import QualitySection from '../components/QualitySection';
import ContactSection from '../components/ContactSection';

import Footer from '../components/Footer';
import Header from '../components/Header';


export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireClick = () => {
    setActiveSection('contact');
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
      />
      
      <main>
        <div id="home">
          <HeroSection onEnquireClick={handleEnquireClick} />
        </div>
        
        <div id="about">
          <AboutSection />
        </div>
        
        <div id="products">
          <ProductsSection />
        </div>
        
        <div id="industries">
          <IndustriesSection />
        </div>
        
        <div id="quality">
          <QualitySection />
        </div>
        
        <div id="contact">
          <ContactSection />
        </div>
        
      </main>
      
      <Footer onSectionChange={handleSectionChange} />
    </div>
  );
}