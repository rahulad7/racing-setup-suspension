import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, MapPin, Calendar, Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';

interface VehicleSetup {
  id: string;
  setup_name: string;
  track_name?: string;
  weather_conditions?: string;
  created_at: string;
}

interface VehicleSetupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleId: string;
  vehicleName: string;
}

export function VehicleSetupsModal({ isOpen, onClose, vehicleId, vehicleName }: VehicleSetupsModalProps) {
  const [setups, setSetups] = useState<VehicleSetup[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { loadSetupForEditing } = useAppContext();

  useEffect(() => {
    if (isOpen && vehicleId) {
      fetchSetups();
    }
  }, [isOpen, vehicleId]);

  const fetchSetups = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('vehicle_setups')
        .select('id, setup_name, track_name, weather_conditions, created_at')
        .eq('vehicle_id', vehicleId)
        .order('created_at', { ascending: false });
       
      if (error) throw error;
      setSetups(data || []);
    } catch (error) {
      console.error('Error fetching setups:', error);
      toast({
        title: 'Error',
        description: 'Failed to load vehicle setups',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSetup = async (setupId: string, setupName: string) => {
    if (!confirm(`Delete setup "${setupName}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase
        .from('vehicle_setups')
        .delete()
        .eq('id', setupId);

      if (error) throw error;

      setSetups(prev => prev.filter(s => s.id !== setupId));
      toast({
        title: 'Success',
        description: 'Setup deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting setup:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete setup',
        variant: 'destructive'
      });
    }
  };

  const handleLoadSetup = async (setupId: string, setupName: string) => {
    try {
      await loadSetupForEditing(setupId);
      onClose(); // Close the modal after loading
      toast({
        title: 'Setup Loaded',
        description: `"${setupName}" is now loaded for editing`,
      });
    } catch (error) {
      console.error('Error loading setup:', error);
      toast({
        title: 'Error',
        description: 'Failed to load setup for editing',
        variant: 'destructive'
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <Settings className="mr-2 h-5 w-5 text-blue-400" />
            {vehicleName} - Saved Setups ({setups.length})
          </DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="text-center py-8 text-slate-400">Loading setups...</div>
        ) : setups.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No setups saved for this vehicle yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {setups.map((setup) => (
              <Card key={setup.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-white truncate">{setup.setup_name}</h3>
                      <div className="flex gap-1 ml-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-white"
                          onClick={() => handleLoadSetup(setup.id, setup.setup_name)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                          onClick={() => handleDeleteSetup(setup.id, setup.setup_name)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {setup.track_name && (
                      <div className="flex items-center text-slate-300 text-sm">
                        <MapPin className="mr-1 h-3 w-3" />
                        {setup.track_name}
                      </div>
                    )}
                    
                    {setup.weather_conditions && (
                      <div className="text-slate-400 text-sm">
                        Weather: {setup.weather_conditions}
                      </div>
                    )}
                    
                    <div className="flex items-center text-slate-400 text-xs">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(setup.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}