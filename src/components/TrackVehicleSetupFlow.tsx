import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVehiclesDB } from '@/hooks/useVehiclesDB';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import { Car, MapPin, Settings, Plus } from 'lucide-react';
import WorkingSaveButton from '@/components/WorkingSaveButton';
import VehicleGarage from '@/components/VehicleGarage';
const TrackVehicleSetupFlow: React.FC = () => {
  const { vehicles, saveVehicle } = useVehiclesDB();
  const { setCurrentVehicle, setCurrentSetup, currentSetupData } = useAppContext();
  const { toast } = useToast();
  
  const [step, setStep] = useState<'vehicle' | 'track' | 'setup'>('vehicle');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('');
  const [newVehicle, setNewVehicle] = useState({ name: '', year: '', make: '', model: '' });
  const [setupData, setSetupData] = useState({
    name: '',
    front_tire_pressure: '',
    rear_tire_pressure: '',
    front_camber: '',
    rear_camber: '',
    notes: ''
  });

  // Load setup data from AppContext when available
  // Load setup data from AppContext when available
  useEffect(() => {
    if (currentSetupData) {
      console.log('Loading setup data into TrackVehicleSetupFlow:', currentSetupData);
      
      setSetupData({
        name: currentSetupData.setup_name || '',
        front_tire_pressure: currentSetupData.tire_pressure_fl || '',
        rear_tire_pressure: currentSetupData.tire_pressure_rl || '',
        front_camber: currentSetupData.front_camber || '',
        rear_camber: currentSetupData.rear_camber || '',
        notes: currentSetupData.notes || ''
      });
      
      // Set track if available
      if (currentSetupData.track_name) {
        console.log('Setting track to:', currentSetupData.track_name);
        setSelectedTrack(currentSetupData.track_name);
        setStep('track'); // Show track step first so user can see it's loaded
      }
      
      // Set vehicle if available
      if (currentSetupData.vehicle_id) {
        setSelectedVehicle(currentSetupData.vehicle_id);
        setCurrentVehicle({ 
          id: currentSetupData.vehicle_id, 
          name: currentSetupData.vehicle_name || 'Loaded Vehicle' 
        });
      }
      
      toast({
        title: "Setup Loaded",
        description: `Setup "${currentSetupData.setup_name}" loaded with track "${currentSetupData.track_name}"`,
      });
    }
  }, [currentSetupData, toast, setCurrentVehicle]);
  const tracks = [
    'Road America', 'Watkins Glen', 'Laguna Seca', 'Sebring', 'VIR',
    'COTA', 'Road Atlanta', 'Mid-Ohio', 'Barber Motorsports', 'Lime Rock'
  ];

  const handleCreateVehicle = async () => {
    if (!newVehicle.name || !newVehicle.make || !newVehicle.model) {
      toast({ title: 'Error', description: 'Please fill all vehicle fields', variant: 'destructive' });
      return;
    }
    
    try {
      await saveVehicle(newVehicle);
      toast({ title: 'Success', description: 'Vehicle created successfully' });
      setStep('track');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create vehicle', variant: 'destructive' });
    }
  };

  const handleVehicleSelection = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      setCurrentVehicle({ id: vehicle.id, vehicle_name: vehicle.vehicle_name });
    }
    setStep('track');
  };

  const handleTrackSelection = (trackName: string) => {
    setSelectedTrack(trackName);
    setCurrentSetup({ id: '', name: '', trackName });
    setStep('setup');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Sample Vehicles and Setups Section */}
      <div className="mb-8">
        <VehicleGarage />
      </div>

      <div className="flex items-center justify-center space-x-4 mb-8">
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${step === 'vehicle' ? 'bg-blue-600' : 'bg-gray-600'}`}>
          <Car className="h-4 w-4" />
          <span>Vehicle</span>
        </div>
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${step === 'track' ? 'bg-blue-600' : 'bg-gray-600'}`}>
          <MapPin className="h-4 w-4" />
          <span>Track</span>
        </div>
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${step === 'setup' ? 'bg-blue-600' : 'bg-gray-600'}`}>
          <Settings className="h-4 w-4" />
          <span>Setup</span>
        </div>
      </div>

      {step === 'vehicle' && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Car className="h-5 w-5" />
              Select or Create Vehicle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vehicles.length > 0 && (
              <div>
                <Label className="text-white">Existing Vehicles</Label>
                <Select value={selectedVehicle} onValueChange={handleVehicleSelection}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select a vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.vehicle_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="border-t border-gray-600 pt-4">
              <Label className="text-white">Or Create New Vehicle</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Label className="text-gray-300">Name</Label>
                  <Input
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="e.g., Race Car"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Year</Label>
                  <Input
                    value={newVehicle.year}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, year: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="e.g., 2020"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Make</Label>
                  <Input
                    value={newVehicle.make}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, make: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="e.g., Honda"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Model</Label>
                  <Input
                    value={newVehicle.model}
                    onChange={(e) => setNewVehicle(prev => ({ ...prev, model: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="e.g., Civic"
                  />
                </div>
              </div>
              <Button onClick={handleCreateVehicle} className="mt-4 bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Vehicle
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'track' && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Select Track
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedTrack} onValueChange={handleTrackSelection}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select a track" />
              </SelectTrigger>
              <SelectContent>
                {tracks.map((track) => (
                  <SelectItem key={track} value={track}>
                    {track}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={() => setStep('vehicle')} variant="outline">
              Back to Vehicle
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'setup' && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Create Setup for {selectedTrack}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Setup Name (optional)</Label>
              <Input
                value={setupData.name}
                onChange={(e) => setSetupData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Leave blank to auto-generate"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Front Tire Pressure (PSI)</Label>
                <Input
                  value={setupData.front_tire_pressure}
                  onChange={(e) => setSetupData(prev => ({ ...prev, front_tire_pressure: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="32"
                />
              </div>
              <div>
                <Label className="text-gray-300">Rear Tire Pressure (PSI)</Label>
                <Input
                  value={setupData.rear_tire_pressure}
                  onChange={(e) => setSetupData(prev => ({ ...prev, rear_tire_pressure: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="30"
                />
              </div>
              <div>
                <Label className="text-gray-300">Front Camber</Label>
                <Input
                  value={setupData.front_camber}
                  onChange={(e) => setSetupData(prev => ({ ...prev, front_camber: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="-2.5"
                />
              </div>
              <div>
                <Label className="text-gray-300">Rear Camber</Label>
                <Input
                  value={setupData.rear_camber}
                  onChange={(e) => setSetupData(prev => ({ ...prev, rear_camber: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="-1.8"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-gray-300">Notes</Label>
              <Input
                value={setupData.notes}
                onChange={(e) => setSetupData(prev => ({ ...prev, notes: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Setup notes..."
              />
            </div>
            
            <div className="space-y-4">
              <WorkingSaveButton 
                setupData={{
                  front_tire_pressure: setupData.front_tire_pressure,
                  rear_tire_pressure: setupData.rear_tire_pressure,
                  front_camber: setupData.front_camber,
                  rear_camber: setupData.rear_camber,
                  trackData: { name: selectedTrack },
                  notes: setupData.notes
                }}
                className="w-full"
              />
              <Button onClick={() => setStep('track')} variant="outline" className="w-full">
                Back to Track
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackVehicleSetupFlow;