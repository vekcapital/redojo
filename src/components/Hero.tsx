import React from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>The AI dojo for your site</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Your Website in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              24 Hours
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Simply provide your website link, answer a few quick questions, and receive three stunning 
            AI-generated redesign options. No meetings, no lengthy processes—just beautiful results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openQuestionnaire'))}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Your Redesign</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5" />
              <span>24-hour delivery guaranteed</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">3</div>
              <div className="text-gray-600">Design Options</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24h</div>
              <div className="text-gray-600">Delivery Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600">AI-Powered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}