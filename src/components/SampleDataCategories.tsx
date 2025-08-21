import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Gauge, Car, Settings, BarChart3, Wind } from 'lucide-react';

const SampleDataCategories: React.FC = () => {
  const categories = [
    {
      icon: Car,
      title: 'Tires',
      color: 'text-blue-500',
      data: {
        'Stock Tires': 'No',
        'Front Size': '225/45R17',
        'Rear Size': '255/40R17',
        'Tire Brand': 'Toyo',
        'Tire Model': 'R888R',
        'Front Left Pressure': '32 psi',
        'Front Right Pressure': '32 psi',
        'Rear Left Pressure': '30 psi',
        'Rear Right Pressure': '30 psi'
      }
    },
    {
      icon: BarChart3,
      title: 'Corner Balanced',
      color: 'text-green-500',
      data: {
        'Corner Balanced': 'Yes',
        'Car Weight': '3200 lbs',
        'Cross Weight %': '52.5%'
      }
    },
    {
      icon: Gauge,
      title: 'Alignment',
      color: 'text-purple-500',
      data: {
        'Stock Alignment': 'No',
        'Front Toe': '-0.2°',
        'Front Camber': '-2.5°',
        'Front Caster': '6.0°',
        'Rear Toe': '0.1°',
        'Rear Camber': '-1.8°'
      }
    },
    {
      icon: Settings,
      title: 'Suspension',
      color: 'text-orange-500',
      data: {
        'Stock Suspension': 'No',
        'Shock Brand': 'Ohlins',
        'Shock Model': 'R&T',
        'Shock Type': '3-Way Adjustable',
        'HS Compression': '8 clicks',
        'LS Compression': '12 clicks',
        'Rebound': '10 clicks',
        'Front Spring Rate': '8K lb/in',
        'Rear Spring Rate': '10K lb/in',
        'Front Left Height': '4.5 in',
        'Front Right Height': '4.5 in',
        'Rear Left Height': '4.8 in',
        'Rear Right Height': '4.8 in'
      }
    },
    {
      icon: Wrench,
      title: 'Sway Bars',
      color: 'text-red-500',
      data: {
        'Stock Sway Bars': 'No',
        'Front Sway Bar': 'Yes',
        'Rear Sway Bar': 'Yes',
        'Front Brand': 'Hotchkis',
        'Front Model': 'Sport',
        'Front Setting': 'Position 3',
        'Rear Brand': 'Hotchkis',
        'Rear Model': 'Sport',
        'Rear Setting': 'Position 2'
      }
    },
    {
      icon: Wind,
      title: 'Aero',
      color: 'text-cyan-500',
      data: {
        'Stock Aerodynamics': 'No',
        'Wing': 'APR GTC-300',
        'Splitter': 'Custom Carbon',
        'Canards': 'APR Formula GT3',
        'Undertray': 'Full flat bottom',
        'Diffuser': '7-element rear'
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => {
        const IconComponent = category.icon;
        return (
          <Card key={index} className="bg-gray-800/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <IconComponent className={`h-5 w-5 ${category.color}`} />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(category.data).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{key}</span>
                  <Badge variant="secondary" className="text-xs">{value}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SampleDataCategories;