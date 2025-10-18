
import { useEffect, useRef, useState } from 'react';
import a from '../assets/attached_assets/generated_images/Talc_powder_product_dc4e4f6a.png';
import b from '../assets/Calcite_mineral_powder_f858afa1.png';
import c from '../assets/Calcite_mineral_powder_f858afa1.png';
import { ArrowRight, Award, Users, Factory, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface HeroSectionProps {
  onEnquireClick?: () => void;
}

export default function HeroSection({ onEnquireClick }: HeroSectionProps) {
  const handleEnquireClick = () => {
    onEnquireClick?.();
    console.log('Enquire Now clicked');
  };

  // Image list for the carousel. Replace with your own image paths or imports.
  const images = [a, b,c];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // clear existing
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (!paused) {
      intervalRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 3500);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [images.length, paused]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden animate-gradient"
      style={{
        background: 'linear-gradient(135deg, hsl(280 85% 60%), hsl(200 85% 55%), hsl(35 85% 55%), hsl(190 85% 55%))',
        backgroundSize: '400% 400%'
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-lg animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-lg animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Background carousel with vibrant overlay */}
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`hero-${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-30 scale-100' : 'opacity-0 scale-105'
            }`} 
            style={{ filter: 'brightness(0.6) contrast(1.1) saturate(1.2)' }}
          />
        ))}
        
        {/* Vibrant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-teal-500/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/10 via-orange-500/10 to-yellow-500/10 pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text and CTAs */}
          <div className="lg:col-span-7 text-left">
            <div className="glass rounded-2xl p-8 backdrop-blur-md">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg mb-6">
                Premium Mineral Powders — 
                <span className="block text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text">
                  Reliable. Pure. Consistent.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed mb-8">
                Manufacturer of high-grade mineral powders from Udaipur, Rajasthan. Supplying
                manufacturers across India with quality-tested materials and on-time delivery.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  size="lg"
                  onClick={handleEnquireClick}
                  data-testid="button-hero-enquire"
                  className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 shadow-lg hover-lift animate-pulse-glow"
                >
                  Get Quote Now
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="text-white px-6 py-3 font-medium glass hover:bg-white/10 border-white/30 hover-scale"
                  data-testid="button-hero-products"
                >
                  View Products
                </Button>
              </div>
            </div>

            {/* Slide dots */}
            <div className="flex items-center gap-2 mt-6">
              {images.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === index ? 'bg-white' : 'bg-white/40'
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>

            {/* Trust chips */}
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-3 glass px-6 py-3 rounded-full hover-scale transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20">
                <Award className="h-6 w-6 text-yellow-300" />
                <div className="text-left">
                  <div className="text-lg font-semibold text-white">10+ Years</div>
                  <div className="text-sm text-white/80">of expertise</div>
                </div>
              </div>

              <div className="flex items-center gap-3 glass px-6 py-3 rounded-full hover-scale transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-teal-500/20">
                <Users className="h-6 w-6 text-blue-300" />
                <div className="text-left">
                  <div className="text-lg font-semibold text-white">Trusted</div>
                  <div className="text-sm text-white/80">Across India</div>
                </div>
              </div>

              <div className="flex items-center gap-3 glass px-6 py-3 rounded-full hover-scale transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20">
                <Factory className="h-6 w-6 text-purple-300" />
                <div className="text-left">
                  <div className="text-lg font-semibold text-white">Modern Facilities</div>
                  <div className="text-sm text-white/80">ISO-certified processes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Preview card */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <div className="w-full max-w-md relative">
              <div className="glass rounded-3xl p-4 backdrop-blur-md">
                <img
                  src={images[index]}
                  alt={`preview-${index}`}
                  className="w-full h-72 object-cover rounded-2xl shadow-2xl transition-transform duration-500 hover-scale"
                />

                {/* Prev / Next controls */}
                <button
                  onClick={prev}
                  aria-label="Previous"
                  className="absolute left-6 top-1/2 -translate-y-1/2 glass p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover-scale"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next"
                  className="absolute right-6 top-1/2 -translate-y-1/2 glass p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover-scale"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* thumbnails */}
              <div className="flex gap-3 mt-6 justify-center">
                {images.map((src, i) => (
                  <button 
                    key={src} 
                    onClick={() => setIndex(i)} 
                    className={`w-16 h-10 rounded-lg overflow-hidden transition-all duration-300 hover-scale ${
                      i === index 
                        ? 'ring-2 ring-white shadow-lg' 
                        : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}