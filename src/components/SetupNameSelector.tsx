import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface SetupNameSelectorProps {
  vehicleId: string;
  selectedSetupName: string;
  onSetupNameChange: (name: string, isExisting: boolean) => void;
}

const SetupNameSelector: React.FC<SetupNameSelectorProps> = ({
  vehicleId,
  selectedSetupName,
  onSetupNameChange
}) => {
  const [existingSetups, setExistingSetups] = useState<Array<{ id: string; name: string }>>([]);
  const [isCustomName, setIsCustomName] = useState(false);
  const [customName, setCustomName] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (vehicleId && user) {
      loadExistingSetups();
    }
  }, [vehicleId, user]);

  const loadExistingSetups = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicle_setups')
        .select('id, setup_name')
        .eq('vehicle_id', vehicleId)
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const setups = data?.map(setup => ({
        id: setup.id,
        name: setup.setup_name
      })) || [];

      setExistingSetups(setups);
    } catch (error) {
      console.error('Error loading existing setups:', error);
    }
  };

  const handleSelectionChange = (value: string) => {
    if (value === 'new') {
      setIsCustomName(true);
      setCustomName('');
      onSetupNameChange('', false);
    } else {
      setIsCustomName(false);
      setCustomName('');
      const isExisting = existingSetups.some(setup => setup.name === value);
      onSetupNameChange(value, isExisting);
    }
  };

  const handleCustomNameChange = (value: string) => {
    setCustomName(value);
    onSetupNameChange(value, false);
  };

  return (
    <div className="space-y-2">
      <Label>Setup Name</Label>
      <Select value={isCustomName ? 'new' : selectedSetupName} onValueChange={handleSelectionChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select existing setup or create new" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">Create New Setup</SelectItem>
          {existingSetups.map((setup) => (
            <SelectItem key={setup.id} value={setup.name}>
              {setup.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {isCustomName && (
        <Input
          placeholder="Enter setup name..."
          value={customName}
          onChange={(e) => handleCustomNameChange(e.target.value)}
        />
      )}
    </div>
  );
};

export default SetupNameSelector;