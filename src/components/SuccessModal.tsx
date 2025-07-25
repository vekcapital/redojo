import React from 'react';
import { CheckCircle, Mail, Clock, Palette, X } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasReferral: boolean;
  email: string;
}

export default function SuccessModal({ isOpen, onClose, hasReferral, email }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-full inline-block mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Order Confirmed!
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing ReDojo! Your website redesign is now in progress.
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Confirmation Email</div>
                  <div className="text-sm text-gray-600">Sent to {email}</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">AI Analysis</div>
                  <div className="text-sm text-gray-600">Starting within 1 hour</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Palette className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">3 Designs</div>
                  <div className="text-sm text-gray-600">Delivered in 24 hours</div>
                </div>
              </div>
            </div>
          </div>

          {hasReferral && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                🎁 Premium Features Unlocked!
              </h3>
              <p className="text-green-700 text-sm">
                Thanks for referring a friend! You'll receive all premium AI features and extras worth $200+ at no additional cost.
              </p>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Your Order Details</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-mono">#RD{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span>Package:</span>
                <span>{hasReferral ? 'Premium' : 'Standard'} Redesign</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>Within 24 hours</span>
              </div>
              <div className="flex justify-between">
                <span>Support:</span>
                <span>hello@redojo.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Continue Browsing
            </button>
            
            <p className="text-sm text-gray-500">
              Questions? Contact us at <a href="mailto:hello@redojo.com" className="text-blue-600 hover:underline">hello@redojo.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}