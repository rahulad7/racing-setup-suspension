import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Gauge, Scale, AlignCenter, Settings, Wind, Car, Wrench, MapPin, User, Clock, AlertTriangle } from 'lucide-react';
import { useFormPersistence } from '@/hooks/useFormPersistence';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExtendedDataPoints, { extendedDataPoints } from './ExtendedDataPoints';
import SuspensionDataPoints, { suspensionDataPoints } from './SuspensionDataPoints';
import VehicleDataPoints, { vehicleDataPoints } from './VehicleDataPoints';
import IssueDescriptionForm from './IssueDescriptionForm';
import DiagnosticButton from './DiagnosticButton';

interface DataPoint {
  id: string;
  category: string;
  name: string;
  description: string;
  required: boolean;
  completed?: boolean;
}

const baseDataPoints: DataPoint[] = [
  { id: 'tire-size-front', category: 'Tires', name: 'Front Tire Size', description: 'What size tires are you running front?', required: true },
  { id: 'tire-size-rear', category: 'Tires', name: 'Rear Tire Size', description: 'What size tires are you running rear?', required: true },
  { id: 'tire-make-model', category: 'Tires', name: 'Tire Make and Model', description: 'What make and model tire are you running?', required: true },
  { id: 'car-weight', category: 'Corner Balanced', name: 'Car Weight', description: 'What does your car weigh?', required: true },
  { id: 'stock-alignment', category: 'Alignment', name: 'Stock Alignment', description: 'Are you running a stock alignment?', required: true },
  { id: 'stock-suspension', category: 'Suspensions', name: 'Stock Suspension', description: 'Are you running the stock suspension?', required: true },
  { id: 'stock-sway-bars', category: 'Sway bars', name: 'Stock Sway Bars', description: 'Are you running stock sway bars?', required: true },
  { id: 'aftermarket-aero', category: 'Aero', name: 'Aftermarket Aero', description: 'Are you running aftermarket aero?', required: true }
];

const allDataPoints = [...baseDataPoints, ...extendedDataPoints, ...suspensionDataPoints, ...vehicleDataPoints];

const DataEntryPointsList: React.FC = () => {
  const { formData, updateFormData } = useFormPersistence('vehicle-setup');
  const [issueData, setIssueData] = useState({
    issueDescription: '',
    entryUndersteer: false,
    entryOversteer: false,
    exitUndersteer: false,
    exitOversteer: false,
    midCornerUndersteer: false,
    wanderingHighSpeed: false,
    wontTurnIn: false,
    snapOversteer: false,
    poorBraking: false,
    instability: false,
    tireWear: false
  });
  
  const categories = [...new Set(allDataPoints.map(point => point.category))];
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Tires': return <Gauge className="h-5 w-5" />;
      case 'Corner Balanced': return <Scale className="h-5 w-5" />;
      case 'Alignment': return <AlignCenter className="h-5 w-5" />;
      case 'Suspensions': return <Settings className="h-5 w-5" />;
      case 'Sway bars': return <Wrench className="h-5 w-5" />;
      case 'Aero': return <Wind className="h-5 w-5" />;
      case 'Vehicle': return <Car className="h-5 w-5" />;
      case 'Track': return <MapPin className="h-5 w-5" />;
      case 'Driver': return <User className="h-5 w-5" />;
      case 'Session': return <Clock className="h-5 w-5" />;
      default: return <Circle className="h-5 w-5" />;
    }
  };
  
  const isFieldCompleted = (fieldId: string) => {
    const value = formData[fieldId];
    return value !== undefined && value !== '' && value !== false;
  };
  
  const handleIssueChange = (field: keyof typeof issueData, value: string | boolean) => {
    setIssueData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Race Car Analysis Tool</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Professional race car setup analysis and diagnostics. Track your data entry progress and get expert recommendations.
        </p>
        {Object.keys(formData).length > 0 && (
          <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <p className="text-green-400">✓ {Object.keys(formData).filter(key => formData[key] !== '' && formData[key] !== undefined).length} fields completed</p>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="data-points" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-700">
          <TabsTrigger value="data-points" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Data Points
          </TabsTrigger>
          <TabsTrigger value="issues" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Issues & Diagnostics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-points" className="mt-6">
          {categories.map(category => {
            const categoryPoints = allDataPoints.filter(point => point.category === category);
            const completedCount = categoryPoints.filter(point => isFieldCompleted(point.id)).length;
            
            return (
              <Card key={category} className="bg-gray-800/50 border-blue-500/20 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    {getCategoryIcon(category)}
                    {category}
                    <Badge variant="outline" className="ml-auto">
                      {completedCount}/{categoryPoints.length} completed
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {categoryPoints.map(point => {
                      const completed = isFieldCompleted(point.id);
                      return (
                        <div key={point.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-700/30">
                          <div className="mt-1">
                            {completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${completed ? 'text-green-400' : 'text-white'}`}>{point.name}</h4>
                              {point.required && (
                                <Badge variant="destructive" size="sm">Required</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">{point.description}</p>
                            {completed && formData[point.id] && (
                              <p className="text-xs text-green-400 mt-1">Value: {String(formData[point.id]).substring(0, 50)}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
        
        <TabsContent value="issues" className="mt-6 space-y-6">
          <IssueDescriptionForm data={issueData} onChange={handleIssueChange} />
          <DiagnosticButton setupData={formData} issueData={issueData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataEntryPointsList;