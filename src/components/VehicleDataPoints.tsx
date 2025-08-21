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

export const vehicleDataPoints: DataPoint[] = [
  // Vehicle Data Points
  { id: 'vehicle-make', category: 'Vehicle', name: 'Vehicle Make', description: 'Vehicle manufacturer', required: true },
  { id: 'vehicle-model', category: 'Vehicle', name: 'Vehicle Model', description: 'Vehicle model name', required: true },
  { id: 'vehicle-year', category: 'Vehicle', name: 'Vehicle Year', description: 'Vehicle model year', required: true },
  { id: 'engine-type', category: 'Vehicle', name: 'Engine Type', description: 'Engine configuration and displacement', required: false },
  { id: 'drivetrain', category: 'Vehicle', name: 'Drivetrain', description: 'FWD, RWD, or AWD configuration', required: false },
  { id: 'transmission', category: 'Vehicle', name: 'Transmission', description: 'Manual or automatic transmission type', required: false },
  { id: 'wheelbase', category: 'Vehicle', name: 'Wheelbase', description: 'Vehicle wheelbase measurement', required: false },
  { id: 'track-width-front', category: 'Vehicle', name: 'Front Track Width', description: 'Front track width measurement', required: false },
  { id: 'track-width-rear', category: 'Vehicle', name: 'Rear Track Width', description: 'Rear track width measurement', required: false },
  { id: 'curb-weight', category: 'Vehicle', name: 'Curb Weight', description: 'Vehicle curb weight', required: false },
  
  // Track Data Points
  { id: 'track-name', category: 'Track', name: 'Track Name', description: 'Name of the racing circuit', required: true },
  { id: 'track-configuration', category: 'Track', name: 'Track Configuration', description: 'Track layout configuration', required: false },
  { id: 'track-length', category: 'Track', name: 'Track Length', description: 'Track length in miles or kilometers', required: false },
  { id: 'track-surface', category: 'Track', name: 'Track Surface', description: 'Track surface type and condition', required: false },
  { id: 'ambient-temperature', category: 'Track', name: 'Ambient Temperature', description: 'Air temperature during session', required: false },
  { id: 'track-temperature', category: 'Track', name: 'Track Temperature', description: 'Track surface temperature', required: false },
  { id: 'humidity', category: 'Track', name: 'Humidity', description: 'Relative humidity percentage', required: false },
  { id: 'wind-speed', category: 'Track', name: 'Wind Speed', description: 'Wind speed and direction', required: false },
  { id: 'weather-conditions', category: 'Track', name: 'Weather Conditions', description: 'Overall weather conditions', required: false },
  { id: 'track-grip-level', category: 'Track', name: 'Track Grip Level', description: 'Subjective track grip assessment', required: false },
  
  // Driver Data Points
  { id: 'driver-name', category: 'Driver', name: 'Driver Name', description: 'Primary driver name', required: false },
  { id: 'driver-weight', category: 'Driver', name: 'Driver Weight', description: 'Driver weight for setup calculations', required: false },
  { id: 'driver-experience', category: 'Driver', name: 'Driver Experience', description: 'Years of racing experience', required: false },
  { id: 'driving-style', category: 'Driver', name: 'Driving Style', description: 'Aggressive, smooth, or balanced driving style', required: false },
  { id: 'preferred-balance', category: 'Driver', name: 'Preferred Balance', description: 'Oversteer, understeer, or neutral preference', required: false },
  { id: 'braking-preference', category: 'Driver', name: 'Braking Preference', description: 'Early, late, or trail braking preference', required: false },
  { id: 'feedback-quality', category: 'Driver', name: 'Feedback Quality', description: 'Quality of driver feedback and communication', required: false },
  
  // Session Data Points
  { id: 'session-type', category: 'Session', name: 'Session Type', description: 'Practice, qualifying, or race session', required: true },
  { id: 'session-length', category: 'Session', name: 'Session Length', description: 'Duration of the session', required: false },
  { id: 'fuel-load', category: 'Session', name: 'Fuel Load', description: 'Fuel load at start of session', required: false },
  { id: 'tire-age', category: 'Session', name: 'Tire Age', description: 'Age and condition of tires used', required: false },
  { id: 'brake-pads', category: 'Session', name: 'Brake Pads', description: 'Brake pad compound and condition', required: false },
  { id: 'brake-fluid', category: 'Session', name: 'Brake Fluid', description: 'Brake fluid type and condition', required: false },
  { id: 'oil-temperature', category: 'Session', name: 'Oil Temperature', description: 'Engine oil operating temperature', required: false },
  { id: 'coolant-temperature', category: 'Session', name: 'Coolant Temperature', description: 'Engine coolant operating temperature', required: false },
  { id: 'lap-times', category: 'Session', name: 'Lap Times', description: 'Best and average lap times', required: false },
  { id: 'sector-times', category: 'Session', name: 'Sector Times', description: 'Individual sector time analysis', required: false },
  { id: 'tire-degradation', category: 'Session', name: 'Tire Degradation', description: 'Tire performance degradation over session', required: false },
  { id: 'setup-changes', category: 'Session', name: 'Setup Changes', description: 'Changes made during session', required: false }
];

interface VehicleDataPointsProps {
  dataPoints: DataPoint[];
}

const VehicleDataPoints: React.FC<VehicleDataPointsProps> = ({ dataPoints }) => {
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

export default VehicleDataPoints;