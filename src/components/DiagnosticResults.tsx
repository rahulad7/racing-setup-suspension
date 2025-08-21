import React, { useState } from 'react';
import { useLicense } from '@/contexts/LicenseContext';
import ModernDiagnosticResults from './ModernDiagnosticResults';
import FreeAnalysisResults from './FreeAnalysisResults';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Lightbulb, Lock } from 'lucide-react';

interface AnalysisData {
  trackType: string;
  carType: string;
  issue: string;
  currentSetup: string;
  conditions: string;
}

interface DiagnosticResultsProps {
  data: AnalysisData;
}

const DiagnosticResults: React.FC<DiagnosticResultsProps> = ({ data }) => {
  const { checkLicense, canUseFreeAdvice, useFreeAdvice } = useLicense();
  const [showingFreeResults, setShowingFreeResults] = useState(false);
  
  const hasLicense = checkLicense();
  const canUseFree = canUseFreeAdvice();
  
  // If user has license, show full modern results
  if (hasLicense) {
    return (
      <div className="space-y-8">
        <ModernDiagnosticResults data={data} />
        
        <Alert className="bg-green-900/20 border-green-500/30">
          <Lightbulb className="h-5 w-5 text-green-400" />
          <AlertDescription className="text-green-300 text-lg">
            <strong>Licensed User:</strong> You have access to all professional recommendations and setup sheets.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  // If showing free results
  if (showingFreeResults) {
    return <FreeAnalysisResults data={data} />;
  }
  
  // If can use free trial
  if (canUseFree) {
    return (
      <div className="space-y-8">
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-800/50 to-purple-800/50">
            <CardTitle className="flex items-center gap-3 text-blue-400 text-2xl">
              <Lightbulb className="h-8 w-8" />
              Free Analysis Available
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <p className="text-blue-300 text-xl">
              Get basic recommendations for your {data.trackType} setup on your {data.carType} - no charge!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => {
                  useFreeAdvice();
                  setShowingFreeResults(true);
                }}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 text-lg shadow-lg"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Get Free Analysis
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/license'}
                className="border-red-500/50 text-red-400 hover:bg-red-500/10 py-3 px-6 text-lg"
              >
                <Lock className="h-5 w-5 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Default: show license required
  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-orange-800/50 to-red-800/50">
          <CardTitle className="flex items-center gap-3 text-orange-400 text-2xl">
            <Lock className="h-8 w-8" />
            License Required
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <p className="text-orange-300 text-xl">
            A license is required to access professional suspension analysis and recommendations.
          </p>
          <Button 
            onClick={() => window.location.href = '/license'}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 px-6 text-lg shadow-lg"
          >
            <Lock className="h-5 w-5 mr-2" />
            Get Licenses
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticResults;