import React from 'react';
import { useVehiclesDB } from '@/hooks/useVehiclesDB';

const VehicleTestComponent: React.FC = () => {
  const { vehicles, loading } = useVehiclesDB();

  if (loading) {
    return <div>Loading vehicles...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Vehicle Test</h3>
      <p>Found {vehicles.length} vehicles</p>
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="border p-2 mb-2">
          <p><strong>Name:</strong> {vehicle.name}</p>
          <p><strong>Make:</strong> {vehicle.make}</p>
          <p><strong>Model:</strong> {vehicle.model}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleTestComponent;