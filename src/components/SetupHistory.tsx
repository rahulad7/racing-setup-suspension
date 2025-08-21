import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Settings, Trash2, Edit } from 'lucide-react';
import { useVehicleSetups } from '@/hooks/useVehicleSetups';

interface SetupRecord {
  id: string;
  name: string;
  vehicleId: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  data: {
    suspension: any;
    tires: any;
    aero: any;
    alignment: any;
    cornerBalance: any;
    swayBar: any;
  };
}

interface SetupHistoryProps {
  vehicleId: string;
  onEditSetup?: (setup: SetupRecord) => void;
}

const SetupHistory: React.FC<SetupHistoryProps> = ({ vehicleId, onEditSetup }) => {
  const { setups, loading, deleteSetup } = useVehicleSetups(vehicleId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = (setup: SetupRecord) => {
    if (onEditSetup) {
      onEditSetup(setup);
    }
  };

  const handleDelete = (setupId: string) => {
    if (confirm('Are you sure you want to delete this setup?')) {
      deleteSetup(setupId);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Loading setup history...</div>
        </CardContent>
      </Card>
    );
  }

  if (!vehicleId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Setup History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Please select a vehicle to view setup history</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (setups.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Setup History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No setup records found for this vehicle</p>
            <p className="text-sm">Create your first setup to see it here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Setup History ({setups.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {setups.map((setup) => (
            <Card key={setup.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{setup.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(setup.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {onEditSetup && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(setup)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(setup.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  {setup.data?.tires?.frontSize && (
                    <Badge variant="secondary" className="text-xs">
                      Front: {setup.data.tires.frontSize}
                    </Badge>
                  )}
                  {setup.data?.tires?.rearSize && (
                    <Badge variant="secondary" className="text-xs">
                      Rear: {setup.data.tires.rearSize}
                    </Badge>
                  )}
                  {setup.data?.tires?.make && (
                    <Badge variant="secondary" className="text-xs">
                      {setup.data.tires.make}
                    </Badge>
                  )}
                  {setup.data?.suspension?.weight && (
                    <Badge variant="secondary" className="text-xs">
                      {setup.data.suspension.weight} lbs
                    </Badge>
                  )}
                </div>

                {setup.notes && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {setup.notes}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupHistory;
export type { SetupRecord };