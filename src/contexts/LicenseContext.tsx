import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';

type LicenseType = 'free-trial' | 'two-days' | 'monthly' | 'annual' | null;

interface LicenseContextType {
  licenseType: LicenseType;
  vehicleLimit: number;
  isLicenseValid: boolean;
  freeTrialUsed: boolean;
  purchaseLicense: (type: LicenseType) => void;
  checkLicense: () => boolean;
  useFreeAdvice: () => void;
  canUseFreeAdvice: () => boolean;
  canAccessApp: () => boolean;
  refreshLicense: () => Promise<void>;
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

const getLicenseDetails = (type: LicenseType) => {
  switch (type) {
    case 'free-trial':
      return { limit: 1, price: 0 };
    case 'two-days':
      return { limit: 1, price: 14.95 };
    case 'monthly':
      return { limit: 4, price: 29.95 };
    case 'annual':
      return { limit: 8, price: 99.95 };
    default:
      return { limit: 1, price: 0 };
  }
};

export const LicenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [licenseType, setLicenseType] = useState<LicenseType>(null);
  const [isLicenseValid, setIsLicenseValid] = useState(false);
  const [freeTrialUsed, setFreeTrialUsed] = useState(false);
  const [licenseLoading, setLicenseLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const vehicleLimit = getLicenseDetails(licenseType).limit;

  const refreshLicense = useCallback(async () => {
    if (licenseLoading || authLoading) return;
    
    setLicenseLoading(true);
    
    try {
      if (user) {
        const { data, error } = await supabase
          .from('user_licenses')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          const license = data[0];
          const now = new Date();
          const expiresAt = license.expires_at ? new Date(license.expires_at) : null;
          const isExpired = expiresAt && now > expiresAt;

          if (!isExpired) {
            setLicenseType(license.license_type as LicenseType);
            setIsLicenseValid(true);
            if (license.license_type === 'free-trial') {
              setFreeTrialUsed(true);
            }
            return;
          }
        }
        
        setLicenseType(null);
        setIsLicenseValid(false);
      } else {
        const storedType = localStorage.getItem('licenseType') as LicenseType;
        const storedValid = localStorage.getItem('licenseValid') === 'true';
        const storedTrialUsed = localStorage.getItem('freeTrialUsed') === 'true';
        
        setLicenseType(storedType);
        setIsLicenseValid(storedValid);
        setFreeTrialUsed(storedTrialUsed);
      }
    } catch (error) {
      console.error('Error fetching license:', error);
    } finally {
      setLicenseLoading(false);
    }
  }, [user, authLoading, licenseLoading]);

  useEffect(() => {
    if (!authLoading && !initialized) {
      refreshLicense().then(() => setInitialized(true)).catch(() => {
        setInitialized(true);
        setLicenseType(null);
        setIsLicenseValid(false);
      });
    }
  }, [authLoading, initialized, refreshLicense]);

  const purchaseLicense = useCallback((type: LicenseType) => {
    setLicenseType(type);
    setIsLicenseValid(true);
    if (!user) {
      localStorage.setItem('licenseType', type || '');
      localStorage.setItem('licenseValid', 'true');
      localStorage.setItem('licensePurchased', 'true');
    }
  }, [user]);

  const checkLicense = useCallback(() => {
    return isLicenseValid && licenseType !== null;
  }, [isLicenseValid, licenseType]);

  const useFreeAdvice = useCallback(async () => {
    if (user) {
      try {
        const { data, error } = await supabase.functions.invoke('process-license-purchase', {
          body: {
            userId: user.id,
            licenseType: 'free-trial'
          }
        });
        
        if (!error && data?.success) {
          await refreshLicense();
        }
      } catch (error) {
        console.error('Error saving free trial:', error);
      }
    } else {
      setFreeTrialUsed(true);
      setLicenseType('free-trial');
      setIsLicenseValid(true);
      localStorage.setItem('freeTrialUsed', 'true');
      localStorage.setItem('licenseType', 'free-trial');
      localStorage.setItem('licenseValid', 'true');
    }
  }, [user, refreshLicense]);

  const canUseFreeAdvice = useCallback(() => {
    if (user) {
      return !freeTrialUsed && !isLicenseValid;
    }
    const trialUsed = localStorage.getItem('freeTrialUsed') === 'true';
    const purchased = localStorage.getItem('licensePurchased') === 'true';
    return !trialUsed && !isLicenseValid && !purchased;
  }, [user, freeTrialUsed, isLicenseValid]);

  const canAccessApp = useCallback(() => {
    return isLicenseValid || canUseFreeAdvice();
  }, [isLicenseValid, canUseFreeAdvice]);

  return (
    <LicenseContext.Provider value={{
      licenseType,
      vehicleLimit,
      isLicenseValid,
      freeTrialUsed,
      purchaseLicense,
      checkLicense,
      useFreeAdvice,
      canUseFreeAdvice,
      canAccessApp,
      refreshLicense
    }}>
      {children}
    </LicenseContext.Provider>
  );
};

export const useLicense = () => {
  const context = useContext(LicenseContext);
  if (context === undefined) {
    throw new Error('useLicense must be used within a LicenseProvider');
  }
  return context;
};