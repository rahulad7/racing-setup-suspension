import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVehiclesDB } from '@/hooks/useVehiclesDB';
import { useVehicleSetupsGlobal } from '@/hooks/useVehicleSetupsGlobal';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface RunAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (vehicleId: string, setupId: string) => void;
}

const RunAnalysisModal: React.FC<RunAnalysisModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const [selectedSetupId, setSelectedSetupId] = useState<string>('');
  const { vehicles, loading: vehiclesLoading } = useVehiclesDB();
  const { setups, loading: setupsLoading } = useVehicleSetupsGlobal();

  // Filter setups for selected vehicle
  const vehicleSetups = setups.filter(setup => setup.vehicle_id === selectedVehicleId);

  const handleConfirm = () => {
    if (selectedVehicleId && selectedSetupId) {
      onConfirm(selectedVehicleId, selectedSetupId);
      onClose();
    }
  };

  // Reset selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedVehicleId('');
      setSelectedSetupId('');
    }
  }, [isOpen]);

  // Reset setup selection when vehicle changes
  useEffect(() => {
    setSelectedSetupId('');
  }, [selectedVehicleId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Analysis</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select which vehicle and setup you want to run the analysis against:
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Vehicle</label>
              <Select value={selectedVehicleId} onValueChange={setSelectedVehicleId}>
                <SelectTrigger>
                  <SelectValue placeholder={vehiclesLoading ? "Loading vehicles..." : "Select a vehicle"} />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Setup</label>
              <Select 
                value={selectedSetupId} 
                onValueChange={setSelectedSetupId}
                disabled={!selectedVehicleId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={
                    !selectedVehicleId ? "Select a vehicle first" :
                    setupsLoading ? "Loading setups..." :
                    vehicleSetups.length === 0 ? "No setups found for this vehicle" :
                    "Select a setup"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {vehicleSetups.map((setup) => (
                    <SelectItem key={setup.id} value={setup.id}>
                      {setup.name} {setup.track_name ? `- ${setup.track_name}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedVehicleId && vehicleSetups.length === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No setups found for the selected vehicle. Please create a setup first.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!selectedVehicleId || !selectedSetupId}
            >
              Run Analysis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RunAnalysisModal;