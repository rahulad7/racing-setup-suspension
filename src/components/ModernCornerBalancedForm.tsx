import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scale } from 'lucide-react';
import ModernInput from './ModernInput';
import SaveButton from './SaveButton';
interface ModernCornerBalancedFormProps {
  data: any;
  onChange: (data: any) => void;
  vehicleId?: string;
}

const ModernCornerBalancedForm: React.FC<ModernCornerBalancedFormProps> = ({ data, onChange, vehicleId }) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const calculateCrossWeight = () => {
    const rl = parseFloat(data.cornerWeightRL) || 0;
    const fr = parseFloat(data.cornerWeightFR) || 0;
    const fl = parseFloat(data.cornerWeightFL) || 0;
    const rr = parseFloat(data.cornerWeightRR) || 0;
    
    const total = fl + fr + rl + rr;
    if (total === 0) return 0;
    
    const crossWeight = ((rl + fr) / total) * 100;
    return crossWeight.toFixed(1);
  };

  const fuelLevelOptions = [
    { value: '0', label: 'Empty (0/8)' },
    { value: '0.125', label: '1/8 Tank' },
    { value: '0.25', label: '2/8 Tank (1/4)' },
    { value: '0.375', label: '3/8 Tank' },
    { value: '0.5', label: '4/8 Tank (1/2)' },
    { value: '0.625', label: '5/8 Tank' },
    { value: '0.75', label: '6/8 Tank (3/4)' },
    { value: '0.875', label: '7/8 Tank' },
    { value: '1', label: 'Full Tank (8/8)' }
  ];

  return (
    <div className="space-y-6">
      {/* Car Weight and Driver Weight */}
      <div className="grid grid-cols-2 gap-4">
        <ModernInput
          label="Total Car Weight (lbs)"
          value={data.carWeight}
          onChange={(value) => handleInputChange('carWeight', value)}
          placeholder="e.g., 2800"
          required
        />
        <ModernInput
          label="Driver Weight (lbs)"
          value={data.driverWeight}
          onChange={(value) => handleInputChange('driverWeight', value)}
          placeholder="e.g., 180"
        />
      </div>

      {/* Corner Weights */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Corner Weights</h3>
        </div>

        <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border-2 border-yellow-500/30">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-200">Front Weights (lbs)</h4>
              <div className="grid grid-cols-2 gap-2">
                <ModernInput
                  label="Front Left"
                  value={data.cornerWeightFL}
                  onChange={(value) => handleInputChange('cornerWeightFL', value)}
                  placeholder="e.g., 850"
                />
                <ModernInput
                  label="Front Right"
                  value={data.cornerWeightFR}
                  onChange={(value) => handleInputChange('cornerWeightFR', value)}
                  placeholder="e.g., 850"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-200">Rear Weights (lbs)</h4>
              <div className="grid grid-cols-2 gap-2">
                <ModernInput
                  label="Rear Left"
                  value={data.cornerWeightRL}
                  onChange={(value) => handleInputChange('cornerWeightRL', value)}
                  placeholder="e.g., 750"
                />
                <ModernInput
                  label="Rear Right"
                  value={data.cornerWeightRR}
                  onChange={(value) => handleInputChange('cornerWeightRR', value)}
                  placeholder="e.g., 750"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Weight Fields */}
      <div className="grid grid-cols-2 gap-4">
        <ModernInput
          label="Cross Weight %"
          value={data.crossWeight || calculateCrossWeight()}
          onChange={(value) => handleInputChange('crossWeight', value)}
          placeholder="e.g., 50.2"
        />
        <ModernInput
          label="Weight Distribution"
          value={data.weightDistribution}
          onChange={(value) => handleInputChange('weightDistribution', value)}
          placeholder="e.g., 52/48"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ModernInput
          label="Ballast Weight (lbs)"
          value={data.ballastWeight}
          onChange={(value) => handleInputChange('ballastWeight', value)}
          placeholder="e.g., 50"
        />
        <ModernInput
          label="Ballast Location"
          value={data.ballastLocation}
          onChange={(value) => handleInputChange('ballastLocation', value)}
          placeholder="e.g., Passenger floor"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-200">Fuel Level when Corner Balancing</Label>
        <Select value={data.fuelLevel || ''} onValueChange={(value) => handleInputChange('fuelLevel', value)}>
          <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-100">
            <SelectValue placeholder="Select fuel level" />
          </SelectTrigger>
          <SelectContent>
            {fuelLevelOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Save Setup */}
      <SaveButton 
        allSetupData={{ cornerBalance: data }}
        vehicleId={vehicleId}
        className="w-full"
      />
    </div>
  );
};

export default ModernCornerBalancedForm;