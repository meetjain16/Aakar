import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

import { 
  Palette, 
  Boxes, 
  Flame, 
  Truck, 
  FileText, 
  Droplets, 
  WashingMachine, 
  Building, 
  Pill,
  Factory
} from 'lucide-react';

export default function IndustriesSection() {
  const industries = [
    {
      icon: Palette,
      title: 'Paints & Coatings',
      description: 'High-quality mineral fillers for improved coverage, durability, and finish quality.',
      products: ['Calcite', 'Dolomite', 'Talc']
    },
    {
      icon: Boxes,
      title: 'Plastics',
      description: 'Reinforcing agents that enhance strength, stiffness, and dimensional stability.',
      products: ['Talc', 'Calcite', 'China Clay']
    },
    {
      icon: Flame,
      title: 'Ceramics',
      description: 'Essential raw materials for ceramic body formulation and glazing applications.',
      products: ['China Clay', 'Silica', 'Limestone']
    },
    {
      icon: Truck,
      title: 'Rubber Industry',
      description: 'Functional fillers that improve processing characteristics and final properties.',
      products: ['Calcite', 'Talc', 'Silica']
    },
    {
      icon: FileText,
      title: 'Paper Industry',
      description: 'Coating and filling minerals that enhance printability and paper quality.',
      products: ['Calcite', 'Talc', 'China Clay']
    },
    {
      icon: Droplets,
      title: 'Adhesives',
      description: 'Thickening and reinforcing agents for various adhesive formulations.',
      products: ['Calcite', 'Limestone', 'Talc']
    },
    {
      icon: WashingMachine,
      title: 'Detergents',
      description: 'Abrasive and anti-caking agents for household and industrial cleaners.',
      products: ['Calcite', 'Silica', 'Dolomite']
    },
    {
      icon: Building,
      title: 'Construction',
      description: 'Essential minerals for cement, concrete, and building material production.',
      products: ['Limestone', 'Calcite', 'Silica']
    },
    {
      icon: Pill,
      title: 'Pharmaceuticals',
      description: 'Pure, pharmaceutical-grade minerals for tablet formulation and excipients.',
      products: ['Talc', 'China Clay', 'Calcite']
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-teal-50/50 via-green-50/50 to-emerald-50/50" data-testid="section-industries">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-teal-600 via-green-600 to-emerald-600 bg-clip-text mb-6" data-testid="text-industries-title">
            Industries We Serve
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our mineral powders power manufacturing across diverse industries with tailored specifications and support.
          </p>
        </div>

        {/* Featured Industry Banner */}
        <div className="mb-16 glass rounded-3xl overflow-hidden backdrop-blur-md p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0 w-full md:w-1/3 rounded-2xl overflow-hidden gradient-cool h-48 flex items-center justify-center">
            <Factory className="h-24 w-24 text-white animate-float" />
          </div>
          <div className="flex-1">
            <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text mb-4">Trusted mineral solutions for industry leaders</h3>
            <p className="text-muted-foreground text-lg mb-6">We partner with manufacturers to deliver consistent, high-quality minerals that improve product performance and reliability.</p>
            <div className="flex gap-4">
              <Button 
                className="gradient-primary text-white border-0 shadow-lg hover-lift px-6 py-3" 
                onClick={() => console.log('Request industry brochure')}
              >
                Download Brochure
              </Button>
              <Button 
                className="glass border-white/30 text-foreground hover:bg-white/10 px-6 py-3" 
                onClick={() => console.log('Request consultation')}
              >
                Request Consultation
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const gradients = [
              'from-teal-500/20 to-green-500/20',
              'from-green-500/20 to-emerald-500/20',
              'from-emerald-500/20 to-cyan-500/20',
              'from-cyan-500/20 to-blue-500/20',
              'from-blue-500/20 to-indigo-500/20',
              'from-indigo-500/20 to-purple-500/20',
              'from-purple-500/20 to-pink-500/20',
              'from-pink-500/20 to-rose-500/20',
              'from-rose-500/20 to-orange-500/20'
            ];
            const iconColors = [
              'text-teal-500',
              'text-green-500',
              'text-emerald-500',
              'text-cyan-500',
              'text-blue-500',
              'text-indigo-500',
              'text-purple-500',
              'text-pink-500',
              'text-rose-500'
            ];
            
            return (
              <Card key={index} className="hover-lift glass backdrop-blur-md border-0 shadow-lg" data-testid={`card-industry-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradients[index]}`}>
                        <industry.icon className={`h-8 w-8 ${iconColors[index]}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2" data-testid={`text-industry-title-${index}`}>
                        {industry.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {industry.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {industry.products.map((p) => (
                          <Badge 
                            key={p} 
                            className={`text-xs ${iconColors[index]} bg-gradient-to-r ${gradients[index]} text-white border-0`}
                          >
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      className={`gradient-primary text-white border-0 shadow-md hover-lift ${iconColors[index]}`}
                      size="sm" 
                      onClick={() => console.log('Learn more', industry.title)}
                    >
                      Learn more
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 backdrop-blur-md max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-6 text-lg">
              Don't see your industry listed? We work with many more sectors.
            </p>
            <Button 
              className="gradient-accent text-white border-0 shadow-lg hover-lift animate-pulse-glow px-8 py-3 text-lg" 
              onClick={() => console.log('Industry consultation clicked')} 
              data-testid="button-industry-consultation"
            >
              Get industry-specific consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}