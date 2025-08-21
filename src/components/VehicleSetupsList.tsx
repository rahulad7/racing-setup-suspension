import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
interface VehicleSetupsListProps {
  vehicleId: string;
  vehicleName: string;
}

const VehicleSetupsList: React.FC<VehicleSetupsListProps> = ({
  vehicleId,
  vehicleName
}) => {
  const { user } = useAuth();
  const { loadSetupForEditing } = useAppContext();
  const [setups, setSetups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string>('');

  useEffect(() => {
    loadSetups();
  }, [vehicleId, user]);

  const loadSetups = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('vehicle_setups')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSetups(data || []);
    } catch (error) {
      console.error('Error loading setups:', error);
      toast({
        title: "Error",
        description: "Failed to load vehicle setups",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSetup = async (setupId: string) => {
    await loadSetupForEditing(setupId);
    toast({
      title: "Setup Loaded",
      description: "Setup data loaded for editing. Navigate to Setup tab to modify.",
    });
  };

  const handleViewSetup = async (setupId: string) => {
    await loadSetupForEditing(setupId);
    toast({
      title: "Setup Loaded",
      description: "Setup data loaded for viewing. Navigate to Setup tab to see details.",
    });
  };
  const handleDeleteSetup = async (setupId: string) => {
    setDeletingId(setupId);
    try {
      const { error } = await supabase
        .from('vehicle_setups')
        .delete()
        .eq('id', setupId);

      if (error) throw error;
      
      await loadSetups(); // Reload setups
      toast({
        title: "Setup Deleted",
        description: "Setup has been successfully deleted.",
      });
    } catch (error) {
      console.error('Error deleting setup:', error);
      toast({
        title: "Error",
        description: "Failed to delete setup",
        variant: "destructive",
      });
    } finally {
      setDeletingId('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-400">Loading setups...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Saved Setups ({setups.length})
        </h3>
      </div>

      {setups.length === 0 ? (
        <Card className="bg-gray-800/50 border-gray-600/20">
          <CardContent className="py-8 text-center">
            <p className="text-gray-400">No setups saved for this vehicle yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {setups.map((setup) => (
            <Card key={setup.id} className="bg-gray-800/50 border-gray-600/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-white">{setup.setup_name}</h4>
                      {setup.track_name && (
                        <Badge variant="outline" className="text-xs">
                          {setup.track_name}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div>Created: {formatDate(setup.created_at || setup.updated_at)}</div>
                      {setup.lap_time && (
                        <div>Lap: {setup.lap_time}</div>
                      )}
                    </div>
                    {setup.notes && (
                      <p className="text-sm text-gray-300 mt-2 truncate">
                        {setup.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewSetup(setup.id)}
                      className="text-blue-400 border-blue-400/30 hover:bg-blue-400/10"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditSetup(setup.id)}
                      className="text-green-400 border-green-400/30 hover:bg-green-400/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={deletingId === setup.id}
                          className="text-red-400 border-red-400/30 hover:bg-red-400/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Setup</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{setup.setup_name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteSetup(setup.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleSetupsList;