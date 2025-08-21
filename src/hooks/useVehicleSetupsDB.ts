import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface VehicleSetup {
  id: string;
  setup_name: string;
  vehicle_id: string;
  vehicle_name?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: string;
  track_name?: string;
  best_lap_time?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  setup_data: {
    suspension?: any;
    tires?: any;
    aero?: any;
    alignment?: any;
    cornerBalance?: any;
    swayBar?: any;
    trackData?: any;
  };
}

export const useVehicleSetupsDB = (vehicleId?: string) => {
  const [setups, setSetups] = useState<VehicleSetup[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (vehicleId && vehicleId.trim() !== '' && user) {
      loadSetups();
    } else if (!vehicleId || vehicleId.trim() === '') {
      // Clear setups when no valid vehicleId, but don't show loading
      setSetups([]);
      setLoading(false);
    }
  }, [vehicleId, user]);

  const loadSetups = async () => {
    if (!user) {
      console.log('No user, cannot load setups');
      return;
    }
    
    if (!vehicleId || vehicleId.trim() === '') {
      console.log('No valid vehicleId provided, cannot load setups');
      return;
    }
    
    console.log('Loading setups for vehicleId:', vehicleId, 'user:', user.id);
    setLoading(true);
    try {
      // First try with current user ID
      let { data, error } = await supabase
        .from('vehicle_setups')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      console.log('Supabase query result for user:', { data, error, userId: user.id });

      // If no results with current user, try with demo user IDs for testing
      if (!data || data.length === 0) {
        console.log('No setups found for current user, trying demo data...');
        const { data: demoData, error: demoError } = await supabase
          .from('vehicle_setups')
          .select('*')
          .eq('vehicle_id', vehicleId)
          .in('user_id', ['00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000001'])
          .order('updated_at', { ascending: false });
        
        console.log('Demo data query result:', { demoData, demoError });
        if (demoData && demoData.length > 0) {
          data = demoData;
          error = demoError;
        }
      }
      if (error) throw error;
      
      // Transform flat database structure back to nested structure expected by UI
      const transformedSetups = (data || []).map(setup => ({
        ...setup,
        setup_data: {
          suspension: {
            frontSpringRate: setup.front_spring_rate,
            rearSpringRate: setup.rear_spring_rate,
            springRateUnit: setup.spring_rate_unit,
            shockBrand: setup.shock_brand,
            shockModel: setup.shock_model,
            shockType: setup.shock_type,
            compressionClicks: setup.compression_clicks,
            reboundClicks: setup.rebound_clicks,
            singleAdjustmentClicks: setup.single_adjustment_clicks,
            rearCompressionClicks: setup.rear_compression_clicks,
            rearReboundClicks: setup.rear_rebound_clicks,
            rearSingleAdjustmentClicks: setup.rear_single_adjustment_clicks,
            frontHasReservoir: setup.front_has_reservoir,
            rearHasReservoir: setup.rear_has_reservoir,
            frontReservoirPressure: setup.front_reservoir_pressure,
            rearReservoirPressure: setup.rear_reservoir_pressure,
            rideHeightFL: setup.ride_height_fl,
            rideHeightFR: setup.ride_height_fr,
            rideHeightRL: setup.ride_height_rl,
            rideHeightRR: setup.ride_height_rr,
          },
          tires: {
            brand: setup.tire_brand,
            model: setup.tire_model,
            size: setup.tire_size,
            rearSize: setup.rear_tire_size,
            differentRearSize: setup.different_rear_size,
            pressureFL: setup.tire_pressure_fl,
            pressureFR: setup.tire_pressure_fr,
            pressureRL: setup.tire_pressure_rl,
            pressureRR: setup.tire_pressure_rr,
            heatCycles: setup.heat_cycles,
            tempFLInner: setup.tire_temp_fl_inner,
            tempFLCenter: setup.tire_temp_fl_center,
            tempFLOuter: setup.tire_temp_fl_outer,
            tempFRInner: setup.tire_temp_fr_inner,
            tempFRCenter: setup.tire_temp_fr_center,
            tempFROuter: setup.tire_temp_fr_outer,
            tempRLInner: setup.tire_temp_rl_inner,
            tempRLCenter: setup.tire_temp_rl_center,
            tempRLOuter: setup.tire_temp_rl_outer,
            tempRRInner: setup.tire_temp_rr_inner,
            tempRRCenter: setup.tire_temp_rr_center,
            tempRROuter: setup.tire_temp_rr_outer,
          },
          alignment: {
            camberFL: setup.camber_fl,
            camberFR: setup.camber_fr,
            camberRL: setup.camber_rl,
            camberRR: setup.camber_rr,
            casterLeft: setup.caster_left,
            casterRight: setup.caster_right,
            frontToe: setup.alignment_field1,
            rearToe: setup.alignment_field2,
            toeUnit: setup.toe_unit,
          },
          cornerBalance: {
            weightFL: setup.corner_weight_fl,
            weightFR: setup.corner_weight_fr,
            weightRL: setup.corner_weight_rl,
            weightRR: setup.corner_weight_rr,
            crossWeightPercentage: setup.cross_weight_percentage,
          },
          swayBar: {
            frontBrand: setup.front_sway_bar_brand,
            frontDiameter: setup.front_sway_bar_diameter,
            frontSetting: setup.front_sway_bar_adjustment,
            rearBrand: setup.rear_sway_bar_brand,
            rearDiameter: setup.rear_sway_bar_diameter,
            rearSetting: setup.rear_sway_bar_adjustment,
          },
          aero: {
            frontDownforce: setup.front_downforce,
            rearDownforce: setup.rear_downforce,
            frontSplitterBrand: setup.front_splitter_brand,
            frontSplitterModel: setup.front_splitter_model,
            frontSplitterHeight: setup.front_splitter_height,
            frontSplitterAngle: setup.front_splitter_angle,
            frontSplitterMaterial: setup.front_splitter_material,
            rearWingBrand: setup.rear_wing_brand,
            rearWingModel: setup.rear_wing_model,
            rearWingAngle: setup.rear_wing_angle,
            rearWingMaterial: setup.rear_wing_material,
            rearWingEndplates: setup.rear_wing_endplates,
            rearDiffuser: setup.rear_diffuser,
            numberOfCanards: setup.number_of_canards,
          },
          trackData: {
            name: setup.track_name,
          },
          vehicle: {
            name: setup.vehicle_name,
            weight: setup.car_weight,
          }
        }
      }));
      
      setSetups(transformedSetups);
      console.log('Loaded setups:', transformedSetups?.length || 0, 'setups:', transformedSetups?.map(s => s.setup_name));
    } catch (error) {
      console.error('Error loading setups:', error);
      toast({
        title: 'Error',
        description: 'Failed to load saved setups',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSetup = async (
    name: string,
    data: any,
    notes?: string,
    existingSetupId?: string
  ) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'Please sign in to save setups',
        variant: 'destructive',
      });
      return;
    }

    if (!vehicleId) {
      toast({
        title: 'Error',
        description: 'No vehicle selected',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Saving setup with data:', { name, vehicleId, data, notes });
      
      // Extract track name from trackData if it exists
      const trackName = data?.trackData?.name || data?.trackData?.trackName || null;
      
      // Check if setup with same name already exists (for overwrite functionality)
      if (!existingSetupId) {
        const { data: existingSetups } = await supabase
          .from('vehicle_setups')
          .select('id')
          .eq('setup_name', name)
          .eq('vehicle_id', vehicleId)
          .eq('user_id', user.id);
        
        if (existingSetups && existingSetups.length > 0) {
          existingSetupId = existingSetups[0].id;
        }
      }
      
      // Map nested data structure to flat database columns
      const setupData = {
        setup_name: name,
        vehicle_id: vehicleId,
        user_id: user.id,
        notes,
        track_name: trackName,
        updated_at: new Date().toISOString(),
        
        // Suspension data
        front_spring_rate: data?.suspension?.frontSpringRate || null,
        rear_spring_rate: data?.suspension?.rearSpringRate || null,
        spring_rate_unit: data?.suspension?.springRateUnit || null,
        shock_brand: data?.suspension?.shockBrand || null,
        shock_model: data?.suspension?.shockModel || null,
        shock_type: data?.suspension?.shockType || null,
        compression_clicks: data?.suspension?.compressionClicks || null,
        rebound_clicks: data?.suspension?.reboundClicks || null,
        single_adjustment_clicks: data?.suspension?.singleAdjustmentClicks || null,
        rear_compression_clicks: data?.suspension?.rearCompressionClicks || null,
        rear_rebound_clicks: data?.suspension?.rearReboundClicks || null,
        rear_single_adjustment_clicks: data?.suspension?.rearSingleAdjustmentClicks || null,
        front_has_reservoir: data?.suspension?.frontHasReservoir || false,
        rear_has_reservoir: data?.suspension?.rearHasReservoir || false,
        front_reservoir_pressure: data?.suspension?.frontReservoirPressure || null,
        rear_reservoir_pressure: data?.suspension?.rearReservoirPressure || null,
        ride_height_fl: data?.suspension?.rideHeightFL || null,
        ride_height_fr: data?.suspension?.rideHeightFR || null,
        ride_height_rl: data?.suspension?.rideHeightRL || null,
        ride_height_rr: data?.suspension?.rideHeightRR || null,
        
        // Tires data
        tire_brand: data?.tires?.brand || null,
        tire_model: data?.tires?.model || null,
        tire_size: data?.tires?.size || null,
        rear_tire_size: data?.tires?.rearSize || null,
        different_rear_size: data?.tires?.differentRearSize || false,
        tire_pressure_fl: data?.tires?.pressureFL || null,
        tire_pressure_fr: data?.tires?.pressureFR || null,
        tire_pressure_rl: data?.tires?.pressureRL || null,
        tire_pressure_rr: data?.tires?.pressureRR || null,
        heat_cycles: data?.tires?.heatCycles || null,
        
        // Tire temperatures
        tire_temp_fl_inner: data?.tires?.tempFLInner || null,
        tire_temp_fl_center: data?.tires?.tempFLCenter || null,
        tire_temp_fl_outer: data?.tires?.tempFLOuter || null,
        tire_temp_fr_inner: data?.tires?.tempFRInner || null,
        tire_temp_fr_center: data?.tires?.tempFRCenter || null,
        tire_temp_fr_outer: data?.tires?.tempFROuter || null,
        tire_temp_rl_inner: data?.tires?.tempRLInner || null,
        tire_temp_rl_center: data?.tires?.tempRLCenter || null,
        tire_temp_rl_outer: data?.tires?.tempRLOuter || null,
        tire_temp_rr_inner: data?.tires?.tempRRInner || null,
        tire_temp_rr_center: data?.tires?.tempRRCenter || null,
        tire_temp_rr_outer: data?.tires?.tempRROuter || null,
        
        // Alignment data - individual corner values
        camber_fl: data?.alignment?.camberFL || null,
        camber_fr: data?.alignment?.camberFR || null,
        camber_rl: data?.alignment?.camberRL || null,
        camber_rr: data?.alignment?.camberRR || null,
        caster_left: data?.alignment?.casterLeft || null,
        caster_right: data?.alignment?.casterRight || null,
        toe_unit: data?.alignment?.toeUnit || null,
        alignment_field1: data?.alignment?.frontToe || null,
        alignment_field2: data?.alignment?.rearToe || null,
        
        // Corner balance data
        corner_weight_fl: data?.cornerBalance?.weightFL || null,
        corner_weight_fr: data?.cornerBalance?.weightFR || null,
        corner_weight_rl: data?.cornerBalance?.weightRL || null,
        corner_weight_rr: data?.cornerBalance?.weightRR || null,
        cross_weight_percentage: data?.cornerBalance?.crossWeightPercentage || null,
        
        // Sway bar data
        front_sway_bar_brand: data?.swayBar?.frontBrand || null,
        front_sway_bar_diameter: data?.swayBar?.frontDiameter || null,
        front_sway_bar_setting: data?.swayBar?.frontSetting || null,
        rear_sway_bar_brand: data?.swayBar?.rearBrand || null,
        rear_sway_bar_diameter: data?.swayBar?.rearDiameter || null,
        rear_sway_bar_setting: data?.swayBar?.rearSetting || null,
        
        // Aero data
        front_downforce: data?.aero?.frontDownforce || null,
        rear_downforce: data?.aero?.rearDownforce || null,
        front_splitter_brand: data?.aero?.frontSplitterBrand || null,
        front_splitter_model: data?.aero?.frontSplitterModel || null,
        front_splitter_height: data?.aero?.frontSplitterHeight || null,
        front_splitter_angle: data?.aero?.frontSplitterAngle || null,
        front_splitter_material: data?.aero?.frontSplitterMaterial || null,
        rear_wing_brand: data?.aero?.rearWingBrand || null,
        rear_wing_model: data?.aero?.rearWingModel || null,
        rear_wing_angle: data?.aero?.rearWingAngle || null,
        rear_wing_material: data?.aero?.rearWingMaterial || null,
        rear_wing_endplates: data?.aero?.rearWingEndplates || null,
        rear_diffuser: data?.aero?.rearDiffuser || null,
        number_of_canards: data?.aero?.numberOfCanards || null,
        
        // Vehicle data
        vehicle_name: data?.vehicle?.name || null,
        car_weight: data?.vehicle?.weight || null,
        
        // Handling issues
        issue_description: data?.handlingIssues?.description || null,
        understeer: data?.handlingIssues?.understeer || false,
        oversteer: data?.handlingIssues?.oversteer || false,
        wandering_high_speed: data?.handlingIssues?.wanderingHighSpeed || false,
        wont_turn_in: data?.handlingIssues?.wontTurnIn || false,
        snap_oversteer: data?.handlingIssues?.snapOversteer || false,
        poor_braking: data?.handlingIssues?.poorBraking || false,
        instability: data?.handlingIssues?.instability || false,
        tire_wear: data?.handlingIssues?.tireWear || false,
        
        // Track conditions
        temperature: data?.trackConditions?.temperature || null,
        weather: data?.trackConditions?.weather || null,
        track_surface: data?.trackConditions?.surface || null
      };

      console.log('Final setup data to save:', setupData);
      let result;
      if (existingSetupId) {
        // Update existing setup
        console.log('Updating existing setup:', existingSetupId);
        result = await supabase
          .from('vehicle_setups')
          .update(setupData)
          .eq('id', existingSetupId)
          .eq('user_id', user.id)
          .select()
          .single();
      } else {
        // Create new setup
        console.log('Creating new setup');
        result = await supabase
          .from('vehicle_setups')
          .insert({
            ...setupData,
            created_at: new Date().toISOString()
          })
          .select()
          .single();
      }

      console.log('Supabase result:', result);

      if (result.error) {
        console.error('Supabase error details:', {
          message: result.error.message,
          details: result.error.details,
          hint: result.error.hint,
          code: result.error.code
        });
        throw result.error;
      }
      
      await loadSetups(); // Refresh the list
      
      toast({
        title: 'Success',
        description: `Setup "${name}" ${existingSetupId ? 'updated' : 'saved'} successfully`,
      });
      
      return result.data;
    } catch (error) {
      console.error('Error saving setup:', error);
      toast({
        title: 'Error',
        description: `Failed to save setup: ${error.message || 'Unknown error'}`,
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteSetup = async (setupId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('vehicle_setups')
        .delete()
        .eq('id', setupId);

      if (error) throw error;
      
      await loadSetups(); // Refresh the list
      
      toast({
        title: 'Success',
        description: 'Setup deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting setup:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete setup',
        variant: 'destructive',
      });
    }
  };

  return {
    setups,
    loading,
    saveSetup,
    deleteSetup,
    loadSetups
  };
};