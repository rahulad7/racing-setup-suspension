import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AccountCreationModal from './AccountCreationModal';
import { supabase } from '@/lib/supabase';

interface PaymentWithAuthProps {
  amount: string;
  planType: 'free-trial' | 'two-days' | 'monthly' | 'annual';
  onSuccess: () => void;
  onError: (error: string) => void;
  buttonText?: string;
}

const PaymentWithAuth: React.FC<PaymentWithAuthProps> = ({
  amount,
  planType,
  onSuccess,
  onError,
  buttonText = 'Pay with PayPal'
}) => {
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const handlePayment = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    try {
      const numericAmount = parseFloat(amount.replace('$', ''));
      
      // Call the correct function name from Supabase
      const { data, error } = await supabase.functions.invoke('create-paypal-order', {
        body: {
          amount: numericAmount,
          planType,
          currency: 'USD',
          returnUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/license`
        },
      });

      if (error) {
        throw new Error(`Payment failed: ${error.message}`);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.approvalUrl && data?.orderId) {
        localStorage.setItem('paypal_order_id', data.orderId);
        localStorage.setItem('paypal_plan_type', planType);
        localStorage.setItem('paypal_user_id', user.id);
        window.location.href = data.approvalUrl;
      } else {
        throw new Error('Invalid payment response');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      onError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          buttonText
        )}
      </Button>

      <AccountCreationModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          setTimeout(() => handlePayment(), 500);
        }}
        planType={planType}
        amount={amount}
      />
    </>
  );
};

export default PaymentWithAuth;