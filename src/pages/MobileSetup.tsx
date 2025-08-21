import React from 'react';
import AppHeader from '@/components/AppHeader';
import { MobileAppSetup } from '@/components/MobileAppSetup';

const MobileSetup: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mobile App Setup</h1>
            <p className="text-muted-foreground">
              Convert your React app to native iOS and Android apps using Capacitor
            </p>
          </div>
          <MobileAppSetup />
        </div>
      </div>
    </div>
  );
};

export default MobileSetup;