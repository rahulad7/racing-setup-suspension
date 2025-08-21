import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { useSetupEditor, SetupData } from '@/hooks/useSetupEditor';
interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  currentVehicle: { id: string; name: string } | null;
  currentSetup: { id: string; name: string } | null;
  setCurrentVehicle: (vehicle: { id: string; name: string } | null) => void;
  setCurrentSetup: (setup: { id: string; name: string } | null) => void;
  currentSetupData: SetupData | null;
  loadSetupForEditing: (setupId: string) => Promise<void>;
  clearSetupData: () => void;
}

const defaultAppContext: AppContextType = {
  sidebarOpen: false,
  toggleSidebar: () => {},
  currentVehicle: null,
  currentSetup: null,
  setCurrentVehicle: () => {},
  setCurrentSetup: () => {},
  currentSetupData: null,
  loadSetupForEditing: async () => {},
  clearSetupData: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContext);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<{ id: string; name: string } | null>(null);
  const [currentSetup, setCurrentSetup] = useState<{ id: string; name: string } | null>(null);
  
  const { currentSetupData, loadSetup, clearSetup } = useSetupEditor();

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const loadSetupForEditing = async (setupId: string) => {
    const setupData = await loadSetup(setupId);
    if (setupData && setupData.setup_name) {
      setCurrentSetup({ id: setupId, name: setupData.setup_name });
    }
  };

  const clearSetupData = () => {
    clearSetup();
    setCurrentSetup(null);
  };

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        currentVehicle,
        currentSetup,
        setCurrentVehicle,
        setCurrentSetup,
        currentSetupData,
        loadSetupForEditing,
        clearSetupData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
