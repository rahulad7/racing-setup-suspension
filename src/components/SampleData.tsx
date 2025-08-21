import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Gauge } from 'lucide-react';
import SampleDataCategories from '@/components/SampleDataCategories';

const SampleData: React.FC = () => {
  const sampleVehicle = {
    make: 'BMW',
    model: 'M3',
    year: '1998',
    category: 'Race Car',
    weight: '3200 lbs',
    power: '240 hp',
    drivetrain: 'RWD'
  };

  const sampleSetupData = {
    trackType: 'Road Course',
    issue: 'Understeer in mid-corner',
    lapTime: '1:45.2',
    tireCompound: 'R888R',
    weather: 'Dry',
    trackTemp: '85°F',
    ambientTemp: '75°F'
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Sample Data Preview</h2>
        <p className="text-gray-400">See what data you'll enter and the reports you'll receive</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gray-800/50 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-500" />
              Sample Vehicle Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Make</p>
                <p className="text-white font-medium">{sampleVehicle.make}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Model</p>
                <p className="text-white font-medium">{sampleVehicle.model}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Year</p>
                <p className="text-white font-medium">{sampleVehicle.year}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <Badge variant="secondary">{sampleVehicle.category}</Badge>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-700">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Weight</p>
                  <p className="text-white font-medium">{sampleVehicle.weight}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Power</p>
                  <p className="text-white font-medium">{sampleVehicle.power}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Drive</p>
                  <p className="text-white font-medium">{sampleVehicle.drivetrain}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Gauge className="h-5 w-5 text-blue-500" />
              Sample Setup Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Track Type</p>
              <p className="text-white font-medium">{sampleSetupData.trackType}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Primary Issue</p>
              <p className="text-white font-medium">{sampleSetupData.issue}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Lap Time</p>
                <p className="text-white font-medium">{sampleSetupData.lapTime}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Tire Compound</p>
                <p className="text-white font-medium">{sampleSetupData.tireCompound}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Weather</p>
                <p className="text-white font-medium">{sampleSetupData.weather}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Track Temp</p>
                <p className="text-white font-medium">{sampleSetupData.trackTemp}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Air Temp</p>
                <p className="text-white font-medium">{sampleSetupData.ambientTemp}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Data Entry Categories</h3>
        <SampleDataCategories />
      </div>
    </div>
  );
};

export default SampleData;