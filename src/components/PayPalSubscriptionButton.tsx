import React, { useEffect, useRef } from 'react';

interface PayPalSubscriptionButtonProps {
  planId: string;
  planType: 'monthly' | 'annual';
  onSuccess?: (subscriptionId: string) => void;
  onError?: (error: any) => void;
}

const PayPalSubscriptionButton: React.FC<PayPalSubscriptionButtonProps> = ({
  planId,
  planType,
  onSuccess,
  onError
}) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);
  const containerId = `paypal-button-container-${planId}`;

  useEffect(() => {
    const loadPayPalScript = () => {
      if (scriptLoaded.current) return;
      
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AdCUERrnyda5DkPLAE1pWeoAwh7xFCJuILuT7X1PonRmzpIoGbXfcd-E7kl8EMQj80DOrLYQtBELj-yq&vault=true&intent=subscription';
      script.setAttribute('data-sdk-integration-source', 'button-factory');
      
      script.onload = () => {
        scriptLoaded.current = true;
        renderPayPalButton();
      };
      
      document.body.appendChild(script);
    };

    const renderPayPalButton = () => {
      if (!window.paypal || !paypalRef.current) return;
      
      // Clear any existing buttons
      paypalRef.current.innerHTML = '';
      
      window.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data: any, actions: any) {
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
    };

    if (window.paypal) {
      renderPayPalButton();
    } else {
      loadPayPalScript();
    }
  }, [planId, planType, containerId, onSuccess, onError]);

  return <div ref={paypalRef} id={containerId} className="paypal-button-container" />;
};

declare global {
  interface Window {
    paypal?: any;
  }
}

export default PayPalSubscriptionButton;