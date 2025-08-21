import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, TrendingUp, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RaceCarDiagnostics from './RaceCarDiagnostics';

interface FreeAnalysisResultsProps {
  data: any;
}

export const FreeAnalysisResults: React.FC<FreeAnalysisResultsProps> = ({ data }) => {
  const hasAeroData = data.aeroConfiguration && data.aeroConfiguration !== 'none';
  const hasIssueData = data.entryUndersteer || data.entryOversteer || data.exitUndersteer || 
                      data.exitOversteer || data.midCornerUndersteer || data.wanderingHighSpeed ||
                      data.wontTurnIn || data.snapOversteer || data.poorBraking || data.instability;

  // Prepare aero data object
  const aeroData = hasAeroData ? {
    aeroConfiguration: data.aeroConfiguration,
    frontSplitterHeight: data.frontSplitterHeight,
    rearWingAngle: data.rearWingAngle,
    rearWingEndPlates: data.rearWingEndPlates,
    diffuserType: data.diffuserType,
    frontCanards: data.frontCanards,
    canardNumber: data.canardNumber
  } : null;

  // Prepare issue data object
  const issueData = {
    entryUndersteer: data.entryUndersteer,
    entryOversteer: data.entryOversteer,
    exitUndersteer: data.exitUndersteer,
    exitOversteer: data.exitOversteer,
    midCornerUndersteer: data.midCornerUndersteer,
    wanderingHighSpeed: data.wanderingHighSpeed,
    wontTurnIn: data.wontTurnIn,
    snapOversteer: data.snapOversteer,
    poorBraking: data.poorBraking,
    instability: data.instability,
    tireWear: data.tireWear
  };

  const trackData = {
    type: data.trackType || 'road-course',
    temperature: data.temperature,
    weather: data.weather,
    surface: data.trackSurface
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Free Analysis Results</h2>
        <p className="text-gray-400">Basic recommendations for your setup</p>
        <Badge className="mt-2 bg-green-600">Free Analysis</Badge>
      </div>

      {/* Show comprehensive diagnostics including aero */}
      {(hasIssueData || hasAeroData) && (
        <RaceCarDiagnostics 
          setupData={data}
          issueData={issueData}
          aeroData={aeroData}
          trackData={trackData}
        />
      )}

      {/* Basic suspension recommendations */}
      <Card className="bg-gray-800/50 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Basic Setup Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="bg-blue-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">Suspension Basics</h4>
              <p className="text-gray-300 text-sm">
                Start with manufacturer recommended settings and adjust based on track feedback.
                Focus on one change at a time to understand the impact.
              </p>
            </div>
            
            {hasAeroData && (
              <div className="bg-purple-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-400 mb-2">Aero Balance</h4>
                <p className="text-gray-300 text-sm">
                  Your {data.aeroConfiguration} setup affects handling balance. 
                  Aero changes work together with suspension - adjust gradually.
                </p>
              </div>
            )}
            
            <div className="bg-green-900/30 p-4 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">Track Conditions</h4>
              <p className="text-gray-300 text-sm">
                {data.weather && data.trackSurface ? 
                  `${data.weather} weather on ${data.trackSurface} track affects grip levels. Adjust tire pressures accordingly.` :
                  'Track conditions significantly impact setup requirements. Monitor tire temps and pressures.'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade prompt */}
      <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30">
        <CardContent className="pt-6">
          <div className="text-center">
            <Lock className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Want More Detailed Analysis?</h3>
            <p className="text-gray-400 mb-4">
              Get specific click adjustments, advanced aero recommendations, and comprehensive setup sheets.
            </p>
            <Button 
              onClick={() => window.location.href = '/license'}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              Upgrade to Premium
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-green-500/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Free Analysis Complete</h3>
            <p className="text-gray-400 mb-4">
              Basic recommendations provided. Test these changes gradually and monitor results.
            </p>
            <p className="text-green-400 text-sm">
              Remember: Small adjustments often yield the best results!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeAnalysisResults;