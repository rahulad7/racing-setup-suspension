import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SuspensionSetupSelectorProps {
  value?: string;
  onChange: (value: string) => void;
}

const suspensionOptions = [
  { value: 'stock', label: 'Stock Suspension' },
  { value: 'coilovers', label: 'Coilovers' },
  { value: 'springs-shocks', label: 'Aftermarket Springs & Shocks' },
  { value: 'air-suspension', label: 'Air Suspension' },
  { value: 'adjustable-coilovers', label: 'Adjustable Coilovers' },
  { value: 'race-suspension', label: 'Race Suspension Setup' },
  { value: 'lowering-springs', label: 'Lowering Springs' },
  { value: 'performance-shocks', label: 'Performance Shocks Only' }
];

const SuspensionSetupSelector: React.FC<SuspensionSetupSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Suspension Setup</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select One" />
        </SelectTrigger>
        <SelectContent>
          {suspensionOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SuspensionSetupSelector;