import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Car, Trash2, Settings } from 'lucide-react';
import { useVehiclesDB } from '@/hooks/useVehiclesDB';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import VehicleSetupsTab from './VehicleSetupsTab';
import VehicleSetupsList from './VehicleSetupsList';

interface VehicleManagerDBProps {
  selectedVehicle: string;
  onVehicleSelect: (vehicleId: string) => void;
  onEditSetup?: (setupId: string) => void;
}

const VehicleManagerDB: React.FC<VehicleManagerDBProps> = ({
  selectedVehicle,
  onVehicleSelect,
  onEditSetup
) => {
  const { vehicles, loading, saveVehicle, deleteVehicle, canAddMultiple } = useVehiclesDB();
  const { setCurrentVehicle, clearSetupData } = useAppContext();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [formData, setFormData] = useState({
    name: '',
    make: '',
    model: '',
    year: '',
    car_type: '',
    track_type: ''
  });

  const handleAddVehicle = async () => {
    if (!formData.name || !formData.make || !formData.model || !formData.year || !formData.car_type || !formData.track_type) {
      return;
    }
    
    const result = await saveVehicle(formData);
    if (result) {
      setFormData({ name: '', make: '', model: '', year: '', car_type: '', track_type: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      await deleteVehicle(vehicleId);
      if (selectedVehicle === vehicleId) {
        onVehicleSelect('');
      }
    }
  };
  const resetForm = () => {
    setFormData({ name: '', make: '', model: '', year: '', car_type: '', track_type: '' });
    setShowAddForm(false);
  };

  const handleCreateSetup = (vehicle: any) => {
    // Set the current vehicle in AppContext
    setCurrentVehicle({ id: vehicle.id, name: vehicle.vehicle_name });
    // Clear any existing setup data
    clearSetupData();
    // Navigate to data entry page
    navigate('/data-entry');
  };

  const selectedVehicleData = vehicles.find(v => v.id === selectedVehicle);
  const canAddMore = canAddMultiple || vehicles.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Vehicle Management</h2>
        <div className="text-sm text-gray-400">
          {vehicles.length} vehicles
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
          <TabsTrigger value="vehicles" className="data-[state=active]:bg-blue-600">
            <Car className="h-4 w-4 mr-2" />
            My Vehicles
          </TabsTrigger>
          <TabsTrigger value="setups" className="data-[state=active]:bg-blue-600">
            <Settings className="h-4 w-4 mr-2" />
            My Setups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-6">
          {!showAddForm && canAddMore && (
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Vehicle
            </Button>
          )}

          {!canAddMore && (
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-400 text-sm">
                Free users can only have one vehicle. Upgrade to add more vehicles.
              </p>
            </div>
          )}

          {showAddForm && (
            <Card className="bg-gray-800/50 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Add New Vehicle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Vehicle Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-700 text-white border-gray-600"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Make"
                    value={formData.make}
                    onChange={(e) => setFormData({...formData, make: e.target.value})}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Input
                    placeholder="Model"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Year"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="bg-gray-700 text-white border-gray-600"
                  />
                  <Select onValueChange={(value) => setFormData({...formData, car_type: value})}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Car Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="coupe">Coupe</SelectItem>
                      <SelectItem value="convertible">Convertible</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="open-wheeled">Open-Wheeled</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(value) => setFormData({...formData, track_type: value})}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Track Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="road-course">Road Course</SelectItem>
                      <SelectItem value="autocross">Autocross</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddVehicle} 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Vehicle'}
                  </Button>
                  <Button onClick={resetForm} variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {vehicles.map((vehicle) => (
              <Card 
                key={vehicle.id} 
                className={`bg-gray-800/50 border-blue-500/20 cursor-pointer transition-colors ${
                  selectedVehicle === vehicle.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => onVehicleSelect(vehicle.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="font-semibold text-white">{vehicle.vehicle_name}</h3>
                        <p className="text-sm text-gray-400">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </p>
                        <p className="text-xs text-gray-500">
                          {vehicle.car_type} • {vehicle.track_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                         onClick={(e) => {
                           e.stopPropagation();
                           handleCreateSetup(vehicle);
                         }}
                        className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                      >
                        Create Setup
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVehicle(vehicle.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Always show Vehicle Setups Section */}
                  <div className="mt-4 pt-4 border-t border-gray-600/30">
                    <VehicleSetupsList
                      vehicleId={vehicle.id}
                      vehicleName={vehicle.name}
                      onEditSetup={onEditSetup}
                      onViewSetup={(setupId) => {
                        console.log('View setup:', setupId);
                        // Add view setup logic here
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

          {vehicles.length === 0 && !showAddForm && (
            <Card className="bg-gray-800/50 border-blue-500/20 text-center py-12">
              <CardContent>
                <Car className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500">No vehicles added yet. Add your first vehicle to get started.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="setups" className="space-y-6">
          <VehicleSetupsTab onLoadSetup={(setup) => {
            // Handle setup loading - you can customize this based on your needs
            console.log('Loading setup:', setup);
          }} />
        </TabsContent>
      </Tabs>

    </div>
  );
};
export default VehicleManagerDB;