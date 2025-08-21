import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface VehicleSetup {
  id: string;
  name: string;
  vehicle_id: string;
  track_name?: string;
  notes?: string;
  data: any;
  created_at: string;
  updated_at: string;
}

export const useVehicleSetupsFixed = () => {
  const [setups, setSetups] = useState<VehicleSetup[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadSetups();
    }
  }, [user]);

  const loadSetups = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // Use direct REST call instead of Supabase client
      const response = await fetch(`https://tlhtudenqgwmjizmjmbx.supabase.co/rest/v1/vehicle_setups?user_id=eq.${user.id}&order=updated_at.desc`, {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaHR1ZGVucWd3bWppem1qbWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MTQ2OTMsImV4cCI6MjA2ODI5MDY5M30.fhq8prxrihq8m9AvlIivWvxY8gZqSyvyRPRV82vPNg4',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaHR1ZGVucWd3bWppem1qbWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MTQ2OTMsImV4cCI6MjA2ODI5MDY5M30.fhq8prxrihq8m9AvlIivWvxY8gZqSyvyRPRV82vPNg4`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setSetups(data || []);
    } catch (error) {
      console.error('Error loading setups:', error);
      toast({
        title: 'Error',
        description: 'Failed to load saved setups',
        variant: 'destructive',
      });
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

    if (!setupData.vehicle_id) {
      toast({
        title: 'Error', 
        description: 'Vehicle ID is required',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const dataToSave = {
        user_id: user.id,
        name: setupData.name,
        vehicle_id: setupData.vehicle_id,
        track_name: setupData.track_name,
        notes: setupData.notes,
        data: setupData.data || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Use direct REST call with hardcoded URL to avoid require() issues
      const response = await fetch('https://tlhtudenqgwmjizmjmbx.supabase.co/rest/v1/vehicle_setups', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaHR1ZGVucWd3bWppem1qbWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MTQ2OTMsImV4cCI6MjA2ODI5MDY5M30.fhq8prxrihq8m9AvlIivWvxY8gZqSyvyRPRV82vPNg4',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsaHR1ZGVucWd3bWppem1qbWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MTQ2OTMsImV4cCI6MjA2ODI5MDY5M30.fhq8prxrihq8m9AvlIivWvxY8gZqSyvyRPRV82vPNg4',
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(dataToSave)
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      const result = await response.json();
      
      await loadSetups();
      
      toast({
        title: 'Success',
        description: `Setup "${setupData.name}" saved successfully`,
      });
      
      return result[0];
    } catch (error) {
      console.error('Error saving setup:', error);
      toast({
        title: 'Error',
        description: 'Failed to save setup',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    setups,
    loading,
    saveSetup,
    loadSetups
  };
};