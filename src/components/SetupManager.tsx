import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, FolderOpen, Trash2, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useVehicleSetupsGlobal } from '@/hooks/useVehicleSetupsGlobal';

interface SavedSetup {
  id: string;
  name: string;
  date: string;
  track: string;
  data: any;
}

interface SetupManagerProps {
  currentSetup: any;
  onLoadSetup: (setup: any) => void;
  onSaveSetup: (name: string) => void;
}

const SetupManager: React.FC<SetupManagerProps> = ({ currentSetup, onLoadSetup, onSaveSetup }) => {
  const { setups, saveSetup, deleteSetup, loadSetup } = useVehicleSetupsGlobal();
  const [setupName, setSetupName] = useState('');
  const [selectedSetup, setSelectedSetup] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!setupName.trim()) {
      toast({ title: 'Error', description: 'Please enter a setup name', variant: 'destructive' });
      return;
    }

    await saveSetup({
      setup_name: setupName,
      track_name: currentSetup.track || 'Unknown Track',
      setup_data: currentSetup
    });
    
    onSaveSetup(setupName);
    setSetupName('');
    setIsDialogOpen(false);
  };

  const handleLoad = async () => {
    if (!selectedSetup) return;
    
    const setup = await loadSetup(selectedSetup);
    if (setup) {
      onLoadSetup(setup.setup_data);
      toast({ title: 'Success', description: `Setup "${setup.setup_name}" loaded successfully` });
    }
  };

  const handleDelete = async (setupId: string) => {
    await deleteSetup(setupId);
  };

  return (
    <div className="flex gap-2">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Setup
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Current Setup</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter setup name..."
              value={setupName}
              onChange={(e) => setSetupName(e.target.value)}
            />
            <Button onClick={handleSave} className="w-full">Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <FolderOpen className="h-4 w-4 mr-2" />
            Load Setup
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Load Saved Setup</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={selectedSetup} onValueChange={setSelectedSetup}>
              <SelectTrigger>
                <SelectValue placeholder="Select a setup to load..." />
              </SelectTrigger>
               <SelectContent>
                {setups.map((setup) => (
                  <SelectItem key={setup.id} value={setup.id}>
                    {setup.setup_name} - {setup.track_name || 'Unknown Track'} ({new Date(setup.created_at).toLocaleDateString()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="grid gap-2 max-h-60 overflow-y-auto">
              {setups.map((setup) => (
                <Card key={setup.id} className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{setup.setup_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {setup.track_name || 'Unknown Track'} • {new Date(setup.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(setup.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <Button onClick={handleLoad} disabled={!selectedSetup} className="w-full">
              Load Selected Setup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetupManager;