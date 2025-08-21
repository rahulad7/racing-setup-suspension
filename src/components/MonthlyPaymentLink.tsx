import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLicense } from '@/contexts/LicenseContext';

const MonthlyPaymentLink: React.FC = () => {
  const { user } = useAuth();
  const { updateLicense } = useLicense();

  const handlePaymentClick = () => {
    // Store user info for post-payment processing
    if (user) {
      localStorage.setItem('pendingPayment', JSON.stringify({
        userId: user.id,
        planType: 'monthly',
        timestamp: Date.now()
      }));
    }
    
    // Open PayPal payment link
    window.open('https://www.paypal.com/ncp/payment/59Q7EQQZNZ6NG', '_blank');
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePaymentClick}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <span>💳</span>
        Pay Monthly ($9.99/month)
      </button>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Secure payment via PayPal
      </p>
    </div>
  );
};

export default MonthlyPaymentLink;