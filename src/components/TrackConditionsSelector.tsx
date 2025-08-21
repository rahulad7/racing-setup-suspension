import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TrackConditionsSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TrackConditionsSelector({ value, onChange }: TrackConditionsSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="track-conditions">Track Conditions</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="track-conditions">
          <SelectValue placeholder="Select track conditions" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dry">Dry</SelectItem>
          <SelectItem value="damp">Damp</SelectItem>
          <SelectItem value="wet">Wet</SelectItem>
          <SelectItem value="hot">Hot (over 90°F)</SelectItem>
          <SelectItem value="cold">Cold (under 50°F)</SelectItem>
          <SelectItem value="dusty">Dusty/Sandy</SelectItem>
          <SelectItem value="green">Green Track</SelectItem>
          <SelectItem value="rubbered-in">Rubbered In</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}