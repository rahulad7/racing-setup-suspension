import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';

interface VehicleSetup {
  id: string;
  name: string;
  vehicleId: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  data: {
    suspension: any;
    tires: any;
    aero: any;
    alignment: any;
    cornerBalance: any;
    swayBar: any;
  };
}

export const useVehicleSetups = (vehicleId: string) => {
  const [setups, setSetups] = useState<VehicleSetup[]>([]);
  const [loading, setLoading] = useState(false);

  // Use vehicle-specific key for localStorage
  const historyKey = `vehicle_setups_${vehicleId}`;

  useEffect(() => {
    if (vehicleId) {
      loadSetups();
    }
  }, [vehicleId]);

  const loadSetups = () => {
    try {
      const stored = localStorage.getItem(historyKey);
      if (stored) {
        const parsedSetups = JSON.parse(stored);
        // Ensure all setups belong to this vehicle
        const vehicleSetups = parsedSetups.filter((setup: VehicleSetup) => 
          setup.vehicleId === vehicleId
        );
        setSetups(vehicleSetups);
      } else {
        setSetups([]);
      }
    } catch (error) {
      console.error('Error loading setups:', error);
      setSetups([]);
      toast({
        title: 'Error',
        description: 'Failed to load saved setups',
        variant: 'destructive',
      });
    }
  };

  const saveSetup = async (
    name: string,
    data: VehicleSetup['data'],
    notes?: string,
    overwrite?: boolean
  ) => {
    if (!vehicleId) {
      toast({
        title: 'Error',
        description: 'No vehicle selected',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const existingIndex = setups.findIndex(s => s.name === name && s.vehicleId === vehicleId);
      const now = new Date().toISOString();
      
      const setup: VehicleSetup = {
        id: existingIndex >= 0 ? setups[existingIndex].id : uuidv4(),
        name,
        vehicleId, // Ensure vehicleId is set
        notes,
        createdAt: existingIndex >= 0 ? setups[existingIndex].createdAt : now,
        updatedAt: now,
        data
      };

      let newSetups: VehicleSetup[];
      if (existingIndex >= 0 && overwrite) {
        newSetups = [...setups];
        newSetups[existingIndex] = setup;
      } else {
        newSetups = [setup, ...setups];
      }

      // Save to vehicle-specific localStorage key
      localStorage.setItem(historyKey, JSON.stringify(newSetups));
      setSetups(newSetups);
      
      toast({
        title: 'Success',
        description: `Setup "${name}" saved successfully for this vehicle`,
      });
    } catch (error) {
      console.error('Error saving setup:', error);
      toast({
        title: 'Error',
        description: 'Failed to save setup',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteSetup = (setupId: string) => {
    try {
      const newSetups = setups.filter(s => s.id !== setupId);
      localStorage.setItem(historyKey, JSON.stringify(newSetups));
      setSetups(newSetups);
      
      toast({
        title: 'Success',
        description: 'Setup deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting setup:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete setup',
        variant: 'destructive',
      });
    }
  };

  return {
    setups,
    loading,
    saveSetup,
    deleteSetup,
    loadSetups
  };
};