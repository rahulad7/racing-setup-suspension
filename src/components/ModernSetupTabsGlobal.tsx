import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import EnhancedGlobalTrackSelector from './EnhancedGlobalTrackSelector';
import ModernVehicleSetupForm from './ModernVehicleSetupForm';
import ModernEnhancedSuspensionForm from './ModernEnhancedSuspensionForm';
import ModernEnhancedTiresForm from './ModernEnhancedTiresForm';
import ModernAeroForm from './ModernAeroForm';
import ModernAlignmentForm from './ModernAlignmentForm';
import ModernCornerBalancedForm from './ModernCornerBalancedForm';
import ModernSwayBarForm from './ModernSwayBarForm';
import SetupManager from './SetupManager';
import VehicleSetupsTab from './VehicleSetupsTab';
import SaveButtonComplete from './SaveButtonComplete';

interface SetupData {
  track: string;
  vehicle: any;
  suspension: any;
  tires: any;
  aero: any;
  alignment: any;
  cornerBalance: any;
  swayBar: any;
}

const ModernSetupTabsGlobal: React.FC = () => {
  const { toast } = useToast();
  const { currentSetupData } = useAppContext();
  const [setupData, setSetupData] = useState<SetupData>({
    track: '',
    vehicle: {},
    suspension: {},
    tires: {},
    aero: {},
    alignment: {},
    cornerBalance: {},
    swayBar: {}
  });
  const [activeTab, setActiveTab] = useState('track');

  // Load setup data from AppContext when available
  useEffect(() => {
    if (currentSetupData) {
      console.log('ModernSetupTabsGlobal loading setup data:', currentSetupData);
      console.log('Track name from currentSetupData:', currentSetupData.track_name);
      
      const newSetupData = {
        track: currentSetupData.track_name || '',
        vehicle: {
          name: currentSetupData.vehicle_name || '',
          weight: currentSetupData.car_weight || '',
          notes: currentSetupData.notes || ''
        },
        suspension: {
          frontSpringRate: currentSetupData.front_spring_rate || '',
          rearSpringRate: currentSetupData.rear_spring_rate || '',
          springRateUnit: currentSetupData.spring_rate_unit || 'lb/in',
          shockBrand: currentSetupData.shock_brand || '',
          shockModel: currentSetupData.shock_model || '',
          shockType: currentSetupData.shock_type || 'Non-Adjustable',
          rearShockBrand: currentSetupData.rear_shock_brand || '',
          rearShockModel: currentSetupData.rear_shock_model || '',
          rearShockType: currentSetupData.rear_shock_type || 'Non-Adjustable',
          compressionClicks: currentSetupData.compression_clicks || '',
          reboundClicks: currentSetupData.rebound_clicks || '',
          singleAdjustmentClicks: currentSetupData.single_adjustment_clicks || '',
          rearCompressionClicks: currentSetupData.rear_compression_clicks || '',
          rearReboundClicks: currentSetupData.rear_rebound_clicks || '',
          rearSingleAdjustmentClicks: currentSetupData.rear_single_adjustment_clicks || '',
          highSpeedCompressionFront: currentSetupData.high_speed_compression_front || '',
          lowSpeedCompressionFront: currentSetupData.low_speed_compression_front || '',
          highSpeedCompressionRear: currentSetupData.high_speed_compression_rear || '',
          lowSpeedCompressionRear: currentSetupData.low_speed_compression_rear || '',
          rideHeightFL: currentSetupData.ride_height_fl || '',
          rideHeightFR: currentSetupData.ride_height_fr || '',
          rideHeightRL: currentSetupData.ride_height_rl || '',
          rideHeightRR: currentSetupData.ride_height_rr || '',
          frontReservoirPressure: currentSetupData.front_reservoir_pressure || '',
          rearReservoirPressure: currentSetupData.rear_reservoir_pressure || '',
          frontHasReservoir: currentSetupData.front_has_reservoir || false,
          rearHasReservoir: currentSetupData.rear_has_reservoir || false
        },
        tires: {
          brand: currentSetupData.tire_brand || '',
          model: currentSetupData.tire_model || '',
          size: currentSetupData.tire_size || '',
          differentRearSize: currentSetupData.different_rear_size || false,
          rearSize: currentSetupData.rear_tire_size || '',
          pressureFL: currentSetupData.tire_pressure_fl || '',
          pressureFR: currentSetupData.tire_pressure_fr || '',
          pressureRL: currentSetupData.tire_pressure_rl || '',
          pressureRR: currentSetupData.tire_pressure_rr || '',
          heatCycles: currentSetupData.heat_cycles || ''
        },
        aero: {
          frontSplitterBrand: currentSetupData.front_splitter_brand || '',
          frontSplitterModel: currentSetupData.front_splitter_model || '',
          frontSplitterHeight: currentSetupData.front_splitter_height || '',
          frontSplitterAngle: currentSetupData.front_splitter_angle || '',
          frontSplitterMaterial: currentSetupData.front_splitter_material || '',
          rearWingBrand: currentSetupData.rear_wing_brand || '',
          rearWingModel: currentSetupData.rear_wing_model || '',
          rearWingAngle: currentSetupData.rear_wing_angle || '',
          rearWingMaterial: currentSetupData.rear_wing_material || '',
          rearWingEndplates: currentSetupData.rear_wing_endplates || '',
          rearDiffuser: currentSetupData.rear_diffuser || '',
          numberOfCanards: currentSetupData.number_of_canards || '',
          frontDownforce: currentSetupData.front_downforce || '',
          rearDownforce: currentSetupData.rear_downforce || ''
        },
        alignment: {
          frontToe: currentSetupData.front_toe || '',
          frontCamber: currentSetupData.front_camber || '',
          rearToe: currentSetupData.rear_toe || '',
          rearCamber: currentSetupData.rear_camber || '',
          frontCaster: currentSetupData.front_caster || '',
          rearCaster: currentSetupData.rear_caster || ''
        },
        cornerBalance: {
          cornerWeightFL: currentSetupData.corner_weight_fl || '',
          cornerWeightFR: currentSetupData.corner_weight_fr || '',
          cornerWeightRL: currentSetupData.corner_weight_rl || '',
          cornerWeightRR: currentSetupData.corner_weight_rr || '',
          crossWeightPercentage: currentSetupData.cross_weight_percentage || ''
        },
        swayBar: {
          frontSwayBarBrand: currentSetupData.front_sway_bar_brand || '',
          frontSwayBarDiameter: currentSetupData.front_sway_bar_diameter || '',
          frontSwayBarSetting: currentSetupData.front_sway_bar_setting || '',
          rearSwayBarBrand: currentSetupData.rear_sway_bar_brand || '',
          rearSwayBarDiameter: currentSetupData.rear_sway_bar_diameter || '',
          rearSwayBarSetting: currentSetupData.rear_sway_bar_setting || ''
        }
      };

      console.log('Mapped setup data:', newSetupData);
      setSetupData(newSetupData);

      // Switch to track tab and show loaded track name
      setActiveTab('track');
      
      toast({
        title: "Setup Data Loaded",
        description: `Loaded setup for ${currentSetupData.track_name || 'Unknown Track'}`,
      });
    }
  }, [currentSetupData, toast]);
  
  const handleSaveSetup = () => {
    toast({ title: 'Setup Saved', description: 'Your setup has been saved successfully' });
  };
  
  const handleLoadSetup = (loadedSetup: any) => {
    setSetupData(loadedSetup);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Race Car Setup Configuration
          </CardTitle>
          <CardDescription>
            Configure your race car setup for optimal performance across different tracks and conditions.
          </CardDescription>
        </CardHeader>
        <CardContent>

          
           <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="track">Weather Conditions</TabsTrigger>
              <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
              <TabsTrigger value="suspension">Suspension</TabsTrigger>
              <TabsTrigger value="tires">Tires</TabsTrigger>
              <TabsTrigger value="aero">Aero</TabsTrigger>
              <TabsTrigger value="alignment">Alignment</TabsTrigger>
              <TabsTrigger value="corner">Corner</TabsTrigger>
              <TabsTrigger value="sway">Sway Bars</TabsTrigger>
            </TabsList>
            
            <TabsContent value="track" className="space-y-4">
              <EnhancedGlobalTrackSelector
                value={setupData.track}
                onChange={(track) => setSetupData(prev => ({ ...prev, track }))}
              />
              <SaveButtonComplete allSetupData={setupData} />
            </TabsContent>
            
            <TabsContent value="vehicle" className="space-y-4">
              <ModernVehicleSetupForm
                data={setupData.vehicle}
                onChange={(vehicle) => setSetupData(prev => ({ ...prev, vehicle }))}
              />
              <SaveButtonComplete allSetupData={setupData} />
            </TabsContent>
            
            <TabsContent value="suspension" className="space-y-4">
              <ModernEnhancedSuspensionForm
                data={setupData.suspension}
                onChange={(suspension) => setSetupData(prev => ({ ...prev, suspension }))}
              />
              <SaveButtonComplete allSetupData={setupData} />
            </TabsContent>
            
            <TabsContent value="tires" className="space-y-4">
              <ModernEnhancedTiresForm
                data={setupData.tires}
                onChange={(tires) => setSetupData(prev => ({ ...prev, tires }))}
              />
              <SaveButtonComplete allSetupData={setupData} />
            </TabsContent>
            
            <TabsContent value="aero" className="space-y-4">
              <ModernAeroForm
                data={setupData.aero}
                onChange={(aero) => setSetupData(prev => ({ ...prev, aero }))}
              />
              <SaveButtonComplete allSetupData={setupData} />
            </TabsContent>
            
            <TabsContent value="alignment" className="space-y-4">
              <ModernAlignmentForm
                data={setupData.alignment}
                onChange={(alignment) => setSetupData(prev => ({ ...prev, alignment }))}
              />
              <SaveButtonComplete allSetupData={setupData} />
            </TabsContent>
            
            <TabsContent value="corner" className="space-y-4">
              <ModernCornerBalancedForm
                data={setupData.cornerBalance}
                onChange={(cornerBalance) => setSetupData(prev => ({ ...prev, cornerBalance }))}
              />
              <SaveButtonComplete allSetupData={setupData} />
            </TabsContent>
            
            <TabsContent value="sway" className="space-y-4">
              <ModernSwayBarForm
                data={setupData.swayBar}
                onChange={(swayBar) => setSetupData(prev => ({ ...prev, swayBar }))}
              />
              <SaveButtonComplete allSetupData={setupData} />
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernSetupTabsGlobal;