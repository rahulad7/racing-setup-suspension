import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Car, Settings } from 'lucide-react';

const CurrentVehicleSetupDisplay: React.FC = () => {
  const { currentVehicle, currentSetup } = useAppContext();
  
  console.log('CurrentVehicleSetupDisplay render:', { currentVehicle, currentSetup });

  if (!currentVehicle) {
    return (
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 border border-slate-700/50 rounded-lg">
          <Car className="h-4 w-4 text-slate-500" />
          <span className="text-slate-400 text-sm">No vehicle selected</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/50 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-blue-400" />
          <span className="text-white font-medium">{currentVehicle.name}</span>
        </div>
        <div className="w-px h-4 bg-slate-600"></div>
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-purple-400" />
          <span className="text-slate-300">
            {currentSetup?.name || `Creating setup for ${currentVehicle.name}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentVehicleSetupDisplay;