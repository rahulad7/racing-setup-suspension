import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Gift } from 'lucide-react';
import { useLicense } from '@/contexts/LicenseContext';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  showFreeOption?: boolean;
}

const LicenseModal: React.FC<LicenseModalProps> = ({ isOpen, onClose, showFreeOption = false }) => {
  const { purchaseLicense, useFreeAdvice, canUseFreeAdvice } = useLicense();
  const [error, setError] = useState('');

  const handleFreeAdvice = () => {
    useFreeAdvice();
    onClose();
  };

  const plans = [
    {
      type: 'two-days',
      name: 'Two Days',
      price: '$14.95',
      period: '48 hours',
      description: 'Perfect for a weekend at the track',
      popular: false,
      features: [
        'Unlimited analysis for 2 days',
        'Vehicle setup tracking',
        'Performance history',
        'Mobile app access',
        'Basic support'
      ]
    },
    {
      type: 'monthly',
      name: 'Monthly',
      price: '$9.99',
      period: 'per month',
      description: 'Great for regular track enthusiasts',
      popular: true,
      features: [
        'Unlimited suspension analysis',
        'Multiple vehicle management',
        'Detailed setup history',
        'Advanced recommendations',
        'Performance tracking',
        'Priority support'
      ]
    },
    {
      type: 'annual',
      name: 'Annual',
      price: '$249.95',
      period: 'per year',
      description: 'Best value for serious racers',
      popular: false,
      features: [
        'Everything in Monthly',
        'Save over 70% vs monthly',
        'Advanced analytics',
        'Custom setup recommendations',
        'Priority feature requests'
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-white">
            Choose Your Plan
          </DialogTitle>
        </DialogHeader>
        
        {showFreeOption && canUseFreeAdvice() && (
          <Card className="border-2 border-green-500 bg-green-900/20 mb-4">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-green-600 rounded-full w-fit">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl text-white">Free Trial</CardTitle>
              <div className="text-3xl font-bold text-white">$0</div>
              <p className="text-sm text-gray-400">One analysis</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-300">One free suspension analysis</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-300">Basic recommendations</span>
                </li>
              </ul>
              <Button onClick={handleFreeAdvice} className="w-full bg-green-600 hover:bg-green-700">
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.type} className={`relative ${plan.popular ? 'border-blue-500 bg-gray-800/50 scale-105' : 'border-gray-700 bg-gray-900/50'}`}>
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
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-300 text-sm">
                      <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Contact for Payment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 text-center mt-4">
          Contact us for secure payment processing. All plans include mobile app access.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseModal;