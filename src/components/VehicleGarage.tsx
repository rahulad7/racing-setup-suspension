import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Car, Settings, Calendar, MapPin, Plus, Eye, X, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { VehicleSetupsModal } from './VehicleSetupsModal';
interface Vehicle {
  id: string;
  name: string;
  year?: number;
  make?: string;
  model?: string;
  created_at: string;
}

interface VehicleSetup {
  id: string;
  setup_name: string;
  track_name?: string;
  created_at: string;
}

interface VehicleWithSetups extends Vehicle {
  setups: VehicleSetup[];
  setupCount: number;
}

// Sample vehicles data
const sampleVehicles: VehicleWithSetups[] = [
  {
    id: 'sample-1',
    name: 'Honda Civic Si',
    year: 2020,
    make: 'Honda',
    model: 'Civic Si',
    created_at: new Date().toISOString(),
    setups: [
      { id: 'setup-1', setup_name: 'Road Course Setup', track_name: 'Laguna Seca', created_at: new Date().toISOString() },
      { id: 'setup-2', setup_name: 'Autocross Setup', track_name: 'Local Autocross', created_at: new Date().toISOString() }
    ],
    setupCount: 2
  },
  {
    id: 'sample-2',
    name: 'Mazda Miata',
    year: 2019,
    make: 'Mazda',
    model: 'MX-5 Miata',
    created_at: new Date().toISOString(),
    setups: [
      { id: 'setup-3', setup_name: 'Track Day Setup', track_name: 'Thunderhill', created_at: new Date().toISOString() }
    ],
    setupCount: 1
  }
];

export function VehicleGarage() {
  const [vehicles, setVehicles] = useState<VehicleWithSetups[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [newVehicle, setNewVehicle] = useState({ name: '', year: '', make: '', model: '' });
  const [showSetupsModal, setShowSetupsModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<{ id: string; name: string } | null>(null);
  const { toast } = useToast();
  const { setCurrentVehicle, clearSetupData } = useAppContext();
  const navigate = useNavigate();

  // Fetch vehicles from database on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      
      // Fetch vehicles
      const { data: vehiclesData, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (vehiclesError) throw vehiclesError;

      // Fetch setups for each vehicle
      const vehiclesWithSetups: VehicleWithSetups[] = await Promise.all(
        (vehiclesData || []).map(async (vehicle) => {
          const { data: setupsData } = await supabase
            .from('vehicle_setups')
            .select('id, setup_name, track_name, created_at')
            .eq('vehicle_id', vehicle.id)
            .order('created_at', { ascending: false });

          return {
            ...vehicle,
            setups: setupsData || [],
            setupCount: setupsData?.length || 0
          };
        })
      );

      setVehicles(vehiclesWithSetups);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to load vehicles from database', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleVehicleExpansion = (vehicleId: string) => {
    setExpandedVehicle(expandedVehicle === vehicleId ? null : vehicleId);
  };

  const handleCreateVehicle = async () => {
    if (!newVehicle.name || !newVehicle.make || !newVehicle.model) {
      toast({ title: 'Error', description: 'Please fill all required fields', variant: 'destructive' });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .insert([{
          name: newVehicle.name,
          year: newVehicle.year ? parseInt(newVehicle.year) : null,
          make: newVehicle.make,
          model: newVehicle.model,
          user_id: '00000000-0000-0000-0000-000000000001' // Default user for demo
        }])
        .select()
        .single();

      if (error) throw error;

      const newVehicleWithSetups: VehicleWithSetups = {
        ...data,
        setups: [],
        setupCount: 0
      };

      setVehicles(prev => [newVehicleWithSetups, ...prev]);
      toast({ title: 'Success', description: 'Vehicle created successfully' });
      setNewVehicle({ name: '', year: '', make: '', model: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error creating vehicle:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to create vehicle', 
        variant: 'destructive' 
      });
    }
  };
  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle({
      name: vehicle.name,
      year: vehicle.year?.toString() || '',
      make: vehicle.make || '',
      model: vehicle.model || ''
    });
  };

  const handleUpdateVehicle = async () => {
    if (!editingVehicle || !newVehicle.name || !newVehicle.make || !newVehicle.model) {
      toast({ title: 'Error', description: 'Please fill all required fields', variant: 'destructive' });
      return;
    }

    try {
      const { error } = await supabase
        .from('vehicles')
        .update({
          name: newVehicle.name,
          year: newVehicle.year ? parseInt(newVehicle.year) : null,
          make: newVehicle.make,
          model: newVehicle.model
        })
        .eq('id', editingVehicle.id);

      if (error) throw error;

      setVehicles(prev => prev.map(v => 
        v.id === editingVehicle.id 
          ? { 
              ...v, 
              name: newVehicle.name,
              year: newVehicle.year ? parseInt(newVehicle.year) : undefined,
              make: newVehicle.make,
              model: newVehicle.model
            }
          : v
      ));
      
      toast({ title: 'Success', description: 'Vehicle updated successfully' });
      setEditingVehicle(null);
      setNewVehicle({ name: '', year: '', make: '', model: '' });
    } catch (error) {
      console.error('Error updating vehicle:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to update vehicle', 
        variant: 'destructive' 
      });
    }
  };

  const handleCreateSetup = (vehicle: Vehicle) => {
    // Set the current vehicle in AppContext
    setCurrentVehicle({ id: vehicle.id, name: vehicle.name });
    // Clear any existing setup data
    clearSetupData();
    // Navigate to data entry page
    navigate('/data-entry');
    toast({ 
      title: 'Setup Creation', 
      description: `Creating new setup for ${vehicle.name}` 
    });
  };

  const handleViewSetups = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      setSelectedVehicle({ id: vehicle.id, name: vehicle.name });
      setShowSetupsModal(true);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-slate-400 py-8">
        <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Loading your garage...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Vehicle Form */}
      {(showAddForm || editingVehicle) && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center">
                {editingVehicle ? <Edit className="mr-2 h-5 w-5 text-blue-400" /> : <Plus className="mr-2 h-5 w-5 text-blue-400" />}
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingVehicle(null);
                  setNewVehicle({ name: '', year: '', make: '', model: '' });
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Name *</Label>
                <Input
                  value={newVehicle.name}
                  onChange={(e) => setNewVehicle(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g., Race Car"
                />
              </div>
              <div>
                <Label className="text-slate-300">Year</Label>
                <Input
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle(prev => ({ ...prev, year: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g., 2020"
                />
              </div>
              <div>
                <Label className="text-slate-300">Make *</Label>
                <Input
                  value={newVehicle.make}
                  onChange={(e) => setNewVehicle(prev => ({ ...prev, make: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g., Honda"
                />
              </div>
              <div>
                <Label className="text-slate-300">Model *</Label>
                <Input
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle(prev => ({ ...prev, model: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="e.g., Civic"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={editingVehicle ? handleUpdateVehicle : handleCreateVehicle} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingVehicle ? 'Update Vehicle' : 'Create Vehicle'}
              </Button>
              <Button 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingVehicle(null);
                  setNewVehicle({ name: '', year: '', make: '', model: '' });
                }} 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Vehicle Garage</h2>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Card 
            key={vehicle.id} 
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <Car className="mr-2 h-5 w-5 text-blue-400" />
                  <span className="truncate">{vehicle.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleVehicleExpansion(vehicle.id)}
                  className="text-slate-400 hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(vehicle.year || vehicle.make || vehicle.model) && (
                <div className="text-slate-300 text-sm">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </div>
              )}
              
              <div className="flex items-center justify-between text-slate-400 text-sm">
                <div className="flex items-center">
                  <Settings className="mr-1 h-3 w-3" />
                  {vehicle.setupCount} setup{vehicle.setupCount !== 1 ? 's' : ''}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(vehicle.created_at).toLocaleDateString()}
                </div>
              </div>

              {expandedVehicle === vehicle.id && vehicle.setups.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-700">
                  <h4 className="text-sm font-medium text-white mb-2">Recent Setups:</h4>
                  <div className="space-y-2">
                    {vehicle.setups.slice(0, 3).map((setup) => (
                      <div 
                        key={setup.id}
                        className="bg-slate-900/50 p-2 rounded text-xs"
                      >
                        <div className="font-medium text-slate-200 truncate">
                          {setup.setup_name}
                        </div>
                        <div className="flex items-center justify-between text-slate-400 mt-1">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-2 w-2" />
                            <span className="truncate">
                              {setup.track_name || 'Unknown Track'}
                            </span>
                          </div>
                          <span>{new Date(setup.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                    {vehicle.setups.length > 3 && (
                      <div className="text-xs text-slate-400 text-center">
                        +{vehicle.setups.length - 3} more setups
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleCreateSetup(vehicle)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Create Setup
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => handleViewSetups(vehicle.id)}
                >
                  View Setups
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vehicle Setups Modal */}
      {selectedVehicle && (
        <VehicleSetupsModal
          isOpen={showSetupsModal}
          onClose={() => {
            setShowSetupsModal(false);
            setSelectedVehicle(null);
          }}
          vehicleId={selectedVehicle.id}
          vehicleName={selectedVehicle.name}
        />
      )}
    </div>
  );
}

export default VehicleGarage;