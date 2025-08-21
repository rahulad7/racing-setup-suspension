import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Gauge } from 'lucide-react';

interface EnhancedTiresFormProps {
  data: {
    frontTireSize?: string;
    tireMake?: string;
    tireModel?: string;
    heatCycles?: string;
    differentRearTires?: boolean;
    rearTireSizeDifferent?: string;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const EnhancedTiresForm: React.FC<EnhancedTiresFormProps> = ({ data = {}, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Tires Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="frontTireSize">Front Tire Size *</Label>
            <Input
              id="frontTireSize"
              value={data.frontTireSize || ''}
              onChange={(e) => onChange('frontTireSize', e.target.value)}
              placeholder="e.g., 225/45R17"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <Button
                type="button"
                variant={data.differentRearTires ? "default" : "outline"}
                onClick={() => onChange('differentRearTires', !data.differentRearTires)}
                size="sm"
              >
                Rear Tires are a different Size
              </Button>
            </div>
            {data.differentRearTires ? (
              <div>
                <Label htmlFor="rearTireSizeDifferent">Rear Tire Size *</Label>
                <Input
                  id="rearTireSizeDifferent"
                  value={data.rearTireSizeDifferent || ''}
                  onChange={(e) => onChange('rearTireSizeDifferent', e.target.value)}
                  placeholder="e.g., 245/40R17"
                />
              </div>
            ) : (
              <div>
                <Label className="text-gray-500">Rear Tire Size (same as front)</Label>
                <Input
                  value={data.frontTireSize || ''}
                  disabled
                  className="bg-gray-100"
                  placeholder="Same as front tire size"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tireMake">Tire Make *</Label>
            <Input
              id="tireMake"
              value={data.tireMake || ''}
              onChange={(e) => onChange('tireMake', e.target.value)}
              placeholder="e.g., Michelin, Toyo, Hoosier"
            />
          </div>
          <div>
            <Label htmlFor="tireModel">Tire Model *</Label>
            <Input
              id="tireModel"
              value={data.tireModel || ''}
              onChange={(e) => onChange('tireModel', e.target.value)}
              placeholder="e.g., Pilot Sport Cup 2, R888R, A7"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="heatCycles">Heat Cycles *</Label>
          <Input
            id="heatCycles"
            value={data.heatCycles || ''}
            onChange={(e) => onChange('heatCycles', e.target.value)}
            placeholder="Number of heat cycles"
            type="number"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedTiresForm;