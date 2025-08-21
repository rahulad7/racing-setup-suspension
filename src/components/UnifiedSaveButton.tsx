import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UnifiedSaveButtonProps {
  formData: any;
  vehicleId?: string;
  className?: string;
}

const UnifiedSaveButton: React.FC<UnifiedSaveButtonProps> = ({ 
  formData, 
  vehicleId,
  className = '' 
}) => {
  const [saving, setSaving] = useState(false);
  const [setupName, setSetupName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!setupName.trim()) {
      toast({
        title: 'Setup Name Required',
        description: 'Please enter a name for your setup',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to save setups',
          variant: 'destructive',
        });
        setSaving(false);
        return;
      }

      // Extract all form fields into individual columns
      const setupRecord = {
        user_id: user.id,
        vehicle_id: vehicleId || null,
        setup_name: setupName.trim(),
        track_name: 'Unknown Track',
        
        // Suspension fields
        shock_brand: formData.suspension?.shockBrand || null,
        shock_model: formData.suspension?.shockModel || null,
        shock_type: formData.suspension?.shockType || null,
        rear_shock_brand: formData.suspension?.rearShockBrand || null,
        rear_shock_model: formData.suspension?.rearShockModel || null,
        rear_shock_type: formData.suspension?.rearShockType || null,
        compression_clicks: formData.suspension?.compressionClicks || null,
        rebound_clicks: formData.suspension?.reboundClicks || null,
        single_adjustment_clicks: formData.suspension?.singleAdjustmentClicks || null,
        rear_compression_clicks: formData.suspension?.rearCompressionClicks || null,
        rear_rebound_clicks: formData.suspension?.rearReboundClicks || null,
        rear_single_adjustment_clicks: formData.suspension?.rearSingleAdjustmentClicks || null,
        high_speed_compression_front: formData.suspension?.highSpeedCompressionFront || null,
        low_speed_compression_front: formData.suspension?.lowSpeedCompressionFront || null,
        high_speed_compression_rear: formData.suspension?.highSpeedCompressionRear || null,
        low_speed_compression_rear: formData.suspension?.lowSpeedCompressionRear || null,
        front_spring_rate: formData.suspension?.frontSpringRate || null,
        rear_spring_rate: formData.suspension?.rearSpringRate || null,
        spring_rate_unit: formData.suspension?.springRateUnit || null,
        ride_height_fl: formData.suspension?.rideHeightFL || null,
        ride_height_fr: formData.suspension?.rideHeightFR || null,
        ride_height_rl: formData.suspension?.rideHeightRL || null,
        ride_height_rr: formData.suspension?.rideHeightRR || null,
        front_reservoir_pressure: formData.suspension?.frontReservoirPressure || null,
        rear_reservoir_pressure: formData.suspension?.rearReservoirPressure || null,
        front_has_reservoir: formData.suspension?.frontHasReservoir || false,
        rear_has_reservoir: formData.suspension?.rearHasReservoir || false,
        
        // Keep original setup_data for backward compatibility
        setup_data: formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('vehicle_setups')
        .insert([setupRecord])
        .select();

      if (error) {
        console.error('Save error:', error);
        toast({
          title: 'Save Failed',
          description: error.message || 'Unable to save setup',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Setup Saved!',
          description: `"${setupName}" has been saved successfully`,
        });
        setSetupName('');
        setIsOpen(false);
      }
    } catch (err) {
      console.error('Exception:', err);
      toast({
        title: 'Save Failed',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    }

    setSaving(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`${className}`}>
          <Save className="h-4 w-4 mr-2" />
          Save Setup
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Vehicle Setup</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="setupName">Setup Name</Label>
            <Input
              id="setupName"
              value={setupName}
              onChange={(e) => setSetupName(e.target.value)}
              placeholder="Enter setup name..."
              disabled={saving}
            />
          </div>
          <Button 
            onClick={handleSave} 
            disabled={saving || !setupName.trim()}
            className="w-full"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Setup
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedSaveButton;