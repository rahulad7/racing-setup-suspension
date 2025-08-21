import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from 'lucide-react';

interface DataPoint {
  id: string;
  category: string;
  name: string;
  description: string;
  required: boolean;
  completed?: boolean;
}

export const extendedDataPoints: DataPoint[] = [
  // Enhanced Tire Data Points
  { id: 'tire-pressure-cold-fl', category: 'Tires', name: 'Cold Tire Pressure FL', description: 'Cold tire pressure front left', required: false },
  { id: 'tire-pressure-cold-fr', category: 'Tires', name: 'Cold Tire Pressure FR', description: 'Cold tire pressure front right', required: false },
  { id: 'tire-pressure-cold-rl', category: 'Tires', name: 'Cold Tire Pressure RL', description: 'Cold tire pressure rear left', required: false },
  { id: 'tire-pressure-cold-rr', category: 'Tires', name: 'Cold Tire Pressure RR', description: 'Cold tire pressure rear right', required: false },
  { id: 'tire-pressure-hot-fl', category: 'Tires', name: 'Hot Tire Pressure FL', description: 'Hot tire pressure front left', required: false },
  { id: 'tire-pressure-hot-fr', category: 'Tires', name: 'Hot Tire Pressure FR', description: 'Hot tire pressure front right', required: false },
  { id: 'tire-pressure-hot-rl', category: 'Tires', name: 'Hot Tire Pressure RL', description: 'Hot tire pressure rear left', required: false },
  { id: 'tire-pressure-hot-rr', category: 'Tires', name: 'Hot Tire Pressure RR', description: 'Hot tire pressure rear right', required: false },
  { id: 'tire-temp-inside-fl', category: 'Tires', name: 'Tire Temp Inside FL', description: 'Tire temperature inside edge front left', required: false },
  { id: 'tire-temp-middle-fl', category: 'Tires', name: 'Tire Temp Middle FL', description: 'Tire temperature middle front left', required: false },
  { id: 'tire-temp-outside-fl', category: 'Tires', name: 'Tire Temp Outside FL', description: 'Tire temperature outside edge front left', required: false },
  { id: 'tire-temp-inside-fr', category: 'Tires', name: 'Tire Temp Inside FR', description: 'Tire temperature inside edge front right', required: false },
  { id: 'tire-temp-middle-fr', category: 'Tires', name: 'Tire Temp Middle FR', description: 'Tire temperature middle front right', required: false },
  { id: 'tire-temp-outside-fr', category: 'Tires', name: 'Tire Temp Outside FR', description: 'Tire temperature outside edge front right', required: false },
  { id: 'tire-temp-inside-rl', category: 'Tires', name: 'Tire Temp Inside RL', description: 'Tire temperature inside edge rear left', required: false },
  { id: 'tire-temp-middle-rl', category: 'Tires', name: 'Tire Temp Middle RL', description: 'Tire temperature middle rear left', required: false },
  { id: 'tire-temp-outside-rl', category: 'Tires', name: 'Tire Temp Outside RL', description: 'Tire temperature outside edge rear left', required: false },
  { id: 'tire-temp-inside-rr', category: 'Tires', name: 'Tire Temp Inside RR', description: 'Tire temperature inside edge rear right', required: false },
  { id: 'tire-temp-middle-rr', category: 'Tires', name: 'Tire Temp Middle RR', description: 'Tire temperature middle rear right', required: false },
  { id: 'tire-temp-outside-rr', category: 'Tires', name: 'Tire Temp Outside RR', description: 'Tire temperature outside edge rear right', required: false },
  { id: 'tire-compound', category: 'Tires', name: 'Tire Compound', description: 'Tire compound (soft, medium, hard)', required: false },
  { id: 'tire-tread-depth-fl', category: 'Tires', name: 'Tread Depth FL', description: 'Tread depth front left', required: false },
  { id: 'tire-tread-depth-fr', category: 'Tires', name: 'Tread Depth FR', description: 'Tread depth front right', required: false },
  { id: 'tire-tread-depth-rl', category: 'Tires', name: 'Tread Depth RL', description: 'Tread depth rear left', required: false },
  { id: 'tire-tread-depth-rr', category: 'Tires', name: 'Tread Depth RR', description: 'Tread depth rear right', required: false },
  
  // Enhanced Corner Balance Data Points
  { id: 'corner-weight-fl', category: 'Corner Balanced', name: 'Corner Weight FL', description: 'Corner weight front left', required: false },
  { id: 'corner-weight-fr', category: 'Corner Balanced', name: 'Corner Weight FR', description: 'Corner weight front right', required: false },
  { id: 'corner-weight-rl', category: 'Corner Balanced', name: 'Corner Weight RL', description: 'Corner weight rear left', required: false },
  { id: 'corner-weight-rr', category: 'Corner Balanced', name: 'Corner Weight RR', description: 'Corner weight rear right', required: false },
  { id: 'ballast-weight', category: 'Corner Balanced', name: 'Ballast Weight', description: 'Amount of ballast added', required: false },
  { id: 'ballast-location', category: 'Corner Balanced', name: 'Ballast Location', description: 'Where ballast is positioned', required: false },
  { id: 'weight-distribution-front', category: 'Corner Balanced', name: 'Front Weight Distribution', description: 'Front axle weight distribution percentage', required: false },
  { id: 'weight-distribution-rear', category: 'Corner Balanced', name: 'Rear Weight Distribution', description: 'Rear axle weight distribution percentage', required: false },
  { id: 'left-side-weight', category: 'Corner Balanced', name: 'Left Side Weight', description: 'Total left side weight', required: false },
  { id: 'right-side-weight', category: 'Corner Balanced', name: 'Right Side Weight', description: 'Total right side weight', required: false },
  
  // Enhanced Alignment Data Points
  { id: 'front-toe-left', category: 'Alignment', name: 'Front Toe Left', description: 'Individual front left toe measurement', required: false },
  { id: 'front-toe-right', category: 'Alignment', name: 'Front Toe Right', description: 'Individual front right toe measurement', required: false },
  { id: 'rear-toe-left', category: 'Alignment', name: 'Rear Toe Left', description: 'Individual rear left toe measurement', required: false },
  { id: 'rear-toe-right', category: 'Alignment', name: 'Rear Toe Right', description: 'Individual rear right toe measurement', required: false },
  { id: 'front-camber-left', category: 'Alignment', name: 'Front Camber Left', description: 'Individual front left camber measurement', required: false },
  { id: 'front-camber-right', category: 'Alignment', name: 'Front Camber Right', description: 'Individual front right camber measurement', required: false },
  { id: 'rear-camber-left', category: 'Alignment', name: 'Rear Camber Left', description: 'Individual rear left camber measurement', required: false },
  { id: 'rear-camber-right', category: 'Alignment', name: 'Rear Camber Right', description: 'Individual rear right camber measurement', required: false },
  { id: 'front-caster-left', category: 'Alignment', name: 'Front Caster Left', description: 'Individual front left caster measurement', required: false },
  { id: 'front-caster-right', category: 'Alignment', name: 'Front Caster Right', description: 'Individual front right caster measurement', required: false },
  { id: 'cross-camber', category: 'Alignment', name: 'Cross Camber', description: 'Cross camber measurements', required: false },
  { id: 'cross-caster', category: 'Alignment', name: 'Cross Caster', description: 'Cross caster measurements', required: false },
  { id: 'ackermann', category: 'Alignment', name: 'Ackermann', description: 'Ackermann steering geometry', required: false },
  { id: 'bump-steer', category: 'Alignment', name: 'Bump Steer', description: 'Bump steer measurements', required: false },
  { id: 'alignment-shop', category: 'Alignment', name: 'Alignment Shop', description: 'Which shop performed alignment', required: false },
  { id: 'ride-height-fl', category: 'Alignment', name: 'Ride Height FL', description: 'Ride height front left jack point', required: false },
  { id: 'ride-height-fr', category: 'Alignment', name: 'Ride Height FR', description: 'Ride height front right jack point', required: false },
  { id: 'ride-height-rl', category: 'Alignment', name: 'Ride Height RL', description: 'Ride height rear left jack point', required: false },
  { id: 'ride-height-rr', category: 'Alignment', name: 'Ride Height RR', description: 'Ride height rear right jack point', required: false }
];

interface ExtendedDataPointsProps {
  dataPoints: DataPoint[];
}

const ExtendedDataPoints: React.FC<ExtendedDataPointsProps> = ({ dataPoints }) => {
  return (
    <div className="grid gap-4">
      {dataPoints.map(point => (
        <div key={point.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-700/30">
          <div className="mt-1">
            {point.completed ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Circle className="h-4 w-4 text-gray-500" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-white">{point.name}</h4>
              {point.required && (
                <Badge variant="destructive" size="sm">Required</Badge>
              )}
            </div>
            <p className="text-sm text-gray-400">{point.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExtendedDataPoints;