import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, Plus, Search, Filter, Globe } from 'lucide-react';
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

interface GlobalTrackSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isAdmin?: boolean;
}

const GlobalTrackSelector: React.FC<GlobalTrackSelectorProps> = ({ 
  value, 
  onChange, 
  disabled = false,
  isAdmin = false
}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<string[]>([]);
  const [customTrack, setCustomTrack] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const { toast } = useToast();

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
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
      const defaultTracks = [
        { id: '1', name: 'Road Atlanta', is_approved: true, country: 'US', track_type: 'road', submission_count: 10 },
        { id: '2', name: 'Silverstone Circuit', is_approved: true, country: 'GB', track_type: 'road', submission_count: 10 },
        { id: '3', name: 'Nürburgring', is_approved: true, country: 'DE', track_type: 'road', submission_count: 10 },
        { id: '4', name: 'Suzuka Circuit', is_approved: true, country: 'JP', track_type: 'road', submission_count: 10 }
      ];
      setTracks(defaultTracks);
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
    
    setFilteredTracks(filtered.map(t => t.name));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log('Global track selected:', selectedValue);
    
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

  const handleCountrySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  const hasActiveFilters = searchTerm || countryFilter !== 'all';

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2">
        <Globe className="h-4 w-4" />
        Global Track Selection *
      </Label>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowFilters(!showFilters)}
        className="w-full"
      >
        <Filter className="h-3 w-3 mr-2" />
        {showFilters ? 'Hide' : 'Show'} Search & Filters
      </Button>
      
      {showFilters && (
        <div className="space-y-2 p-3 bg-slate-50 rounded border">
          <div className="flex gap-2">
            <Input
              placeholder="Search tracks globally..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <select
              value={countryFilter}
              onChange={handleCountryChange}
              className="w-40 px-3 py-2 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>
          {hasActiveFilters && (
            <div className="flex gap-1">
              {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
              {countryFilter !== 'all' && (
                <Badge variant="secondary">
                  {countries.find(c => c.code === countryFilter)?.flag} {countries.find(c => c.code === countryFilter)?.name}
                </Badge>
              )}
            </div>
          )}
        </div>
      )}
      
      <select
        value={showCustomInput ? 'Other' : value || ''}
        onChange={handleSelectChange}
        disabled={disabled}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled>
          Select or enter track name
        </option>
        {filteredTracks.map((track) => (
          <option key={track} value={track}>
            {track}
          </option>
        ))}
        <option value="Other">Enter custom track...</option>
      </select>
      
      {showCustomInput && (
        <div className="space-y-2 p-3 border rounded bg-slate-50">
          <select
            value={selectedCountry}
            onChange={handleCountrySelectChange}
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
              {isSubmitting ? 'Submitting...' : <><Plus className="h-4 w-4 mr-1" /> Submit Track</>}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowCustomInput(false)}>
              Cancel
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            Track will be added to the list once 5+ users submit the same name
          </p>
        </div>
      )}
    </div>
  );
};

export default GlobalTrackSelector;