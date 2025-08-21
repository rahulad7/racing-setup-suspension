import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface VehicleCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVehicleCreated: () => void;
}

export const VehicleCreationModal: React.FC<VehicleCreationModalProps> = ({
  isOpen,
  onClose,
  onVehicleCreated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    make: '',
    model: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create new vehicle object
      const newVehicle = {
        id: `vehicle-${Date.now()}`,
        name: formData.name,
        year: parseInt(formData.year),
        make: formData.make,
        model: formData.model,
        setups: []
      };

      // Get existing vehicles from localStorage
      const existingVehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
      
      // Add new vehicle
      const updatedVehicles = [...existingVehicles, newVehicle];
      
      // Save to localStorage
      localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
      
      toast({
        title: "Vehicle Added",
        description: `${formData.year} ${formData.make} ${formData.model} has been added to your garage.`,
      });
      
      onVehicleCreated();
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        year: '',
        make: '',
        model: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create vehicle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Vehicle Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Red Thunder"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                placeholder="2023"
                min="1950"
                max="2025"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                value={formData.make}
                onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
                placeholder="Honda"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
              placeholder="Civic Si"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Adding...' : 'Add Vehicle'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};