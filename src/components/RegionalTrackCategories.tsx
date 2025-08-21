import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  country: string;
  region: string;
  track_type: string;
}

interface RegionalTrackCategoriesProps {
  tracks: Track[];
  onTrackSelect: (trackName: string) => void;
  selectedTrack?: string;
}

const RegionalTrackCategories: React.FC<RegionalTrackCategoriesProps> = ({
  tracks,
  onTrackSelect,
  selectedTrack
}) => {
  const regions = {
    'North America': { flag: '🇺🇸', tracks: [] as Track[] },
    'Europe': { flag: '🇪🇺', tracks: [] as Track[] },
    'Asia': { flag: '🌏', tracks: [] as Track[] },
    'Oceania': { flag: '🇦🇺', tracks: [] as Track[] },
    'South America': { flag: '🇧🇷', tracks: [] as Track[] },
    'Africa': { flag: '🌍', tracks: [] as Track[] },
    'Middle East': { flag: '🏜️', tracks: [] as Track[] }
  };

  // Group tracks by region
  tracks.forEach(track => {
    if (regions[track.region as keyof typeof regions]) {
      regions[track.region as keyof typeof regions].tracks.push(track);
    }
  });

  const getTrackTypeIcon = (type: string) => {
    switch (type) {
      case 'road': return '🏁';
      case 'oval': return '⭕';
      case 'street': return '🏙️';
      case 'karting': return '🏎️';
      default: return '🏁';
    }
  };

  const getCountryFlag = (countryCode: string) => {
    const flags: { [key: string]: string } = {
      'US': '🇺🇸', 'CA': '🇨🇦', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷',
      'IT': '🇮🇹', 'ES': '🇪🇸', 'JP': '🇯🇵', 'AU': '🇦🇺', 'BR': '🇧🇷',
      'MX': '🇲🇽', 'BE': '🇧🇪', 'NL': '🇳🇱', 'HU': '🇭🇺', 'AT': '🇦🇹',
      'MY': '🇲🇾', 'SG': '🇸🇬', 'CN': '🇨🇳', 'ZA': '🇿🇦', 'AE': '🇦🇪',
      'BH': '🇧🇭', 'MC': '🇲🇨'
    };
    return flags[countryCode] || '🌍';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Global Track Categories</h3>
      </div>
      
      {Object.entries(regions).map(([regionName, regionData]) => {
        if (regionData.tracks.length === 0) return null;
        
        return (
          <div key={regionName} className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{regionData.flag}</span>
              <h4 className="font-semibold">{regionName}</h4>
              <Badge variant="secondary">{regionData.tracks.length} tracks</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {regionData.tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => onTrackSelect(track.name)}
                  className={`p-3 text-left border rounded-lg hover:bg-slate-50 transition-colors ${
                    selectedTrack === track.name ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span>{getCountryFlag(track.country)}</span>
                    <span className="font-medium text-sm">{track.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{getTrackTypeIcon(track.track_type)}</span>
                    <span className="capitalize">{track.track_type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RegionalTrackCategories;