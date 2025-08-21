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
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      features: [
        'Basic suspension analysis',
        'Quick recommendations',
        'Essential setup data',
        'Perfect for beginners'
      ],
      buttonText: 'Start Quick Setup',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'comprehensive-setup',
      title: 'Comprehensive Setup',
      description: 'Full suspension analysis with detailed recommendations',
      icon: <Settings className="h-8 w-8 text-purple-500" />,
      features: [
        'Complete suspension analysis',
        'Detailed recommendations',
        'Track-specific tuning',
        'Setup comparison tools',
        'Professional-grade insights'
      ],
      buttonText: 'Start Comprehensive Setup',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'advanced-tuning',
      title: 'Advanced Tuning',
      description: 'Expert-level setup optimization for experienced racers',
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      features: [
        'Advanced tuning algorithms',
        'Fine-tuned recommendations',
        'Performance optimization',
        'Data-driven insights',
        'Setup history tracking'
      ],
      buttonText: 'Start Advanced Tuning',
      color: 'from-green-500 to-green-600'
    }
  ];

  const handleSetupChoice = (setupType: string) => {
    navigate(`/data-entry?setup=${setupType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 w-full">
      <AppHeader onShowLicenseModal={() => {}} />
      
      <div className="w-full px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Car className="h-8 w-8 text-white" />
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
              className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 cursor-pointer"
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
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-white font-semibold`}
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
            className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
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