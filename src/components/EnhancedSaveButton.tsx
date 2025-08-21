import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Save, Car } from 'lucide-react';
import VehicleSelector from './VehicleSelector';
import { useToast } from '@/hooks/use-toast';

interface EnhancedSaveButtonProps {
  setupData: any;
  defaultSetupName?: string;
  defaultTrackName?: string;
}

export function EnhancedSaveButton({ 
  setupData, 
  defaultSetupName = 'New Setup',
  defaultTrackName = ''
}: EnhancedSaveButtonProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [setupName, setSetupName] = useState(defaultSetupName);
  const [trackName, setTrackName] = useState(defaultTrackName);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const { toast } = useToast();

  const handleSave = async () => {
    if (!selectedVehicleId || !setupName.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please select a vehicle and enter a setup name',
        variant: 'destructive'
      });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in to save setups',
          variant: 'destructive'
        });
        return;
      }

      const setupRecord = {
        user_id: user.id,
        vehicle_id: selectedVehicleId,
        setup_name: setupName.trim(),
        track_name: trackName.trim() || null,
        setup_data: setupData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('vehicle_setups')
        .insert([setupRecord]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Setup saved successfully!'
      });
      
      setOpen(false);
      setSetupName(defaultSetupName);
      setTrackName(defaultTrackName);
      setSelectedVehicleId('');
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Error',
        description: 'Failed to save setup',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" />
          Save Setup
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Car className="mr-2 h-5 w-5 text-blue-400" />
            Save Vehicle Setup
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-slate-300">Select Vehicle *</Label>
            <VehicleSelector
              selectedVehicleId={selectedVehicleId}
              onVehicleSelect={setSelectedVehicleId}
            />
          </div>
          <div>
            <Label className="text-slate-300">Setup Name *</Label>
            <Input
              value={setupName}
              onChange={(e) => setSetupName(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., Road Course Setup"
            />
          </div>
          <div>
            <Label className="text-slate-300">Track Name</Label>
            <Input
              value={trackName}
              onChange={(e) => setTrackName(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="e.g., Laguna Seca"
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Setup'}
            </Button>
            <Button 
              onClick={() => setOpen(false)} 
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EnhancedSaveButton;