import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface EnhancedTrackSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const EnhancedTrackSelector: React.FC<EnhancedTrackSelectorProps> = ({ 
  value, 
  onChange, 
  disabled = false 
}) => {
  const [tracks, setTracks] = useState<string[]>([]);
  const [customTrack, setCustomTrack] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-tracks');
      if (error) throw error;
      setTracks(data.tracks || []);
    } catch (error) {
      console.error('Error loading tracks:', error);
      setTracks([
        'Road Atlanta', 'VIRginia International Raceway', 'Sebring International Raceway',
        'Daytona International Speedway', 'Watkins Glen International', 'Laguna Seca',
        'Other'
      ]);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log('Enhanced track selected:', selectedValue);
    
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
      const { data, error } = await supabase.functions.invoke('submit-track', {
        body: { trackName: customTrack.trim() }
      });
      
      if (error) throw error;
      
      toast({
        title: data.approved ? 'Track Added!' : 'Track Submitted',
        description: data.message,
        variant: data.approved ? 'default' : 'default'
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
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Track Selection *
      </Label>
      
      <select
        value={showCustomInput ? 'Other' : value || ''}
        onChange={handleSelectChange}
        disabled={disabled}
        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="" disabled>
          Select or enter track name
        </option>
        {tracks.map((track) => (
          <option key={track} value={track}>
            {track}
          </option>
        ))}
      </select>
      
      {showCustomInput && (
        <div className="flex gap-2 mt-2">
          <Input
            value={customTrack}
            onChange={(e) => setCustomTrack(e.target.value)}
            placeholder="Enter track name"
            disabled={isSubmitting}
          />
          <Button 
            onClick={handleCustomSubmit}
            disabled={!customTrack.trim() || isSubmitting}
            size="sm"
          >
            {isSubmitting ? '...' : <Plus className="h-4 w-4" />}
          </Button>
        </div>
      )}
      
      {showCustomInput && (
        <p className="text-xs text-slate-500">
          Track will be added to the list once 5+ users submit the same name
        </p>
      )}
    </div>
  );
};

export default EnhancedTrackSelector;