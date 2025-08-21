import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface DebugSaveButtonProps {
  allSetupData: any;
  className?: string;
}

const DebugSaveButton: React.FC<DebugSaveButtonProps> = ({ 
  allSetupData, 
  className = '' 
}) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');
  const { user } = useAuth();
  const { currentVehicle } = useAppContext();

  const handleSave = async () => {
    let debugLog = 'Starting save process...\n';
    
    try {
      // Debug: Check user
      debugLog += `User check: ${user ? `Logged in as ${user.email}` : 'No user found'}\n`;
      
      if (!user) {
        debugLog += 'FAILED: No user authentication\n';
        setDebugInfo(debugLog);
        toast({
          title: 'Please Sign In',
          description: 'You need to be signed in to save setups',
          variant: 'destructive',
        });
        return;
      }

      setSaving(true);
      setSaved(false);
      
      // Debug: Check current vehicle
      debugLog += `Current vehicle: ${currentVehicle ? currentVehicle.vehicle_name : 'None selected'}\n`;
      
      let vehicleId = currentVehicle?.id;
      
      if (!vehicleId) {
        debugLog += 'Creating default vehicle...\n';
        
        const vehicleData = {
          name: 'My Race Car',
          make: 'Unknown',
          model: 'Unknown', 
          year: '2024',
          user_id: user.id
        };
        
        debugLog += `Vehicle data: ${JSON.stringify(vehicleData)}\n`;
        
        const { data: vehicle, error: vehicleError } = await supabase
          .from('vehicles')
      const { error } = await supabase
        .from('vehicle_setups')
        .insert({
          setup_name: setupName,
          vehicle_id: vehicleId,
          user_id: user.id,
          track_name: trackName,
          data: allSetupData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }

      // Debug: Setup data
      const trackName = allSetupData?.track?.name || 
                       allSetupData?.trackData?.name || 
                       'Unknown Track';
      const setupName = `Setup - ${new Date().toLocaleString()}`;
      
      debugLog += `Track name: ${trackName}\n`;
      debugLog += `Setup name: ${setupName}\n`;
      debugLog += `Setup data size: ${JSON.stringify(allSetupData).length} chars\n`;

      const setupData = {
        name: setupName,
        vehicle_id: vehicleId,
        user_id: user.id,
        track_name: trackName,
        data: allSetupData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      debugLog += `Final setup data: ${JSON.stringify(setupData, null, 2)}\n`;

      // Save the setup
      debugLog += 'Attempting database insert...\n';
      const { error } = await supabase
        .from('vehicle_setups')
        .insert(setupData);

      if (error) {
        debugLog += `Database error: ${JSON.stringify(error)}\n`;
        throw error;
      }

      debugLog += 'SUCCESS: Setup saved to database\n';
      setSaved(true);
      setDebugInfo(debugLog);
      
      toast({
        title: 'Setup Saved!',
        description: `Setup saved successfully`,
      });
      
      setTimeout(() => setSaved(false), 2000);
      
    } catch (error: any) {
      debugLog += `FINAL ERROR: ${JSON.stringify(error)}\n`;
      setDebugInfo(debugLog);
      
      console.error('FULL DEBUG LOG:', debugLog);
      console.error('Save error:', error);
      
      toast({
        title: 'Save Failed',
        description: `Error: ${error.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2">
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
            Debug Save
          </>
        )}
      </Button>
      
      {debugInfo && (
        <div className="text-xs bg-gray-100 p-2 rounded max-h-40 overflow-y-auto">
          <pre className="whitespace-pre-wrap">{debugInfo}</pre>
        </div>
      )}
    </div>
  );
};

export default DebugSaveButton;