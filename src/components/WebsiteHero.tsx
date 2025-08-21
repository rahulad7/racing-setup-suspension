import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLicense } from '@/contexts/LicenseContext';
import LicenseModal from './LicenseModal';
import FreeLicenseExpired from './FreeLicenseExpired';

const WebsiteHero: React.FC = () => {
  const navigate = useNavigate();
  const { canUseFreeAdvice, useFreeAdvice, freeTrialUsed, isLicenseValid } = useLicense();
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16 flex justify-center">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/6878478b83c3f8bb4fdcd0d1_1753210534580_31753e04.png"
              alt="Setup Pro Logo"
              className="h-64 object-contain"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Start Cutting Your Lap Times
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-6">
            For as Little as $14.95
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            from first timers to experienced racers - we have the right plan for you
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => navigate('/sample-demo')}
              variant="outline"
              size="lg"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 text-lg px-8 py-3"
            >
              View Sample Report
            </Button>
            <Button 
              onClick={() => navigate('/data-entry?tab=vehicles')}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3"
            >
              Launch Online Analysis Tool
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <Target className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Precision Setup</h3>
              <p className="text-gray-400">Data-driven suspension recommendations tailored to your vehicle and track</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Faster Lap Times</h3>
              <p className="text-gray-400">Optimize your car's handling for maximum performance and consistency</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Instant Results</h3>
              <p className="text-gray-400">Get professional analysis in minutes, not hours of trial and error</p>
            </div>
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

export default WebsiteHero;