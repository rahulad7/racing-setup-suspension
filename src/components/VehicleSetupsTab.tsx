import React, { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useVehicleSetupsGlobal } from '@/hooks/useVehicleSetupsGlobal';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VehicleSetupsTabProps {
  onLoadSetup: (setup: any) => void;
}

const VehicleSetupsTab: React.FC<VehicleSetupsTabProps> = ({ onLoadSetup }) => {
  const { currentVehicle, setCurrentSetup, loadSetupForEditing } = useAppContext();
  const { setups, loading, deleteSetup, loadSetups } = useVehicleSetupsGlobal(currentVehicle?.id);

  // No need to filter anymore since the hook filters by vehicle_id
  // Reload setups when vehicle changes or when setupSaved event is triggered
  useEffect(() => {
    loadSetups();
    
    const handleSetupSaved = () => {
      loadSetups();
    };
    
    window.addEventListener('setupSaved', handleSetupSaved);
    return () => window.removeEventListener('setupSaved', handleSetupSaved);
  }, [currentVehicle]);
  const handleLoadSetup = async (setup: any) => {
    try {
      // Use AppContext's loadSetupForEditing to properly load the setup
      await loadSetupForEditing(setup.id);
      
      // Also call the passed onLoadSetup for backward compatibility
      const loadedData = {
        track: setup.track_name || '',
        vehicle: setup.data?.vehicle || {},
        suspension: setup.data?.suspension || {},
        tires: setup.data?.tires || {},
        aero: setup.data?.aero || {},
        alignment: setup.data?.alignment || {},
        cornerBalance: setup.data?.cornerBalance || {},
        swayBar: setup.data?.swayBar || {}
      };
      onLoadSetup(loadedData);
      
      toast({
        title: "Setup Loaded",
        description: `Setup "${setup.name}" has been loaded successfully`,
      });
    } catch (error) {
      console.error('Error loading setup:', error);
      toast({
        title: "Error",
        description: "Failed to load setup",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-800/50 border-blue-500/20">
        <CardContent className="p-6">
          <div className="text-center text-white">Loading saved setups...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/50 border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-white">My Setups</CardTitle>
        <CardDescription className="text-gray-400">
          Browse and load your previously saved setups
        </CardDescription>
      </CardHeader>
      <CardContent>
        {currentVehicle && (
          <div className="mb-4 p-2 bg-blue-50 rounded border">
            <p className="text-sm text-blue-700">
              Showing setups for: <strong>{currentVehicle.name}</strong>
            </p>
          </div>
        )}
        {setups.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No saved setups found</p>
            <p className="text-sm">{currentVehicle ? `No setups saved for ${currentVehicle.name}` : 'Save a setup to see it here'}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {setups.map((setup) => (
              <div key={setup.id} className="border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 bg-gray-700/20">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white">{setup.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSetup(setup.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {setup.track_name && (
                  <Badge variant="secondary" className="mb-2 bg-blue-600/20 text-blue-300 border-blue-500/30">
                    {setup.track_name}
                  </Badge>
                )}
                
                {setup.notes && (
                  <p className="text-sm text-gray-300 mb-2">{setup.notes}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(setup.updated_at).toLocaleDateString()}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLoadSetup(setup)}
                    className="border-blue-500/30 text-blue-300 hover:bg-blue-600/20"
                  >
                    Load Setup
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VehicleSetupsTab;