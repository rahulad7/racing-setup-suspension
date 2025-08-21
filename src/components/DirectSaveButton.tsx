import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDirectSetupSaver } from '@/hooks/useDirectSetupSaver';
import { Save, Loader2 } from 'lucide-react';

interface DirectSaveButtonProps {
  setupData: any;
  trackName?: string;
}

export const DirectSaveButton: React.FC<DirectSaveButtonProps> = ({ setupData, trackName }) => {
  const [open, setOpen] = useState(false);
  const [setupName, setSetupName] = useState('');
  const { saveSetup, saving, error } = useDirectSetupSaver();

  const handleSave = async () => {
    if (!setupName.trim()) return;

    try {
      await saveSetup(setupData, setupName, trackName);
      setOpen(false);
      setSetupName('');
      alert('Setup saved successfully!');
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save Setup
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Vehicle Setup</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Setup name..."
            value={setupName}
            onChange={(e) => setSetupName(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button 
            onClick={handleSave} 
            disabled={saving || !setupName.trim()}
            className="w-full"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save Setup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};