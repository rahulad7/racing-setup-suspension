import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Trophy, Zap } from 'lucide-react';

const SampleVehicles: React.FC = () => {
  const sampleCars = [
    {
      id: 'sample-1',
      name: 'Track Day Special',
      make: 'Mazda',
      model: 'Miata',
      year: '2022',
      car_type: 'convertible',
      track_type: 'road-course',
      description: 'Perfect lightweight sports car for beginners',
      icon: <Car className="h-5 w-5" />
    },
    {
      id: 'sample-2', 
      name: 'Autocross Beast',
      make: 'Honda',
      model: 'Civic Si',
      year: '2023',
      car_type: 'sedan',
      track_type: 'autocross',
      description: 'Nimble and responsive for tight courses',
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: 'sample-3',
      name: 'Weekend Warrior',
      make: 'BMW',
      model: 'M3',
      year: '2021',
      car_type: 'sedan',
      track_type: 'road-course',
      description: 'High-performance track machine',
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 'sample-4',
      name: 'Formula Car',
      make: 'Dallara',
      model: 'F3',
      year: '2020',
      car_type: 'open-wheeled',
      track_type: 'road-course',
      description: 'Pure racing machine with advanced aerodynamics',
      icon: <Trophy className="h-5 w-5" />
    },
    {
      id: 'sample-5',
      name: 'Street Tuner',
      make: 'Subaru',
      model: 'WRX STI',
      year: '2019',
      car_type: 'sedan',
      track_type: 'autocross',
      description: 'All-wheel drive grip monster',
      icon: <Zap className="h-5 w-5" />
    },
    {
      id: 'sample-6',
      name: 'Classic Racer',
      make: 'Porsche',
      model: '911 GT3',
      year: '2022',
      car_type: 'coupe',
      track_type: 'road-course',
      description: 'Precision engineering meets track performance',
      icon: <Car className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Sample Cars - Ready to Use</h3>
        <p className="text-sm text-gray-400">6 example vehicles for different racing scenarios</p>
      </div>
      <div className="grid gap-4">
        {sampleCars.map((car) => (
          <Card key={car.id} className="bg-gray-800/50 border-gray-700/50 hover:border-blue-500/30 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-blue-400">
                    {car.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{car.name}</CardTitle>
                    <p className="text-gray-400 text-sm">{car.year} {car.make} {car.model}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {car.car_type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {car.track_type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm">{car.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SampleVehicles;