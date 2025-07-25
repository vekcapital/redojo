import React, { useState } from 'react';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  hasReferral: boolean;
  formData: any;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PaymentForm({ amount, hasReferral, formData, onSuccess, onError }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // 1. Create a payment intent on your backend
      // 2. Confirm the payment with Stripe
      // 3. Handle the response
      
      console.log('Processing payment for:', {
        amount,
        hasReferral,
        formData,
        cardData
      });

      onSuccess();
    } catch (error) {
      onError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = () => {
    return cardData.cardNumber.replace(/\s/g, '').length >= 16 &&
           cardData.expiryDate.length === 5 &&
           cardData.cvv.length >= 3 &&
           cardData.cardholderName.trim().length > 0;
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white border-2 border-gray-100 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
          <div className="flex items-center space-x-1 text-green-600">
            <Lock className="h-4 w-4" />
            <span className="text-sm">Secure</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>ReDojo Redesign Package</span>
            <span>$497</span>
          </div>
          {hasReferral && (
            <div className="flex justify-between text-green-600">
              <span>Premium AI Features</span>
              <span>FREE (+$200)</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>${amount}</span>
          </div>
        </div>
        
        {hasReferral && (
          <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-green-800 text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Premium features unlocked!</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            name="cardholderName"
            value={cardData.cardholderName}
            onChange={handleCardInputChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleCardInputChange}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="1234 5678 9012 3456"
              required
            />
            <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={cardData.expiryDate}
              onChange={handleCardInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="MM/YY"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={cardData.cvv}
              onChange={handleCardInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="123"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid() || isProcessing}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-2 ${
            isFormValid() && !isProcessing
              ? `bg-gradient-to-r ${hasReferral ? 'from-green-500 to-emerald-600' : 'from-blue-600 to-purple-600'} text-white hover:shadow-lg transform hover:scale-105`
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Lock className="h-5 w-5" />
              <span>Complete Order - ${amount}</span>
            </>
          )}
        </button>

        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🔒 Your payment information is encrypted and secure</p>
          <p>30-day money-back guarantee • 24-hour delivery</p>
        </div>
      </form>
    </div>
  );
}