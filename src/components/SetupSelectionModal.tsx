import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, FolderOpen, Calendar, MapPin, Thermometer } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface VehicleSetup {
  id: string;
  setup_name: string;
  track_name: string;
  weather_conditions?: string;
  temperature?: number;
  temperature_unit?: string;
  created_at: string;
}

interface SetupSelectionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleId: string;
  vehicleName: string;
  setups: VehicleSetup[];
  onCreateSetup: () => void;
  onLoadSetup: (setupId: string) => void;
}

const SetupSelectionModal: React.FC<SetupSelectionModalProps> = ({
  isOpen,
  onOpenChange,
  vehicleId,
  vehicleName,
  setups: propSetups,
  onCreateSetup,
  onLoadSetup
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Use the setups passed as props instead of fetching from database
  const setups = propSetups;



  const handleNewSetup = () => {
    onOpenChange(false);
    onCreateSetup();
  };

  const handleLoadSetup = (setupId: string) => {
    onOpenChange(false);
    onLoadSetup(setupId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {vehicleName} - Setup Options
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Button
            onClick={handleNewSetup}
            className="w-full h-16 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Plus className="h-6 w-6" />
            <span className="text-lg font-medium">Create New Setup</span>
          </Button>
          
          {setups.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Existing Setups ({setups.length})</h3>
              {loading ? (
                <div className="text-center py-4">Loading setups...</div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {setups.map((setup) => (
                    <Card key={setup.id} className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{setup.setup_name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(setup.created_at)}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {setup.track_name || 'No track specified'}
                              </div>
                              
                              {setup.weather_conditions && (
                                <div className="flex items-center gap-1">
                                  <span>☀️</span>
                                  {setup.weather_conditions}
                                </div>
                              )}
                              
                              {setup.temperature && (
                                <div className="flex items-center gap-1">
                                  <Thermometer className="h-3 w-3" />
                                  {setup.temperature}°{setup.temperature_unit || 'F'}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => handleLoadSetup(setup.id)}
                            size="sm"
                            variant="outline"
                            className="ml-4"
                          >
                            <FolderOpen className="h-4 w-4 mr-2" />
                            Load
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {setups.length === 0 && !loading && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No existing setups found for this vehicle.</p>
              <p className="text-sm mt-2">Create your first setup to get started!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetupSelectionModal;