import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Edit, Trash2, Calendar } from 'lucide-react';
import { useVehicleSetupsDB } from '@/hooks/useVehicleSetupsDB';
import VehicleSetupEditor from './VehicleSetupEditor';

interface VehicleSetupListProps {
  vehicleId: string;
  onEditSetup?: (setupId: string) => void;
}

const VehicleSetupList: React.FC<VehicleSetupListProps> = ({ vehicleId, onEditSetup }) => {
  const { setups, deleteSetup } = useVehicleSetupsDB(vehicleId);
  const [editingSetupId, setEditingSetupId] = useState<string>('');

  const handleEdit = (setupId: string) => {
    setEditingSetupId(setupId);
  };

  const handleDelete = (setupId: string) => {
    if (confirm('Are you sure you want to delete this setup?')) {
      deleteSetup(setupId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (setups.length === 0) {
    return (
      <Card className="bg-gray-800/50 border-blue-500/20 text-center py-8">
        <CardContent>
          <History className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-500">No saved setups for this vehicle yet.</p>
          <p className="text-sm text-gray-600 mt-2">Create a setup to see it here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <History className="h-5 w-5" />
            Setups ({setups.length})
          </h3>
        </div>
        
        <div className="grid gap-3">
          {setups.map((setup) => (
            <Card key={setup.id} className="bg-gray-800/50 border-blue-500/20 hover:border-blue-400/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-white">{setup.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {setup.track || 'General'}
                      </Badge>
                    </div>
                    
                    {setup.notes && (
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">{setup.notes}</p>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                       <span>{formatDate(setup.created_at)}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(setup.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(setup.id)}
                      className="h-8 w-8 p-0 hover:bg-red-500/20 hover:border-red-500/50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {editingSetupId && (
        <VehicleSetupEditor
          isOpen={!!editingSetupId}
          onClose={() => setEditingSetupId('')}
          setupId={editingSetupId}
          vehicleId={vehicleId}
        />
      )}
    </>
  );
};

export default VehicleSetupList;