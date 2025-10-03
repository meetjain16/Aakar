
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
      className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/90 to-primary/70 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background carousel (subtle) */}
      <div className="absolute inset-0 -z-10">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`hero-${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-95 scale-100' : 'opacity-0 scale-105'
            }`} 
            style={{ filter: 'brightness(0.45) contrast(0.95)' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/40 pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text and CTAs */}
          <div className="lg:col-span-7 text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              Premium Mineral Powders — Reliable. Pure. Consistent.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
              Manufacturer of high-grade mineral powders from Udaipur, Rajasthan. Supplying
              manufacturers across India with quality-tested materials and on-time delivery.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold shadow-lg"
                onClick={handleEnquireClick}
                data-testid="button-hero-enquire"
              >
                Get Quote Now
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="border border-white/20 text-white px-6 py-3 font-medium hover:bg-white/10"
                data-testid="button-hero-products"
              >
                View Products
              </Button>
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
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:scale-105 transition-transform">
                <Award className="h-6 w-6 text-white" />
                <div className="text-left">
                  <div className="text-lg font-semibold text-white">10+ Years</div>
                  <div className="text-sm text-white/80">of expertise</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:scale-105 transition-transform">
                <Users className="h-6 w-6 text-white" />
                <div className="text-left">
                  <div className="text-lg font-semibold text-white">Trusted</div>
                  <div className="text-sm text-white/80">Across India</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:scale-105 transition-transform">
                <Factory className="h-6 w-6 text-white" />
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
              <img
                src={images[index]}
                alt={`preview-${index}`}
                className="w-full h-72 object-cover rounded-2xl shadow-2xl transition-transform duration-500"
              />

              {/* Prev / Next controls */}
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/60"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              {/* thumbnails */}
              <div className="flex gap-3 mt-4 justify-center">
                {images.map((src, i) => (
                  <button key={src} onClick={() => setIndex(i)} className={`w-16 h-10 rounded-lg overflow-hidden transition-opacity ${i === index ? 'ring-2 ring-white' : 'opacity-60'}`}>
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