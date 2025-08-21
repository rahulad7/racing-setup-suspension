import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import ModernInput from './ModernInput';
import ModernCard from './ModernCard';
import SaveButton from './SaveButton';
import { useFormPersistence } from '@/hooks/useFormPersistence';

interface SuspensionData {
  shockBrand: string;
  shockModel: string;
  shockType: string;
  rearShockBrand: string;
  rearShockModel: string;
  rearShockType: string;
  compressionClicks: string;
  reboundClicks: string;
  singleAdjustmentClicks: string;
  rearCompressionClicks: string;
  rearReboundClicks: string;
  rearSingleAdjustmentClicks: string;
  highSpeedCompressionFront: string;
  lowSpeedCompressionFront: string;
  highSpeedCompressionRear: string;
  lowSpeedCompressionRear: string;
  frontSpringRate: string;
  rearSpringRate: string;
  springRateUnit: string;
  rideHeightFL: string;
  rideHeightFR: string;
  rideHeightRL: string;
  rideHeightRR: string;
  frontReservoirPressure: string;
  rearReservoirPressure: string;
  frontHasReservoir: boolean;
  rearHasReservoir: boolean;
  [key: string]: any;
}

interface ModernEnhancedSuspensionFormProps {
  data?: Partial<SuspensionData>;
  onChange: (data: SuspensionData) => void;
  vehicleId?: string;
}
const ModernEnhancedSuspensionForm: React.FC<ModernEnhancedSuspensionFormProps> = ({ 
  data = {}, 
  onChange,
  vehicleId
}) => {
  const { formData: persistedData, updateFormData } = useFormPersistence('suspension');
  
  const [formData, setFormData] = useState<SuspensionData>({
    shockBrand: '',
    shockModel: '',
    shockType: 'Non-Adjustable',
    rearShockBrand: '',
    rearShockModel: '',
    rearShockType: 'Non-Adjustable',
    compressionClicks: '',
    reboundClicks: '',
    singleAdjustmentClicks: '',
    rearCompressionClicks: '',
    rearReboundClicks: '',
    rearSingleAdjustmentClicks: '',
    highSpeedCompressionFront: '',
    lowSpeedCompressionFront: '',
    highSpeedCompressionRear: '',
    lowSpeedCompressionRear: '',
    frontSpringRate: '',
    rearSpringRate: '',
    springRateUnit: 'lbs/in',
    rideHeightFL: '',
    rideHeightFR: '',
    rideHeightRL: '',
    rideHeightRR: '',
    frontReservoirPressure: '',
    rearReservoirPressure: '',
    frontHasReservoir: false,
    rearHasReservoir: false,
    ...persistedData,
    ...data
  });

  // Update form data when props change
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...data
      }));
    }
  }, [data]);

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    updateFormData(field, value);
  };

  const shockTypeOptions = [
    { value: 'Non-Adjustable', label: 'Non-Adjustable' },
    { value: 'Single Adjustment', label: 'Single Adjustment' },
    { value: '2-Way Adjustable', label: '2-Way Adjustable' },
    { value: '3-Way Adjustable', label: '3-Way Adjustable' }
  ];

  const springRateUnitOptions = [
    { value: 'lbs/in', label: 'lbs/in (Pounds per inch)' },
    { value: 'kg/mm', label: 'kg/mm (Kilograms per millimeter)' },
    { value: 'N/mm', label: 'N/mm (Newtons per millimeter)' }
  ];

  const renderShockAdjustments = (isRear: boolean) => {
    const shockType = isRear ? formData.rearShockType : formData.shockType;
    const label = isRear ? 'Rear' : 'Front';

    if (shockType === 'Non-Adjustable') return null;

    const clicksSection = (() => {
      if (shockType === 'Single Adjustment') {
        return (
          <ModernInput
            label={`${label} Adjustment Clicks`}
            value={isRear ? formData.rearSingleAdjustmentClicks : formData.singleAdjustmentClicks}
            onChange={(value) => handleInputChange(isRear ? 'rearSingleAdjustmentClicks' : 'singleAdjustmentClicks', value)}
            placeholder="Number of clicks from full soft"
          />
        );
      }

      if (shockType === '3-Way Adjustable') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ModernInput
              label={`${label} High Speed Compression`}
              value={isRear ? formData.highSpeedCompressionRear : formData.highSpeedCompressionFront}
              onChange={(value) => handleInputChange(isRear ? 'highSpeedCompressionRear' : 'highSpeedCompressionFront', value)}
              placeholder="e.g., 8 clicks"
            />
            <ModernInput
              label={`${label} Low Speed Compression`}
              value={isRear ? formData.lowSpeedCompressionRear : formData.lowSpeedCompressionFront}
              onChange={(value) => handleInputChange(isRear ? 'lowSpeedCompressionRear' : 'lowSpeedCompressionFront', value)}
              placeholder="e.g., 12 clicks"
            />
            <ModernInput
              label={`${label} Rebound`}
              value={isRear ? formData.rearReboundClicks : formData.reboundClicks}
              onChange={(value) => handleInputChange(isRear ? 'rearReboundClicks' : 'reboundClicks', value)}
              placeholder="e.g., 15 clicks"
            />
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModernInput
            label={`${label} Compression Clicks`}
            value={isRear ? formData.rearCompressionClicks : formData.compressionClicks}
            onChange={(value) => handleInputChange(isRear ? 'rearCompressionClicks' : 'compressionClicks', value)}
            placeholder="e.g., 8 clicks"
          />
          <ModernInput
            label={`${label} Rebound Clicks`}
            value={isRear ? formData.rearReboundClicks : formData.reboundClicks}
            onChange={(value) => handleInputChange(isRear ? 'rearReboundClicks' : 'reboundClicks', value)}
            placeholder="e.g., 10 clicks"
          />
        </div>
      );
    })();

    const hasReservoir = isRear ? formData.rearHasReservoir : formData.frontHasReservoir;

    return (
      <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50 space-y-4">
        <h4 className="text-sm font-medium text-slate-200">{label} Adjustments</h4>
        {clicksSection}
        
        <div className="space-y-4">
          <ModernInput
            label={`${label} External Reservoir`}
            type="select"
            value={hasReservoir ? 'Yes' : 'No'}
            onChange={(value) => handleInputChange(isRear ? 'rearHasReservoir' : 'frontHasReservoir', value === 'Yes')}
            options={[
              { value: 'No', label: 'No' },
              { value: 'Yes', label: 'Yes' }
            ]}
          />
          
          {hasReservoir && (
            <ModernInput
              label={`${label} External Reservoir Pressure (PSI)`}
              value={isRear ? formData.rearReservoirPressure : formData.frontReservoirPressure}
              onChange={(value) => handleInputChange(isRear ? 'rearReservoirPressure' : 'frontReservoirPressure', value)}
              placeholder="e.g., 150"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <ModernCard title="Suspension Setup" gradient glow>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Settings className="h-5 w-5 text-blue-400" />
        </div>
        <p className="text-slate-300">Configure your suspension components and settings</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Front Shocks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernInput
              label="Front Shock Brand"
              value={formData.shockBrand}
              onChange={(value) => handleInputChange('shockBrand', value)}
              placeholder="e.g., Bilstein, Ohlins, KW"
            />
            <ModernInput
              label="Front Shock Model"
              value={formData.shockModel}
              onChange={(value) => handleInputChange('shockModel', value)}
              placeholder="e.g., PSS10, R&T, V3"
            />
            <ModernInput
              label="Front Shock Type"
              type="select"
              value={formData.shockType}
              onChange={(value) => handleInputChange('shockType', value)}
              options={shockTypeOptions}
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <ModernInput
                  label={`Front Spring Rate (${formData.springRateUnit})`}
                  value={formData.frontSpringRate}
                  onChange={(value) => handleInputChange('frontSpringRate', value)}
                  placeholder="e.g., 450"
                />
              </div>
              <div className="w-32">
                <ModernInput
                  label="Unit"
                  type="select"
                  value={formData.springRateUnit}
                  onChange={(value) => handleInputChange('springRateUnit', value)}
                  options={springRateUnitOptions}
                />
              </div>
            </div>
          </div>
          {renderShockAdjustments(false)}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-200 border-b border-slate-700 pb-2">Rear Shocks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModernInput
              label="Rear Shock Brand"
              value={formData.rearShockBrand}
              onChange={(value) => handleInputChange('rearShockBrand', value)}
              placeholder="e.g., Bilstein, Ohlins, KW"
            />
            <ModernInput
              label="Rear Shock Model"
              value={formData.rearShockModel}
              onChange={(value) => handleInputChange('rearShockModel', value)}
              placeholder="e.g., PSS10, R&T, V3"
            />
            <ModernInput
              label="Rear Shock Type"
              type="select"
              value={formData.rearShockType}
              onChange={(value) => handleInputChange('rearShockType', value)}
              options={shockTypeOptions}
            />
            <ModernInput
              label={`Rear Spring Rate (${formData.springRateUnit})`}
              value={formData.rearSpringRate}
              onChange={(value) => handleInputChange('rearSpringRate', value)}
              placeholder="e.g., 350"
            />
          </div>
          {renderShockAdjustments(true)}
        </div>
        
        <div className="mt-8">
          <SaveButton 
            allSetupData={{ suspension: formData }}
            vehicleId={vehicleId}
            className="w-full"
          />
        </div>
      </div>
    </ModernCard>
  );
};

export default ModernEnhancedSuspensionForm;