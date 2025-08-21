import React from 'react';
import { DataEntryActionableItems } from '@/components/DataEntryActionableItems';
import { AppProvider } from '@/contexts/AppContext';
import AppLayout from '@/components/AppLayout';

const ActionableItemsPage: React.FC = () => {
  return (
    <AppProvider>
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <DataEntryActionableItems />
          </div>
        </div>
      </AppLayout>
    </AppProvider>
  );
};

export default ActionableItemsPage;