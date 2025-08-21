import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useAppContext } from '@/contexts/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Settings, History, Wrench, Zap, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLicense } from '@/contexts/LicenseContext';
import AppHeader from './AppHeader';
import LicenseModal from './LicenseModal';
import { VehicleGarageList } from './VehicleGarageList';
import { VehicleCreationModal } from './VehicleCreationModal';
import SetupHistory from './SetupHistory';
import FreeTrialBlock from './FreeTrialBlock';
import ModernCard from './ModernCard';
import SetupTabs from './SetupTabs';
import HandlingIssuesForm from './HandlingIssuesForm';
import TrackForm from './TrackForm';
import CurrentVehicleSetupDisplay from './CurrentVehicleSetupDisplay';

interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: string;
  carType: string;
  trackType: string;
}

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isLicenseValid, canUseFreeAdvice, canAccessApp, freeTrialUsed } = useLicense();
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  
  const handleCreateSetup = useCallback((vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    setActiveTab('setup');
  }, []);

  const handleLoadSetup = useCallback(async (vehicleId: string, setupId: string) => {
    try {
      // Load setup data from database
      const { data: setupData, error } = await supabase
        .from('vehicle_setups')
        .select('*')
        .eq('id', setupId)
        .maybeSingle();

      if (error) throw error;

      if (setupData) {
        // Store the loaded setup data in context or state for the setup forms to use
        // For now, we'll store it in localStorage as a fallback
        localStorage.setItem('currentSetupData', JSON.stringify(setupData));
        
        setSelectedVehicle(vehicleId);
        setActiveTab('setup');
        
        // You could also dispatch to a context or state management system here
        console.log('Loaded setup data:', setupData);
      } else {
        console.warn('No setup found with ID:', setupId);
        // Still switch to setup tab even if no setup found
        setSelectedVehicle(vehicleId);
        setActiveTab('setup');
      }
    } catch (error) {
      console.error('Error loading setup:', error);
      // Still switch to setup tab even if loading fails
      setSelectedVehicle(vehicleId);
      setActiveTab('setup');
    }
  }, []);

  const handleCreateVehicle = useCallback(() => {
    setShowVehicleModal(true);
  }, []);

  const handleVehicleCreated = useCallback(() => {
    // Trigger a refresh of the vehicle list by dispatching a custom event
    window.dispatchEvent(new Event('vehicleCreated'));
  }, []);
  const handleUpgradeClick = useCallback(() => {
    setShowLicenseModal(true);
  }, []);

  const handleEditSetup = useCallback((setupId: string) => {
    setActiveTab('setup');
    const allSetups = JSON.parse(localStorage.getItem('vehicle_setups') || '{}');
    for (const vehicleId in allSetups) {
      const setup = allSetups[vehicleId].find((s: any) => s.id === setupId);
      if (setup) {
        setSelectedVehicle(vehicleId);
        break;
      }
    }
  }, []);

  const handleVehiclesChange = useCallback((newVehicles: Vehicle[]) => {
    setVehicles(newVehicles);
  }, []);

  const handleVehicleSelect = useCallback((vehicleId: string) => {
    setSelectedVehicle(vehicleId);
  }, []);

  const handleShowLicenseModal = useCallback(() => {
    setShowLicenseModal(true);
  }, []);

  const handleCloseLicenseModal = useCallback(() => {
    setShowLicenseModal(false);
  }, []);

  useEffect(() => {
    if (vehicles.length > 0 && !selectedVehicle) {
      setSelectedVehicle(vehicles[0].id);
    }
  }, [vehicles, selectedVehicle]);

  useEffect(() => {
    if (selectedVehicle && !vehicles.find(v => v.id === selectedVehicle)) {
      setSelectedVehicle(vehicles.length > 0 ? vehicles[0].id : '');
    }
  }, [vehicles, selectedVehicle]);

  const canAccess = useMemo(() => canAccessApp(), [canAccessApp]);
  const canUseFree = useMemo(() => canUseFreeAdvice(), [canUseFreeAdvice]);

  return (
    <div className="min-h-screen bg-black w-full">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-green-400/5 rounded-full blur-3xl" />
      </div>

      <AppHeader onShowLicenseModal={handleShowLicenseModal} />

      <main className="w-full px-4 py-6 md:py-8 relative z-10">
        <div className="text-center mb-8 md:mb-12 w-full">
          <div className="mb-12 md:mb-16 flex justify-center">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/6878478b83c3f8bb4fdcd0d1_1753210534580_31753e04.png"
              alt="Setup Pro Logo"
              className="h-24 md:h-36 object-contain"
            />
          </div>
          <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Professional suspension analysis - powered by advanced algorithms
          </p>
          {user && (
            <p className="text-sm text-gray-500 px-4">
              Welcome back, {user.email}! Your vehicles and setups are automatically saved.
            </p>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={(value) => {
          if (value === 'history') {
            navigate('/saved-setups');
          } else {
            setActiveTab(value);
          }
        }} className="w-full">
          
          {/* Check URL params for initial tab */}
          {React.useEffect(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const tabParam = urlParams.get('tab');
            if (tabParam && ['vehicles', 'track', 'setup', 'troubleshooting'].includes(tabParam)) {
              setActiveTab(tabParam);
            }
          }, [])}
          <div className="flex justify-center mb-6 md:mb-8 w-full">
            <TabsList className="grid grid-cols-3 bg-black/80 border border-gray-800 backdrop-blur-sm p-1 rounded-xl w-full max-w-md md:max-w-lg">
              <TabsTrigger value="vehicles" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-modern transition-all duration-200 rounded-lg text-xs md:text-sm">
                <Car className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Garage</span>
                <span className="sm:hidden">Garage</span>
              </TabsTrigger>
              <TabsTrigger value="setup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-modern transition-all duration-200 rounded-lg text-xs md:text-sm">
                <Settings className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Setup</span>
                <span className="sm:hidden">Setup</span>
              </TabsTrigger>
              <TabsTrigger value="troubleshooting" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-modern transition-all duration-200 rounded-lg text-xs md:text-sm">
                <Wrench className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Troubleshooting</span>
                <span className="sm:hidden">Issues</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Current Vehicle and Setup Display */}
          <CurrentVehicleSetupDisplay />

          <TabsContent value="vehicles" className="mt-6 md:mt-8 w-full">
            <VehicleGarageList 
              onCreateSetup={handleCreateSetup}
              onLoadSetup={handleLoadSetup}
              onCreateVehicle={handleCreateVehicle}
            />
          </TabsContent>

          <TabsContent value="setup" className="mt-6 md:mt-8 w-full">
            {canAccess ? (
              freeTrialUsed && !isLicenseValid ? (
                <FreeTrialBlock 
                  title="Setup Analysis Locked"
                  description="You've used your free analysis. Upgrade to continue using the app."
                  onUpgrade={handleUpgradeClick}
                />
              ) : (
                <SetupTabs vehicleId={selectedVehicle || undefined} trackData={{}} />
              )
            ) : (
              <FreeTrialBlock 
                title="Suspension Analysis"
                description="Get professional suspension setup recommendations. Try it free once!"
                onUpgrade={handleUpgradeClick}
              />
            )}
           </TabsContent>


           <TabsContent value="troubleshooting" className="mt-6 md:mt-8 w-full">
            {canAccess ? (
              freeTrialUsed && !isLicenseValid ? (
                <FreeTrialBlock 
                  title="Troubleshooting Locked"
                  description="You've used your free analysis. Upgrade to continue using troubleshooting tools."
                  onUpgrade={handleUpgradeClick}
                />
              ) : (
                <HandlingIssuesForm />
              )
            ) : (
              <FreeTrialBlock 
                title="Track Car Troubleshooting"
                description="Identify handling issues and get targeted setup recommendations. Try it free once!"
                onUpgrade={handleUpgradeClick}
              />
            )}
          </TabsContent>

        </Tabs>
      </main>

      <LicenseModal 
        isOpen={showLicenseModal} 
        onClose={handleCloseLicenseModal} 
        showFreeOption={canUseFree}
      />
      
      <VehicleCreationModal
        isOpen={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
        onVehicleCreated={handleVehicleCreated}
      />
    </div>
  );
};

export default AppLayout;