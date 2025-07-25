import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      company: "TechFlow Solutions",
      role: "CEO",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "Boomsite transformed our outdated website into a conversion machine. We saw a 340% increase in leads within the first month. The AI-powered design perfectly captured our brand essence."
    },
    {
      name: "Marcus Rodriguez",
      company: "Verde Restaurant Group",
      role: "Marketing Director",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "I was skeptical about AI design, but the results blew me away. Three stunning options delivered in 24 hours, each better than what our previous agency took 3 months to create."
    },
    {
      name: "Emily Watson",
      company: "Wellness Studio Co",
      role: "Founder",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "The mobile-responsive design increased our mobile bookings by 280%. The clean, modern aesthetic perfectly represents our wellness brand. Worth every penny!"
    },
    {
      name: "David Park",
      company: "InnovateTech",
      role: "Product Manager",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "Fast, professional, and exactly what we needed. The AI understood our SaaS business model and created designs that convert visitors into trial users. Highly recommend!"
    },
    {
      name: "Lisa Thompson",
      company: "Artisan Bakery",
      role: "Owner",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "From a basic WordPress site to a stunning showcase of our artisan breads. Online orders increased 450% and customers constantly compliment our beautiful website."
    },
    {
      name: "James Mitchell",
      company: "Legal Associates",
      role: "Managing Partner",
      image: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      text: "Professional, trustworthy design that reflects our legal expertise. Client inquiries doubled, and the modern look gives us a competitive edge in our market."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of businesses that have transformed their online presence with ReDojo's AI-powered redesigns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm font-medium text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="relative flex-1">
                  <Quote className="absolute top-0 left-0 h-6 w-6 text-blue-200 -translate-x-1 -translate-y-1" />
                  <p className="text-gray-700 leading-relaxed pl-4">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-white px-8 py-4 rounded-full shadow-sm border border-gray-100">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <img
                  key={index}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">500+ Happy Clients</div>
              <div className="text-sm text-gray-600">Average 4.9/5 rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}