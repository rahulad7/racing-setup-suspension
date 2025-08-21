import { useLicense } from '@/contexts/LicenseContext';
import { useAuth } from '@/contexts/AuthContext';

export type PlanType = 'two-day' | 'monthly' | 'annual' | 'free-trial' | null;

export interface PlanDetails {
  name: string;
  vehicleLimit: number;
  price: number;
  duration: string;
}

export const useLicensePlan = () => {
  const { licenseType, vehicleLimit, isLicenseValid } = useLicense();
  const { isAdmin } = useAuth();

  const getPlanDetails = (type: PlanType): PlanDetails => {
    switch (type) {
      case 'two-day':
      case 'two-days':
        return {
          name: 'Two Day Plan',
          vehicleLimit: 1,
          price: 14.95,
          duration: '2 days'
        };
      case 'monthly':
        return {
          name: 'Monthly Plan',
          vehicleLimit: 4,
          price: 29.95,
          duration: '1 month'
        };
      case 'annual':
        return {
          name: 'Annual Plan',
          vehicleLimit: 8,
          price: 99.95,
          duration: '1 year'
        };
      case 'free-trial':
        return {
          name: 'Free Trial',
          vehicleLimit: 1,
          price: 0,
          duration: 'One-time use'
        };
      default:
        return {
          name: 'No Plan',
          vehicleLimit: 0,
          price: 0,
          duration: 'N/A'
        };
    }
  };

  // Override for admin users - give them annual plan privileges
  const effectiveLicenseType = isAdmin ? 'annual' : licenseType;
  const effectiveVehicleLimit = isAdmin ? 8 : vehicleLimit;
  const effectiveIsLicenseValid = isAdmin ? true : isLicenseValid;

  const currentPlan = getPlanDetails(effectiveLicenseType as PlanType);
  
  const isTwoDayPlan = () => effectiveLicenseType === 'two-days' || effectiveLicenseType === 'two-day';
  const isMonthlyPlan = () => effectiveLicenseType === 'monthly';
  const isAnnualPlan = () => effectiveLicenseType === 'annual';
  const isFreeTrialPlan = () => effectiveLicenseType === 'free-trial';

  const canAddVehicle = (currentVehicleCount: number) => {
    return currentVehicleCount < effectiveVehicleLimit;
  };

  return {
    licenseType: effectiveLicenseType,
    currentPlan: isAdmin ? { ...currentPlan, name: 'Administrator (Annual Pro)' } : currentPlan,
    vehicleLimit: effectiveVehicleLimit,
    isLicenseValid: effectiveIsLicenseValid,
    isTwoDayPlan,
    isMonthlyPlan,
    isAnnualPlan,
    isFreeTrialPlan,
    canAddVehicle,
    getPlanDetails,
    isAdmin
  };
};