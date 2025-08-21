import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Settings, Gauge, Wind, AlignCenter, Scale, RotateCcw, AlertTriangle } from 'lucide-react';
import { useLicense } from '@/contexts/LicenseContext';
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { FreeAnalysisResults } from './FreeAnalysisResults';
import SuspensionForm from './SuspensionForm';
import TiresForm from './TiresForm';
import AeroForm from './AeroForm';
import SwayBarForm from './SwayBarForm';
import AlignmentForm from './AlignmentForm';
import CornerBalancedForm from './CornerBalancedForm';
import IssueDescriptionForm from './IssueDescriptionForm';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  [key: string]: any;
}

interface DataEntryFormProps {
  onSubmit?: (data: FormData) => void;
}

export default function DataEntryForm({ onSubmit }: DataEntryFormProps) {
  const { hasValidLicense } = useLicense();
  const { formData, updateFormData, resetFormData, clearAllSavedData, setFormData } = useFormPersistence('vehicle-setup');
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    updateFormData(field, value);
  };

  const handleFormSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    setFormData(finalData);
    setShowResults(true);
    if (onSubmit) onSubmit(finalData);
  };

  const handleReset = () => {
    resetFormData();
    setShowResults(false);
    toast({
      title: "Form Reset",
      description: "All saved data has been cleared."
    });
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <Button onClick={() => setShowResults(false)} variant="outline" className="mb-4">
          ← Back to Form
        </Button>
        <FreeAnalysisResults data={formData} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Car className="h-5 w-5" />
                Vehicle Setup Analysis
              </CardTitle>
              <CardDescription className="text-gray-300">
                {hasValidLicense ? 'Complete vehicle setup analysis with all parameters' : 'Free analysis with basic parameters'}
                {Object.keys(formData).length > 0 && (
                  <span className="block text-green-400 text-sm mt-1">
                    ✓ Previously entered data loaded
                  </span>
                )}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReset} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="suspension" className="w-full">
            <TabsList className="grid w-full grid-cols-7 bg-gray-700">
              <TabsTrigger value="suspension" className="text-xs">
                <Settings className="h-4 w-4 mr-1" />
                Suspension
              </TabsTrigger>
              <TabsTrigger value="tires" className="text-xs">
                <Gauge className="h-4 w-4 mr-1" />
                Tires
              </TabsTrigger>
              <TabsTrigger value="aero" className="text-xs">
                <Wind className="h-4 w-4 mr-1" />
                Aero
              </TabsTrigger>
              <TabsTrigger value="sway" className="text-xs">
                <Settings className="h-4 w-4 mr-1" />
                Sway Bars
              </TabsTrigger>
              <TabsTrigger value="alignment" className="text-xs">
                <AlignCenter className="h-4 w-4 mr-1" />
                Alignment
              </TabsTrigger>
              <TabsTrigger value="balance" className="text-xs">
                <Scale className="h-4 w-4 mr-1" />
                Balance
              </TabsTrigger>
              <TabsTrigger value="issues" className="text-xs">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Issues
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="suspension" className="mt-6">
              <SuspensionForm onSubmit={handleFormSubmit} initialData={formData} />
            </TabsContent>
            
            <TabsContent value="tires" className="mt-6">
              <TiresForm data={formData} onChange={handleInputChange} />
              <Button onClick={() => handleFormSubmit(formData)} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Analyze Tire Setup
              </Button>
            </TabsContent>
            
            <TabsContent value="aero" className="mt-6">
              <AeroForm data={formData} onChange={handleInputChange} />
              <Button onClick={() => handleFormSubmit(formData)} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Analyze Aero Setup
              </Button>
            </TabsContent>
            
            <TabsContent value="sway" className="mt-6">
              <SwayBarForm data={formData} onChange={handleInputChange} />
              <Button onClick={() => handleFormSubmit(formData)} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Analyze Sway Bars Setup
              </Button>
            </TabsContent>
            
            <TabsContent value="alignment" className="mt-6">
              <AlignmentForm data={formData} onChange={handleInputChange} />
              <Button onClick={() => handleFormSubmit(formData)} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Analyze Alignment
              </Button>
            </TabsContent>
            
            <TabsContent value="balance" className="mt-6">
              <CornerBalancedForm data={formData} onChange={handleInputChange} />
              <Button onClick={() => handleFormSubmit(formData)} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Analyze Corner Balance
              </Button>
            </TabsContent>
            
            <TabsContent value="issues" className="mt-6">
              <IssueDescriptionForm 
                data={{
                  issueDescription: formData.issueDescription || '',
                  entryUndersteer: formData.entryUndersteer || false,
                  entryOversteer: formData.entryOversteer || false,
                  exitUndersteer: formData.exitUndersteer || false,
                  exitOversteer: formData.exitOversteer || false,
                  midCornerUndersteer: formData.midCornerUndersteer || false,
                  wanderingHighSpeed: formData.wanderingHighSpeed || false,
                  wontTurnIn: formData.wontTurnIn || false,
                  snapOversteer: formData.snapOversteer || false,
                  poorBraking: formData.poorBraking || false,
                  instability: formData.instability || false,
                  tireWear: formData.tireWear || false,
                  temperature: formData.temperature || '',
                  weather: formData.weather || '',
                  trackSurface: formData.trackSurface || ''
                }} 
                onChange={handleInputChange} 
              />
              <Button onClick={() => handleFormSubmit(formData)} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Analyze Issues & Track Conditions
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}