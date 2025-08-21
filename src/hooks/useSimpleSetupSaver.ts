import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface SetupData {
  name: string;
  vehicle_id: string;
  track_name?: string;
  data: any;
}

export const useSimpleSetupSaver = () => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const saveSetup = async (setupData: SetupData) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to save your setup',
        variant: 'destructive',
      });
      return false;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('vehicle_setups')
        .insert({
          user_id: user.id,
          name: setupData.name,
          vehicle_id: setupData.vehicle_id,
          track_name: setupData.track_name || '',
          data: setupData.data
        })
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: 'Setup Saved',
        description: `"${setupData.name}" has been saved successfully`,
      });
      
      return true;
    } catch (error) {
      console.error('Error saving setup:', error);
      toast({
        title: 'Save Failed',
        description: 'Unable to save setup. Please try again.',
        variant: 'destructive',
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const loadSetups = async () => {
    if (!user) return [];
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicle_setups')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error loading setups:', error);
      toast({
        title: 'Load Failed',
        description: 'Unable to load saved setups',
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    saveSetup,
    loadSetups,
    saving,
    loading
  };
};