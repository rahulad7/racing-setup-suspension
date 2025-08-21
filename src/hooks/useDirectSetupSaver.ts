import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const useDirectSetupSaver = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveSetup = async (setupData: any, setupName: string, trackName?: string) => {
    setSaving(true);
    setError(null);

    try {
      // First, ensure we have a vehicle
      let vehicleId = setupData.vehicleId;
      
      if (!vehicleId) {
        // Create a default vehicle
        const { data: vehicle, error: vehicleError } = await supabase
          .from('vehicles')
          .insert({
            name: setupData.vehicleName || 'Default Vehicle',
            make: setupData.make || 'Unknown',
            model: setupData.model || 'Unknown',
            year: setupData.year || '2024',
            car_type: setupData.carType || 'Sports Car',
            track_type: setupData.trackType || 'Road Course'
          })
          .select()
          .single();

        if (vehicleError) throw vehicleError;
        vehicleId = vehicle.id;
      }

      // Save the setup
      // Save the setup - use upsert to handle conflicts
      const { data, error: setupError } = await supabase
        .from('vehicle_setups')
        .upsert({
          name: setupName,
          vehicle_id: vehicleId,
          track_name: trackName || 'Unknown Track',
          data: setupData,
          notes: setupData.notes || ''
        }, {
          onConflict: 'name,vehicle_id,track_name'
        })
        .select()
        .single();

      if (setupError) throw setupError;

      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to save setup');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { saveSetup, saving, error };
};