
import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function ProductsSection() {
  const products = [
    {
      name: 'Dolomite Powder',
      description: 'High-purity dolomite powder with excellent whiteness and chemical stability.',
      industries: ['Paints', 'Plastics', 'Rubber'],
      features: ['High Whiteness', 'Chemical Stability', 'Fine Mesh']
    },
    {
      name: 'Talc Powder',
      description: 'Premium grade talc powder offering superior smoothness and oil absorption.',
      industries: ['Cosmetics', 'Paints', 'Paper'],
      features: ['Ultra-fine', 'High Brightness', 'Oil Absorption']
    },
    {
      name: 'Calcite Powder',
      description: 'Pure calcite powder with consistent particle size distribution.',
      industries: ['Paints', 'Plastics', 'Construction'],
      features: ['High Purity', 'Consistent Size', 'Good Dispersion']
    },
    {
      name: 'Limestone Powder',
      description: 'Quality limestone powder for various industrial applications.',
      industries: ['Construction', 'Ceramics', 'Adhesives'],
      features: ['High Calcium', 'Low Impurity', 'Good Reactivity']
    },
    {
      name: 'Silica Powder',
      description: 'Pure silica powder with excellent chemical and thermal properties.',
      industries: ['Glass', 'Ceramics', 'Detergents'],
      features: ['High Purity', 'Thermal Stability', 'Chemical Inertness']
    },
    {
      name: 'China Clay',
      description: 'High-grade china clay with exceptional plasticity and whiteness.',
      industries: ['Ceramics', 'Paper', 'Pharmaceuticals'],
      features: ['High Plasticity', 'Excellent Whiteness', 'Low Grit']
    }
  ];

  return (
    <section className="py-24 bg-background" data-testid="section-products">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-products-title">
            Our Premium Mineral Powders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality mineral powders, 
            each carefully processed to meet specific industrial requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="hover-elevate group overflow-hidden" data-testid={`card-product-${index}`}>
              <div className="aspect-[4/3] overflow-hidden bg-muted/50 flex items-center justify-center">
                <Package className="h-16 w-16 text-muted-foreground" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl" data-testid={`text-product-name-${index}`}>
                  {product.name}
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
                        variant="secondary" 
                        className="text-xs"
                        data-testid={`badge-feature-${index}-${featureIndex}`}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Industries Served:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.industries.map((industry, industryIndex) => (
                      <Badge 
                        key={industryIndex} 
                        variant="outline" 
                        className="text-xs"
                        data-testid={`badge-industry-${index}-${industryIndex}`}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need custom specifications or have questions about our products?
          </p>
          <button 
            className="text-primary font-medium hover:underline"
            onClick={() => console.log('Contact for custom specifications clicked')}
            data-testid="button-custom-specs"
          >
            Contact us for custom specifications →
          </button>
        </div>
      </div>
    </section>
  );
}