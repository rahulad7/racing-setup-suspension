import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Trash2, Calendar } from 'lucide-react';

interface Setup {
  id: string;
  setup_name: string;
  created_at: string;
  track_name?: string;
  setup_data?: any; // FIXED: Added setup_data field to match database
}

interface SavedSetupsModalProps {
  isOpen: boolean;
  onClose: () => void;
  setups: Setup[];
  loading: boolean;
  onDeleteSetup: (setupId: string) => void;
  onLoadSetup?: (setup: Setup) => void;
  vehicleName: string;
}

const SavedSetupsModal: React.FC<SavedSetupsModalProps> = ({
  isOpen,
  onClose,
  setups,
  loading,
  onDeleteSetup,
  onLoadSetup,
  vehicleName
}) => {
  const handleDeleteSetup = async (e: React.MouseEvent, setupId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this setup?')) {
      await onDeleteSetup(setupId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Saved Setups - {vehicleName}
          </DialogTitle>
        </DialogHeader>
        
        {/* Debug info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 p-2 bg-gray-800 rounded">
            Debug: {setups.length} setups, loading: {loading.toString()}
            {setups.length > 0 && (
              <div>Setup IDs: {setups.map(s => s.id.slice(-8)).join(', ')}</div>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading setups...</div>
          ) : setups.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No saved setups found for this vehicle.
              <br />
              <span className="text-sm">Create a setup by clicking "Create Setup" on your vehicle.</span>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-400 mb-4">
                Found {setups.length} saved setup{setups.length !== 1 ? 's' : ''}:
              </div>
              {setups.map((setup) => (
                <Card key={setup.id} className="bg-gray-800/50 border-gray-600 hover:bg-gray-800/70 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-blue-400" />
                        <div>
                          <h4 className="font-semibold text-white">{setup.setup_name}</h4>
                          {setup.track_name && (
                            <p className="text-sm text-gray-400">Track: {setup.track_name}</p>
                          )}
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(setup.created_at)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onLoadSetup) {
                              onLoadSetup(setup);
                              onClose(); // Close modal after loading
                            }
                          }}
                          className="bg-green-600/20 border-green-500/30 text-green-300 hover:bg-green-600/30"
                        >
                          Load
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => handleDeleteSetup(e, setup.id)}
                          className="bg-red-600/20 border-red-500/30 text-red-300 hover:bg-red-600/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavedSetupsModal;