import React from 'react';
import AppHeader from '@/components/AppHeader';
import { AppStoreDistribution } from '@/components/AppStoreDistribution';
import { AppProvider } from '@/contexts/AppContext';

const AppStore: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <AppStoreDistribution />
      </div>
    </AppProvider>
  );
};

export default AppStore;