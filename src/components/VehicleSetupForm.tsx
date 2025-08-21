import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import IssueDescriptionForm from './IssueDescriptionForm';
import DiagnosticButton from './DiagnosticButton';
import SetupHistory from './SetupHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

interface VehicleSetupData {
  trackName: string;
  notes: string;
  frontTireSize: string;
  rearTireSize: string;
  tireMake: string;
  tireModel: string;
  heatCycles: string;
  carWeight: string;
  frontToe: string;
  frontCamber: string;
  rearToe: string;
  rearCamber: string;
  shockBrand: string;
  shockModel: string;
  frontSpringRate: string;
  rearSpringRate: string;
  issueDescription: string;
  understeer: boolean;
  oversteer: boolean;
  wanderingHighSpeed: boolean;
  wontTurnIn: boolean;
  snapOversteer: boolean;
  poorBraking: boolean;
  instability: boolean;
  tireWear: boolean;
  temperature: string;
  weather: string;
  trackSurface: string;
}

interface VehicleSetupFormProps {
  vehicleId: string;
  vehicleName: string;
  activeSection?: string;
}

const VehicleSetupForm: React.FC<VehicleSetupFormProps> = ({ vehicleId, vehicleName, activeSection }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<VehicleSetupData>({
    trackName: '',
    notes: '',
    frontTireSize: '',
    rearTireSize: '',
    tireMake: '',
    tireModel: '',
    heatCycles: '',
    carWeight: '',
    frontToe: '',
    frontCamber: '',
    rearToe: '',
    rearCamber: '',
    shockBrand: '',
    shockModel: '',
    frontSpringRate: '',
    rearSpringRate: '',
    issueDescription: '',
    understeer: false,
    oversteer: false,
    wanderingHighSpeed: false,
    wontTurnIn: false,
    snapOversteer: false,
    poorBraking: false,
    instability: false,
    tireWear: false,
    temperature: '',
    weather: '',
    trackSurface: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof VehicleSetupData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveSetup = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save setups.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      const setupData = {
        vehicle_id: vehicleId,
        user_id: user.id,
        track_name: formData.trackName,
        notes: formData.notes,
        front_tire_size: formData.frontTireSize,
        rear_tire_size: formData.rearTireSize,
        tire_make: formData.tireMake,
        tire_model: formData.tireModel,
        heat_cycles: formData.heatCycles,
        car_weight: formData.carWeight,
        front_toe: formData.frontToe,
        front_camber: formData.frontCamber,
        rear_toe: formData.rearToe,
        rear_camber: formData.rearCamber,
        shock_brand: formData.shockBrand,
        shock_model: formData.shockModel,
        front_spring_rate: formData.frontSpringRate,
        rear_spring_rate: formData.rearSpringRate,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('vehicle_setups')
        .upsert(setupData, { onConflict: 'vehicle_id,user_id' });

      if (error) throw error;

      toast({
        title: "Setup Saved",
        description: `Setup for ${formData.trackName || vehicleName} has been saved to your account.`
      });
    } catch (error) {
      console.error('Error saving setup:', error);
      toast({
        title: "Error",
        description: "Failed to save setup. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSetup = (setup: any) => {
    setFormData({
      trackName: setup.trackName || '',
      notes: setup.notes || '',
      frontTireSize: setup.frontTireSize || '',
      rearTireSize: setup.rearTireSize || '',
      tireMake: setup.tireMake || '',
      tireModel: setup.tireModel || '',
      heatCycles: setup.heatCycles || '',
      carWeight: setup.carWeight || '',
      frontToe: setup.frontToe || '',
      frontCamber: setup.frontCamber || '',
      rearToe: setup.rearToe || '',
      rearCamber: setup.rearCamber || '',
      shockBrand: setup.shockBrand || '',
      shockModel: setup.shockModel || '',
      frontSpringRate: setup.frontSpringRate || '',
      rearSpringRate: setup.rearSpringRate || '',
      issueDescription: setup.issueDescription || '',
      understeer: setup.understeer || false,
      oversteer: setup.oversteer || false,
      wanderingHighSpeed: setup.wanderingHighSpeed || false,
      wontTurnIn: setup.wontTurnIn || false,
      snapOversteer: setup.snapOversteer || false,
      poorBraking: setup.poorBraking || false,
      instability: setup.instability || false,
      tireWear: setup.tireWear || false,
      temperature: setup.temperature || '',
      weather: setup.weather || '',
      trackSurface: setup.trackSurface || ''
    });
  };

  if (activeSection === 'issues') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{vehicleName} - Issue Description</CardTitle>
          </CardHeader>
          <CardContent>
            <IssueDescriptionForm data={formData} onChange={handleInputChange} />
          </CardContent>
        </Card>
        
        <DiagnosticButton setupData={formData} issueData={formData} />
      </div>
    );
  }

  if (activeSection === 'history') {
    return (
      <SetupHistory vehicleId={vehicleId} onEditSetup={handleEditSetup} />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{vehicleName} - Setup Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="carWeight">Car Weight (lbs)</Label>
              <Input
                id="carWeight"
                value={formData.carWeight}
                onChange={(e) => handleInputChange('carWeight', e.target.value)}
                placeholder="2800"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Setup notes and observations"
            />
          </div>
          
          <div className="flex gap-2">

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleSetupForm;
export type { VehicleSetupData };