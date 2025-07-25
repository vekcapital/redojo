import React from 'react';
import { Zap, Shield, Users, Smartphone, Code, Paintbrush } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "24-hour delivery guaranteed. No waiting weeks for results."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your website data is encrypted and never shared with third parties."
    },
    {
      icon: Users,
      title: "User-Centered Design",
      description: "Designs optimized for your target audience and user experience."
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "All designs are fully responsive and mobile-optimized."
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Professional HTML/CSS code that's easy to implement."
    },
    {
      icon: Paintbrush,
      title: "Brand Aligned",
      description: "Designs that match your brand identity and business goals."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose ReDojo?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered redesign service combines speed, quality, and affordability to deliver exceptional results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}