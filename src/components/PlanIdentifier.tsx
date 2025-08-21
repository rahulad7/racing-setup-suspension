import React from 'react';
import { useLicensePlan } from '@/hooks/useLicensePlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Clock, Calendar, Infinity } from 'lucide-react';

interface PlanIdentifierProps {
  showDetails?: boolean;
  className?: string;
}

export const PlanIdentifier: React.FC<PlanIdentifierProps> = ({ 
  showDetails = true, 
  className = '' 
}) => {
  const { 
    currentPlan, 
    vehicleLimit, 
    isLicenseValid,
    isTwoDayPlan,
    isMonthlyPlan,
    isAnnualPlan,
    isFreeTrialPlan
  } = useLicensePlan();

  if (!isLicenseValid) {
    return (
      <Card className={`border-red-200 ${className}`}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <Badge variant="destructive">No Active Plan</Badge>
            <span className="text-sm text-muted-foreground">
              Please purchase a plan to continue
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPlanIcon = () => {
    if (isTwoDayPlan()) return <Clock className="h-4 w-4" />;
    if (isMonthlyPlan()) return <Calendar className="h-4 w-4" />;
    if (isAnnualPlan()) return <Infinity className="h-4 w-4" />;
    return <Car className="h-4 w-4" />;
  };

  const getPlanColor = () => {
    if (isTwoDayPlan()) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (isMonthlyPlan()) return 'bg-green-100 text-green-800 border-green-200';
    if (isAnnualPlan()) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <Card className={`${getPlanColor()} ${className}`}>
      {showDetails && (
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            {getPlanIcon()}
            {currentPlan.name}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={showDetails ? 'pt-0' : 'pt-6'}>
        <div className="space-y-2">
          {!showDetails && (
            <div className="flex items-center gap-2 mb-2">
              {getPlanIcon()}
              <Badge className={getPlanColor()}>
                {currentPlan.name}
              </Badge>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            <span className="font-medium">
              Vehicle Limit: {vehicleLimit}
            </span>
          </div>
          {showDetails && (
            <>
              <div className="text-sm text-muted-foreground">
                Duration: {currentPlan.duration}
              </div>
              {currentPlan.price > 0 && (
                <div className="text-sm font-medium">
                  ${currentPlan.price.toFixed(2)}
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};