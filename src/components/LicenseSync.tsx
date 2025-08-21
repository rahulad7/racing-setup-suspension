import React, { useEffect } from 'react';
import { useLicense } from '@/contexts/LicenseContext';
import { useAuth } from '@/contexts/AuthContext';

const LicenseSync: React.FC = () => {
  const { refreshLicense } = useLicense();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Refresh license when user logs in
      const timer = setTimeout(() => {
        refreshLicense();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user, refreshLicense]);

  // Also refresh every 30 seconds if user is logged in
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      refreshLicense();
    }, 30000);

    return () => clearInterval(interval);
  }, [user, refreshLicense]);

  return null;
};

export default LicenseSync;