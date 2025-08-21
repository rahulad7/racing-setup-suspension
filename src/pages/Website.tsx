import React from 'react';
import { LicenseProvider } from '@/contexts/LicenseContext';
import WebsiteHeader from '@/components/WebsiteHeader';
import WebsiteHero from '@/components/WebsiteHero';
import WebsiteFeatures from '@/components/WebsiteFeatures';
import WebsitePricing from '@/components/WebsitePricing';
import WebsiteMobile from '@/components/WebsiteMobile';
import WebsiteFooter from '@/components/WebsiteFooter';
import TrackComponentCosts from '@/components/TrackComponentCosts';

const Website: React.FC = () => {
  return (
    <LicenseProvider>
      <div className="min-h-screen bg-black">
        <WebsiteHeader />
        <WebsiteHero />
        <WebsiteFeatures />
        <div id="track-costs">
          <TrackComponentCosts />
        </div>
        <WebsitePricing />
        <WebsiteMobile />
        <WebsiteFooter />
      </div>
    </LicenseProvider>
  );
};

export default Website;