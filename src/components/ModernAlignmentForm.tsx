import React from 'react';
import { Label } from '@/components/ui/label';
import { Car, Settings } from 'lucide-react';
import ModernInput from './ModernInput';
import ModernToeSettings from './ModernToeSettings';
import SaveButton from './SaveButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormPersistence } from '@/hooks/useFormPersistence';
interface ModernAlignmentFormProps {
  data: any;
  onChange: (data: any) => void;
  vehicleId?: string;
}

const ModernAlignmentForm: React.FC<ModernAlignmentFormProps> = ({ data, onChange, vehicleId }) => {
  const { updateFormData } = useFormPersistence('alignment');
  
  const handleFieldChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    onChange(newData);
    updateFormData(field, value);
  };

  return (
    <div className="space-y-6">
      {/* Toe Settings */}
      <ModernToeSettings data={data} onChange={handleFieldChange} />

      {/* Toe Settings - Four Numeric Fields */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
            <Car className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Toe Settings</h3>
        </div>

        {/* Unit of Measure */}
        <div className="p-4 bg-gradient-to-r from-slate-600/20 to-slate-500/20 rounded-lg border-2 border-slate-500/30">
          <div className="space-y-2">
            <Label className="text-slate-200 font-medium">Unit of Measure</Label>
            <Select value={data.toeUnit || "MM"} onValueChange={(value) => handleFieldChange('toeUnit', value)}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-slate-100">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM">MM</SelectItem>
                <SelectItem value="Inches">Inches</SelectItem>
                <SelectItem value="Degrees">Degrees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Toe Input Fields */}
        <div className="p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg border-2 border-green-500/30">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <ModernInput
                  label="Front Left"
                  value={data.alignmentField1}
                  onChange={(value) => handleFieldChange('alignmentField1', value)}
                  placeholder="0.0"
                />
                <ModernInput
                  label="Front Right"
                  value={data.alignmentField2}
                  onChange={(value) => handleFieldChange('alignmentField2', value)}
                  placeholder="0.0"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <ModernInput
                  label="Rear Left"
                  value={data.alignmentField3}
                  onChange={(value) => handleFieldChange('alignmentField3', value)}
                  placeholder="0.0"
                />
                <ModernInput
                  label="Rear Right"
                  value={data.alignmentField4}
                  onChange={(value) => handleFieldChange('alignmentField4', value)}
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Camber Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Car className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Camber Settings</h3>
        </div>

        <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border-2 border-yellow-500/30">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-200">Front Camber (degrees)</h4>
              <div className="grid grid-cols-2 gap-2">
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
              <div className="grid grid-cols-2 gap-2">
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
      </div>

      {/* Caster Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Caster Settings</h3>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border-2 border-purple-500/30">
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
      
      {/* Save Setup */}
      <div className="mt-8">
        <SaveButton 
          allSetupData={{ alignment: data }}
          vehicleId={vehicleId}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ModernAlignmentForm;