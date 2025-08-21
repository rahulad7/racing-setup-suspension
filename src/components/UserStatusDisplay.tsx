import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLicense } from '@/contexts/LicenseContext';
import { User, Crown, Clock, CheckCircle } from 'lucide-react';

export function UserStatusDisplay() {
  const { user, isAdmin } = useAuth();
  const { licenseType, isLicenseValid, vehicleLimit } = useLicense();

  const getPlanDisplayName = (type: string | null) => {
    switch (type) {
      case 'free-trial':
        return 'Free Trial';
      case 'two-days':
        return '2-Day Access';
      case 'monthly':
        return 'Monthly Plan';
      case 'annual':
        return 'Annual Plan';
      default:
        return 'No Plan';
    }
  };

  const getPlanColor = (type: string | null) => {
    switch (type) {
      case 'free-trial':
        return 'bg-gray-100 text-gray-800';
      case 'two-days':
        return 'bg-blue-100 text-blue-800';
      case 'monthly':
        return 'bg-green-100 text-green-800';
      case 'annual':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getPlanIcon = (type: string | null) => {
    switch (type) {
      case 'annual':
        return <Crown className="w-3 h-3 md:w-4 md:h-4" />;
      case 'monthly':
        return <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />;
      case 'two-days':
        return <Clock className="w-3 h-3 md:w-4 md:h-4" />;
      default:
        return <User className="w-3 h-3 md:w-4 md:h-4" />;
    }
  };

  if (!user && !isAdmin) {
    return (
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-3 md:p-4">
          <div className="flex items-center space-x-2 md:space-x-3">
            <User className="w-4 h-4 md:w-5 md:h-5 text-orange-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-orange-900 text-sm md:text-base">Guest Access</p>
              <p className="text-xs md:text-sm text-orange-700">Limited features available. Sign in for full access.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-3 md:p-4">
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              {getPlanIcon(licenseType)}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm md:text-base truncate">
                  {user?.email || 'Administrator'}
                </p>
                <div className="flex flex-wrap items-center space-x-2 mt-1">
                  <Badge className={getPlanColor(licenseType)}>
                    {isAdmin ? 'Administrator' : getPlanDisplayName(licenseType)}
                  </Badge>
                  {isLicenseValid && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-left md:text-right flex-shrink-0">
            <p className="text-xs md:text-sm text-gray-600">Vehicle Limit</p>
            <p className="font-semibold text-gray-900 text-sm md:text-base">
              {isAdmin ? '∞' : vehicleLimit} vehicles
            </p>
          </div>
        </div>
        
        {!isLicenseValid && !isAdmin && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
            <p className="text-xs md:text-sm text-red-700">
              No active plan. Purchase a plan to access all features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default UserStatusDisplay;