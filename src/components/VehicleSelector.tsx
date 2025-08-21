import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Vehicle {
  id: string;
  name: string;
  year?: number;
  make?: string;
  model?: string;
}

interface VehicleSelectorProps {
  selectedVehicleId?: string;
  onVehicleSelect: (vehicleId: string) => void;
  onCreateNew?: () => void;
}

export function VehicleSelector({ selectedVehicleId, onVehicleSelect, onCreateNew }: VehicleSelectorProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatVehicleName = (vehicle: Vehicle) => {
    const parts = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean);
    return parts.length > 0 ? `${vehicle.name} (${parts.join(' ')})` : vehicle.name;
  };

  if (loading) {
    return (
      <div className="flex items-center text-slate-400">
        <Car className="mr-2 h-4 w-4 animate-pulse" />
        Loading vehicles...
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Select value={selectedVehicleId} onValueChange={onVehicleSelect}>
        <SelectTrigger className="flex-1 bg-slate-700 border-slate-600 text-white">
          <SelectValue placeholder="Select a vehicle">
            {selectedVehicleId && (
              <div className="flex items-center">
                <Car className="mr-2 h-4 w-4 text-blue-400" />
                {vehicles.find(v => v.id === selectedVehicleId)?.name || 'Unknown Vehicle'}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          {vehicles.map((vehicle) => (
            <SelectItem key={vehicle.id} value={vehicle.id} className="text-white hover:bg-slate-700">
              <div className="flex items-center">
                <Car className="mr-2 h-4 w-4 text-blue-400" />
                {formatVehicleName(vehicle)}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {onCreateNew && (
        <Button
          variant="outline"
          size="sm"
          onClick={onCreateNew}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export default VehicleSelector;