import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import AppLayout from '@/components/AppLayout';

const License: React.FC = () => {
  const plans = [
    {
      name: 'Free Trial',
      price: '$0',
      period: '7 days',
      description: 'Try our basic features',
      features: [
        '3 setups',
        'Basic analysis',
        'Priority support'
      ],
      buttonText: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Pro Monthly',
      price: '$29',
      period: 'per month',
      description: 'Perfect for regular racers',
      features: [
        'Unlimited setups',
        'Advanced analysis',
        'Priority support',
        'Track database access'
      ],
      buttonText: 'Choose Pro',
      popular: true
    },
    {
      name: 'Pro Annual',
      price: '$299',
      period: 'per year',
      description: 'Best value for serious racers',
      features: [
        'Everything in Pro',
        '2 months free',
        'Premium support',
        'Early access features'
      ],
      buttonText: 'Choose Annual',
      popular: false
    }
  ];

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get the tools you need to optimize your race car setup and dominate the track
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative bg-gray-800/50 border-gray-700 backdrop-blur-sm ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="text-gray-300">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    } text-white font-medium`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default License;