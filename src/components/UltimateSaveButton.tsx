import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';
import { Save, Loader2, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface UltimateSaveButtonProps {
  setupData: any;
  className?: string;
}

const UltimateSaveButton: React.FC<UltimateSaveButtonProps> = ({ setupData, className }) => {
  const [setupName, setSetupName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const { user } = useAuth();
  const { currentVehicle, currentTrack } = useAppContext();

  const handleSave = async () => {
    setIsSaving(true);
    setDebugInfo('Starting save process...');
    
    try {
      // Step 1: Validate user
      if (!user?.id) {
        throw new Error('No authenticated user found');
      }
      setDebugInfo(`User authenticated: ${user.id}`);

      // Step 2: Validate setup name
      if (!setupName.trim()) {
        throw new Error('Setup name is required');
      }
      setDebugInfo(`Setup name: ${setupName}`);

      // Step 3: Create or get vehicle
      let vehicleId = currentVehicle?.id;
      if (!vehicleId) {
        setDebugInfo('Creating default vehicle...');
        const { data: newVehicle, error: vehicleError } = await supabase
          .from('vehicles')
          .insert({
            user_id: user.id,
            name: 'Default Vehicle',
            make: 'Unknown',
            model: 'Unknown',
            year: new Date().getFullYear(),
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (vehicleError) throw vehicleError;
        vehicleId = newVehicle.id;
        setDebugInfo(`Created vehicle: ${vehicleId}`);
      }

      // Step 4: Prepare data for save
      const saveData = {
        user_id: user.id,
        vehicle_id: vehicleId,
        setup_name: setupName.trim(),
        track_name: currentTrack?.name || 'Unknown Track',
        data: setupData || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setDebugInfo('Inserting into database...');
      console.log('Save data:', saveData);

      // Step 5: Save to database
      const { data: savedSetup, error: saveError } = await supabase
        .from('vehicle_setups')
        .insert(saveData)
        .select()
        .single();

      if (saveError) {
        console.error('Database error:', saveError);
        throw saveError;
      }

      setDebugInfo(`Successfully saved: ${savedSetup.id}`);
      console.log('Saved setup:', savedSetup);

      // Success!
      setSetupName('');
      toast({
        title: 'Success!',
        description: `Setup "${setupName}" saved successfully`,
      });

    } catch (error: any) {
      console.error('Save failed:', error);
      setDebugInfo(`Error: ${error.message}`);
      toast({
        title: 'Save Failed',
        description: error.message || 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Enter setup name..."
          value={setupName}
          onChange={(e) => setSetupName(e.target.value)}
          className="flex-1"
          disabled={isSaving}
        />
        <Button 
          onClick={handleSave}
          disabled={isSaving || !setupName.trim()}
          className="min-w-[100px]"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Setup
            </>
          )}
        </Button>
      </div>
      
      {debugInfo && (
        <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded">
          <AlertCircle className="w-3 h-3 inline mr-1" />
          {debugInfo}
        </div>
      )}
      
      {user && (
        <div className="text-xs text-green-600">
          ✓ User: {user.email} ({user.id})
        </div>
      )}
    </div>
  );
};

export default UltimateSaveButton;