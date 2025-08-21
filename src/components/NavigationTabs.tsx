import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Settings, History, Wrench } from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  analysisData?: any;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  analysisData 
}) => {
  return (
    <div className="flex justify-center mb-8">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="grid grid-cols-4 bg-gray-800/50 border border-blue-500/20 w-fit">
          <TabsTrigger 
            value="vehicles" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Car className="h-4 w-4 mr-2" />
            Vehicles
          </TabsTrigger>
          <TabsTrigger 
            value="setup" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Settings className="h-4 w-4 mr-2" />
            Setup
          </TabsTrigger>
          <TabsTrigger 
            value="troubleshooting" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <Wrench className="h-4 w-4 mr-2" />
            Troubleshooting
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            <History className="h-4 w-4 mr-2" />
            Saved Setups
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default NavigationTabs;