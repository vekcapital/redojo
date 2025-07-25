import React from 'react';
import { useState, useEffect } from 'react';
import Analytics from './components/Analytics';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import QuestionnaireModal from './components/QuestionnaireModal';
import Footer from './components/Footer';

function App() {
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

  useEffect(() => {
    const handleOpenQuestionnaire = () => {
      setIsQuestionnaireOpen(true);
    };

    window.addEventListener('openQuestionnaire', handleOpenQuestionnaire);
    
    return () => {
      window.removeEventListener('openQuestionnaire', handleOpenQuestionnaire);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Analytics />
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
      <QuestionnaireModal 
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
      />
    </div>
  );
}

export default App;