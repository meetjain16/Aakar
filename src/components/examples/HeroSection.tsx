import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection 
      onEnquireClick={() => console.log('Hero enquire clicked')} 
    />
  );
}