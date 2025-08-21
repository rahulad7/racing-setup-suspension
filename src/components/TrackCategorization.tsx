import React from 'react';
import { MapPin, Flag, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface TrackCategorizationProps {
  region: string;
  onRegionChange: (region: string) => void;
  trackType: string;
  onTrackTypeChange: (type: string) => void;
  disabled?: boolean;
}

const TrackCategorization: React.FC<TrackCategorizationProps> = ({
  region,
  onRegionChange,
  trackType,
  onTrackTypeChange,
  disabled = false
}) => {
  const regions = [
    { value: 'east', label: 'East Coast', icon: '🌊' },
    { value: 'west', label: 'West Coast', icon: '🏔️' },
    { value: 'midwest', label: 'Midwest', icon: '🌾' },
    { value: 'south', label: 'South', icon: '🌴' },
    { value: 'international', label: 'International', icon: '🌍' }
  ];

  const trackTypes = [
    { value: 'road', label: 'Road Course', icon: '🏁' },
    { value: 'oval', label: 'Oval', icon: '⭕' },
    { value: 'street', label: 'Street Circuit', icon: '🏙️' },
    { value: 'karting', label: 'Karting', icon: '🏎️' }
  ];

  return (
    <div className="space-y-4 p-3 bg-slate-50 rounded-lg border">
      <div className="flex items-center gap-2 mb-2">
        <Globe className="h-4 w-4 text-slate-600" />
        <span className="font-medium text-sm">Track Categories</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-xs">
            <MapPin className="h-3 w-3" />
            Region
          </Label>
          <Select value={region} onValueChange={onRegionChange} disabled={disabled}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  <div className="flex items-center gap-2">
                    <span>{r.icon}</span>
                    <span>{r.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-xs">
            <Flag className="h-3 w-3" />
            Track Type
          </Label>
          <Select value={trackType} onValueChange={onTrackTypeChange} disabled={disabled}>
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {trackTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  <div className="flex items-center gap-2">
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {(region || trackType) && (
        <div className="flex gap-1 flex-wrap">
          {region && (
            <Badge variant="secondary" className="text-xs">
              {regions.find(r => r.value === region)?.icon} {regions.find(r => r.value === region)?.label}
            </Badge>
          )}
          {trackType && (
            <Badge variant="secondary" className="text-xs">
              {trackTypes.find(t => t.value === trackType)?.icon} {trackTypes.find(t => t.value === trackType)?.label}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackCategorization;