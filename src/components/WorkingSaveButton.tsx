import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

interface WorkingSaveButtonProps {
  setupData: any;
  setupName?: string;
  vehicleName?: string;
  trackName?: string;
}

export default function WorkingSaveButton({ 
  setupData, 
  setupName = 'New Setup',
  vehicleName = 'Unknown Vehicle',
  trackName = 'Unknown Track'
}: WorkingSaveButtonProps) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setMessage('Please log in to save setups');
        return;
      }

      const setupRecord = {
        user_id: user.id,
        setup_name: setupName,
        vehicle_name: vehicleName,
        track_name: trackName,
        setup_data: setupData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('vehicle_setups')
        .insert([setupRecord]);

      if (error) {
        console.error('Save error:', error);
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Setup saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage('Failed to save setup');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button 
        onClick={handleSave} 
        disabled={saving}
        className="flex items-center gap-2"
      >
        <Save size={16} />
        {saving ? 'Saving...' : 'Save Setup'}
      </Button>
      {message && (
        <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}