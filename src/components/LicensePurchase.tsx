import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap } from 'lucide-react';
import PaymentWithAuth from './PaymentWithAuth';
import SubscriptionWithAuth from './SubscriptionWithAuth';
import AnnualPayPalButton from './AnnualPayPalButton';

const LicensePurchase: React.FC = () => {
  const plans = [
    {
      id: 'two-days',
      name: 'Weekend Pass',
      price: '$14.95',
      period: '48 hours',
      description: 'Perfect for a weekend at the track',
      features: [
        '6 analyses for 2 days',
        'Vehicle setup tracking',
        'Performance history',
        'Mobile app access'
      ],
      planType: 'two-days' as const,
      buttonColor: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      id: 'monthly',
      name: 'Pro Monthly',
      price: '$29.95',
      period: 'per month',
      description: 'Most popular for regular racers',
      features: [
        '20 suspension analyses',
        'Multiple vehicle management',
        'Detailed setup history',
        'Advanced recommendations',
        'Priority support'
      ],
      popular: true,
      planId: 'P-64T19396G9491191NNB7HJTQ',
      planType: 'monthly' as const,
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'annual',
      name: 'Pro Annual',
      price: '$249.95',
      period: 'per year',
      originalPrice: '$359.40',
      description: 'Best value - save 30%',
      features: [
        'Everything in Pro Monthly',
        'Save over $100 per year',
        'Advanced analytics',
        'Custom recommendations',
        'Priority feature requests'
      ],
      planType: 'annual' as const,
      useNewPayPal: true,
      buttonColor: 'bg-green-600 hover:bg-green-700'
    }
  ];

  const handlePaymentSuccess = () => {
    window.location.href = '/payment-success';
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
  };

  const handleSubscriptionSuccess = (subscriptionId: string) => {
    alert(`Subscription successful! ID: ${subscriptionId}`);
  };

  const handleSubscriptionError = (error: any) => {
    alert('Subscription failed. Please try again.');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card 
          key={plan.id}
          className={`relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${
            plan.popular ? 'border-2 border-blue-500 transform scale-105' : 'border border-gray-200'
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
                <Star className="h-4 w-4 mr-1 fill-current" />
                Most Popular
              </div>
            </div>
          )}
          
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
            <div className="mb-3">
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-2 text-lg">/{plan.period}</span>
              </div>
              {plan.originalPrice && (
                <div className="text-sm text-gray-500 line-through mt-1">
                  was {plan.originalPrice}/year
                </div>
              )}
            </div>
            <p className="text-gray-600 text-base">{plan.description}</p>
          </CardHeader>
          
          <CardContent className="pt-0">
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start text-gray-700">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
              {plan.useNewPayPal ? (
                <AnnualPayPalButton />
              ) : plan.planId ? (
                <SubscriptionWithAuth
                  planId={plan.planId}
                  planType={plan.planType as 'monthly' | 'annual'}
                  onSuccess={handleSubscriptionSuccess}
                  onError={handleSubscriptionError}
                />
              ) : (
                <PaymentWithAuth
                  amount={plan.price}
                  planType={plan.planType}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  buttonText="Get Started"
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LicensePurchase;