import React, { useState } from 'react';
import SampleDemo from '@/components/SampleDemo';
import AppHeader from '@/components/AppHeader';
import LicenseModal from '@/components/LicenseModal';

const SampleDemoPage: React.FC = () => {
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  return (
    <div className="min-h-screen bg-black w-full">
      <AppHeader onShowLicenseModal={() => setShowLicenseModal(true)} />
      
      <div className="w-full px-4 py-8">
        <SampleDemo />
      </div>
      
      {showLicenseModal && (
        <LicenseModal onClose={() => setShowLicenseModal(false)} />
      )}
    </div>
  );
};

export default SampleDemoPage;