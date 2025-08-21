import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Settings, TrendingUp, History, AlertTriangle, Zap, MapPin, Wrench } from 'lucide-react';
import { useLicense } from '@/contexts/LicenseContext';
import AppHeader from './AppHeader';
import DiagnosticResults from './DiagnosticResults';
import LicenseModal from './LicenseModal';
import VehicleManager from './VehicleManager';
import VehicleSetupForm from './VehicleSetupForm';
import FreeTrialBlock from './FreeTrialBlock';
import ModernCard from './ModernCard';
import HandlingIssuesForm from './HandlingIssuesForm';

interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: string;
  category: string;
}

interface HandlingIssue {
  id: string;
  label: string;
  cornerEntry?: boolean;
  midCorner?: boolean;
  cornerExit?: boolean;
  highSpeed?: boolean;
  lowSpeed?: boolean;
  underBraking?: boolean;
}

interface HandlingIssuesData {
  [key: string]: HandlingIssue;
}

const ModernAppLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isLicenseValid, canUseFreeAdvice, canAccessApp, freeTrialUsed } = useLicense();
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [issuesData, setIssuesData] = useState<HandlingIssuesData>({});
  
  const handleUpgradeClick = () => {
    setShowLicenseModal(true);
  };
  const handleTabChange = (value: string) => {
    if (value === 'history') {
      navigate('/saved-setups');
    } else {
      setActiveTab(value);
    }
  };

  const handleIssueChange = (issueId: string, field: keyof HandlingIssue, value: boolean) => {
    setIssuesData(prev => {
      const newData = { ...prev };
      
      if (field === 'id' && !value) {
        delete newData[issueId];
      } else if (field === 'label' && value) {
        newData[issueId] = { id: issueId, label: issueId, ...prev[issueId] };
      } else if (field !== 'label' && field !== 'id') {
        if (newData[issueId]) {
          newData[issueId] = { ...newData[issueId], [field]: value };
        }
      }
      
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-black w-full">
      {/* Subtle background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-green-400/5 rounded-full blur-3xl" />
      </div>

      <AppHeader onShowLicenseModal={() => setShowLicenseModal(true)} />

      <main className="w-full px-4 py-6 md:py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12 w-full">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <div className="p-2 md:p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl">
              <Zap className="h-6 w-6 md:h-8 md:w-8 text-black" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Race Setup Pro
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Professional suspension analysis and setup recommendations powered by advanced algorithms
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-6 md:mb-8 w-full">
            <TabsList className="grid grid-cols-5 bg-black/80 border border-gray-800 backdrop-blur-sm p-1 rounded-xl w-full max-w-4xl overflow-x-auto">
              <TabsTrigger 
                value="vehicles" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-modern transition-all duration-200 rounded-lg text-xs md:text-sm whitespace-nowrap"
              >
                <Car className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Vehicles</span>
                <span className="sm:hidden">Cars</span>
              </TabsTrigger>
              <TabsTrigger 
                value="track" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-modern transition-all duration-200 rounded-lg text-xs md:text-sm whitespace-nowrap"
              >
                <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Weather</span>
                <span className="sm:hidden">Track</span>
              </TabsTrigger>
              <TabsTrigger 
                value="setup" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-modern transition-all duration-200 rounded-lg text-xs md:text-sm whitespace-nowrap"
              >
                <Settings className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Setup</span>
                <span className="sm:hidden">Setup</span>
              </TabsTrigger>
              <TabsTrigger 
                value="troubleshooting" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-modern transition-all duration-200 rounded-lg text-xs md:text-sm whitespace-nowrap"
              >
                <Wrench className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Troubleshooting</span>
                <span className="sm:hidden">Issues</span>
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-modern transition-all duration-200 rounded-lg text-xs md:text-sm whitespace-nowrap"
              >
                <History className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">History</span>
                <span className="sm:hidden">History</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="vehicles" className="mt-6 md:mt-8 w-full">
            <VehicleManager
              vehicles={vehicles}
              onVehiclesChange={setVehicles}
              selectedVehicle={selectedVehicle}
              onVehicleSelect={setSelectedVehicle}
            />
          </TabsContent>

          <TabsContent value="setup" className="mt-6 md:mt-8 w-full">
            {canAccessApp() ? (
              freeTrialUsed && !isLicenseValid ? (
                <FreeTrialBlock 
                  title="Setup Analysis Locked"
                  description="You've used your free analysis. Upgrade to continue using the app."
                  onUpgrade={handleUpgradeClick}
                />
              ) : (
                selectedVehicle ? (
                  <VehicleSetupForm 
                    vehicleId={selectedVehicle}
                    vehicleName={vehicles.find(v => v.id === selectedVehicle)?.name || 'Vehicle'}
                  />
                ) : (
                  <ModernCard className="text-center py-12 md:py-16 w-full" gradient glow>
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-3 md:p-4 bg-gray-800/50 rounded-full">
                        <Car className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-400 text-base md:text-lg px-4">Please select a vehicle first to configure its setup.</p>
                    </div>
                  </ModernCard>
                )
              )
            ) : (
              <FreeTrialBlock 
                title="Suspension Analysis"
                description="Get professional suspension setup recommendations. Try it free once!"
                onUpgrade={handleUpgradeClick}
              />
            )}
          </TabsContent>

          <TabsContent value="issues" className="mt-6 md:mt-8 w-full">
            <HandlingIssuesForm 
              data={issuesData}
              onChange={handleIssueChange}
            />
          </TabsContent>

          <TabsContent value="results" className="mt-6 md:mt-8 w-full">
            {analysisData ? (
              <DiagnosticResults data={analysisData} />
            ) : (
              <ModernCard className="text-center py-12 md:py-16 w-full" gradient glow>
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 md:p-4 bg-gray-800/50 rounded-full">
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-base md:text-lg px-4">Complete the setup analysis first to see results.</p>
                </div>
              </ModernCard>
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6 md:mt-8 w-full">
            {canAccessApp() ? (
              selectedVehicle ? (
                <VehicleSetupForm 
                  vehicleId={selectedVehicle}
                  vehicleName={vehicles.find(v => v.id === selectedVehicle)?.name || 'Vehicle'}
                  activeSection="history"
                />
              ) : (
                <ModernCard className="text-center py-12 md:py-16 w-full" gradient glow>
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-3 md:p-4 bg-gray-800/50 rounded-full">
                      <History className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-400 text-base md:text-lg px-4">Please select a vehicle first to view setup history.</p>
                  </div>
                </ModernCard>
              )
            ) : (
              <FreeTrialBlock 
                title="Setup History"
                description="View and manage your setups."
                onUpgrade={handleUpgradeClick}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <LicenseModal 
        isOpen={showLicenseModal} 
        onClose={() => setShowLicenseModal(false)} 
        showFreeOption={canUseFreeAdvice()}
      />
    </div>
  );
};

export default ModernAppLayout;