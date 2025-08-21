import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface TrackTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TrackTypeSelector({ value, onChange }: TrackTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="track-type">Track Type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="track-type">
          <SelectValue placeholder="Select track type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="road-course">Road Course</SelectItem>
          <SelectItem value="oval-short">Short Oval (under 1 mile)</SelectItem>
          <SelectItem value="oval-intermediate">Intermediate Oval (1-2 miles)</SelectItem>
          <SelectItem value="oval-superspeedway">Superspeedway (2+ miles)</SelectItem>
          <SelectItem value="drag-strip">Drag Strip</SelectItem>
          <SelectItem value="autocross">Autocross</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}