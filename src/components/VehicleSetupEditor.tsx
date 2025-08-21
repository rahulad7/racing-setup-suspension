import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useVehicleSetupsDB } from '@/hooks/useVehicleSetupsDB';
import { toast } from '@/components/ui/use-toast';

interface VehicleSetupEditorProps {
  isOpen: boolean;
  onClose: () => void;
  setupId: string;
  vehicleId: string;
}

const VehicleSetupEditor: React.FC<VehicleSetupEditorProps> = ({
  isOpen,
  onClose,
  setupId,
  vehicleId
}) => {
  const [setupName, setSetupName] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { setups, saveSetup } = useVehicleSetupsDB(vehicleId);

  useEffect(() => {
    if (setupId && setups.length > 0) {
      const setup = setups.find(s => s.id === setupId);
      if (setup) {
        setSetupName(setup.name);
        setNotes(setup.notes || '');
      }
    }
  }, [setupId, setups]);

  const handleSave = async () => {
    if (!setupName.trim()) {
      toast({
        title: 'Error',
        description: 'Setup name is required',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const setup = setups.find(s => s.id === setupId);
      const setupData = setup?.data || {
        suspension: {},
        tires: {},
        aero: {},
        alignment: {},
        cornerBalance: {},
        swayBar: {}
      };

      await saveSetup(setupName.trim(), setupData, notes.trim() || undefined, setupId);
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update setup',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Vehicle Setup</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Setup Name</Label>
            <Input
              id="name"
              value={setupName}
              onChange={(e) => setSetupName(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={loading}
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleSetupEditor;