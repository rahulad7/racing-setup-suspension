import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    paypal?: any;
    paypalScriptLoaded?: boolean;
    paypalScriptLoading?: boolean;
  }
}

interface MonthlyPayPalButtonProps {
  onSuccess?: (subscriptionId: string) => void;
}

const MonthlyPayPalButton: React.FC<MonthlyPayPalButtonProps> = ({ onSuccess }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonId = 'monthly-paypal-button';

  useEffect(() => {
    const renderButton = () => {
      if (window.paypal && containerRef.current) {
        containerRef.current.innerHTML = '';
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: (data: any, actions: any) => {
            return actions.subscription.create({
              plan_id: 'P-64T19396G9491191NNB7HJTQ'
            });
          },
          onApprove: (data: any) => {
            if (onSuccess) {
              onSuccess(data.subscriptionID);
            } else {
              alert(`Monthly subscription created: ${data.subscriptionID}`);
            }
          }
        }).render(containerRef.current);
      }
    };

    const loadScript = () => {
      if (window.paypalScriptLoading) {
        const checkScript = setInterval(() => {
          if (window.paypalScriptLoaded) {
            clearInterval(checkScript);
            renderButton();
          }
        }, 100);
        return;
      }

      window.paypalScriptLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AdCUERrnyda5DkPLAE1pWeoAwh7xFCJuILuT7X1PonRmzpIoGbXfcd-E7kl8EMQj80DOrLYQtBELj-yq&vault=true&intent=subscription';
      script.onload = () => {
        window.paypalScriptLoaded = true;
        window.paypalScriptLoading = false;
        renderButton();
      };
      document.head.appendChild(script);
    };

    if (window.paypalScriptLoaded) {
      renderButton();
    } else {
      loadScript();
    }
  }, [onSuccess]);

  return <div ref={containerRef} id={buttonId}></div>;
};

export default MonthlyPayPalButton;