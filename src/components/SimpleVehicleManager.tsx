import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Vehicle {
  id: string;
  name: string;
  year?: number;
  make?: string;
  model?: string;
}

export function SimpleVehicleManager() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    year: '',
    make: '',
    model: ''
  });

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const addVehicle = async () => {
    if (!newVehicle.name.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('vehicles')
        .insert([{
          user_id: user.id,
          name: newVehicle.name,
          year: newVehicle.year ? parseInt(newVehicle.year) : null,
          make: newVehicle.make || null,
          model: newVehicle.model || null
        }]);

      if (error) throw error;

      setNewVehicle({ name: '', year: '', make: '', model: '' });
      loadVehicles();
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  if (loading) return <div>Loading vehicles...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Vehicle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Vehicle Name *</Label>
            <Input
              id="name"
              value={newVehicle.name}
              onChange={(e) => setNewVehicle({...newVehicle, name: e.target.value})}
              placeholder="My Race Car"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={newVehicle.year}
                onChange={(e) => setNewVehicle({...newVehicle, year: e.target.value})}
                placeholder="2020"
              />
            </div>
            <div>
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                value={newVehicle.make}
                onChange={(e) => setNewVehicle({...newVehicle, make: e.target.value})}
                placeholder="Honda"
              />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={newVehicle.model}
                onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                placeholder="Civic"
              />
            </div>
          </div>
          <Button onClick={addVehicle}>Add Vehicle</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Vehicles ({vehicles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicles.length === 0 ? (
            <p>No vehicles added yet.</p>
          ) : (
            <div className="space-y-2">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="p-3 border rounded">
                  <h3 className="font-semibold">{vehicle.name}</h3>
                  {(vehicle.year || vehicle.make || vehicle.model) && (
                    <p className="text-sm text-gray-600">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}