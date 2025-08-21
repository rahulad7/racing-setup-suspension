import React from 'react';
import AppHeader from '@/components/AppHeader';
import SetupTabs from '@/components/SetupTabs';

const DataEntryPoints: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 w-full">
      <AppHeader onShowLicenseModal={() => {}} />
      
      <div className="w-full px-4 py-8">
        <SetupTabs />
      </div>
    </div>
  );
};

export default DataEntryPoints;