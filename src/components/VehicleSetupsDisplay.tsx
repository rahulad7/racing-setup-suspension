import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Calendar, MapPin, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VehicleSetup {
  id: string;
  setup_name: string;
  track_name: string;
  created_at: string;
  vehicle_name?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: string;
}

interface VehicleSetupsDisplayProps {
  vehicleId?: string;
  vehicleName?: string;
}

const VehicleSetupsDisplay: React.FC<VehicleSetupsDisplayProps> = ({ 
  vehicleId, 
  vehicleName 
}) => {
  const [setups, setSetups] = useState<VehicleSetup[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSetups();
  }, [vehicleId]);

  const loadSetups = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        setLoading(false);
        return;
      }

      let query = supabase
        .from('vehicle_setups')
        .select('id, setup_name, track_name, created_at, vehicle_name, vehicle_make, vehicle_model, vehicle_year')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (vehicleId) {
        query = query.eq('vehicle_id', vehicleId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading setups:', error);
        toast({
          title: 'Error',
          description: 'Failed to load vehicle setups',
          variant: 'destructive',
        });
      } else {
        setSetups(data || []);
      }
    } catch (err) {
      console.error('Exception loading setups:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSetup = (setupId: string) => {
    // Navigate to setup editor with this setup loaded
    // This would integrate with your existing setup loading logic
    toast({
      title: 'Setup Selected',
      description: 'Setup loading functionality would be implemented here',
    });
  };

  if (loading) {
    return (
      <div className="text-center text-slate-400 py-8">
        Loading setups...
      </div>
    );
  }

  if (setups.length === 0) {
    return (
      <div className="text-center text-slate-400 py-8">
        <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No setups saved for {vehicleName || 'this vehicle'}</p>
        <p className="text-sm mt-2">Create a setup using the Setup tab</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">
        Saved Setups {vehicleName && `for ${vehicleName}`}
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {setups.map((setup) => (
          <Card 
            key={setup.id} 
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm flex items-center">
                <Car className="mr-2 h-4 w-4 text-blue-400" />
                {setup.setup_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-slate-400 text-xs">
                <MapPin className="mr-1 h-3 w-3" />
                {setup.track_name || 'Unknown Track'}
              </div>
              <div className="flex items-center text-slate-400 text-xs">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(setup.created_at).toLocaleDateString()}
              </div>
              {(setup.vehicle_make || setup.vehicle_model) && (
                <div className="text-slate-400 text-xs">
                  {setup.vehicle_year} {setup.vehicle_make} {setup.vehicle_model}
                </div>
              )}
              <Button 
                size="sm"
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                onClick={() => handleLoadSetup(setup.id)}
              >
                Load Setup
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleSetupsDisplay;