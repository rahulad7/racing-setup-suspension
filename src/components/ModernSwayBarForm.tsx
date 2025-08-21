import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wrench, Settings } from 'lucide-react';
import ModernInput from './ModernInput';
import SaveButton from './SaveButton';

interface ModernSwayBarFormProps {
  data: any;
  onChange: (data: any) => void;
  vehicleId?: string;
}

const ModernSwayBarForm: React.FC<ModernSwayBarFormProps> = ({ data, onChange, vehicleId }) => {
  const handleInputChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Front/Rear Sway Bar Toggles */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <div className="flex flex-col items-center text-center gap-3">
            <Label className="text-sm font-medium text-slate-200">Front Sway Bar</Label>
            <Switch
              checked={data.frontSwayBar}
              onCheckedChange={(checked) => handleInputChange('frontSwayBar', checked)}
              showLabels
            />
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
          <div className="flex flex-col items-center text-center gap-3">
            <Label className="text-sm font-medium text-slate-200">Rear Sway Bar</Label>
            <Switch
              checked={data.rearSwayBar}
              onCheckedChange={(checked) => handleInputChange('rearSwayBar', checked)}
              showLabels
            />
          </div>
        </div>
      </div>

      {/* Front Sway Bar Details */}
      {data.frontSwayBar && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Front Sway Bar</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ModernInput
              label="Brand"
              value={data.frontSwayBarBrand}
              onChange={(value) => handleInputChange('frontSwayBarBrand', value)}
              placeholder="e.g., Hotchkis, Eibach"
            />
            <ModernInput
              label="Diameter (mm)"
              value={data.frontSwayBarDiameter}
              onChange={(value) => handleInputChange('frontSwayBarDiameter', value)}
              placeholder="e.g., 25, 28, 32"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Setting/Position</Label>
              <Select value={data.frontSwayBarSetting} onValueChange={(value) => handleInputChange('frontSwayBarSetting', value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-slate-100">
                  <SelectValue placeholder="Select setting" className="text-slate-300 font-semibold" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="soft" className="text-slate-100 focus:bg-slate-700 font-medium">Soft (Outer hole)</SelectItem>
                  <SelectItem value="middle" className="text-slate-100 focus:bg-slate-700 font-medium">Middle</SelectItem>
                  <SelectItem value="stiff" className="text-slate-100 focus:bg-slate-700 font-medium">Stiff (Inner hole)</SelectItem>
                  <SelectItem value="custom" className="text-slate-100 focus:bg-slate-700 font-medium">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
              <div className="flex flex-col items-center text-center gap-3">
                <Label className="text-sm font-medium text-slate-200">Adjustable End Links</Label>
                <Switch
                  checked={data.frontEndLinksAdjustable}
                  onCheckedChange={(checked) => handleInputChange('frontEndLinksAdjustable', checked)}
                  showLabels
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rear Sway Bar Details */}
      {data.rearSwayBar && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg">
              <Settings className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-100">Rear Sway Bar</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ModernInput
              label="Brand"
              value={data.rearSwayBarBrand}
              onChange={(value) => handleInputChange('rearSwayBarBrand', value)}
              placeholder="e.g., Hotchkis, Eibach"
            />
            <ModernInput
              label="Diameter (mm)"
              value={data.rearSwayBarDiameter}
              onChange={(value) => handleInputChange('rearSwayBarDiameter', value)}
              placeholder="e.g., 22, 25, 28"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-200">Setting/Position</Label>
              <Select value={data.rearSwayBarSetting} onValueChange={(value) => handleInputChange('rearSwayBarSetting', value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-slate-100">
                  <SelectValue placeholder="Select setting" className="text-slate-300 font-semibold" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="soft" className="text-slate-100 focus:bg-slate-700 font-medium">Soft (Outer hole)</SelectItem>
                  <SelectItem value="middle" className="text-slate-100 focus:bg-slate-700 font-medium">Middle</SelectItem>
                  <SelectItem value="stiff" className="text-slate-100 focus:bg-slate-700 font-medium">Stiff (Inner hole)</SelectItem>
                  <SelectItem value="custom" className="text-slate-100 focus:bg-slate-700 font-medium">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
              <div className="flex flex-col items-center text-center gap-3">
                <Label className="text-sm font-medium text-slate-200">Adjustable End Links</Label>
                <Switch
                  checked={data.rearEndLinksAdjustable}
                  onCheckedChange={(checked) => handleInputChange('rearEndLinksAdjustable', checked)}
                  showLabels
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sway Bar Bushings */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-200">Sway Bar Bushings</Label>
        <Select value={data.swayBarBushings} onValueChange={(value) => handleInputChange('swayBarBushings', value)}>
          <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-slate-100">
            <SelectValue placeholder="Select bushing type" className="text-slate-300 font-semibold" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="stock-rubber" className="text-slate-100 focus:bg-slate-700 font-medium">Stock Rubber</SelectItem>
            <SelectItem value="polyurethane" className="text-slate-100 focus:bg-slate-700 font-medium">Polyurethane</SelectItem>
            <SelectItem value="delrin" className="text-slate-100 focus:bg-slate-700 font-medium">Delrin</SelectItem>
            <SelectItem value="spherical" className="text-slate-100 focus:bg-slate-700 font-medium">Spherical Bearings</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Save Setup */}
      <SaveButton 
        allSetupData={{ swayBar: data }}
        vehicleId={vehicleId}
        className="w-full"
      />
    </div>
  );
};

export default ModernSwayBarForm;