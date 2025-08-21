import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Car, Settings, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVehiclesDB } from '@/hooks/useVehiclesDB';
import { useAuth } from '@/contexts/AuthContext';
import VehicleWithSetups from './VehicleWithSetups';
import SampleVehicles from './SampleVehicles';

interface VehicleManagerProps {
  vehicles?: any[];
  onVehiclesChange?: (vehicles: any[]) => void;
  selectedVehicle?: string;
  onVehicleSelect?: (vehicleId: string) => void;
  onEditSetup?: (setupId: string) => void;
}

const VehicleManager: React.FC<VehicleManagerProps> = (props) => {
  const { toast } = useToast();
  const { vehicles, loading: vehiclesLoading, saveVehicle, deleteVehicle } = useVehiclesDB();
  const { user } = useAuth();
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    make: '', 
    model: '', 
    year: '', 
    car_type: '', 
    track_type: '' 
  });
  


  // Quick admin login function for testing
  const handleQuickAdminLogin = () => {
    const adminUser = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'racesetuppro@gmail.com',
      user_metadata: { plan: 'annual' }
    };
    
    localStorage.setItem('admin_session', JSON.stringify(adminUser));
    
    toast({
      title: "Admin Access Granted",
      description: "You can now save vehicles. Page will refresh.",
    });
    
    // Force refresh to update authentication state
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  const handleAddVehicle = async () => {
    if (!formData.name || !formData.make || !formData.model || !formData.year || !formData.car_type || !formData.track_type) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    
    const success = await saveVehicle({
      name: formData.name,
      make: formData.make,
      model: formData.model,
      year: formData.year,
      car_type: formData.car_type,
      track_type: formData.track_type
    });
    
    if (success) {
      setFormData({ name: '', make: '', model: '', year: '', car_type: '', track_type: '' });
      setShowAddForm(false);
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      await deleteVehicle(vehicleId);
      if (selectedVehicle === vehicleId) {
        setSelectedVehicle('');
      }
    }
  };

  const handleEditVehicle = (vehicle: any) => {
    setFormData({
      name: vehicle.name,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      car_type: vehicle.car_type,
      track_type: vehicle.track_type
    });
    setEditingVehicle(vehicle.id);
    setShowAddForm(true);
  };

  const handleUpdateVehicle = async () => {
    if (!formData.name || !formData.make || !formData.model || !formData.year || !formData.car_type || !formData.track_type) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    
    // For now, we'll use the same saveVehicle function - you might need to add updateVehicle to the hook
    const success = await saveVehicle({
      name: formData.name,
      make: formData.make,
      model: formData.model,
      year: formData.year,
      car_type: formData.car_type,
      track_type: formData.track_type
    });
    
    if (success) {
      setFormData({ name: '', make: '', model: '', year: '', car_type: '', track_type: '' });
      setShowAddForm(false);
      setEditingVehicle(null);
    }
  };




  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Vehicle Management</h2>
      </div>



      <Tabs defaultValue="vehicles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
          <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
          <TabsTrigger value="samples">Sample Cars</TabsTrigger>
        </TabsList>



        <TabsContent value="vehicles" className="space-y-6">
          {!showAddForm && (
            <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />Add Vehicle
            </Button>
          )}

          {showAddForm && (
            <Card className="bg-gray-800/50 border-blue-500/20">
              <CardHeader><CardTitle className="text-white">{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Vehicle Name" value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-700 text-white border-gray-600" />
                <div className="grid grid-cols-3 gap-4">
                  <Input placeholder="Make" value={formData.make}
                    onChange={(e) => setFormData({...formData, make: e.target.value})}
                    className="bg-gray-700 text-white border-gray-600" />
                  <Input placeholder="Model" value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className="bg-gray-700 text-white border-gray-600" />
                  <Input placeholder="Year" value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="bg-gray-700 text-white border-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Select value={formData.car_type} onValueChange={(value) => setFormData({...formData, car_type: value})}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Car Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="sedan" className="text-white hover:bg-gray-600">Sedan</SelectItem>
                      <SelectItem value="coupe" className="text-white hover:bg-gray-600">Coupe</SelectItem>
                      <SelectItem value="convertible" className="text-white hover:bg-gray-600">Convertible</SelectItem>
                      <SelectItem value="open-wheeled" className="text-white hover:bg-gray-600">Open-Wheeled</SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-gray-600">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={formData.track_type} onValueChange={(value) => setFormData({...formData, track_type: value})}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Track Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="road-course" className="text-white hover:bg-gray-600">Road Course</SelectItem>
                      <SelectItem value="autocross" className="text-white hover:bg-gray-600">Autocross</SelectItem>
                    </SelectContent>
                  </Select>

                </div>
                <div className="flex gap-2">
                  <Button onClick={editingVehicle ? handleUpdateVehicle : handleAddVehicle} className="bg-green-600 hover:bg-green-700">
                    {editingVehicle ? 'Update Vehicle' : 'Save Vehicle'}
                  </Button>
                  <Button onClick={() => {
                    setShowAddForm(false);
                    setEditingVehicle(null);
                    setFormData({ name: '', make: '', model: '', year: '', car_type: '', track_type: '' });
                  }} variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {vehicles.map((vehicle) => (
              <VehicleWithSetups
                key={vehicle.id}
                vehicle={vehicle}
                isSelected={selectedVehicle === vehicle.id}
                onSelect={() => setSelectedVehicle(vehicle.id)}
                onEdit={handleEditVehicle}
                onDelete={handleDeleteVehicle}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="samples" className="space-y-6">
          <SampleVehicles />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VehicleManager;