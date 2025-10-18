
import { Target, Eye, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function AboutSection() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide high-quality mineral powders that meet the exact specifications of diverse industrial applications.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the most trusted mineral powder supplier in India, known for consistent quality and reliability.'
    },
    {
      icon: Shield,
      title: 'Quality Commitment',
      description: 'Every batch undergoes rigorous quality testing to ensure it meets international standards.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuously improving our processes and expanding our product range to serve evolving industry needs.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50/50 via-pink-50/50 to-purple-50/50" data-testid="section-about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text mb-6" data-testid="text-about-title">
            About AAKAR MINERAL INDUSTRY
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Established in Udaipur, Rajasthan, we have been serving industries across India for over a decade 
            with premium mineral powders that power modern manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="glass rounded-2xl p-8 backdrop-blur-md">
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text mb-6" data-testid="text-about-story-title">
              Our Story
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2013, AAKAR MINERAL INDUSTRY began with a simple mission: to provide 
                reliable, high-quality mineral powders to industries that depend on consistent 
                raw materials for their manufacturing processes.
              </p>
              <p>
                Over the years, we have grown from a local supplier to a trusted partner for 
                companies across India, building our reputation on the foundation of quality, 
                reliability, and customer service excellence.
              </p>
              <p>
                Today, our state-of-the-art facilities in Udaipur process thousands of tons 
                of mineral powders annually, serving diverse industries from paints and 
                plastics to pharmaceuticals and construction.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => {
              const gradients = [
                'from-orange-500/20 to-pink-500/20',
                'from-pink-500/20 to-purple-500/20',
                'from-purple-500/20 to-indigo-500/20',
                'from-indigo-500/20 to-blue-500/20'
              ];
              const iconColors = [
                'text-orange-500',
                'text-pink-500',
                'text-purple-500',
                'text-indigo-500'
              ];
              
              return (
                <Card key={index} className="hover-lift glass backdrop-blur-md border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${gradients[index]} flex items-center justify-center`}>
                      <value.icon className={`h-8 w-8 ${iconColors[index]}`} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2" data-testid={`text-value-${index}`}>
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="glass rounded-2xl p-6 backdrop-blur-md hover-lift">
            <h4 className="text-4xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text mb-2" data-testid="text-stat-years">10+</h4>
            <p className="text-muted-foreground font-medium">Years Experience</p>
          </div>
          <div className="glass rounded-2xl p-6 backdrop-blur-md hover-lift">
            <h4 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text mb-2" data-testid="text-stat-products">6</h4>
            <p className="text-muted-foreground font-medium">Product Categories</p>
          </div>
          <div className="glass rounded-2xl p-6 backdrop-blur-md hover-lift">
            <h4 className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text mb-2" data-testid="text-stat-industries">9</h4>
            <p className="text-muted-foreground font-medium">Industries Served</p>
          </div>
          <div className="glass rounded-2xl p-6 backdrop-blur-md hover-lift">
            <h4 className="text-4xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text mb-2" data-testid="text-stat-clients">500+</h4>
            <p className="text-muted-foreground font-medium">Satisfied Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}