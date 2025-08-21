import React from 'react';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface TrackSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const POPULAR_TRACKS = [
  'Road Atlanta',
  'VIRginia International Raceway',
  'Sebring International Raceway',
  'Daytona International Speedway',
  'Watkins Glen International',
  'Laguna Seca',
  'Sonoma Raceway',
  'Road America',
  'Mid-Ohio Sports Car Course',
  'Barber Motorsports Park',
  'Circuit of the Americas',
  'Lime Rock Park',
  'Thompson Speedway',
  'New Jersey Motorsports Park',
  'Summit Point Raceway',
  'Pocono Raceway',
  'Charlotte Motor Speedway',
  'Atlanta Motor Speedway',
  'Homestead-Miami Speedway',
  'Other'
];

const TrackSelector: React.FC<TrackSelectorProps> = ({ value, onChange, disabled = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('Track selected:', e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="track-selector" className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Track Selection *
      </Label>
      <select
        id="track-selector"
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled>
          Select the track you're setting up for
        </option>
        {POPULAR_TRACKS.map((track) => (
          <option key={track} value={track}>
            {track}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TrackSelector;