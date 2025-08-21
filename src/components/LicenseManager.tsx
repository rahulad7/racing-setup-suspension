import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLicense } from '@/contexts/LicenseContext';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import LicensePurchase from './LicensePurchase';
import LicenseSync from './LicenseSync';
import LicenseDebug from './LicenseDebug';

const LicenseManager: React.FC = () => {
  const { licenseType, isLicenseValid, freeTrialUsed, canUseFreeAdvice, useFreeAdvice } = useLicense();

  const handleFreeTrial = () => {
    useFreeAdvice();
    window.location.href = '/app';
  };

  const getLicenseStatus = () => {
    if (isLicenseValid && licenseType) {
      return {
        status: 'Active',
        color: 'bg-green-500',
        icon: <CheckCircle className="h-4 w-4" />,
        description: `${licenseType.charAt(0).toUpperCase() + licenseType.slice(1)} License`
      };
    }
    if (freeTrialUsed) {
      return {
        status: 'Trial Used',
        color: 'bg-yellow-500',
        icon: <XCircle className="h-4 w-4" />,
        description: 'Free trial has been used'
      };
    }
    return {
      status: 'No License',
      color: 'bg-gray-500',
      icon: <XCircle className="h-4 w-4" />,
      description: 'No active license'
    };
  };

  const licenseStatus = getLicenseStatus();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">License Management</h1>
          <p className="text-gray-300">Manage your suspension analysis license</p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Current License Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={`${licenseStatus.color} text-white`}>
                    {licenseStatus.icon}
                    <span className="ml-1">{licenseStatus.status}</span>
                  </Badge>
                  <span className="text-gray-300">{licenseStatus.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <LicenseSync />
          <LicenseDebug />

          {canUseFreeAdvice() && (
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Free Trial Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 mb-2">
                      Try our suspension analysis with one free session
                    </p>
                  </div>
                  <Button onClick={handleFreeTrial} className="bg-green-600 hover:bg-green-700">
                    Start Free Trial
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <LicensePurchase />
      </div>
    </div>
  );
};

export default LicenseManager;