import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Settings, Zap, Wind } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseFormPersistence } from '@/hooks/useSupabaseFormPersistence';
import ModernVehicleSetupForm from './ModernVehicleSetupForm';
import ModernEnhancedSuspensionForm from './ModernEnhancedSuspensionForm';
import ModernEnhancedTiresForm from './ModernEnhancedTiresForm';
import ModernAeroForm from './ModernAeroForm';
import UnifiedSaveButton from './UnifiedSaveButton';
import FirstTimeSetupModal from './FirstTimeSetupModal';

interface ModernSetupTabsProps {
  onDataChange: (data: any) => void;
  initialData?: any;
}

const ModernSetupTabs: React.FC<ModernSetupTabsProps> = ({ onDataChange, initialData = {} }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('vehicle');
  const { formData, updateFormData, setFormData } = useSupabaseFormPersistence('setup-tabs');
  const [showFirstTimeModal, setShowFirstTimeModal] = useState(false);

  // Initialize form data with initial data if provided
  useEffect(() => {
    if (Object.keys(initialData).length > 0 && Object.keys(formData).length === 0) {
      setFormData(initialData);
    }
  }, [initialData, formData, setFormData]);

  const handleFormChange = useCallback((section: string, data: any) => {
    setFormData(prev => {
      const newData = { ...prev, [section]: data };
      setTimeout(() => onDataChange(newData), 0);
      return newData;
    });
  }, [onDataChange]);



  const handleFirstTimeModalClose = () => {
    localStorage.setItem('hasSeenSetupModal', 'true');
    setShowFirstTimeModal(false);
  };

  const tabs = useMemo(() => [
    { id: 'vehicle', label: 'Vehicle', icon: Car },
    { id: 'suspension', label: 'Suspension', icon: Settings },
    { id: 'tires', label: 'Tires', icon: Zap },
    { id: 'aero', label: 'Aero', icon: Wind }
  ], []);

  return (
    <>
      <FirstTimeSetupModal 
        isOpen={showFirstTimeModal}
        onClose={handleFirstTimeModalClose}
      />
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Vehicle Setup Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1">
                    <Icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value="vehicle" className="mt-4 space-y-4">
              <ModernVehicleSetupForm
                data={formData.vehicle || {}}
                onChange={(data) => handleFormChange('vehicle', data)}
              />
              <UnifiedSaveButton formData={formData} className="w-full" />
            </TabsContent>

            <TabsContent value="suspension" className="mt-4 space-y-4">
              <ModernEnhancedSuspensionForm
                data={formData.suspension || {}}
                onChange={(data) => handleFormChange('suspension', data)}
              />
              <UnifiedSaveButton formData={formData} className="w-full" />
            </TabsContent>

            <TabsContent value="tires" className="mt-4 space-y-4">
              <ModernEnhancedTiresForm
                data={formData.tires || {}}
                onChange={(data) => handleFormChange('tires', data)}
              />
              <UnifiedSaveButton formData={formData} className="w-full" />
            </TabsContent>

            <TabsContent value="aero" className="mt-4 space-y-4">
              <ModernAeroForm
                data={formData.aero || {}}
                onChange={(data) => handleFormChange('aero', data)}
                vehicleData={formData.vehicle || {}}
                trackData={formData.track || {}}
              />
              <UnifiedSaveButton formData={formData} className="w-full" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default ModernSetupTabs;