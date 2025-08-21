import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrackConditionsData {
  temperature: string;
  weather: 'sunny' | 'cloudy' | '';
  trackSurface: 'dry' | 'wet' | '';
}

interface TrackConditionsFormProps {
  data: TrackConditionsData;
  onChange: (field: keyof TrackConditionsData, value: string) => void;
}

const TrackConditionsForm: React.FC<TrackConditionsFormProps> = ({ data, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Conditions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="temperature">Temperature (°F)</Label>
            <Input
              id="temperature"
              type="number"
              value={data.temperature}
              onChange={(e) => onChange('temperature', e.target.value)}
              placeholder="75"
            />
          </div>
          
          <div>
            <Label htmlFor="weather">Weather</Label>
            <Select value={data.weather} onValueChange={(value) => onChange('weather', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select weather" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunny">Sunny</SelectItem>
                <SelectItem value="cloudy">Cloudy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="trackSurface">Track Surface</Label>
            <Select value={data.trackSurface} onValueChange={(value) => onChange('trackSurface', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select surface" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dry">Dry</SelectItem>
                <SelectItem value="wet">Wet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackConditionsForm;