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

export const suspensionDataPoints: DataPoint[] = [
  // Enhanced Suspension Data Points
  { id: 'shock-preload-fl', category: 'Suspensions', name: 'Shock Preload FL', description: 'Shock preload setting front left', required: false },
  { id: 'shock-preload-fr', category: 'Suspensions', name: 'Shock Preload FR', description: 'Shock preload setting front right', required: false },
  { id: 'shock-preload-rl', category: 'Suspensions', name: 'Shock Preload RL', description: 'Shock preload setting rear left', required: false },
  { id: 'shock-preload-rr', category: 'Suspensions', name: 'Shock Preload RR', description: 'Shock preload setting rear right', required: false },
  { id: 'shock-travel-front', category: 'Suspensions', name: 'Front Shock Travel', description: 'Available shock travel front', required: false },
  { id: 'shock-travel-rear', category: 'Suspensions', name: 'Rear Shock Travel', description: 'Available shock travel rear', required: false },
  { id: 'bump-stop-gap-fl', category: 'Suspensions', name: 'Bump Stop Gap FL', description: 'Bump stop gap front left', required: false },
  { id: 'bump-stop-gap-fr', category: 'Suspensions', name: 'Bump Stop Gap FR', description: 'Bump stop gap front right', required: false },
  { id: 'bump-stop-gap-rl', category: 'Suspensions', name: 'Bump Stop Gap RL', description: 'Bump stop gap rear left', required: false },
  { id: 'bump-stop-gap-rr', category: 'Suspensions', name: 'Bump Stop Gap RR', description: 'Bump stop gap rear right', required: false },
  { id: 'spring-perch-height-fl', category: 'Suspensions', name: 'Spring Perch Height FL', description: 'Spring perch height front left', required: false },
  { id: 'spring-perch-height-fr', category: 'Suspensions', name: 'Spring Perch Height FR', description: 'Spring perch height front right', required: false },
  { id: 'spring-perch-height-rl', category: 'Suspensions', name: 'Spring Perch Height RL', description: 'Spring perch height rear left', required: false },
  { id: 'spring-perch-height-rr', category: 'Suspensions', name: 'Spring Perch Height RR', description: 'Spring perch height rear right', required: false },
  { id: 'helper-springs', category: 'Suspensions', name: 'Helper Springs', description: 'Helper spring configuration', required: false },
  { id: 'anti-roll-bar-links', category: 'Suspensions', name: 'Anti-Roll Bar Links', description: 'Anti-roll bar link specifications', required: false },
  
  // Enhanced Sway Bar Data Points
  { id: 'front-sway-diameter', category: 'Sway bars', name: 'Front Sway Bar Diameter', description: 'Front sway bar diameter in mm', required: false },
  { id: 'rear-sway-diameter', category: 'Sway bars', name: 'Rear Sway Bar Diameter', description: 'Rear sway bar diameter in mm', required: false },
  { id: 'front-sway-stiffness', category: 'Sway bars', name: 'Front Sway Bar Stiffness', description: 'Front sway bar stiffness setting', required: false },
  { id: 'rear-sway-stiffness', category: 'Sway bars', name: 'Rear Sway Bar Stiffness', description: 'Rear sway bar stiffness setting', required: false },
  { id: 'sway-end-links-front', category: 'Sway bars', name: 'Front Sway End Links', description: 'Front sway bar end link specifications', required: false },
  { id: 'sway-end-links-rear', category: 'Sway bars', name: 'Rear Sway End Links', description: 'Rear sway bar end link specifications', required: false },
  { id: 'sway-bushings-front', category: 'Sway bars', name: 'Front Sway Bushings', description: 'Front sway bar bushing type and condition', required: false },
  { id: 'sway-bushings-rear', category: 'Sway bars', name: 'Rear Sway Bushings', description: 'Rear sway bar bushing type and condition', required: false },
  { id: 'sway-mounting-points', category: 'Sway bars', name: 'Sway Bar Mounting Points', description: 'Sway bar mounting point configuration', required: false },
  
  // Enhanced Aero Data Points
  { id: 'front-wing-angle', category: 'Aero', name: 'Front Wing Angle', description: 'Front wing angle of attack', required: false },
  { id: 'rear-wing-angle', category: 'Aero', name: 'Rear Wing Angle', description: 'Rear wing angle of attack', required: false },
  { id: 'downforce-front', category: 'Aero', name: 'Front Downforce', description: 'Measured front downforce', required: false },
  { id: 'downforce-rear', category: 'Aero', name: 'Rear Downforce', description: 'Measured rear downforce', required: false },
  { id: 'splitter-height', category: 'Aero', name: 'Splitter Height', description: 'Front splitter height from ground', required: false },
  { id: 'splitter-extension', category: 'Aero', name: 'Splitter Extension', description: 'Splitter extension length', required: false },
  { id: 'diffuser-angle', category: 'Aero', name: 'Diffuser Angle', description: 'Rear diffuser angle', required: false },
  { id: 'canards-installed', category: 'Aero', name: 'Canards Installed', description: 'Front canard configuration', required: false },
  { id: 'side-skirts', category: 'Aero', name: 'Side Skirts', description: 'Side skirt configuration', required: false },
  { id: 'undertray-coverage', category: 'Aero', name: 'Undertray Coverage', description: 'Undertray coverage percentage', required: false },
  { id: 'cooling-ducts', category: 'Aero', name: 'Cooling Ducts', description: 'Cooling duct configuration', required: false },
  { id: 'brake-ducts', category: 'Aero', name: 'Brake Ducts', description: 'Brake cooling duct setup', required: false }
];

interface SuspensionDataPointsProps {
  dataPoints: DataPoint[];
}

const SuspensionDataPoints: React.FC<SuspensionDataPointsProps> = ({ dataPoints }) => {
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

export default SuspensionDataPoints;