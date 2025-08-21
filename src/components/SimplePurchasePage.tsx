import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import Logo from '@/components/Logo';
import PaymentWithAuth from './PaymentWithAuth';
import AnnualPayPalButton from './AnnualPayPalButton';

const SimplePurchasePage: React.FC = () => {
  const plans = [
    {
      id: 'two-days',
      name: 'Two Days',
      price: '$14.95',
      period: '48 hours',
      description: 'Perfect for a weekend at the track',
      features: [
        '6 analyses for 2 days',
        'Vehicle setup tracking',
        'Performance history',
        'Mobile app access',
        'Basic support'
      ],
      planType: 'two-days' as const
    },
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$29.95',
      period: 'per month',
      description: 'Great for regular track enthusiasts',
      features: [
        '20 suspension analyses',
        'Multiple vehicle management',
        'Detailed setup history',
        'Advanced recommendations',
        'Performance tracking',
        'Priority support'
      ],
      popular: true,
      planType: 'monthly' as const
    },
    {
      id: 'annual',
      name: 'Annual',
      price: '$249.95',
      period: 'per year',
      description: 'Best value for serious racers',
      features: [
        'Everything in Monthly',
        'Save over 70% vs monthly',
        'Advanced analytics',
        'Custom setup recommendations',
        'Priority feature requests'
      ],
      planType: 'annual' as const,
      useNewPayPal: true
    }
  ];

  const handlePaymentSuccess = () => {
    console.log('Payment successful');
    window.location.href = '/payment-success';
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    alert(`Payment failed: ${error}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Create an account and get instant access to professional suspension analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${plan.popular ? 'border-blue-500 bg-gray-800/50 scale-105' : 'border-gray-700 bg-gray-900/50'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-white">{plan.name}</CardTitle>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-1 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-gray-300 text-sm">
                      <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {plan.useNewPayPal ? (
                  <AnnualPayPalButton />
                ) : (
                  <PaymentWithAuth
                    amount={plan.price}
                    planType={plan.planType}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    buttonText="Get Started Now"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-4">
            Secure PayPal payment processing. Create an account to manage licenses across devices.
          </p>
          <p className="text-gray-500 text-xs">
            Questions? Contact support for assistance with your purchase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimplePurchasePage;