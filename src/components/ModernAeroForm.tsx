import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Wind } from 'lucide-react';
import ModernInput from './ModernInput';
import AeroFeedbackEngine from './AeroFeedbackEngine';
import SaveButton from './SaveButton';

import { useFormPersistence } from '@/hooks/useFormPersistence';
interface ModernAeroFormProps {
  data: any;
  onChange: (data: any) => void;
  vehicleData?: any;
  trackData?: any;
  vehicleId?: string;
}

const ModernAeroForm: React.FC<ModernAeroFormProps> = ({ 
  data = {}, 
  onChange, 
  vehicleData = {},
  trackData = {},
  vehicleId 
}) => {
  const { formData: persistedData, updateFormData } = useFormPersistence('aero');
  
  const [formData, setFormData] = useState({
    frontSplitterBrand: '',
    frontSplitterModel: '',
    frontSplitterHeight: '',
    frontSplitterAngle: '',
    frontSplitterMaterial: '',
    rearWingBrand: '',
    rearWingModel: '',
    rearWingAngle: '',
    rearWingMaterial: '',
    rearWingEndplates: '',
    rearDiffuser: '',
    numberOfCanards: '',
    frontDownforce: '',
    rearDownforce: '',
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

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...data, [field]: value };
    onChange(newData);
    updateFormData({ [field]: value });
  };

  const splitterMaterials = [
    { value: 'carbon-fiber', label: 'Carbon Fiber' },
    { value: 'fiberglass', label: 'Fiberglass' },
    { value: 'aluminum', label: 'Aluminum' },
    { value: 'abs-plastic', label: 'ABS Plastic' },
    { value: 'other', label: 'Other' }
  ];

  const endplateOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const diffuserOptions = [
    { value: 'none', label: 'None' },
    { value: 'oem', label: 'OEM' },
    { value: 'aftermarket', label: 'Aftermarket' },
    { value: 'custom', label: 'Custom' }
  ];

  const canardNumberOptions = [
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <Wind className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-100">Full Aero Configuration</h3>
      </div>

      {/* Front Aero */}
      <div className="space-y-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
            <Wind className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Front Splitter</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ModernInput
            label="Splitter Brand"
            value={data.frontSplitterBrand}
            onChange={(value) => handleInputChange('frontSplitterBrand', value)}
            placeholder="e.g., APR, Voltex, Custom"
          />
          <ModernInput
            label="Splitter Model"
            value={data.frontSplitterModel}
            onChange={(value) => handleInputChange('frontSplitterModel', value)}
            placeholder="e.g., Performance, Track"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ModernInput
            label="Height (inches)"
            value={data.frontSplitterHeight}
            onChange={(value) => handleInputChange('frontSplitterHeight', value)}
            placeholder="e.g., 2.5"
          />
          <ModernInput
            label="Angle (degrees)"
            value={data.frontSplitterAngle}
            onChange={(value) => handleInputChange('frontSplitterAngle', value)}
            placeholder="e.g., 5"
          />
          <ModernInput
            label="Material"
            type="select"
            value={data.frontSplitterMaterial}
            onChange={(value) => handleInputChange('frontSplitterMaterial', value)}
            options={splitterMaterials}
          />
        </div>
      </div>

      {/* Rear Aero */}
      <div className="space-y-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <Wind className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Rear Wing</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ModernInput
            label="Wing Brand"
            value={data.rearWingBrand}
            onChange={(value) => handleInputChange('rearWingBrand', value)}
            placeholder="e.g., APR, Voltex, NinetyNine"
          />
          <ModernInput
            label="Wing Model"
            value={data.rearWingModel}
            onChange={(value) => handleInputChange('rearWingModel', value)}
            placeholder="e.g., GTC-300, Type-7"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ModernInput
            label="Attack Angle (degrees)"
            value={data.rearWingAngle}
            onChange={(value) => handleInputChange('rearWingAngle', value)}
            placeholder="e.g., 15"
          />
          <ModernInput
            label="Material"
            type="select"
            value={data.rearWingMaterial}
            onChange={(value) => handleInputChange('rearWingMaterial', value)}
            options={splitterMaterials}
          />
          <ModernInput
            label="End Plates"
            type="select"
            value={data.rearWingEndplates}
            onChange={(value) => handleInputChange('rearWingEndplates', value)}
            options={endplateOptions}
          />
        </div>

      </div>

      {/* Rear Aero Details & Downforce */}
      <div className="space-y-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
            <Wind className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Rear Aero Details & Performance</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ModernInput
            label="Rear Diffuser"
            type="select"
            value={data.rearDiffuser}
            onChange={(value) => handleInputChange('rearDiffuser', value)}
            options={diffuserOptions}
          />
          <ModernInput
            label="Number of Canards"
            type="select"
            value={data.numberOfCanards}
            onChange={(value) => handleInputChange('numberOfCanards', value)}
            options={canardNumberOptions}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ModernInput
            label="Front Downforce (lbs @ speed)"
            value={data.frontDownforce}
            onChange={(value) => handleInputChange('frontDownforce', value)}
            placeholder="e.g., 200 @ 100mph"
          />
          <ModernInput
            label="Rear Downforce (lbs @ speed)"
            value={data.rearDownforce}
            onChange={(value) => handleInputChange('rearDownforce', value)}
            placeholder="e.g., 400 @ 100mph"
          />
        </div>
      </div>

      {/* Aero Feedback */}
      <AeroFeedbackEngine 
        aeroData={data}
        vehicleData={vehicleData}
        trackData={trackData}
      />
      
      
      {/* Save Setup */}
      <div className="mt-8">
        <SaveButton
          allSetupData={{ aero: data }}
          vehicleId={vehicleId}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ModernAeroForm;