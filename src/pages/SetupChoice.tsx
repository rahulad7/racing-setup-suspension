import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Settings, TrendingUp, Zap } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { useNavigate } from 'react-router-dom';

const SetupChoice: React.FC = () => {
  const navigate = useNavigate();

  const setupOptions = [
    {
      id: 'quick-setup',
      title: 'Quick Setup',
      description: 'Get basic suspension recommendations in minutes',
      icon: <Zap className="h-8 w-8 text-yellow-400" />,
      features: [
        'Basic suspension analysis',
        'Quick recommendations',
        'Essential setup data',
        'Perfect for beginners'
      ],
      buttonText: 'Start Quick Setup',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      id: 'comprehensive-setup',
      title: 'Comprehensive Setup',
      description: 'Full suspension analysis with detailed recommendations',
      icon: <Settings className="h-8 w-8 text-green-400" />,
      features: [
        'Complete suspension analysis',
        'Detailed recommendations',
        'Track-specific tuning',
        'Setup comparison tools',
        'Professional-grade insights'
      ],
      buttonText: 'Start Comprehensive Setup',
      color: 'from-green-400 to-green-500'
    },
    {
      id: 'advanced-tuning',
      title: 'Advanced Tuning',
      description: 'Expert-level setup optimization for experienced racers',
      icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
      features: [
        'Advanced tuning algorithms',
        'Fine-tuned recommendations',
        'Performance optimization',
        'Data-driven insights',
        'Setup history tracking'
      ],
      buttonText: 'Start Advanced Tuning',
      color: 'from-blue-400 to-blue-500'
    }
  ];

  const handleSetupChoice = (setupType: string) => {
    navigate(`/data-entry?setup=${setupType}`);
  };

  return (
    <div className="min-h-screen bg-black w-full">
      <AppHeader onShowLicenseModal={() => {}} />
      
      <div className="w-full px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl">
              <Car className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Choose Your Setup Type
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Select the level of analysis that best fits your needs and experience level.
            You can always upgrade to a more comprehensive analysis later.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {setupOptions.map((option) => (
            <Card 
              key={option.id}
              className="bg-black/80 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm"
              onClick={() => handleSetupChoice(option.id)}
            >
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  {option.icon}
                </div>
                <CardTitle className="text-2xl text-white mb-3">{option.title}</CardTitle>
                <p className="text-gray-400">{option.description}</p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-black font-semibold`}
                  onClick={() => handleSetupChoice(option.id)}
                >
                  {option.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Not sure which to choose? Start with Quick Setup and upgrade as needed.
          </p>
          <Button 
            variant="outline"
            className="border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800/50 hover:border-gray-500"
            onClick={() => navigate('/choose-plan')}
          >
            ← Back to Plans
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupChoice;