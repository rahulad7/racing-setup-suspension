import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown, Clock } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { useNavigate } from 'react-router-dom';

const ChoosePlan: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free-trial',
      name: 'Free Trial',
      price: '$0',
      duration: '1 Analysis',
      description: 'Try our suspension analysis once for free',
      features: [
        'One complete suspension analysis',
        'Basic setup recommendations',
        'Vehicle-specific results',
        '24-hour access'
      ],
      icon: <Zap className="h-6 w-6" />,
      popular: false,
      color: 'from-gray-400 to-gray-500'
    },
    {
      id: 'two-days',
      name: '2-Day Access',
      price: '$14.95',
      duration: '2 Days',
      description: 'Perfect for weekend track days',
      features: [
        'Unlimited analyses for 2 days',
        'Advanced setup recommendations',
        'Track-specific tuning',
        'Setup history tracking',
        'Email support'
      ],
      icon: <Clock className="h-6 w-6" />,
      popular: false,
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: '$29.95',
      duration: 'per month',
      description: 'For regular track enthusiasts',
      features: [
        'Unlimited analyses',
        'Premium setup recommendations',
        'Advanced tuning algorithms',
        'Setup comparison tools',
        'Priority email support',
        'Mobile app access'
      ],
      icon: <Star className="h-6 w-6" />,
      popular: true,
      color: 'from-green-400 to-green-500'
    },
    {
      id: 'annual',
      name: 'Annual Plan',
      price: '$299.95',
      duration: 'per year',
      description: 'Best value for serious racers',
      features: [
        'Everything in Monthly Plan',
        '2 months free',
        'Exclusive racing insights',
        'Advanced analytics',
        'Phone support',
        'Custom setup templates',
        'Team collaboration tools'
      ],
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Navigate to payment or setup page
    navigate(`/setup-choice?plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-black w-full">
      <AppHeader onShowLicenseModal={() => {}} />
      
      <div className="w-full px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From weekend warriors to professional racers, we have the perfect plan for your needs.
            Start with a free trial and upgrade when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative bg-black/80 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                plan.popular ? 'ring-2 ring-green-500/50' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-black">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4`}>
                  {plan.icon}
                </div>
                <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.duration}</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <Check className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-black font-semibold`}
                >
                  {plan.id === 'free-trial' ? 'Start Free Trial' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            All plans include our core suspension analysis engine and setup recommendations.
          </p>
          <p className="text-sm text-gray-500">
            Need help choosing? <button className="text-yellow-400 hover:text-yellow-300 underline">Contact our team</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;