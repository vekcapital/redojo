import React, { useEffect } from 'react';

// Simple analytics tracking for ReDojo
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Log to console for now - replace with your analytics service
  console.log('📊 ReDojo Event:', eventName, properties);
  
  // You can add Google Analytics, Mixpanel, or other services here
  // Example: gtag('event', eventName, properties);
};

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page });
};

export const trackQuestionnaireStart = () => {
  trackEvent('questionnaire_started');
};

export const trackQuestionnaireComplete = (formData: any) => {
  trackEvent('questionnaire_completed', {
    business_type: formData.businessType,
    design_style: formData.designStyle,
    has_referral: !!formData.referralEmail
  });
};

export const trackPaymentAttempt = (amount: number, hasReferral: boolean) => {
  trackEvent('payment_attempted', { amount, has_referral: hasReferral });
};

export const trackPaymentSuccess = (amount: number, hasReferral: boolean) => {
  trackEvent('payment_success', { amount, has_referral: hasReferral });
};

export default function Analytics() {
  useEffect(() => {
    trackPageView('homepage');
  }, []);

  return null;
}