import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface ImprovedSaveButtonProps {
  allSetupData: any;
  className?: string;
}

const ImprovedSaveButton: React.FC<ImprovedSaveButtonProps> = ({ 
  allSetupData, 
  className = '' 
}) => {
  const [saving, setSaving] = useState(false);
  const [setupName, setSetupName] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

    const finalSetupName = setupName.trim() || `Setup - ${new Date().toLocaleString()}`;
    setSaving(true);
    setSaveStatus('idle');

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

      // Save the setup
      const { data, error } = await supabase
        .from('vehicle_setups')
        .insert({
          name: finalSetupName,
          vehicle_id: vehicleId,
          user_id: user.id,
          track_name: trackName,
          data: allSetupData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setSaveStatus('success');
      toast({
        title: 'Setup Saved!',
        description: `"${finalSetupName}" saved successfully`,
      });
      
      setSetupName('');
      
      // Reset success status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
      
    } catch (error: any) {
      console.error('Save error:', error);
      setSaveStatus('error');
      toast({
        title: 'Save Failed',
        description: error.message || 'Unable to save setup. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const getButtonContent = () => {
    if (saving) {
      return (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Saving...
        </>
      );
    }
    
    if (saveStatus === 'success') {
      return (
        <>
          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
          Saved!
        </>
      );
    }
    
    if (saveStatus === 'error') {
      return (
        <>
          <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
          Try Again
        </>
      );
    }
    
    return (
      <>
        <Save className="h-4 w-4 mr-2" />
        Save Setup
      </>
    );
  };

  const getButtonColor = () => {
    if (saveStatus === 'success') return 'bg-green-600 hover:bg-green-700';
    if (saveStatus === 'error') return 'bg-red-600 hover:bg-red-700';
    return 'bg-blue-600 hover:bg-blue-700';
  };

  return (
    <div className={`space-y-3 p-4 bg-gray-50 rounded-lg border ${className}`}>
      <div className="space-y-2">
        <Label htmlFor="setup-name">Setup Name (Optional)</Label>
        <Input
          id="setup-name"
          type="text"
          placeholder="Enter setup name or leave blank for auto-name..."
          value={setupName}
          onChange={(e) => setSetupName(e.target.value)}
          className="w-full"
        />
      </div>
      
      {currentVehicle && (
        <div className="p-2 bg-blue-50 rounded border">
          <p className="text-sm text-blue-700">
            Saving to: <strong>{currentVehicle.vehicle_name}</strong>
          </p>
        </div>
      )}
      
      <Button
        onClick={handleSave}
        disabled={saving}
        className={`${getButtonColor()} text-white w-full transition-colors`}
        size="sm"
      >
        {getButtonContent()}
      </Button>
    </div>
  );
};

export default ImprovedSaveButton;