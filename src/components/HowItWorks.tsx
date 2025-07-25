import React from 'react';
import { Link, MessageSquare, Palette } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Link,
      title: "Share Your Website",
      description: "Simply paste your current website URL into our secure form. Our AI will analyze your existing design, content, and structure.",
      step: "01"
    },
    {
      icon: MessageSquare,
      title: "Answer Quick Questions",
      description: "Tell us about your goals, target audience, and design preferences through our guided questionnaire. Takes just 5 minutes.",
      step: "02"
    },
    {
      icon: Palette,
      title: "Receive 3 Designs",
      description: "Within 24 hours, get three unique, professional redesign options tailored to your brand and requirements.",
      step: "03"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes website redesign effortless. No complex consultations or lengthy timelines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-6xl font-bold text-gray-100 ml-auto">
                      {step.step}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform -translate-y-1/2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}