import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

export interface SetupData {
  id?: string;
  setup_name?: string;
  vehicle_id?: string;
  track_name?: string;
  
  // Vehicle data
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: string;
  vehicle_name?: string;
  car_weight?: string;
  
  // Suspension data - matching database schema
  front_spring_rate?: string;
  rear_spring_rate?: string;
  spring_rate_unit?: string;
  shock_brand?: string;
  shock_model?: string;
  shock_type?: string;
  rear_shock_brand?: string;
  rear_shock_model?: string;
  rear_shock_type?: string;
  compression_clicks?: string;
  rebound_clicks?: string;
  single_adjustment_clicks?: string;
  rear_compression_clicks?: string;
  rear_rebound_clicks?: string;
  rear_single_adjustment_clicks?: string;
  high_speed_compression_front?: string;
  low_speed_compression_front?: string;
  high_speed_compression_rear?: string;
  low_speed_compression_rear?: string;
  ride_height_fl?: string;
  ride_height_fr?: string;
  ride_height_rl?: string;
  ride_height_rr?: string;
  front_reservoir_pressure?: string;
  rear_reservoir_pressure?: string;
  front_has_reservoir?: boolean;
  rear_has_reservoir?: boolean;
  
  // Tires data - matching database schema
  tire_brand?: string;
  tire_model?: string;
  tire_size?: string;
  different_rear_size?: boolean;
  rear_tire_size?: string;
  tire_pressure_fl?: string;
  tire_pressure_fr?: string;
  tire_pressure_rl?: string;
  tire_pressure_rr?: string;
  heat_cycles?: string;
  
  // Aero data - matching database schema
  front_splitter_brand?: string;
  front_splitter_model?: string;
  front_splitter_height?: string;
  front_splitter_angle?: string;
  front_splitter_material?: string;
  rear_wing_brand?: string;
  rear_wing_model?: string;
  rear_wing_angle?: string;
  rear_wing_material?: string;
  rear_wing_endplates?: string;
  rear_diffuser?: string;
  number_of_canards?: string;
  front_downforce?: string;
  rear_downforce?: string;
  
  // Alignment data - matching database schema
  camber_fl?: string;
  camber_fr?: string;
  camber_rl?: string;
  camber_rr?: string;
  caster_left?: string;
  caster_right?: string;
  toe_unit?: string;
  alignment_field1?: string;
  alignment_field2?: string;
  alignment_field3?: string;
  alignment_field4?: string;
  // Corner balance - matching database schema
  corner_weight_fl?: string;
  corner_weight_fr?: string;
  corner_weight_rl?: string;
  corner_weight_rr?: string;
  cross_weight_percentage?: string;
  
  // Sway bar - matching database schema
  front_sway_bar_brand?: string;
  front_sway_bar_diameter?: string;
  front_sway_bar_setting?: string;
  rear_sway_bar_brand?: string;
  rear_sway_bar_diameter?: string;
  rear_sway_bar_setting?: string;
  
  // Additional fields
  notes?: string;
  lap_time?: string;
  temperature?: string;
  weather?: string;
  track_surface?: string;
  created_at?: string;
  updated_at?: string;
}

