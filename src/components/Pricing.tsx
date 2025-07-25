import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            One flat rate, no hidden fees. Get three professional redesign options for less than the cost of a single consultation.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-100 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Complete Redesign Package
              </h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-5xl font-bold text-gray-900">$497</span>
                <div className="text-left">
                  <div className="text-gray-500 line-through">$997</div>
                  <div className="text-sm text-emerald-600 font-medium">Save 50%</div>
                </div>
              </div>
              <p className="text-gray-600">One-time payment, delivered in 24 hours</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                "3 unique redesign concepts",
                "Mobile-responsive designs",
                "Complete HTML/CSS code",
                "Brand color palette",
                "Typography recommendations",
                "24-hour delivery guarantee",
                "2 rounds of revisions",
                "Commercial usage rights"
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-1 rounded-full">
                    <Check className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openQuestionnaire'))}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Your Redesign Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <div className="text-center mt-4 text-sm text-gray-500">
              30-day money-back guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}