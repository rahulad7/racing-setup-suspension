import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';
import { useLicensePlan } from '@/hooks/useLicensePlan';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import SaveSetupLicenseModal from './SaveSetupLicenseModal';
import VehicleSelector from './VehicleSelector';
import SetupNameSelector from './SetupNameSelector';

interface SaveButtonCompleteProps {
  allSetupData: any;
  vehicleId?: string;
  className?: string;
}

const SaveButtonComplete: React.FC<SaveButtonCompleteProps> = ({ 
  allSetupData, 
  vehicleId,
  className = '' 
}) => {
  const [saving, setSaving] = useState(false);
  const [setupName, setSetupName] = useState('');
  const [isExistingSetup, setIsExistingSetup] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const { user } = useAuth();
  const { currentVehicle, setCurrentSetup } = useAppContext();
  const { isLicenseValid } = useLicensePlan();
  
  const selectedVehicleId = currentVehicle?.id || vehicleId || null;
  
  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to save your setup',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedVehicleId) {
      toast({
        title: 'Vehicle Required',
        description: 'Please select a vehicle to save this setup under',
        variant: 'destructive',
      });
      return;
    }

    if (!isLicenseValid) {
      setShowLicenseModal(true);
      return;
    }

    const finalSetupName = setupName.trim() || `Setup - ${new Date().toLocaleDateString()}`;

    setSaving(true);
    try {
      const trackName = allSetupData?.track || null;

      const setupData = {
        setup_name: finalSetupName,
        vehicle_id: selectedVehicleId,
        user_id: user.id,
        track_name: trackName,
        // Vehicle data
        car_weight: allSetupData?.vehicle?.weight || '',
        notes: allSetupData?.vehicle?.notes || '',
        // Suspension data
        shock_brand: allSetupData?.suspension?.shockBrand || '',
        shock_model: allSetupData?.suspension?.shockModel || '',
        shock_type: allSetupData?.suspension?.shockType || '',
        rear_shock_brand: allSetupData?.suspension?.rearShockBrand || '',
        rear_shock_model: allSetupData?.suspension?.rearShockModel || '',
        rear_shock_type: allSetupData?.suspension?.rearShockType || '',
        compression_clicks: allSetupData?.suspension?.compressionClicks || '',
        rebound_clicks: allSetupData?.suspension?.reboundClicks || '',
        single_adjustment_clicks: allSetupData?.suspension?.singleAdjustmentClicks || '',
        rear_compression_clicks: allSetupData?.suspension?.rearCompressionClicks || '',
        rear_rebound_clicks: allSetupData?.suspension?.rearReboundClicks || '',
        rear_single_adjustment_clicks: allSetupData?.suspension?.rearSingleAdjustmentClicks || '',
        high_speed_compression_front: allSetupData?.suspension?.highSpeedCompressionFront || '',
        low_speed_compression_front: allSetupData?.suspension?.lowSpeedCompressionFront || '',
        high_speed_compression_rear: allSetupData?.suspension?.highSpeedCompressionRear || '',
        low_speed_compression_rear: allSetupData?.suspension?.lowSpeedCompressionRear || '',
        front_spring_rate: allSetupData?.suspension?.frontSpringRate || '',
        rear_spring_rate: allSetupData?.suspension?.rearSpringRate || '',
        spring_rate_unit: allSetupData?.suspension?.springRateUnit || '',
        ride_height_fl: allSetupData?.suspension?.rideHeightFL || '',
        ride_height_fr: allSetupData?.suspension?.rideHeightFR || '',
        ride_height_rl: allSetupData?.suspension?.rideHeightRL || '',
        ride_height_rr: allSetupData?.suspension?.rideHeightRR || '',
        front_reservoir_pressure: allSetupData?.suspension?.frontReservoirPressure || '',
        rear_reservoir_pressure: allSetupData?.suspension?.rearReservoirPressure || '',
        front_has_reservoir: allSetupData?.suspension?.frontHasReservoir || false,
        rear_has_reservoir: allSetupData?.suspension?.rearHasReservoir || false,
        // Tire data
        tire_brand: allSetupData?.tires?.brand || '',
        tire_model: allSetupData?.tires?.model || '',
        tire_size: allSetupData?.tires?.size || '',
        different_rear_size: allSetupData?.tires?.differentRearSize || false,
        rear_tire_size: allSetupData?.tires?.rearSize || '',
        tire_pressure_fl: allSetupData?.tires?.pressureFL || '',
        tire_pressure_fr: allSetupData?.tires?.pressureFR || '',
        tire_pressure_rl: allSetupData?.tires?.pressureRL || '',
        tire_pressure_rr: allSetupData?.tires?.pressureRR || '',
        heat_cycles: allSetupData?.tires?.heatCycles || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      let data, error;
      
      if (isExistingSetup) {
        const result = await supabase
          .from('vehicle_setups')
          .update(setupData)
          .eq('setup_name', finalSetupName)
          .eq('vehicle_id', selectedVehicleId)
          .eq('user_id', user.id)
          .select()
          .single();
        data = result.data;
        error = result.error;
      } else {
        const result = await supabase
          .from('vehicle_setups')
          .insert(setupData)
          .select()
          .single();
        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Setup saved successfully:', data);
      
      const newSetup = {
        id: data.id,
        name: finalSetupName
      };
      
      setCurrentSetup(newSetup);
      
      toast({
        title: 'Setup Saved Successfully',
        description: `"${finalSetupName}" has been saved with all data`,
      });
      
      setSetupName('');
      
      window.dispatchEvent(new CustomEvent('setupSaved', { 
        detail: { vehicleId: selectedVehicleId, setup: data } 
      }));
      
    } catch (error) {
      console.error('Error saving setup:', error);
      toast({
        title: 'Error Saving Setup',
        description: `There was an error saving your setup: ${error.message || 'Unknown error'}`,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className={`space-y-3 p-4 bg-gray-50 rounded-lg border ${className}`}>
        {selectedVehicleId && (
          <SetupNameSelector
            vehicleId={selectedVehicleId}
            selectedSetupName={setupName}
            onSetupNameChange={(name, isExisting) => {
              setSetupName(name);
              setIsExistingSetup(isExisting);
            }}
          />
        )}
         
         {!currentVehicle && (
           <VehicleSelector
             selectedVehicleId={selectedVehicleId}
             onVehicleSelect={() => {}}
           />
         )}
         
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
          className="bg-green-600 hover:bg-green-700 text-white w-full"
          size="sm"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Complete Setup
            </>
          )}
        </Button>
      </div>

      <SaveSetupLicenseModal
        isOpen={showLicenseModal}
        onClose={() => setShowLicenseModal(false)}
      />
    </>
  );
};

export default SaveButtonComplete;