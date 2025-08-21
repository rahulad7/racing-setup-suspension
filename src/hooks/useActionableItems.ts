import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export interface ActionableItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  time_estimate: string;
  cost?: string;
  url?: string;
  completed: boolean;
  created_at?: string;
  user_id?: string;
}

export function useActionableItems() {
  const [items, setItems] = useState<ActionableItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('actionable_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch actionable items',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<ActionableItem, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('actionable_items')
        .insert([item])
        .select()
        .single();
      
      if (error) throw error;
      setItems(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Item added successfully'
      });
      return data;
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: 'Error',
        description: 'Failed to add item',
        variant: 'destructive'
      });
    }
  };

  const updateItem = async (id: string, updates: Partial<ActionableItem>) => {
    try {
      const { data, error } = await supabase
        .from('actionable_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      setItems(prev => prev.map(item => item.id === id ? data : item));
      return data;
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: 'Error',
        description: 'Failed to update item',
        variant: 'destructive'
      });
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('actionable_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: 'Success',
        description: 'Item deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete item',
        variant: 'destructive'
      });
    }
  };

  const toggleCompleted = async (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) {
      await updateItem(id, { completed: !item.completed });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    toggleCompleted,
    refetch: fetchItems
  };
}