export const useSetupEditor = () => {
  const [currentSetupData, setCurrentSetupData] = useState<SetupData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadSetup = useCallback(async (setupId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicle_setups')
        .select('*')
        .eq('id', setupId)
        .single();

      if (error) throw error;

      // Handle both flat structure and JSON structure for backward compatibility
      let setupData = { ...data };
      
      // If setup_data exists and flat fields are empty, use setup_data
      if (data.setup_data && typeof data.setup_data === 'object') {
        const hasFlat = data.shock_brand || data.tire_brand || data.camber_fl;
        
        if (!hasFlat) {
          // Map JSON structure to flat structure
          const jsonData = data.setup_data;
          
          // Map suspension data
          if (jsonData.suspension) {
            setupData.shock_brand = jsonData.suspension.shockBrand;
            setupData.shock_model = jsonData.suspension.shockModel;
            setupData.shock_type = jsonData.suspension.shockType;
            setupData.rear_shock_brand = jsonData.suspension.rearShockBrand;
            setupData.rear_shock_model = jsonData.suspension.rearShockModel;
            setupData.rear_shock_type = jsonData.suspension.rearShockType;
            setupData.compression_clicks = jsonData.suspension.compressionClicks;
            setupData.rebound_clicks = jsonData.suspension.reboundClicks;
            setupData.single_adjustment_clicks = jsonData.suspension.singleAdjustmentClicks;
            setupData.rear_compression_clicks = jsonData.suspension.rearCompressionClicks;
            setupData.rear_rebound_clicks = jsonData.suspension.rearReboundClicks;
            setupData.rear_single_adjustment_clicks = jsonData.suspension.rearSingleAdjustmentClicks;
            setupData.front_spring_rate = jsonData.suspension.frontSpringRate;
            setupData.rear_spring_rate = jsonData.suspension.rearSpringRate;
            setupData.spring_rate_unit = jsonData.suspension.springRateUnit;
            setupData.ride_height_fl = jsonData.suspension.rideHeightFL;
            setupData.ride_height_fr = jsonData.suspension.rideHeightFR;
            setupData.ride_height_rl = jsonData.suspension.rideHeightRL;
            setupData.ride_height_rr = jsonData.suspension.rideHeightRR;
            setupData.front_reservoir_pressure = jsonData.suspension.frontReservoirPressure;
            setupData.rear_reservoir_pressure = jsonData.suspension.rearReservoirPressure;
            setupData.front_has_reservoir = jsonData.suspension.frontHasReservoir;
            setupData.rear_has_reservoir = jsonData.suspension.rearHasReservoir;
          }
          
          // Map tire data
          if (jsonData.tires) {
            setupData.tire_brand = jsonData.tires.tireBrand;
            setupData.tire_model = jsonData.tires.tireModel;
            setupData.tire_size = jsonData.tires.tireSize;
            setupData.different_rear_size = jsonData.tires.differentRearSize;
            setupData.rear_tire_size = jsonData.tires.rearTireSize;
            setupData.tire_pressure_fl = jsonData.tires.tirePressureFL;
            setupData.tire_pressure_fr = jsonData.tires.tirePressureFR;
            setupData.tire_pressure_rl = jsonData.tires.tirePressureRL;
            setupData.tire_pressure_rr = jsonData.tires.tirePressureRR;
            setupData.heat_cycles = jsonData.tires.heatCycles;
          }
          
          // Map aero data
          if (jsonData.aero) {
            setupData.front_splitter_brand = jsonData.aero.frontSplitterBrand;
            setupData.front_splitter_model = jsonData.aero.frontSplitterModel;
            setupData.front_splitter_height = jsonData.aero.frontSplitterHeight;
            setupData.front_splitter_angle = jsonData.aero.frontSplitterAngle;
            setupData.rear_wing_brand = jsonData.aero.rearWingBrand;
            setupData.rear_wing_model = jsonData.aero.rearWingModel;
            setupData.rear_wing_angle = jsonData.aero.rearWingAngle;
            setupData.number_of_canards = jsonData.aero.numberOfCanards;
            setupData.front_downforce = jsonData.aero.frontDownforce;
            setupData.rear_downforce = jsonData.aero.rearDownforce;
          }
          
          // Map alignment data
          if (jsonData.alignment) {
            setupData.front_camber = jsonData.alignment.frontCamber;
            setupData.rear_camber = jsonData.alignment.rearCamber;
            setupData.front_toe = jsonData.alignment.frontToe;
            setupData.rear_toe = jsonData.alignment.rearToe;
            setupData.front_caster = jsonData.alignment.frontCaster;
            setupData.rear_caster = jsonData.alignment.rearCaster;
          }
          
          // Map corner balance data
          if (jsonData.cornerBalance) {
            setupData.corner_weight_fl = jsonData.cornerBalance.cornerWeightFL;
            setupData.corner_weight_fr = jsonData.cornerBalance.cornerWeightFR;
            setupData.corner_weight_rl = jsonData.cornerBalance.cornerWeightRL;
            setupData.corner_weight_rr = jsonData.cornerBalance.cornerWeightRR;
            setupData.cross_weight_percentage = jsonData.cornerBalance.crossWeightPercentage;
          }
          
          // Map sway bar data
          if (jsonData.swayBar) {
            setupData.front_sway_bar_brand = jsonData.swayBar.frontSwayBarBrand;
            setupData.front_sway_bar_diameter = jsonData.swayBar.frontSwayBarDiameter;
            setupData.front_sway_bar_setting = jsonData.swayBar.frontSwayBarSetting;
            setupData.rear_sway_bar_brand = jsonData.swayBar.rearSwayBarBrand;
            setupData.rear_sway_bar_diameter = jsonData.swayBar.rearSwayBarDiameter;
            setupData.rear_sway_bar_setting = jsonData.swayBar.rearSwayBarSetting;
          }
          
          // Map track name from JSON if not in flat structure
          if (jsonData.track && !setupData.track_name) {
            setupData.track_name = jsonData.track;
          }
        }
      }

      setCurrentSetupData(setupData);
      toast({
        title: "Setup Loaded",
        description: `Setup "${setupData.setup_name}" loaded for editing`,
      });
      
      return setupData; // Return the setup data
    } catch (error) {
      console.error('Error loading setup:', error);
      toast({
        title: "Error",
        description: "Failed to load setup data",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSetup = useCallback(() => {
    setCurrentSetupData(null);
  }, []);

  return {
    currentSetupData,
    isLoading,
    loadSetup,
    clearSetup,
    setCurrentSetupData,
  };
};