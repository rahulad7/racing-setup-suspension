import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Settings, History, Target, BarChart3, Users } from 'lucide-react';

const WebsiteFeatures: React.FC = () => {
  const features = [
    {
      icon: Car,
      title: 'Vehicle Management',
      description: 'Track multiple vehicles with detailed specifications and setup history'
    },
    {
      icon: Settings,
      title: 'Suspension Analysis',
      description: 'Advanced algorithms analyze your handling issues and provide specific recommendations'
    },
    {
      icon: History,
      title: 'Session History',
      description: 'Keep detailed records of all track sessions and setup changes'
    },
    {
      icon: BarChart3,
      title: 'Performance Tracking',
      description: 'Monitor improvements and track your progress over time'
    },
    {
      icon: Target,
      title: 'Vehicle Specific Results',
      description: 'More than 25 data points, specific to your car'
    },
    {
      icon: Users,
      title: 'For Racers, By Racers',
      description: 'Developed by racers with real world experience for authentic racing insights'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive tools for suspension setup, vehicle management, and performance tracking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6 text-center">
                  <IconComponent className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WebsiteFeatures;