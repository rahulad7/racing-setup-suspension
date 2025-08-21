import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, FileText, ChevronRight } from 'lucide-react';
import SampleDataCategories from './SampleDataCategories';
import SampleReport from './SampleReport';
import LicenseModal from './LicenseModal';
import { useLicense } from '@/contexts/LicenseContext';

const SampleDemo: React.FC = () => {
  const [showReport, setShowReport] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const { canUseFreeAdvice } = useLicense();

  const sampleVehicle = {
    make: 'BMW',
    model: 'M3',
    year: '1998',
    category: 'Race Car',
    weight: '3200 lbs',
    power: '240 hp',
    drivetrain: 'RWD'
  };

  if (showReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => setShowReport(false)}
            className="text-blue-400 border-blue-500/50 hover:bg-blue-500/10"
          >
            ← Back to Data Entry
          </Button>
        </div>
        <SampleReport />
        <LicenseModal 
          isOpen={showLicenseModal} 
          onClose={() => setShowLicenseModal(false)} 
          showFreeOption={canUseFreeAdvice()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Sample Demo</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          See all the data entry points for a complete suspension analysis using a 1998 BMW M3 race car as an example.
        </p>
      </div>

      <Card className="bg-gray-800/50 border-blue-500/20 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-500" />
            Sample Vehicle: 1998 BMW M3
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Make/Model</p>
              <p className="text-white font-medium">{sampleVehicle.make} {sampleVehicle.model}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Year</p>
              <p className="text-white font-medium">{sampleVehicle.year}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Category</p>
              <Badge variant="secondary">{sampleVehicle.category}</Badge>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Weight</p>
              <p className="text-white font-medium">{sampleVehicle.weight}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">All Data Entry Points</h2>
        <p className="text-gray-400 text-center mb-8">
          Below are all the categories of data you would enter for a complete suspension analysis:
        </p>
        <SampleDataCategories />
      </div>

      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardContent className="pt-6">
          <div className="text-center">
            <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Ready to See the Analysis Report?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              After entering all this data, you would receive a comprehensive analysis report with specific recommendations for your setup.
            </p>
            <Button 
              onClick={() => setShowReport(true)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              View Sample Report
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <LicenseModal 
        isOpen={showLicenseModal} 
        onClose={() => setShowLicenseModal(false)} 
        showFreeOption={canUseFreeAdvice()}
      />
    </div>
  );
};

export default SampleDemo;