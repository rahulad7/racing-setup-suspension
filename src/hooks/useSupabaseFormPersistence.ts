import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface FormData {
  [key: string]: any;
}

export function useSupabaseFormPersistence(formKey: string) {
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load data from Supabase on mount
  useEffect(() => {
    if (user) {
      loadFormData();
    }
  }, [formKey, user]);

  const loadFormData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicle_setups')
        .select('setup_data')
        .eq('user_id', user.id)
        .eq('setup_name', `draft_${formKey}`)
        .single();

      if (data && !error) {
        setFormData(data.setup_data || {});
      }
    } catch (error) {
      console.error('Error loading form data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save data to Supabase whenever formData changes
  useEffect(() => {
    if (user && Object.keys(formData).length > 0) {
      saveFormData();
    }
  }, [formData, user]);

  const saveFormData = async () => {
    if (!user) return;

    try {
      await supabase
        .from('vehicle_setups')
        .upsert({
          user_id: user.id,
          setup_name: `draft_${formKey}`,
          setup_data: formData,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,setup_name'
        });
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetFormData = async () => {
    setFormData({});
    if (user) {
      try {
        await supabase
          .from('vehicle_setups')
          .delete()
          .eq('user_id', user.id)
          .eq('setup_name', `draft_${formKey}`);
      } catch (error) {
        console.error('Error clearing form data:', error);
      }
    }
  };

  return {
    formData,
    updateFormData,
    resetFormData,
    setFormData,
    loading
  };
}