import React from 'react';
import { Label } from '@/components/ui/label';
import { Car, Settings, Target } from 'lucide-react';
import ModernInput from './ModernInput';
import ToeSettings from './ToeSettings';
import { useFormPersistence } from '@/hooks/useFormPersistence';

interface AlignmentFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const AlignmentForm: React.FC<AlignmentFormProps> = ({ data, onChange }) => {
  const { updateFormData } = useFormPersistence('alignment');
  
  const handleFieldChange = (field: string, value: any) => {
    onChange(field, value);
    updateFormData(field, value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
          <Target className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-100">Full Alignment Configuration</h3>
      </div>

      {/* Toe Settings */}
      <ToeSettings data={data} onChange={handleFieldChange} />

      {/* Four numeric fields above camber */}
      <div className="grid grid-cols-4 gap-4">
        <ModernInput
          value={data.alignmentField1}
          onChange={(value) => handleFieldChange('alignmentField1', value)}
          placeholder="0.0"
        />
        <ModernInput
          value={data.alignmentField2}
          onChange={(value) => handleFieldChange('alignmentField2', value)}
          placeholder="0.0"
        />
        <ModernInput
          value={data.alignmentField3}
          onChange={(value) => handleFieldChange('alignmentField3', value)}
          placeholder="0.0"
        />
        <ModernInput
          value={data.alignmentField4}
          onChange={(value) => handleFieldChange('alignmentField4', value)}
          placeholder="0.0"
        />
      </div>

      {/* Camber Settings */}
      <div className="space-y-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
            <Car className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Camber Settings</h3>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200">Front Camber (degrees)</h4>
            <div className="grid grid-cols-2 gap-4">
              <ModernInput
                label="Front Left"
                value={data.camberFL}
                onChange={(value) => handleFieldChange('camberFL', value)}
                placeholder="e.g., -2.5"
              />
              <ModernInput
                label="Front Right"
                value={data.camberFR}
                onChange={(value) => handleFieldChange('camberFR', value)}
                placeholder="e.g., -2.5"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-200">Rear Camber (degrees)</h4>
            <div className="grid grid-cols-2 gap-4">
              <ModernInput
                label="Rear Left"
                value={data.camberRL}
                onChange={(value) => handleFieldChange('camberRL', value)}
                placeholder="e.g., -2.0"
              />
              <ModernInput
                label="Rear Right"
                value={data.camberRR}
                onChange={(value) => handleFieldChange('camberRR', value)}
                placeholder="e.g., -2.0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Caster Settings */}
      <div className="space-y-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Caster Settings</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ModernInput
            label="Caster Left (degrees)"
            value={data.casterLeft}
            onChange={(value) => handleFieldChange('casterLeft', value)}
            placeholder="e.g., 6.5"
          />
          <ModernInput
            label="Caster Right (degrees)"
            value={data.casterRight}
            onChange={(value) => handleFieldChange('casterRight', value)}
            placeholder="e.g., 6.5"
          />
        </div>
      </div>
    </div>
  );
};

export default AlignmentForm;