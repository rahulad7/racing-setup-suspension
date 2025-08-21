import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface FixedSaveButtonProps {
  allSetupData: any;
  className?: string;
}

const FixedSaveButton: React.FC<FixedSaveButtonProps> = ({ 
  allSetupData, 
  className = '' 
}) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Please Sign In',
        description: 'You need to be signed in to save setups',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    setSaved(false);

    try {
      // Create default vehicle
      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .insert({
          name: 'My Race Car',
          make: 'Unknown',
          model: 'Unknown', 
          year: '2024',
          user_id: user.id
        })
        .select()
        .single();

      if (vehicleError) throw vehicleError;

      const setupName = `Setup - ${new Date().toLocaleString()}`;
      const trackName = 'Unknown Track';

      // Save setup with correct column name
      const { error } = await supabase
        .from('vehicle_setups')
        .insert({
          setup_name: setupName,
          vehicle_id: vehicle.id,
          user_id: user.id,
          track_name: trackName,
          data: allSetupData
        });

      if (error) throw error;

      setSaved(true);
      toast({
        title: 'Setup Saved!',
        description: 'Setup saved successfully',
      });
      
      setTimeout(() => setSaved(false), 2000);
      
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: 'Save Failed',
        description: error.message || 'Unable to save setup',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={saving}
      className={`${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white ${className}`}
      size="sm"
    >
      {saving ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Saving...
        </>
      ) : saved ? (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          Saved!
        </>
      ) : (
        <>
          <Save className="h-4 w-4 mr-2" />
          Save Setup
        </>
      )}
    </Button>
  );
};

export default FixedSaveButton;