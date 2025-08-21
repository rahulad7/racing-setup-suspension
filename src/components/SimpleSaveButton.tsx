import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface SimpleSaveButtonProps {
  allSetupData: any;
  className?: string;
}

const SimpleSaveButton: React.FC<SimpleSaveButtonProps> = ({ 
  allSetupData, 
  className = '' 
}) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = useAuth();
  const { currentVehicle } = useAppContext();

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
      // Create or get default vehicle if none selected
      let vehicleId = currentVehicle?.id;
      
      if (!vehicleId) {
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
        vehicleId = vehicle.id;
      }

      // Extract track name from setup data
      const trackName = allSetupData?.track?.name || 
                       allSetupData?.trackData?.name || 
                       'Unknown Track';

      const setupName = `Setup - ${new Date().toLocaleString()}`;

      // Save the setup
      const { error } = await supabase
        .from('vehicle_setups')
        .insert({
          name: setupName,
          vehicle_id: vehicleId,
          user_id: user.id,
          track_name: trackName,
          data: allSetupData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSaved(true);
      toast({
        title: 'Setup Saved!',
        description: `Setup saved successfully`,
      });
      
      // Reset saved status after 2 seconds
      setTimeout(() => setSaved(false), 2000);
      
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: 'Save Failed',
        description: 'Unable to save setup. Please try again.',
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
      className={`${saved ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors ${className}`}
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

export default SimpleSaveButton;