import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useLicense } from '@/contexts/LicenseContext';
import LicenseModal from './LicenseModal';

interface VehicleSetupManagerProps {
  vehicleId: string;
  vehicleName: string;
}

const VehicleSetupManager: React.FC<VehicleSetupManagerProps> = ({ vehicleId, vehicleName }) => {
  const { hasValidLicense } = useLicense();
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  // If no valid license, show premium feature lock with the specified format
  if (!hasValidLicense) {
    return (
      <>
        <div className="bg-slate-800 rounded-lg p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white">
            Premium Feature
          </h2>
          
          <p className="text-slate-400 text-lg">
            You need to pay to be able to enter this data.
          </p>
          
          <Button 
            onClick={() => setShowLicenseModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold rounded-lg"
          >
            Upgrade to Premium
          </Button>
        </div>
        
        <LicenseModal
          isOpen={showLicenseModal}
          onClose={() => setShowLicenseModal(false)}
          showFreeOption={true}
        />
      </>
    );
  }

  // Rest of the component logic would go here for licensed users
  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{vehicleName} - Setup Management</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">Setup management features available for licensed users.</p>
      </CardContent>
    </Card>
  );
};

export default VehicleSetupManager;