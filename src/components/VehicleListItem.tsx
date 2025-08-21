import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car, Plus, Settings } from 'lucide-react';
import SetupSelectionModal from './SetupSelectionModal';

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

interface VehicleListItemProps {
  vehicle: Vehicle;
  onCreateSetup: (vehicleId: string) => void;
  onLoadSetup: (vehicleId: string, setupId: string) => void;
}

export const VehicleListItem: React.FC<VehicleListItemProps> = ({
  vehicle,
  onCreateSetup,
  onLoadSetup,
}) => {
  const [showSetupModal, setShowSetupModal] = useState(false);

  const handleCreateSetup = () => {
    onCreateSetup(vehicle.id);
  };

  const handleLoadSetup = (setupId: string) => {
    onLoadSetup(vehicle.id, setupId);
  };

  const handleManageSetups = () => {
    setShowSetupModal(true);
  };

  return (
    <>
      <Card className="w-full hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-600" />
            {vehicle.name}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button
              onClick={handleCreateSetup}
              size="sm"
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Setup
            </Button>
            <Button
              onClick={handleManageSetups}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <Settings className="h-4 w-4 mr-2" />
              Manage
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="w-fit">
              {vehicle.setups?.length || 0} setup{(vehicle.setups?.length || 0) !== 1 ? 's' : ''}
            </Badge>
            {vehicle.setups && vehicle.setups.length > 0 && (
              <div className="text-xs text-muted-foreground">
                Latest: {new Date(vehicle.setups[0].created_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <SetupSelectionModal
        isOpen={showSetupModal}
        onOpenChange={setShowSetupModal}
        vehicleId={vehicle.id}
        vehicleName={vehicle.name}
        setups={vehicle.setups || []}
        onCreateSetup={handleCreateSetup}
        onLoadSetup={handleLoadSetup}
      />
    </>
  );
};