import React from 'react';
import AppLayout from '@/components/AppLayout';
import TrackVehicleSetupFlow from '@/components/TrackVehicleSetupFlow';

const DataEntryPoints: React.FC = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Setup Manager</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Create and manage your setups by track. Start by selecting or creating a vehicle, then choose your track, and finally configure your setup.
          </p>
        </div>
        <TrackVehicleSetupFlow />
      </div>
    </AppLayout>
  );
};

export default DataEntryPoints;