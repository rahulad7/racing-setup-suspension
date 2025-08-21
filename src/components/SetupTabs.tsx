import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Zap, Wind, AlignLeft, Scale, BarChart3, MapPin } from 'lucide-react';
import ModernEnhancedSuspensionForm from './ModernEnhancedSuspensionForm';
import ModernEnhancedTiresForm from './ModernEnhancedTiresForm';
import ModernAeroForm from './ModernAeroForm';
import ModernAlignmentForm from './ModernAlignmentForm';
import ModernCornerBalancedForm from './ModernCornerBalancedForm';
import ModernSwayBarForm from './ModernSwayBarForm';
import TrackForm from './TrackForm';
import FirstTimeSetupModal from './FirstTimeSetupModal';


interface SetupTabsProps {
  vehicleId?: string;
  trackData?: any;
}

const SetupTabs: React.FC<SetupTabsProps> = ({ vehicleId, trackData }) => {
  const [setupData, setSetupData] = useState({
    suspension: {},
    tires: {},
    aero: {},
    alignment: {},
    cornerBalance: {},
    swayBar: {}
  });
  const [showFirstTimeModal, setShowFirstTimeModal] = useState(false);

  const handleCloseFirstTimeModal = () => {
    setShowFirstTimeModal(false);
    localStorage.setItem('hasSeenSetupGuide', 'true');
  };

  const updateSetupData = (section: string, data: any) => {
    setSetupData(prev => ({ ...prev, [section]: data }));
  };

  useEffect(() => {
    const hasSeenSetupGuide = localStorage.getItem('hasSeenSetupGuide');
    if (!hasSeenSetupGuide) {
      setShowFirstTimeModal(true);
    }

    // Load setup data if available
    const currentSetupData = localStorage.getItem('currentSetupData');
    if (currentSetupData) {
      try {
        const setupData = JSON.parse(currentSetupData);
        if (setupData.setup_data) {
          setSetupData(setupData.setup_data);
          // Clear the loaded data after using it
          localStorage.removeItem('currentSetupData');
        }
      } catch (error) {
        console.error('Error loading setup data:', error);
      }
    }
  }, []);

  return (
    <div className="space-y-4 md:space-y-6">
      <Tabs defaultValue="weather" className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-1 rounded-xl overflow-x-auto">
          <TabsTrigger value="weather" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
            <MapPin className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Weather</span>
            <span className="sm:hidden">W</span>
          </TabsTrigger>
          <TabsTrigger value="suspension" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
            <Settings className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Suspension</span>
            <span className="sm:hidden">S</span>
          </TabsTrigger>
          <TabsTrigger value="tires" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
            <Zap className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Tires</span>
            <span className="sm:hidden">T</span>
          </TabsTrigger>
          <TabsTrigger value="aero" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
            <Wind className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Aero</span>
            <span className="sm:hidden">A</span>
          </TabsTrigger>
          <TabsTrigger value="alignment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
            <AlignLeft className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Alignment</span>
            <span className="sm:hidden">A</span>
          </TabsTrigger>
          <TabsTrigger value="balance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
            <Scale className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Balance</span>
            <span className="sm:hidden">B</span>
          </TabsTrigger>
          <TabsTrigger value="sway" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 flex items-center gap-1 md:gap-2 text-xs md:text-sm whitespace-nowrap">
            <BarChart3 className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Sway Bars</span>
            <span className="sm:hidden">S</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="weather" className="mt-4 md:mt-6">
          <TrackForm onTrackDataChange={() => {}} />
        </TabsContent>

        <TabsContent value="suspension" className="mt-4 md:mt-6">
          <ModernEnhancedSuspensionForm 
            data={setupData.suspension}
            onChange={(data) => updateSetupData('suspension', data)}
          />
        </TabsContent>

        <TabsContent value="tires" className="mt-4 md:mt-6">
          <ModernEnhancedTiresForm 
            data={setupData.tires}
            onChange={(data) => updateSetupData('tires', data)}
          />
        </TabsContent>

        <TabsContent value="aero" className="mt-4 md:mt-6">
          <ModernAeroForm 
            data={setupData.aero}
            onChange={(data) => updateSetupData('aero', data)}
            vehicleData={setupData.suspension}
            trackData={{}}
          />
        </TabsContent>

        <TabsContent value="alignment" className="mt-4 md:mt-6">
          <ModernAlignmentForm 
            data={setupData.alignment}
            onChange={(data) => updateSetupData('alignment', data)}
          />
        </TabsContent>

        <TabsContent value="balance" className="mt-4 md:mt-6">
          <ModernCornerBalancedForm 
            data={setupData.cornerBalance}
            onChange={(data) => updateSetupData('cornerBalance', data)}
          />
        </TabsContent>

        <TabsContent value="sway" className="mt-4 md:mt-6">
          <ModernSwayBarForm 
            data={setupData.swayBar}
            onChange={(data) => updateSetupData('swayBar', data)}
          />
        </TabsContent>
      </Tabs>


      <FirstTimeSetupModal 
        isOpen={showFirstTimeModal}
        onClose={handleCloseFirstTimeModal}
      />
    </div>
  );
};

export default SetupTabs;