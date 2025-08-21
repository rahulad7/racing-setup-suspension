import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AccountCreationModal from './AccountCreationModal';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubscriptionWithAuthProps {
  planId: string;
  planType: 'monthly' | 'annual';
  onSuccess?: (subscriptionId: string) => void;
  onError?: (error: any) => void;
}

const SubscriptionWithAuth: React.FC<SubscriptionWithAuthProps> = ({
  planId,
  planType,
  onSuccess,
  onError
}) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const containerId = `paypal-subscription-${planId}`;

  const loadPayPalScript = () => {
    if (scriptLoaded.current) return;
    
    console.log('Loading PayPal script for subscription:', planId);
    setLoading(true);
    
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AT-7PzkE53BJ0EklY8Hp4G2EVDdEh2cLI5msW06Jv7V0yO9IlqXU6w0I0PjTTmbCaiuIPMr0qYnlokob&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    
    script.onload = () => {
      console.log('PayPal script loaded successfully');
      scriptLoaded.current = true;
      setIsReady(true);
      setLoading(false);
    };
    
    script.onerror = () => {
      console.error('Failed to load PayPal script');
      setLoading(false);
      if (onError) {
        onError(new Error('Failed to load PayPal script'));
      }
    };
    
    document.body.appendChild(script);
  };

  const renderPayPalButton = () => {
    if (!window.paypal || !paypalRef.current || !user) {
      console.log('Cannot render PayPal button:', { 
        paypal: !!window.paypal, 
        ref: !!paypalRef.current, 
        user: !!user 
      });
      return;
    }
    
    console.log('Rendering PayPal button for plan:', planId);
    paypalRef.current.innerHTML = '';
    
    try {
      window.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data: any, actions: any) {
          console.log('Creating subscription for plan:', planId);
          return actions.subscription.create({
            plan_id: planId
          });
        },
        onApprove: function(data: any, actions: any) {
          console.log('Subscription approved:', data.subscriptionID);
          if (onSuccess) {
            onSuccess(data.subscriptionID);
          }
        },
        onError: function(err: any) {
          console.error('PayPal subscription error:', err);
          if (onError) {
            onError(err);
          }
        }
      }).render(`#${containerId}`);
    } catch (error) {
      console.error('Error rendering PayPal button:', error);
      if (onError) {
        onError(error);
      }
    }
  };

  useEffect(() => {
    if (window.paypal) {
      console.log('PayPal already loaded');
      setIsReady(true);
    } else {
      loadPayPalScript();
    }
  }, []);

  useEffect(() => {
    if (isReady && user) {
      console.log('Ready to render PayPal button');
      renderPayPalButton();
    }
  }, [isReady, user, planId]);

  const handleAuthSuccess = () => {
    console.log('Auth successful, closing modal');
    setShowAuthModal(false);
  };

  const handleSubscribeClick = () => {
    console.log('Subscribe clicked, user:', !!user);
    if (!user) {
      setShowAuthModal(true);
    }
  };

  if (!user) {
    return (
      <>
        <Button 
          onClick={handleSubscribeClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
        >
          Subscribe Now
        </Button>
        <AccountCreationModal
          open={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleAuthSuccess}
          planType={planType}
          amount={planType === 'monthly' ? '$29.95' : '$249.95'}
        />
      </>
    );
  }

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-4">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading PayPal...</span>
      </div>
    );
  }

  return <div ref={paypalRef} id={containerId} className="paypal-button-container" />;
};

declare global {
  interface Window {
    paypal?: any;
  }
}

export default SubscriptionWithAuth;