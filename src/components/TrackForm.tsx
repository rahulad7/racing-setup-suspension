import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Thermometer, Cloud } from 'lucide-react';
import { useSupabaseFormPersistence } from '@/hooks/useSupabaseFormPersistence';

interface TrackData {
  trackName: string;
  weatherConditions: string;
  temperature: string;
  temperatureUnit: string;
}

interface TrackFormProps {
  onTrackDataChange?: (data: TrackData) => void;
}

const TrackForm: React.FC<TrackFormProps> = ({ onTrackDataChange }) => {
  const { formData, updateFormData } = useSupabaseFormPersistence('track-form');
  
  const trackData: TrackData = {
    trackName: formData.trackName || '',
    weatherConditions: formData.weatherConditions || '',
    temperature: formData.temperature || '',
    temperatureUnit: formData.temperatureUnit || 'F'
  };

  const handleInputChange = (field: keyof TrackData, value: string) => {
    updateFormData(field, value);
    
    const newData = { ...trackData, [field]: value };
    
    // Notify parent component
    if (onTrackDataChange) {
      onTrackDataChange(newData);
    }
  };

  useEffect(() => {
    // Notify parent with current data when component mounts
    if (onTrackDataChange && Object.keys(formData).length > 0) {
      onTrackDataChange(trackData);
    }
  }, [onTrackDataChange, formData]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-400" />
            Track Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="weather" className="text-slate-300 flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                Weather Conditions
              </Label>
              <Select value={trackData.weatherConditions} onValueChange={(value) => handleInputChange('weatherConditions', value)}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select conditions" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="dry" className="text-white hover:bg-gray-600">Dry</SelectItem>
                  <SelectItem value="wet" className="text-white hover:bg-gray-600">Wet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature" className="text-slate-300 flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Temperature
              </Label>
              <Input
                id="temperature"
                type="number"
                value={trackData.temperature}
                onChange={(e) => handleInputChange('temperature', e.target.value)}
                placeholder="Enter temperature"
                className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tempUnit" className="text-slate-300">
                Unit
              </Label>
              <Select value={trackData.temperatureUnit} onValueChange={(value) => handleInputChange('temperatureUnit', value)}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="F" className="text-white hover:bg-gray-600">°F</SelectItem>
                  <SelectItem value="C" className="text-white hover:bg-gray-600">°C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackForm;