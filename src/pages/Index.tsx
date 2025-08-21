import React from 'react';
import AppHeader from '@/components/AppHeader';
import RaceSetupHero from '@/components/RaceSetupHero';

import { useLicense } from '@/contexts/LicenseContext';

const Index: React.FC = () => {
  const { canAccessApp } = useLicense();

  const handleShowLicenseModal = () => {
    // This could trigger a license modal if needed
    console.log('License modal requested');
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onShowLicenseModal={handleShowLicenseModal} />
      <div className="w-full">
        <RaceSetupHero />
      </div>
    </div>
  );
};

export default Index;