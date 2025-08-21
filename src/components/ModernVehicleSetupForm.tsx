import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import ModernCard from './ModernCard';
import ModernInput from './ModernInput';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import { useFormPersistence } from '@/hooks/useFormPersistence';
interface VehicleSetupData {
  trackName: string;
  notes: string;
  make: string;
  model: string;
  year: string;
  carType: string;
  trackType: string;
}

interface ModernVehicleSetupFormProps {
  data?: Partial<VehicleSetupData>;
  onChange: (data: VehicleSetupData) => void;
}

const ModernVehicleSetupForm: React.FC<ModernVehicleSetupFormProps> = ({ 
  data = {}, 
  onChange 
}) => {
  const { formData: persistedData, updateFormData } = useFormPersistence('vehicle');
  const { currentSetupData } = useAppContext();
  
  const [formData, setFormData] = useState<VehicleSetupData>({
    trackName: '',
    notes: '',
    make: '',
    model: '',
    year: '',
    carType: 'Sports Car',
    trackType: 'Road Course',
    ...persistedData,
    ...data
  });
  const { toast } = useToast();

  // Load setup data when currentSetupData changes
  useEffect(() => {
    if (currentSetupData) {
      console.log('ModernVehicleSetupForm loading currentSetupData:', currentSetupData);
      setFormData(prev => ({
        ...prev,
        trackName: currentSetupData.track_name || '',
        notes: currentSetupData.notes || '',
        make: currentSetupData.vehicle_make || '',
        model: currentSetupData.vehicle_model || '',
        year: currentSetupData.vehicle_year || '',
      }));
    }
  }, [currentSetupData]);

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleInputChange = (field: keyof VehicleSetupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    updateFormData(field, value);
  };

  return (
    <ModernCard title="Vehicle Information" gradient glow>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Car className="h-5 w-5 text-blue-400" />
        </div>
        <p className="text-slate-300">Enter your vehicle details and track information</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">        
        <ModernInput
          label="Vehicle Make"
          value={formData.make}
          onChange={(value) => handleInputChange('make', value)}
          placeholder="e.g., BMW"
        />
        
        
        <ModernInput
          label="Vehicle Model"
          value={formData.model}
          onChange={(value) => handleInputChange('model', value)}
          placeholder="e.g., M3"
        />
        
        
        <ModernInput
          label="Year"
          value={formData.year}
          onChange={(value) => handleInputChange('year', value)}
          placeholder="e.g., 2023"
        />
        
        
        <div className="md:col-span-2">
          <ModernInput
            label="Notes"
            value={formData.notes}
            onChange={(value) => handleInputChange('notes', value)}
            placeholder="Additional notes about this setup..."
            multiline
          />
        </div>
        

      </div>
    </ModernCard>
  );
};

export default ModernVehicleSetupForm;