import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Gauge } from 'lucide-react';
import ModernInput from './ModernInput';
import ModernCard from './ModernCard';
import SaveButton from './SaveButton';
import { useFormPersistence } from '@/hooks/useFormPersistence';

interface TiresData {
  tireBrand: string;
  tireModel: string;
  tireSize: string;
  differentRearSize: boolean;
  rearTireSize: string;
  tirePressureFL: string;
  tirePressureFR: string;
  tirePressureRL: string;
  tirePressureRR: string;
  heatCycles: string;
  // Tire Temperatures
  tireTempFL_Inner: string;
  tireTempFL_Center: string;
  tireTempFL_Outer: string;
  tireTempFR_Inner: string;
  tireTempFR_Center: string;
  tireTempFR_Outer: string;
  tireTempRL_Inner: string;
  tireTempRL_Center: string;
  tireTempRL_Outer: string;
  tireTempRR_Inner: string;
  tireTempRR_Center: string;
  tireTempRR_Outer: string;
}

interface ModernEnhancedTiresFormProps {
  data?: Partial<TiresData>;
  onChange: (data: TiresData) => void;
  vehicleId?: string;
}

const ModernEnhancedTiresForm: React.FC<ModernEnhancedTiresFormProps> = ({ 
  data = {}, 
  onChange,
  vehicleId
}) => {
  const { formData: persistedData, updateFormData } = useFormPersistence('tires');
  
  const [formData, setFormData] = useState<TiresData>({
    tireBrand: '',
    tireModel: '',
    tireSize: '',
    differentRearSize: false,
    rearTireSize: '',
    tirePressureFL: '',
    tirePressureFR: '',
    tirePressureRL: '',
    tirePressureRR: '',
    heatCycles: '',
    // Tire Temperatures
    tireTempFL_Inner: '',
    tireTempFL_Center: '',
    tireTempFL_Outer: '',
    tireTempFR_Inner: '',
    tireTempFR_Center: '',
    tireTempFR_Outer: '',
    tireTempRL_Inner: '',
    tireTempRL_Center: '',
    tireTempRL_Outer: '',
    tireTempRR_Inner: '',
    tireTempRR_Center: '',
    tireTempRR_Outer: '',
    ...persistedData,
    ...data
  });

  // Update form data when props change (only if not currently being edited)
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...data
      }));
    }
  }, [data]);

  const handleInputChange = (field: keyof TiresData, value: string | boolean) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    updateFormData(field, value);
    onChange(newFormData); // Call onChange immediately with new data
  };

  return (
    <ModernCard title="Tire Setup" gradient glow>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Gauge className="h-5 w-5 text-blue-400" />
        </div>
        <p className="text-slate-300">Configure your tire specifications and pressures</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ModernInput
            label="Tire Brand"
            value={formData.tireBrand}
            onChange={(value) => handleInputChange('tireBrand', value)}
            placeholder="e.g., Michelin, Bridgestone"
          />
          
          <ModernInput
            label="Tire Model"
            value={formData.tireModel}
            onChange={(value) => handleInputChange('tireModel', value)}
            placeholder="e.g., Pilot Sport 4S"
          />
          
          <ModernInput
            label="Front Tire Size"
            value={formData.tireSize}
            onChange={(value) => handleInputChange('tireSize', value)}
            placeholder="e.g., 245/40R18"
            className="md:col-span-2"
          />
        </div>
        
        {/* Different Rear Size Button */}
        <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="flex flex-col items-center text-center gap-3">
            <div>
              <Label className="text-sm font-medium text-slate-200">Different Rear Tire Size?</Label>
              <p className="text-xs text-slate-400">Are your rear tires a different size than the front?</p>
            </div>
            <Button
              variant={formData.differentRearSize ? "default" : "outline"}
              onClick={() => handleInputChange('differentRearSize', !formData.differentRearSize)}
              className="w-auto"
            >
              Yes
            </Button>
          </div>
        </div>
        
        {/* Rear Tire Size Input */}
        {formData.differentRearSize && (
          <div>
            <ModernInput
              label="Rear Tire Size"
              value={formData.rearTireSize}
              onChange={(value) => handleInputChange('rearTireSize', value)}
              placeholder="e.g., 275/35R18"
            />
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-4">Hot Tire Pressures (psi)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ModernInput
              label="Front Left"
              value={formData.tirePressureFL}
              onChange={(value) => handleInputChange('tirePressureFL', value)}
              placeholder="e.g., 32"
            />
            
            <ModernInput
              label="Front Right"
              value={formData.tirePressureFR}
              onChange={(value) => handleInputChange('tirePressureFR', value)}
              placeholder="e.g., 32"
            />
            
            <ModernInput
              label="Rear Left"
              value={formData.tirePressureRL}
              onChange={(value) => handleInputChange('tirePressureRL', value)}
              placeholder="e.g., 30"
            />
            
            <ModernInput
              label="Rear Right"
              value={formData.tirePressureRR}
              onChange={(value) => handleInputChange('tirePressureRR', value)}
              placeholder="e.g., 30"
            />
          </div>
        </div>
        
        {/* Tire Temperatures Section */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Tire Temperatures (°F)</h3>
          <p className="text-sm text-slate-400 mb-4">Temperatures to be taken as soon as you get off track.</p>
          
          {/* Front Wheels */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-slate-300 mb-3">Front</h4>
            <div className="grid grid-cols-2 gap-6">
              {/* Front Left */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-400">Front Left</Label>
                 <div className="grid grid-cols-3 gap-2">
                   <ModernInput
                     label="Outer"
                     value={formData.tireTempFL_Outer}
                     onChange={(value) => handleInputChange('tireTempFL_Outer', value)}
                     placeholder="190"
                     type="number"
                     compact
                   />
                   <ModernInput
                     label="Center"
                     value={formData.tireTempFL_Center}
                     onChange={(value) => handleInputChange('tireTempFL_Center', value)}
                     placeholder="185"
                     type="number"
                     compact
                   />
                   <ModernInput
                     label="Inner"
                     value={formData.tireTempFL_Inner}
                     onChange={(value) => handleInputChange('tireTempFL_Inner', value)}
                     placeholder="180"
                     type="number"
                     compact
                   />
                 </div>
               </div>
              
              {/* Front Right */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-400">Front Right</Label>
                <div className="grid grid-cols-3 gap-2">
                  <ModernInput
                    label="Inner"
                    value={formData.tireTempFR_Inner}
                    onChange={(value) => handleInputChange('tireTempFR_Inner', value)}
                    placeholder="190"
                    type="number"
                    compact
                  />
                  <ModernInput
                    label="Center"
                    value={formData.tireTempFR_Center}
                    onChange={(value) => handleInputChange('tireTempFR_Center', value)}
                    placeholder="185"
                    type="number"
                    compact
                  />
                  <ModernInput
                    label="Outer"
                    value={formData.tireTempFR_Outer}
                    onChange={(value) => handleInputChange('tireTempFR_Outer', value)}
                    placeholder="180"
                    type="number"
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Rear Wheels */}
          <div>
            <h4 className="text-md font-medium text-slate-300 mb-3">Rear</h4>
            <div className="grid grid-cols-2 gap-6">
              {/* Rear Left */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-400">Rear Left</Label>
                 <div className="grid grid-cols-3 gap-2">
                   <ModernInput
                     label="Outer"
                     value={formData.tireTempRL_Outer}
                     onChange={(value) => handleInputChange('tireTempRL_Outer', value)}
                     placeholder="185"
                     type="number"
                     compact
                   />
                   <ModernInput
                     label="Center"
                     value={formData.tireTempRL_Center}
                     onChange={(value) => handleInputChange('tireTempRL_Center', value)}
                     placeholder="180"
                     type="number"
                     compact
                   />
                   <ModernInput
                     label="Inner"
                     value={formData.tireTempRL_Inner}
                     onChange={(value) => handleInputChange('tireTempRL_Inner', value)}
                     placeholder="175"
                     type="number"
                     compact
                   />
                 </div>
               </div>
              
              {/* Rear Right */}
              <div className="space-y-2">
                <Label className="text-sm text-slate-400">Rear Right</Label>
                <div className="grid grid-cols-3 gap-2">
                  <ModernInput
                    label="Inner"
                    value={formData.tireTempRR_Inner}
                    onChange={(value) => handleInputChange('tireTempRR_Inner', value)}
                    placeholder="185"
                    type="number"
                    compact
                  />
                  <ModernInput
                    label="Center"
                    value={formData.tireTempRR_Center}
                    onChange={(value) => handleInputChange('tireTempRR_Center', value)}
                    placeholder="180"
                    type="number"
                    compact
                  />
                  <ModernInput
                    label="Outer"
                    value={formData.tireTempRR_Outer}
                    onChange={(value) => handleInputChange('tireTempRR_Outer', value)}
                    placeholder="175"
                    type="number"
                    compact
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <ModernInput
            label="Heat Cycles on Tires"
            value={formData.heatCycles}
            onChange={(value) => handleInputChange('heatCycles', value)}
            placeholder="Number of heat cycles on these tires"
            type="number"
          />
        </div>
        
        <div className="mt-8">
          <SaveButton 
            allSetupData={{ tires: formData }}
            vehicleId={vehicleId}
            className="w-full"
          />
        </div>
      </div>
    </ModernCard>
  );
};

export default ModernEnhancedTiresForm;