import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { VehicleListItem } from './VehicleListItem';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VehicleSetup {
  id: string;
  setup_name: string;
  track_name: string;
  created_at: string;
}

interface Vehicle {
  id: string;
  name: string;
  year: number;
  make: string;
  model: string;
  setups?: VehicleSetup[];
}

interface VehicleGarageListProps {
  onCreateSetup: (vehicleId: string) => void;
  onLoadSetup: (vehicleId: string, setupId: string) => void;
  onCreateVehicle: () => void;
}

export const VehicleGarageList: React.FC<VehicleGarageListProps> = ({
  onCreateSetup,
  onLoadSetup,
  onCreateVehicle,
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadVehicles = () => {
    // Load from localStorage first, then fallback to hardcoded data
    const savedVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
    
    if (savedVehicles.length > 0) {
      setVehicles(savedVehicles);
    } else {
      // Fallback to hardcoded data
      const defaultVehicles = [
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
          name: 'Red Thunder',
          year: 2023,
          make: 'Mazda',
          model: 'MX-5 Miata',
          setups: [
            {
              id: '550e8400-e29b-41d4-a716-446655440101',
              setup_name: 'Road Atlanta Setup',
              track_name: 'Road Atlanta',
              created_at: '2024-01-15T10:30:00Z'
            },
            {
              id: '550e8400-e29b-41d4-a716-446655440102',
              setup_name: 'Laguna Seca Setup',
              track_name: 'Laguna Seca',
              created_at: '2024-01-10T14:20:00Z'
            }
          ]
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440002',
          name: 'Blue Lightning',
          year: 2022,
          make: 'Honda',
          model: 'Civic Si',
          setups: [
            {
              id: '550e8400-e29b-41d4-a716-446655440103',
              setup_name: 'Sebring Setup',
              track_name: 'Sebring International',
              created_at: '2024-01-12T09:15:00Z'
            }
          ]
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          name: 'Silver Bullet',
          year: 2021,
          make: 'Subaru',
          model: 'WRX STI',
          setups: [
            {
              id: '550e8400-e29b-41d4-a716-446655440104',
              setup_name: 'VIR Setup',
              track_name: 'Virginia International Raceway',
              created_at: '2024-01-08T16:45:00Z'
            },
            {
              id: '550e8400-e29b-41d4-a716-446655440105',
              setup_name: 'COTA Setup',
              track_name: 'Circuit of the Americas',
              created_at: '2024-01-05T11:30:00Z'
            }
          ]
        }
      ];
      setVehicles(defaultVehicles);
      localStorage.setItem('vehicles', JSON.stringify(defaultVehicles));
    }
  };

  const fetchVehicles = async () => {
    setLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      loadVehicles();
      setLoading(false);
      toast({
        title: "Vehicles Refreshed",
        description: "Your garage has been updated with the latest data.",
      });
    }, 1000);
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  // Listen for vehicle creation events
  useEffect(() => {
    const handleVehicleCreated = () => {
      loadVehicles();
    };
    
    window.addEventListener('vehicleCreated', handleVehicleCreated);
    return () => window.removeEventListener('vehicleCreated', handleVehicleCreated);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Vehicle Garage</h2>
        <div className="flex gap-2">
          <Button onClick={fetchVehicles} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={onCreateVehicle} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No vehicles in your garage yet.</p>
          <Button onClick={onCreateVehicle}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Vehicle
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleListItem
              key={vehicle.id}
              vehicle={vehicle}
              onCreateSetup={onCreateSetup}
              onLoadSetup={onLoadSetup}
            />
          ))}
        </div>
      )}
    </div>
  );
};