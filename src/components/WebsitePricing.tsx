import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLicense } from '@/contexts/LicenseContext';
import LicenseModal from './LicenseModal';
import FreeLicenseExpired from './FreeLicenseExpired';

const WebsitePricing: React.FC = () => {
  const navigate = useNavigate();
  const { canUseFreeAdvice, useFreeAdvice, freeTrialUsed, isLicenseValid } = useLicense();
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  const handleChoosePlanClick = () => {
    navigate('/license');
  };

  return (
    <section id="pricing" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Start Cutting Your Lap Times</h2>
          <p className="text-4xl font-bold text-blue-400 mb-4">For as Little as $14.95</p>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            from first timers to experienced racers - we have the right plan for you
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleChoosePlanClick}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Choose Your Plan
            </Button>
          </div>
        </div>
      </div>
      <LicenseModal 
        isOpen={showLicenseModal} 
        onClose={() => setShowLicenseModal(false)} 
        showFreeOption={canUseFreeAdvice()}
      />
      <FreeLicenseExpired 
        isOpen={showExpiredModal}
        onClose={() => setShowExpiredModal(false)}
      />
    </section>
  );
};

export default WebsitePricing;