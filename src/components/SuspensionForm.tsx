import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useLicense } from '@/contexts/LicenseContext';
import FreeTrialBlock from './FreeTrialBlock';
import { Settings } from 'lucide-react';

interface SuspensionFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const SuspensionForm: React.FC<SuspensionFormProps> = ({ onSubmit, initialData = {} }) => {
  const { freeTrialUsed, isLicenseValid, useFreeAdvice } = useLicense();
  const [formData, setFormData] = useState({
    issue: '',
    lapTime: '',
    frontSprings: '',
    rearSprings: '',
    frontShocks: '',
    rearShocks: '',
    frontAntiRollBar: '',
    rearAntiRollBar: '',
    compressionClicksFront: '',
    compressionClicksRear: '',
    reboundClicksFront: '',
    reboundClicksRear: '',
    highSpeedCompressionFront: '',
    highSpeedCompressionRear: '',
    lowSpeedCompressionFront: '',
    lowSpeedCompressionRear: '',
    shockPreloadFront: '',
    shockPreloadRear: '',
    bumpStopGapFront: '',
    bumpStopGapRear: '',
    hasExternalReservoirs: false,
    frontReservoirPressure: '',
    rearReservoirPressure: ''
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLicenseValid && !freeTrialUsed) {
      useFreeAdvice();
    }
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      hasExternalReservoirs: checked,
      frontReservoirPressure: checked ? prev.frontReservoirPressure : '',
      rearReservoirPressure: checked ? prev.rearReservoirPressure : ''
    }));
  };

  if (freeTrialUsed && !isLicenseValid) {
    return (
      <FreeTrialBlock 
        title="Setup Analysis Locked"
        description="You've used your free analysis. Upgrade to continue using the app."
        onUpgrade={() => window.location.href = '/license'}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-current" />
          Full Suspension Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Spring Rates</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="frontSprings">Front Springs (lbs/in) *</Label>
              <Input
                id="frontSprings"
                value={formData.frontSprings}
                onChange={(e) => handleInputChange('frontSprings', e.target.value)}
                placeholder="e.g., 500"
                required
              />
            </div>
            <div>
              <Label htmlFor="rearSprings">Rear Springs (lbs/in) *</Label>
              <Input
                id="rearSprings"
                value={formData.rearSprings}
                onChange={(e) => handleInputChange('rearSprings', e.target.value)}
                placeholder="e.g., 600"
                required
              />
            </div>
          </div>
        </div>
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          {!isLicenseValid ? 'Get Free Analysis' : 'Analyze Setup'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuspensionForm;