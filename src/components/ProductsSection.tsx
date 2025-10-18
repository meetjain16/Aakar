
import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

// Import product images
import dolomiteImage from '../assets/attached_assets/generated_images/Dolomite_mineral_powder_0d149fcd.png';
import talcImage from '../assets/attached_assets/generated_images/Talc_powder_product_dc4e4f6a.png';
import calciteImage from '../assets/Calcite_mineral_powder_f858afa1.png';
import limestoneImage from '../assets/attached_assets/generated_images/Limestone_powder_product_33d99b5e.png';
import silicaImage from '../assets/attached_assets/generated_images/Silica_powder_product_7eef979c.png';
import chinaClayImage from '../assets/attached_assets/generated_images/China_clay_powder_fced85c3.png';

export default function ProductsSection() {
  const products = [
    {
      name: 'Dolomite Powder',
      description: 'High-purity dolomite powder with excellent whiteness and chemical stability.',
      industries: ['Paints', 'Plastics', 'Rubber'],
      features: ['High Whiteness', 'Chemical Stability', 'Fine Mesh'],
      image: dolomiteImage
    },
    {
      name: 'Talc Powder',
      description: 'Premium grade talc powder offering superior smoothness and oil absorption.',
      industries: ['Cosmetics', 'Paints', 'Paper'],
      features: ['Ultra-fine', 'High Brightness', 'Oil Absorption'],
      image: talcImage
    },
    {
      name: 'Calcite Powder',
      description: 'Pure calcite powder with consistent particle size distribution.',
      industries: ['Paints', 'Plastics', 'Construction'],
      features: ['High Purity', 'Consistent Size', 'Good Dispersion'],
      image: calciteImage
    },
    {
      name: 'Limestone Powder',
      description: 'Quality limestone powder for various industrial applications.',
      industries: ['Construction', 'Ceramics', 'Adhesives'],
      features: ['High Calcium', 'Low Impurity', 'Good Reactivity'],
      image: limestoneImage
    },
    {
      name: 'Silica Powder',
      description: 'Pure silica powder with excellent chemical and thermal properties.',
      industries: ['Glass', 'Ceramics', 'Detergents'],
      features: ['High Purity', 'Thermal Stability', 'Chemical Inertness'],
      image: silicaImage
    },
    {
      name: 'China Clay',
      description: 'High-grade china clay with exceptional plasticity and whiteness.',
      industries: ['Ceramics', 'Paper', 'Pharmaceuticals'],
      features: ['High Plasticity', 'Excellent Whiteness', 'Low Grit'],
      image: chinaClayImage
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-teal-50/50" data-testid="section-products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text mb-6" data-testid="text-products-title">
            Our Premium Mineral Powders
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover our range of carefully processed mineral powders tailored to industry needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const gradients = [
              'from-purple-500/20 to-pink-500/20',
              'from-blue-500/20 to-teal-500/20', 
              'from-orange-500/20 to-yellow-500/20',
              'from-green-500/20 to-emerald-500/20',
              'from-indigo-500/20 to-purple-500/20',
              'from-rose-500/20 to-pink-500/20'
            ];
            const iconColors = [
              'text-purple-500',
              'text-blue-500',
              'text-orange-500', 
              'text-green-500',
              'text-indigo-500',
              'text-rose-500'
            ];
            
            return (
              <Card key={index} className="hover-lift group overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm" data-testid={`card-product-${index}`}>
                <div className={`aspect-[4/3] overflow-hidden bg-gradient-to-tr ${gradients[index]} flex items-center justify-center relative`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Package className={`h-8 w-8 ${iconColors[index]} drop-shadow-lg`} />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between" data-testid={`text-product-name-${index}`}>
                    <span>{product.name}</span>
                    <Badge variant="secondary" className="text-xs hidden sm:inline-block gradient-primary text-white">Popular</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, featureIndex) => (
                        <Badge 
                          key={featureIndex} 
                          className={`text-xs ${iconColors[index]} bg-gradient-to-r ${gradients[index]} text-white border-0`}
                          data-testid={`badge-feature-${index}-${featureIndex}`}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {product.industries.map((industry, industryIndex) => (
                        <Badge 
                          key={industryIndex} 
                          variant="outline" 
                          className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50"
                          data-testid={`badge-industry-${index}-${industryIndex}`}
                        >
                          {industry}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      <Button 
                        className={`gradient-primary text-white border-0 shadow-md hover-lift ${iconColors[index]}`}
                        size="sm" 
                        onClick={() => console.log('Request quote for', product.name)}
                      >
                        Request Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="glass rounded-2xl p-8 backdrop-blur-md max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-6 text-lg">
              Need custom specifications or have questions about our products?
            </p>
            <Button 
              className="gradient-accent text-white border-0 shadow-lg hover-lift animate-pulse-glow px-8 py-3 text-lg" 
              onClick={() => console.log('Contact for custom specifications clicked')} 
              data-testid="button-custom-specs"
            >
              Contact us for custom specifications
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}