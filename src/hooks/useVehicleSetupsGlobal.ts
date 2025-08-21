import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface VehicleSetup {
  id: string;
  setup_name: string;
  vehicle_name?: string;
  track_name?: string;
  notes?: string;
  setup_data: any;
  created_at: string;
  updated_at: string;
}

export const useVehicleSetupsGlobal = (vehicleId?: string) => {
  const [setups, setSetups] = useState<VehicleSetup[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const loadSetups = async () => {
    setLoading(true);
    try {
      // Check for admin session first
      const adminSession = localStorage.getItem('admin_session');
      let currentUserId = null;

      if (adminSession) {
        const adminUser = JSON.parse(adminSession);
        currentUserId = adminUser.id;
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setSetups([]);
          return;
        }
        currentUserId = user.id;
      }

      let query = supabase
        .from('vehicle_setups')
        .select('*')
        .eq('user_id', currentUserId);

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading setups:', error);
        setSetups([]);
      } else {
        setSetups(data || []);
      }
    } catch (error) {
      console.error('Error loading setups:', error);
      setSetups([]);
    } finally {
      setLoading(false);
    }
  };

  const saveSetup = async (setupData: Partial<VehicleSetup>) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in to save setups',
        variant: 'destructive',
      });
      return;
    }

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
      const insertData = {
        user_id: user.id,
        vehicle_id: vehicleId, // Include vehicle_id
        setup_name: setupData.setup_name || 'New Setup',
        vehicle_name: setupData.vehicle_name,
        track_name: setupData.track_name,
        setup_data: setupData.setup_data || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('vehicle_setups')
        .insert(insertData);

      if (error) throw error;
      
      await loadSetups();
      
      toast({
        title: 'Success',
        description: 'Setup saved successfully',
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

  const deleteSetup = async (setupId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('vehicle_setups')
        .delete()
        .eq('id', setupId);

      if (error) throw error;
      
      await loadSetups();
      
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

  const loadSetup = async (setupId: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('vehicle_setups')
        .select('*')
        .eq('id', setupId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error loading setup:', error);
      return null;
    }
  };

  useEffect(() => {
    // Load setups if user exists OR if admin session exists
    const adminSession = localStorage.getItem('admin_session');
    if (user || adminSession) {
      loadSetups();
    }
  }, [user, vehicleId]); // Also reload when vehicleId changes

  return {
    setups,
    loading,
    saveSetup,
    deleteSetup,
    loadSetups,
    loadSetup
  };
};