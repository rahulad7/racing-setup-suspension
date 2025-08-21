import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Track {
  id: string;
  name: string;
  submission_count: number;
  is_approved: boolean;
  country?: string;
  region?: string;
  track_type?: string;
}

interface EnhancedGlobalTrackSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const EnhancedGlobalTrackSelector: React.FC<EnhancedGlobalTrackSelectorProps> = ({ 
  value, 
  onChange, 
  disabled = false
}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [customTrack, setCustomTrack] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const { toast } = useToast();

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'OTHER', name: 'Other', flag: '🌍' }
  ];

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    filterTracks();
  }, [tracks, searchTerm, countryFilter]);

  const loadTracks = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-tracks-global');
      if (error) throw error;
      setTracks(data.tracks || []);
    } catch (error) {
      console.error('Error loading tracks:', error);
      // Fallback to hardcoded tracks if function fails
      const fallbackTracks = [
        { id: '1', name: 'Road America', submission_count: 10, is_approved: true, country: 'US', region: 'midwest', track_type: 'road' },
        { id: '2', name: 'Watkins Glen', submission_count: 10, is_approved: true, country: 'US', region: 'northeast', track_type: 'road' },
        { id: '3', name: 'Laguna Seca', submission_count: 10, is_approved: true, country: 'US', region: 'west', track_type: 'road' },
        { id: '4', name: 'Sebring', submission_count: 10, is_approved: true, country: 'US', region: 'south', track_type: 'road' },
        { id: '5', name: 'VIR', submission_count: 10, is_approved: true, country: 'US', region: 'south', track_type: 'road' },
        { id: '6', name: 'COTA', submission_count: 10, is_approved: true, country: 'US', region: 'south', track_type: 'road' },
        { id: '7', name: 'Road Atlanta', submission_count: 10, is_approved: true, country: 'US', region: 'south', track_type: 'road' },
        { id: '8', name: 'Mid-Ohio', submission_count: 10, is_approved: true, country: 'US', region: 'midwest', track_type: 'road' },
        { id: '9', name: 'Barber Motorsports', submission_count: 10, is_approved: true, country: 'US', region: 'south', track_type: 'road' },
        { id: '10', name: 'Lime Rock', submission_count: 10, is_approved: true, country: 'US', region: 'northeast', track_type: 'road' }
      ];
      setTracks(fallbackTracks);
    }
  };

  const filterTracks = () => {
    let filtered = tracks.filter(track => track.is_approved);
    
    if (searchTerm) {
      filtered = filtered.filter(track => 
        track.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (countryFilter !== 'all') {
      filtered = filtered.filter(track => track.country === countryFilter);
    }
    
    setFilteredTracks(filtered);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log('Enhanced global track selected:', selectedValue);
    
    if (selectedValue === 'Other') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      onChange(selectedValue);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryFilter(e.target.value);
  };

  const handleSelectedCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handleCustomSubmit = async () => {
    if (!customTrack.trim()) return;
    
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('submit-track-global', {
        body: { 
          trackName: customTrack.trim(),
          country: selectedCountry,
          trackType: 'road'
        }
      });
      
      if (error) throw error;
      
      toast({
        title: data.approved ? 'Track Added!' : 'Track Submitted',
        description: data.message
      });
      
      onChange(customTrack.trim());
      setCustomTrack('');
      setShowCustomInput(false);
      
      if (data.approved) {
        await loadTracks();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit track name',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 p-3 bg-slate-50 rounded border">
        <Input
          placeholder="Search tracks globally..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        
        <select
          value={countryFilter}
          onChange={handleCountryChange}
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        >
          <option value="all">All Countries</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.name}
            </option>
          ))}
        </select>
      </div>
      
      <select
        value={showCustomInput ? 'Other' : (value || '')}
        onChange={handleSelectChange}
        disabled={disabled}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled>
          Select or enter track name
        </option>
        {/* Show loaded track name even if not in the list */}
        {value && !filteredTracks.find(track => track.name === value) && value !== 'Other' && (
          <option value={value}>
            🏁 {value} (Loaded Setup)
          </option>
        )}
        {filteredTracks.map((track) => (
          <option key={track.id} value={track.name}>
            {countries.find(c => c.code === track.country)?.flag || '🌍'} {track.name}
          </option>
        ))}
        <option value="Other">Enter custom track...</option>
      </select>
      
      {showCustomInput && (
        <div className="space-y-2 p-3 border rounded bg-slate-50">
          <select
            value={selectedCountry}
            onChange={handleSelectedCountryChange}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
          
          <Input
            value={customTrack}
            onChange={(e) => setCustomTrack(e.target.value)}
            placeholder="Enter track name"
            disabled={isSubmitting}
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleCustomSubmit}
              disabled={!customTrack.trim() || isSubmitting}
              size="sm"
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Track'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowCustomInput(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedGlobalTrackSelector;