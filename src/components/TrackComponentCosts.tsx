import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Zap, TrendingUp } from 'lucide-react';

const TrackComponentCosts: React.FC = () => {
  const components = [
    {
      category: 'Suspension',
      icon: <Zap className="h-5 w-5" />,
      items: [
        { name: 'Coilovers (Entry)', cost: '$800-2,000', impact: 'High' },
        { name: 'Coilovers (Pro)', cost: '$2,000-5,000', impact: 'Very High' },
        { name: 'Sway Bars', cost: '$200-600', impact: 'Medium' },
        { name: 'Strut Braces', cost: '$150-400', impact: 'Low' }
      ]
    },
    {
      category: 'Brakes',
      icon: <TrendingUp className="h-5 w-5" />,
      items: [
        { name: 'Brake Pads (Track)', cost: '$100-300', impact: 'High' },
        { name: 'Brake Rotors', cost: '$200-800', impact: 'High' },
        { name: 'Brake Lines', cost: '$80-200', impact: 'Medium' },
        { name: 'Big Brake Kit', cost: '$1,500-4,000', impact: 'Very High' }
      ]
    },
    {
      category: 'Tires & Wheels',
      icon: <DollarSign className="h-5 w-5" />,
      items: [
        { name: 'Track Tires (Set)', cost: '$600-1,500', impact: 'Very High' },
        { name: 'Lightweight Wheels', cost: '$800-2,500', impact: 'Medium' },
        { name: 'Tire Pressure Monitor', cost: '$200-500', impact: 'Low' }
      ]
    },
    {
      category: 'Aerodynamics',
      icon: <Zap className="h-5 w-5" />,
      items: [
        { name: 'Front Splitter', cost: '$300-1,000', impact: 'Medium' },
        { name: 'Rear Wing', cost: '$500-2,000', impact: 'High' },
        { name: 'Diffuser', cost: '$400-1,500', impact: 'Medium' },
        { name: 'Side Skirts', cost: '$200-800', impact: 'Low' }
      ]
    },
    {
      category: 'Engine & Drivetrain',
      icon: <TrendingUp className="h-5 w-5" />,
      items: [
        { name: 'Cold Air Intake', cost: '$200-600', impact: 'Low' },
        { name: 'Exhaust System', cost: '$500-2,000', impact: 'Medium' },
        { name: 'ECU Tune', cost: '$400-1,200', impact: 'High' },
        { name: 'Turbo/Supercharger', cost: '$3,000-8,000', impact: 'Very High' }
      ]
    },
    {
      category: 'Safety & Interior',
      icon: <DollarSign className="h-5 w-5" />,
      items: [
        { name: 'Roll Cage', cost: '$1,500-4,000', impact: 'Safety' },
        { name: 'Racing Seat', cost: '$300-1,500', impact: 'Medium' },
        { name: 'Harness (5-point)', cost: '$150-400', impact: 'Safety' },
        { name: 'Fire Extinguisher', cost: '$100-300', impact: 'Safety' }
      ]
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Very High': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      case 'Safety': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Track Performance Upgrade Costs
          </h2>
        </div>

        {/* Smart Upgrade Strategy Section */}
        <div className="mb-12">
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Smart Upgrade Strategy
            </h3>
            <p className="text-gray-300 mb-6 text-center">
              Our analysis prioritizes upgrades based on your specific suspension setup and track performance goals. 
              Focus your budget on modifications that deliver the biggest impact for your driving style.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-green-400 font-semibold">High Impact</div>
                <div className="text-sm text-gray-300">Maximum performance gain</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-yellow-400 font-semibold">Medium Impact</div>
                <div className="text-sm text-gray-300">Noticeable improvement</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-blue-400 font-semibold">Safety Focus</div>
                <div className="text-sm text-gray-300">Essential for track use</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((category, index) => (
            <Card key={index} className="border-gray-700 bg-gray-800/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  {category.icon}
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="p-3 rounded bg-gray-700/30">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium text-white text-left flex-1">
                          {item.name}
                        </div>
                        <Badge className={`${getImpactColor(item.impact)} text-white text-xs ml-2`}>
                          {item.impact}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400 text-center">
                        {item.cost}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackComponentCosts;