import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

interface EmergencySaveButtonProps {
  formData: any;
  setupName?: string;
  trackName?: string;
}

export const EmergencySaveButton: React.FC<EmergencySaveButtonProps> = ({
  formData,
  setupName = 'Emergency Save',
  trackName = 'Unknown Track'
}) => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setMessage('Starting save...');

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        setMessage('ERROR: Not authenticated');
        setSaving(false);
        return;
      }

      setMessage(`User found: ${user.id}`);

      // Create the setup data
      const setupData = {
        user_id: user.id,
        vehicle_id: null, // Allow null
        setup_name: setupName,
        track_name: trackName,
        data: formData || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setMessage('Inserting data...');

      // Direct insert
      const { data, error } = await supabase
        .from('vehicle_setups')
        .insert([setupData])
        .select();

      if (error) {
        setMessage(`ERROR: ${error.message}`);
        console.error('Save error:', error);
      } else {
        setMessage(`SUCCESS! Saved setup ID: ${data[0]?.id}`);
        console.log('Saved successfully:', data);
      }
    } catch (err) {
      setMessage(`EXCEPTION: ${err}`);
      console.error('Exception:', err);
    }

    setSaving(false);
  };

  return (
    <div className="space-y-2">
      <Button 
        onClick={handleSave} 
        disabled={saving}
        className="w-full bg-red-600 hover:bg-red-700"
      >
        {saving ? 'EMERGENCY SAVING...' : 'EMERGENCY SAVE'}
      </Button>
      {message && (
        <div className="text-sm p-2 bg-gray-100 rounded">
          {message}
        </div>
      )}
    </div>
  );
};