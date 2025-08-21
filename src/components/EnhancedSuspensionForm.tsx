import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings } from 'lucide-react';
import SuspensionSetupSelector from './SuspensionSetupSelector';

interface EnhancedSuspensionFormProps {
  data: {
    suspensionSetup?: string;
    stockSuspension?: boolean;
    shockBrand?: string;
    shockModel?: string;
    shockType?: string;
    adjustableType?: '2-way' | '3-way' | '';
    compressionClicks?: string;
    reboundClicks?: string;
    singleAdjustmentClicks?: string;
    highSpeedCompressionClicks?: string;
    lowSpeedCompressionClicks?: string;
    frontSpringRate?: string;
    rearSpringRate?: string;
    rearShockBrand?: string;
    rearShockModel?: string;
    rearShockType?: string;
    rearAdjustableType?: '2-way' | '3-way' | '';
    rearCompressionClicks?: string;
    rearReboundClicks?: string;
    rearSingleAdjustmentClicks?: string;
    rearHighSpeedCompressionClicks?: string;
    rearLowSpeedCompressionClicks?: string;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const EnhancedSuspensionForm: React.FC<EnhancedSuspensionFormProps> = ({ data = {}, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Suspension Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <SuspensionSetupSelector 
          value={data.suspensionSetup}
          onChange={(value) => onChange('suspensionSetup', value)}
        />
        
        {data.suspensionSetup && data.suspensionSetup !== 'stock' && (
          <>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Front Suspension</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="shockBrand">Shock Brand</Label>
                  <Input
                    id="shockBrand"
                    value={data.shockBrand || ''}
                    onChange={(e) => onChange('shockBrand', e.target.value)}
                    placeholder="e.g., Bilstein, Ohlins"
                  />
                </div>
                <div>
                  <Label htmlFor="shockModel">Shock Model</Label>
                  <Input
                    id="shockModel"
                    value={data.shockModel || ''}
                    onChange={(e) => onChange('shockModel', e.target.value)}
                    placeholder="e.g., PSS10, TTX"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Front Spring Rate (lbs/in)</Label>
                <Input
                  value={data.frontSpringRate || ''}
                  onChange={(e) => onChange('frontSpringRate', e.target.value)}
                  placeholder="e.g., 500"
                />
              </div>
              <div>
                <Label>Rear Spring Rate (lbs/in)</Label>
                <Input
                  value={data.rearSpringRate || ''}
                  onChange={(e) => onChange('rearSpringRate', e.target.value)}
                  placeholder="e.g., 600"
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedSuspensionForm;