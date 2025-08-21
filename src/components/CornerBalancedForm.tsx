import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scale } from 'lucide-react';

interface CornerBalancedFormProps {
  data: {
    carWeight?: string;
    crossWeight?: string;
    frontLeftWeight?: string;
    frontRightWeight?: string;
    rearLeftWeight?: string;
    rearRightWeight?: string;
    driverWeight?: string;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const CornerBalancedForm: React.FC<CornerBalancedFormProps> = ({ data = {}, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-current" />
          Full Corner Balance Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Basic Weight Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="carWeight">Total Car Weight (lbs) *</Label>
              <Input
                id="carWeight"
                value={data.carWeight || ''}
                onChange={(e) => onChange('carWeight', e.target.value)}
                placeholder="e.g., 2800"
                type="number"
                required
              />
            </div>
            <div>
              <Label htmlFor="driverWeight">Driver Weight (lbs)</Label>
              <Input
                id="driverWeight"
                value={data.driverWeight || ''}
                onChange={(e) => onChange('driverWeight', e.target.value)}
                placeholder="e.g., 180"
                type="number"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Balance Settings</h4>
          <div>
            <Label htmlFor="crossWeight">Cross Weight %</Label>
            <Input
              id="crossWeight"
              value={data.crossWeight || ''}
              onChange={(e) => onChange('crossWeight', e.target.value)}
              placeholder="e.g., 50.2"
              type="number"
              step="0.1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Corner Weights (lbs)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="frontLeftWeight">Front Left</Label>
              <Input
                id="frontLeftWeight"
                value={data.frontLeftWeight || ''}
                onChange={(e) => onChange('frontLeftWeight', e.target.value)}
                placeholder="lbs"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="frontRightWeight">Front Right</Label>
              <Input
                id="frontRightWeight"
                value={data.frontRightWeight || ''}
                onChange={(e) => onChange('frontRightWeight', e.target.value)}
                placeholder="lbs"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="rearLeftWeight">Rear Left</Label>
              <Input
                id="rearLeftWeight"
                value={data.rearLeftWeight || ''}
                onChange={(e) => onChange('rearLeftWeight', e.target.value)}
                placeholder="lbs"
                type="number"
              />
            </div>
            <div>
              <Label htmlFor="rearRightWeight">Rear Right</Label>
              <Input
                id="rearRightWeight"
                value={data.rearRightWeight || ''}
                onChange={(e) => onChange('rearRightWeight', e.target.value)}
                placeholder="lbs"
                type="number"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CornerBalancedForm;