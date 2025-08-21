import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Car, Settings, Trash2, Edit, Plus } from 'lucide-react';
import { useVehicleSetupsDB } from '@/hooks/useVehicleSetupsDB';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import SavedSetupsModal from './SavedSetupsModal';
interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: string;
  car_type: string;
  track_type: string;
}

interface VehicleWithSetupsProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicleId: string) => void;
}

const VehicleWithSetups: React.FC<VehicleWithSetupsProps> = ({
  vehicle,
  isSelected,
  onSelect,
  onEdit,
  onDelete
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSetupsModal, setShowSetupsModal] = useState(false);
  const { setups, loading, deleteSetup, loadSetups } = useVehicleSetupsDB(vehicle.id);

  // Listen for setup saved events to refresh the list
  useEffect(() => {
    const handleSetupSaved = (event: CustomEvent) => {
      if (event.detail.vehicleId === vehicle.id) {
        console.log('Setup saved for this vehicle, refreshing list');
        loadSetups();
      }
    };

    window.addEventListener('setupSaved', handleSetupSaved as EventListener);
    return () => {
      window.removeEventListener('setupSaved', handleSetupSaved as EventListener);
    };
  }, [vehicle.id, loadSetups]);

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleSetupDelete = async (e: React.MouseEvent, setupId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this setup?')) {
      await deleteSetup(setupId);
    }
  };
  const { setCurrentVehicle, setCurrentSetup, loadSetupForEditing } = useAppContext();
  const navigate = useNavigate();
  
  // Set current setup when vehicle is selected and has setups
  useEffect(() => {
    console.log('VehicleWithSetups useEffect:', { 
      isSelected, 
      setupsLength: setups.length, 
      vehicleId: vehicle.id,
      setups: setups.map(s => ({ id: s.id, name: s.setup_name }))
    });
    
    if (isSelected && setups.length > 0) {
      // Set the most recent setup (first in the list) as current
      const setupToSet = { id: setups[0].id, name: setups[0].setup_name };
      console.log('Setting current setup:', setupToSet);
      setCurrentSetup(setupToSet);
    } else if (isSelected && setups.length === 0) {
      // Clear current setup if no setups available
      console.log('Clearing current setup - no setups available for vehicle:', vehicle.id);
      setCurrentSetup(null);
    }
  }, [isSelected, setups, setCurrentSetup, vehicle.id]);
  
  const handleDoubleClick = () => {
    setCurrentVehicle({ id: vehicle.id, name: vehicle.name });
    navigate('/data-entry');
  };

  const handleCreateSetup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentVehicle({ id: vehicle.id, name: vehicle.name });
    navigate('/data-entry');
  };

  return (
    <Card className={`bg-gray-800/50 border-blue-500/20 transition-colors ${
      isSelected ? 'ring-2 ring-blue-500' : ''
    }`}>
      <CardContent className="p-4">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={onSelect}
          onDoubleClick={handleDoubleClick}
        >
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggleExpand}
              className="p-1 h-6 w-6 text-gray-400 hover:text-white"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
            <Car className="h-5 w-5 text-blue-400" />
            <div>
              <h3 className="font-semibold text-white">{vehicle.name}</h3>
              <p className="text-sm text-gray-400">{vehicle.year} {vehicle.make} {vehicle.model}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCreateSetup}
              className="ml-2 bg-green-600/20 border-green-500/30 text-green-300 hover:bg-green-600/30"
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Setup
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                // Load fresh setups data when opening modal
                loadSetups();
                setShowSetupsModal(true);
              }}
              className="ml-2 bg-blue-600/20 border-blue-500/30 text-blue-300 hover:bg-blue-600/30"
            >
              <Settings className="h-4 w-4 mr-1" />
              Load Saved Setups
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(vehicle);
              }}
              className="bg-blue-600/20 border-blue-500/30 text-blue-300 hover:bg-blue-600/30"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(vehicle.id);
              }}
              className="bg-red-600/20 border-red-500/30 text-red-300 hover:bg-red-600/30"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <SavedSetupsModal
          isOpen={showSetupsModal}
          onClose={() => setShowSetupsModal(false)}
          setups={setups}
          loading={loading}
          onDeleteSetup={deleteSetup}
          onLoadSetup={async (setup) => {
            // Load the setup data into the editor and navigate to data entry
            setCurrentVehicle({ id: vehicle.id, name: vehicle.name });
            setCurrentSetup({ id: setup.id, name: setup.setup_name });
            await loadSetupForEditing(setup.id);
            navigate('/data-entry');
          }}
          vehicleName={vehicle.name}
        />
      </CardContent>
    </Card>
  );
};

export default VehicleWithSetups;