
import { 
  Award, 
  Microscope, 
  Settings, 
  Truck, 
  CheckCircle, 
  BarChart3,
  Clock,
  Users
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
export default function QualitySection() {
  const qualityFeatures = [
    {
      icon: Microscope,
      title: 'Advanced Testing',
      description: 'State-of-the-art laboratory facilities for comprehensive quality analysis.',
      details: ['Chemical Analysis', 'Particle Size Distribution', 'Moisture Content', 'Purity Testing']
    },
    {
      icon: Settings,
      title: 'Modern Machinery',
      description: 'Latest processing equipment ensuring consistent product quality.',
      details: ['Automated Processing', 'Precision Grinding', 'Quality Sorting', 'Clean Environment']
    },
    {
      icon: Truck,
      title: 'Reliable Supply Chain',
      description: 'Efficient logistics and inventory management for timely deliveries.',
      details: ['Pan-India Delivery', 'Bulk Packaging', 'Custom Quantities', 'Express Shipping']
    },
    {
      icon: Award,
      title: 'Quality Certifications',
      description: 'Industry-recognized certifications and compliance standards.',
      details: ['ISO Certified', 'Industry Standards', 'Regular Audits', 'Documentation']
    }
  ];

  const capabilities = [
    {
      icon: BarChart3,
      title: 'Production Capacity',
      value: '10,000',
      unit: 'Tons/Month',
      description: 'Large-scale production capabilities'
    },
    {
      icon: CheckCircle,
      title: 'Quality Assurance',
      value: '99.5%',
      unit: 'Accuracy',
      description: 'Consistent product specifications'
    },
    {
      icon: Clock,
      title: 'Delivery Time',
      value: '3-5',
      unit: 'Days',
      description: 'Fast nationwide shipping'
    },
    {
      icon: Users,
      title: 'Expert Team',
      value: '50+',
      unit: 'Professionals',
      description: 'Experienced technical staff'
    }
  ];

  return (
    <section className="py-24 bg-background" data-testid="section-quality">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-quality-title">
            Quality & Facilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our commitment to excellence is reflected in our modern facilities, 
            rigorous quality control, and continuous improvement processes.
          </p>
        </div>

        {/* Key Capabilities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {capabilities.map((capability, index) => (
            <Card key={index} className="text-center hover-elevate" data-testid={`card-capability-${index}`}>
              <CardContent className="p-6">
                <capability.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="mb-2">
                  <span className="text-3xl font-bold text-foreground" data-testid={`text-capability-value-${index}`}>
                    {capability.value}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    {capability.unit}
                  </span>
                </div>
                <h4 className="font-medium text-foreground mb-1" data-testid={`text-capability-title-${index}`}>
                  {capability.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {capability.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quality Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {qualityFeatures.map((feature, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-quality-${index}`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl" data-testid={`text-quality-title-${index}`}>
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.details.map((detail, detailIndex) => (
                    <Badge 
                      key={detailIndex} 
                      variant="secondary" 
                      className="text-xs"
                      data-testid={`badge-quality-detail-${index}-${detailIndex}`}
                    >
                      {detail}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quality Commitment */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4" data-testid="text-quality-commitment">
                Our Quality Commitment
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We understand that the success of your products depends on the consistency and quality of our raw materials. 
                That's why we've invested heavily in modern equipment, skilled personnel, and rigorous testing procedures 
                to ensure every batch meets your exact specifications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>100% Batch Testing</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Consistent Quality</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>Technical Support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}