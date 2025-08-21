import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import MonthlyPayPalButton from '@/components/MonthlyPayPalButton';
import AnnualPayPalButton from '@/components/AnnualPayPalButton';
import { Check, X, Star, Zap, Trophy, Crown } from 'lucide-react';

const ChoosePlan: React.FC = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (planType: string) => {
    if (planType === 'weekend-pass') {
      // Redirect to PayPal for Weekend Pass
      window.open('https://www.paypal.com/ncp/payment/59Q7EQQZNZ6NG', '_blank');
    } else {
      navigate('/license', { state: { selectedPlan: planType } });
    }
  };

  const plans = [
    {
      name: 'Free Trial',
      price: '$0',
      period: '',
      description: 'Perfect for trying out our platform',
      icon: <Star className="w-8 h-8 text-blue-400" />,
      features: [
        { name: '3 Setup Analyses', included: true },
        { name: 'Basic Recommendations', included: true },
        { name: 'Advanced Analytics', included: false },

        { name: 'Priority Support', included: false }
      ],
      buttonText: 'Start Free Trial',
      buttonClass: 'bg-white text-gray-900 hover:bg-gray-100',
      popular: false
    },
    {
      name: 'Weekend Pass',
      price: '$14.95',
      period: '2 days',
      description: 'Perfect for race weekends',
      icon: <Zap className="w-8 h-8 text-green-400" />,
      features: [
        { name: '6 Analyses', included: true },
        { name: 'Advanced Recommendations', included: true },
        { name: 'Advanced Analytics', included: false },

        { name: 'Priority Support', included: false }
      ],
      buttonText: 'Get Weekend Pass',
      buttonClass: 'bg-green-600 hover:bg-green-700 text-white',
      popular: false
    },
    {
      name: 'Monthly Pro',
      price: '$29.95',
      period: '/month',
      description: 'Great for regular racers',
      icon: <Trophy className="w-8 h-8 text-blue-400" />,
      features: [
        { name: '20 Analyses', included: true },
        { name: 'Advanced Recommendations', included: true },
        { name: 'Advanced Analytics', included: true },

        { name: 'Priority Support', included: true }
      ],
      buttonText: 'Subscribe Monthly',
      buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
      popular: true
    },
    {
      name: 'Annual Pro',
      price: '$199.95',
      period: '/year',
      description: 'Best value for serious racers',
      icon: <Crown className="w-8 h-8 text-yellow-400" />,
      savings: 'Save $100',
      features: [
        { name: 'Unlimited Analyses', included: true },
        { name: 'Advanced Recommendations', included: true },
        { name: 'Advanced Analytics', included: true },

        { name: 'Priority Support', included: true }
      ],
      buttonText: 'Subscribe Annually',
      buttonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <AppHeader onShowLicenseModal={() => {}} />
      
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get the perfect setup analysis for your track/racing needs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative bg-white/10 backdrop-blur-sm border-gray-700 text-white transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1 text-sm font-medium">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-blue-400">{plan.price}</span>
                    {plan.period && <span className="text-gray-300 ml-1">{plan.period}</span>}
                  </div>
                  {plan.savings && (
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      {plan.savings}
                    </Badge>
                  )}
                  <p className="text-gray-300 text-sm mt-2">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-500 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.name === 'Monthly Pro' ? (
                    <MonthlyPayPalButton onSuccess={(subscriptionId) => {
                      alert(`Monthly subscription created: ${subscriptionId}`);
                    }} />
                  ) : plan.name === 'Annual Pro' ? (
                    <AnnualPayPalButton onSuccess={(subscriptionId) => {
                      alert(`Annual subscription created: ${subscriptionId}`);
                    }} />
                  ) : (
                    <Button
                      onClick={() => handlePlanSelect(plan.name.toLowerCase().replace(' ', '-'))}
                      className={`w-full font-semibold ${plan.buttonClass}`}
                    >
                      {plan.buttonText}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">
              All plans include comprehensive setup recommendations and analysis
            </p>
            <p className="text-sm text-gray-500">
              Cancel anytime • Secure payment processing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;