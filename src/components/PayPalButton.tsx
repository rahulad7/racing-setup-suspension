import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface PayPalButtonProps {
  amount: string;
  planType: 'free-trial' | 'two-days' | 'monthly' | 'annual';
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, planType, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create PayPal order using Supabase function
      const { data, error } = await supabase.functions.invoke('create-paypal-order', {
        body: {
          amount: parseFloat(amount.replace('$', '')),
          planType,
          currency: 'USD',
          returnUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/license`
        },
      });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Supabase error: ${error.message}`);
      }

      if (!data) {
        throw new Error('No data received from PayPal service');
      }

      if (data.error) {
        throw new Error(`PayPal API error: ${data.error}`);
      }

      // Redirect to PayPal for approval
      if (data.approvalUrl && data.orderId) {
        // Store order info for later capture
        localStorage.setItem('paypal_order_id', data.orderId);
        localStorage.setItem('paypal_plan_type', planType);
        
        // Store user ID if authenticated for license linking
        if (user) {
          localStorage.setItem('paypal_user_id', user.id);
        }
        
        // Redirect to PayPal
        window.location.href = data.approvalUrl;
      } else {
        throw new Error('Invalid response: missing approval URL or order ID');
      }
    } catch (err) {
      console.error('PayPal payment error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      onError(errorMessage);
      setLoading(false);
    }
  };

  return (
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
        <>
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81.45.513.741 1.093.926 1.734.12.415.18.85.148 1.373z"/>
          </svg>
          Pay with PayPal
        </>
      )}
    </Button>
  );
};

export default PayPalButton;