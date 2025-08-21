import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: string;
  car_type: string;
  track_type: string;
  created_at: string;
  updated_at: string;
}

export const useVehiclesDB = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    // Load vehicles immediately on mount and when user changes
    loadVehicles();
  }, [user]);

  // Load vehicles on component mount
  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    setLoading(true);
    try {
      // Always try to load demo vehicles first to ensure something shows up
      console.log('Loading demo vehicles...');
      const { data: demoData, error: demoError } = await supabase
        .from('vehicles')
        .select('id, vehicle_name, make, model, year, car_type, track_type, created_at, updated_at')
        .eq('user_id', '00000000-0000-0000-0000-000000000001')
        .order('updated_at', { ascending: false });
      
      if (demoError) {
        console.error('Error loading demo vehicles:', demoError);
        throw demoError;
      }

      // Map vehicle_name to name for interface compatibility
      const mappedData = demoData?.map(vehicle => ({
        ...vehicle,
        name: vehicle.vehicle_name
      })) || [];

      setVehicles(mappedData);
      console.log('Demo vehicles loaded:', mappedData.length, mappedData);
      
    } catch (error) {
      console.error('Error loading vehicles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load vehicles',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveVehicle = async (vehicleData: Omit<Vehicle, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .insert({
          vehicle_name: vehicleData.name,
          user_id: user?.id || '00000000-0000-0000-0000-000000000001',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      
      await loadVehicles();
      
      toast({
        title: 'Success',
        description: `Vehicle "${vehicleData.name}" saved successfully`,
      });
      
      return data;
    } catch (error) {
      console.error('Error saving vehicle:', error);
      toast({
        title: 'Error',
        description: `Failed to save vehicle: ${error.message}`,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (vehicleId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', vehicleId);

      if (error) throw error;
      
      await loadVehicles();
      
      toast({
        title: 'Success',
        description: 'Vehicle deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete vehicle',
        variant: 'destructive',
      });
    }
  };

  return {
    vehicles,
    loading,
    saveVehicle,
    deleteVehicle,
    loadVehicles,
    canAddMultiple: isAdmin
  };
};