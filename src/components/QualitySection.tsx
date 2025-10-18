
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
import { Button } from './ui/button';
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
    <section className="py-24 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-pink-50/50" data-testid="section-quality">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text mb-6" data-testid="text-quality-title">
            Quality & Facilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our commitment to excellence is reflected in modern facilities, rigorous testing, and a continuous improvement culture.
          </p>
        </div>

        {/* Key Capabilities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {capabilities.map((capability, index) => {
            const gradients = [
              'from-indigo-500/20 to-purple-500/20',
              'from-purple-500/20 to-pink-500/20',
              'from-pink-500/20 to-rose-500/20',
              'from-rose-500/20 to-orange-500/20'
            ];
            const iconColors = [
              'text-indigo-500',
              'text-purple-500',
              'text-pink-500',
              'text-rose-500'
            ];
            
            return (
              <Card key={index} className="text-center hover-lift glass backdrop-blur-md border-0 shadow-lg" data-testid={`card-capability-${index}`}>
                <CardContent className="p-6">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${gradients[index]} flex items-center justify-center mb-4`}>
                    <capability.icon className={`h-8 w-8 ${iconColors[index]}`} />
                  </div>
                  <div className="mb-3">
                    <span className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text" data-testid={`text-capability-value-${index}`}>
                      {capability.value}
                    </span>
                    <div className="text-sm text-muted-foreground font-medium">{capability.unit}</div>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2" data-testid={`text-capability-title-${index}`}>
                    {capability.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quality Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {qualityFeatures.map((feature, index) => {
            const gradients = [
              'from-indigo-500/20 to-purple-500/20',
              'from-purple-500/20 to-pink-500/20',
              'from-pink-500/20 to-rose-500/20',
              'from-rose-500/20 to-orange-500/20'
            ];
            const iconColors = [
              'text-indigo-500',
              'text-purple-500',
              'text-pink-500',
              'text-rose-500'
            ];
            
            return (
              <Card key={index} className="hover-lift glass backdrop-blur-md border-0 shadow-lg" data-testid={`card-quality-${index}`}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center`}>
                      <feature.icon className={`h-8 w-8 ${iconColors[index]}`} />
                    </div>
                    <CardTitle className="text-xl text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text" data-testid={`text-quality-title-${index}`}>
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
                        className={`text-xs ${iconColors[index]} bg-gradient-to-r ${gradients[index]} text-white border-0`}
                        data-testid={`badge-quality-detail-${index}-${detailIndex}`}
                      >
                        {detail}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quality Commitment */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto glass backdrop-blur-md border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text mb-6" data-testid="text-quality-commitment">
                Our Quality Commitment
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                We understand that the success of your products depends on the consistency and quality of our raw materials. 
                That's why we've invested in modern equipment, skilled personnel, and rigorous testing procedures to ensure every batch meets your specifications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-8">
                <div className="flex items-center justify-center space-x-2 glass rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="font-medium">100% Batch Testing</span>
                </div>
                <div className="flex items-center justify-center space-x-2 glass rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-blue-500" />
                  <span className="font-medium">Consistent Quality</span>
                </div>
                <div className="flex items-center justify-center space-x-2 glass rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-purple-500" />
                  <span className="font-medium">Technical Support</span>
                </div>
              </div>
              <div className="flex justify-center">
                <Button 
                  className="gradient-accent text-white border-0 shadow-lg hover-lift animate-pulse-glow px-8 py-3 text-lg" 
                  onClick={() => console.log('Download certificate')}
                >
                  Download Certificates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}