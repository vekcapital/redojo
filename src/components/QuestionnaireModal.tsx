import React, { useState, useEffect } from 'react';
import { Send, Globe, MessageSquare, ArrowRight, ArrowLeft, CheckCircle, Users, Palette, Target, X } from 'lucide-react';
import { trackQuestionnaireStart, trackQuestionnaireComplete } from './Analytics';
import PaymentForm from './PaymentForm';
import SuccessModal from './SuccessModal';

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuestionnaireModal({ isOpen, onClose }: QuestionnaireModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [showReferral, setShowReferral] = useState(false);
  const [formData, setFormData] = useState({
    websiteUrl: '',
    businessType: '',
    targetAudience: '',
    designStyle: '',
    goals: '',
    email: '',
    referralEmail: '',
    timeline: 'standard'
  });

  const totalSteps = 5;
  const [hasReferred, setHasReferred] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      trackQuestionnaireStart();
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackQuestionnaireComplete(formData);
    setShowReferral(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setShowSuccess(true);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setShowReferral(false);
    onClose();
    // Reset form
    setCurrentStep(1);
    setShowPayment(false);
    setHasReferred(false);
    setFormData({
      websiteUrl: '',
      businessType: '',
      targetAudience: '',
      designStyle: '',
      goals: '',
      email: '',
      referralEmail: '',
      timeline: 'standard'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.websiteUrl.trim() !== '';
      case 2:
        return formData.businessType !== '';
      case 3:
        return formData.targetAudience.trim() !== '';
      case 4:
        return formData.designStyle !== '';
      case 5:
        return formData.goals.trim() !== '' && formData.email.trim() !== '';
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full inline-block">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                What's your current website?
              </h3>
              <p className="text-gray-600">
                Share your website URL so our AI can analyze your current design and content structure.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <input
                type="url"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg text-center"
                placeholder="https://yourwebsite.com"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full inline-block">
              <Target className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                What type of business do you run?
              </h3>
              <p className="text-gray-600">
                This helps us understand your industry and create designs that resonate with your market.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { value: 'ecommerce', label: 'E-commerce', desc: 'Online store or retail' },
                { value: 'saas', label: 'SaaS/Tech', desc: 'Software or technology' },
                { value: 'professional', label: 'Professional Services', desc: 'Consulting, legal, etc.' },
                { value: 'restaurant', label: 'Restaurant/Food', desc: 'Food & beverage business' },
                { value: 'healthcare', label: 'Healthcare', desc: 'Medical or wellness' },
                { value: 'education', label: 'Education', desc: 'Schools or training' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, businessType: option.value })}
                  className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    formData.businessType === option.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full inline-block">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Who is your target audience?
              </h3>
              <p className="text-gray-600">
                Understanding your audience helps us create designs that connect and convert.
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg resize-none"
                placeholder="e.g., Small business owners aged 30-50, Tech professionals, Young families with children..."
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full inline-block">
              <Palette className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                What design style appeals to you?
              </h3>
              <p className="text-gray-600">
                Choose a style that aligns with your brand personality and business goals.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { value: 'modern', label: 'Modern & Minimalist', desc: 'Clean, simple, focused' },
                { value: 'bold', label: 'Bold & Creative', desc: 'Eye-catching, unique' },
                { value: 'professional', label: 'Professional & Corporate', desc: 'Trustworthy, established' },
                { value: 'playful', label: 'Playful & Colorful', desc: 'Fun, energetic, vibrant' },
                { value: 'elegant', label: 'Elegant & Sophisticated', desc: 'Refined, premium feel' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, designStyle: option.value })}
                  className={`p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                    formData.designStyle === option.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full inline-block">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                What are your main goals?
              </h3>
              <p className="text-gray-600">
                Tell us what you want to achieve with your redesign so we can focus on what matters most.
              </p>
            </div>
            <div className="max-w-md mx-auto space-y-4">
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg resize-none"
                placeholder="e.g., Increase online sales, improve user experience, modernize brand image, generate more leads..."
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg text-center"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </div>
        );


      default:
        return null;
    }
  };

  if (!isOpen) return null;

  if (showReferral) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🎉 Unlock Premium Features!</h2>
              <p className="text-gray-600">Refer a friend and get $200+ worth of premium AI features for FREE</p>
            </div>
            <button
              onClick={() => setShowReferral(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          <div className="p-8">
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-full inline-block">
                <Users className="h-8 w-8 text-white" />
              </div>
              
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                    <div className="text-blue-600 font-semibold mb-2">🤖 Advanced AI Features</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• AI Content Generation</li>
                      <li>• Smart SEO Optimization</li>
                      <li>• Conversion Rate Analysis</li>
                      <li>• A/B Testing Suggestions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                    <div className="text-purple-600 font-semibold mb-2">⚡ Premium Services</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Live Chat Integration</li>
                      <li>• Social Media Kit</li>
                      <li>• Email Template Design</li>
                      <li>• Brand Guidelines PDF</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-100">
                    <div className="text-emerald-600 font-semibold mb-2">📊 Analytics & Insights</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• User Behavior Heatmaps</li>
                      <li>• Performance Benchmarking</li>
                      <li>• Competitor Analysis</li>
                      <li>• Growth Recommendations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                    <div className="text-orange-600 font-semibold mb-2">🎨 Design Extras</div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Custom Icon Set (50+)</li>
                      <li>• Stock Photo Library Access</li>
                      <li>• Logo Variations</li>
                      <li>• Print-Ready Materials</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      Refer a Friend & Unlock Everything Above
                    </div>
                    <div className="text-sm text-gray-600">
                      Just enter their email - we'll send them a special offer too!
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      name="referralEmail"
                      value={formData.referralEmail}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="friend@email.com"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.referralEmail.trim()) {
                          setHasReferred(true);
                        }
                      }}
                      disabled={!formData.referralEmail.trim()}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        formData.referralEmail.trim()
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {hasReferred ? '✓ Unlocked!' : 'Unlock Features'}
                    </button>
                  </div>
                  
                  {hasReferred && (
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="text-emerald-800 font-semibold text-sm">
                        🎉 Amazing! Premium features unlocked! Your friend will receive a 25% discount.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowReferral(false)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Questions</span>
              </button>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPayment(true)}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all"
                >
                  <span>Skip & Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowPayment(true)}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                    hasReferred
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  <span>{hasReferred ? 'Get Premium Package ($497)' : 'Continue to Payment ($497)'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Complete Your Order</h2>
              <p className="text-gray-600">Secure payment powered by Stripe</p>
            </div>
            <button
              onClick={() => setShowPayment(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          <div className="p-6">
            {paymentError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-red-800 text-sm">{paymentError}</div>
              </div>
            )}
            
            <PaymentForm
              amount={497}
              hasReferral={hasReferred}
              formData={formData}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Get Your Website Redesigned</h2>
            <p className="text-gray-600">Answer a few questions to get started</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i + 1 <= currentStep
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-center text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
          
          <div className="min-h-[400px] flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="flex-1">
              {renderStep()}
            </form>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                    isStepValid()
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                    isStepValid()
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>Continue to Pricing</span>
                  <Send className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {currentStep === totalSteps && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Next: Optional referral program • Secure payment • 24-hour delivery
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    
    <SuccessModal
      isOpen={showSuccess}
      onClose={handleSuccessClose}
      hasReferral={hasReferred}
      email={formData.email}
    />
    </>
  );
}