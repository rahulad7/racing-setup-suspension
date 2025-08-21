import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TireTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TireTypeSelector({ value, onChange }: TireTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="tire-type">Tire Type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="tire-type">
          <SelectValue placeholder="Select tire type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="street">Street Tires</SelectItem>
          <SelectItem value="summer">Summer Performance</SelectItem>
          <SelectItem value="track">Track Day Tires</SelectItem>
          <SelectItem value="semi-slick">Semi-Slick</SelectItem>
          <SelectItem value="slick">Racing Slicks</SelectItem>
          <SelectItem value="rain">Rain Tires</SelectItem>
          <SelectItem value="drag">Drag Radials</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}