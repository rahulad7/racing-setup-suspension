import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, Plus, Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Track {
  id: string;
  name: string;
  submission_count: number;
  is_approved: boolean;
  region?: string;
  track_type?: string;
}

interface EnhancedTrackSelectorV2Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isAdmin?: boolean;
}

const EnhancedTrackSelectorV2: React.FC<EnhancedTrackSelectorV2Props> = ({ 
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
  const [regionFilter, setRegionFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTracks();
  }, []);

  useEffect(() => {
    filterTracks();
  }, [tracks, searchTerm, regionFilter]);

  const loadTracks = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-tracks-enhanced');
      if (error) throw error;
      setTracks(data.tracks || []);
    } catch (error) {
      console.error('Error loading tracks:', error);
      const defaultTracks = [
        { id: '1', name: 'Road Atlanta', is_approved: true, region: 'south', track_type: 'road', submission_count: 10 },
        { id: '2', name: 'VIRginia International Raceway', is_approved: true, region: 'east', track_type: 'road', submission_count: 10 },
        { id: '3', name: 'Sebring International Raceway', is_approved: true, region: 'south', track_type: 'road', submission_count: 10 },
        { id: '4', name: 'Laguna Seca', is_approved: true, region: 'west', track_type: 'road', submission_count: 10 }
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
    
    if (regionFilter !== 'all') {
      filtered = filtered.filter(track => track.region === regionFilter);
    }
    
    setFilteredTracks(filtered.map(t => t.name));
  };

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === 'Other') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      onChange(selectedValue);
    }
  };

  const handleCustomSubmit = async () => {
    if (!customTrack.trim()) return;
    
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('submit-track-enhanced', {
        body: { 
          trackName: customTrack.trim(),
          region: 'east',
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

  const pendingTracks = tracks.filter(t => !t.is_approved);
  const hasActiveFilters = searchTerm || regionFilter !== 'all';

  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Track Selection *
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
              placeholder="Search tracks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="east">East</SelectItem>
                <SelectItem value="west">West</SelectItem>
                <SelectItem value="south">South</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {hasActiveFilters && (
            <div className="flex gap-1">
              {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
              {regionFilter !== 'all' && <Badge variant="secondary">Region: {regionFilter}</Badge>}
            </div>
          )}
        </div>
      )}
      
      <Select value={showCustomInput ? 'Other' : value} onValueChange={handleSelectChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder="Select or enter track name" />
        </SelectTrigger>
        <SelectContent>
          {filteredTracks.map((track) => (
            <SelectItem key={track} value={track}>
              {track}
            </SelectItem>
          ))}
          <SelectItem value="Other">Enter custom track...</SelectItem>
        </SelectContent>
      </Select>
      
      {showCustomInput && (
        <div className="space-y-2 p-3 border rounded bg-slate-50">
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
      
      {isAdmin && pendingTracks.length > 0 && (
        <div className="p-3 border rounded bg-blue-50">
          <h4 className="font-medium mb-2">Admin: Pending Tracks ({pendingTracks.length})</h4>
          {pendingTracks.slice(0, 3).map((track) => (
            <div key={track.id} className="flex justify-between items-center text-sm">
              <span>{track.name} ({track.submission_count} submissions)</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedTrackSelectorV2;