import { Card, CardContent } from './ui/card';

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
    <section className="py-24 bg-muted/30" data-testid="section-industries">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-industries-title">
            Industries We Serve
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our mineral powders power manufacturing across diverse industries, 
            each with unique requirements and quality standards.
          </p>
        </div>

        {/* Featured Industry Placeholder */}
        <div className="mb-16 rounded-lg overflow-hidden bg-muted/50">
          <div 
            className="w-full h-64 md:h-96 flex items-center justify-center"
            data-testid="img-featured-industry"
          >
            <Factory className="h-24 w-24 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-industry-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <industry.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2" data-testid={`text-industry-title-${index}`}>
                      {industry.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {industry.description}
                    </p>
                    <div>
                      <p className="text-xs font-medium text-foreground mb-1">Key Products:</p>
                      <p className="text-xs text-muted-foreground">
                        {industry.products.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Don't see your industry listed? We work with many more sectors.
          </p>
          <button 
            className="text-primary font-medium hover:underline"
            onClick={() => console.log('Industry consultation clicked')}
            data-testid="button-industry-consultation"
          >
            Get industry-specific consultation →
          </button>
        </div>
      </div>
    </section>
  );
}