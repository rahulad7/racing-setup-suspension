import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, TrendingUp, Wrench, Target } from 'lucide-react';
import ShockRecommendationChart from './ShockRecommendationChart';
import EnhancedShockCalculator from './EnhancedShockCalculator';
import { TrackTypeSelector } from './TrackTypeSelector';
import AeroIssueAnalyzer from './AeroIssueAnalyzer';
import EnhancedAeroFeedback from './EnhancedAeroFeedback';

interface AnalysisData {
  trackType: string;
  carType: string;
  issue: string;
  currentSetup: string;
  conditions: string;
  tireType?: string;
  trackConditions?: string;
  aeroData?: any;
  issueData?: any;
}

interface ModernDiagnosticResultsProps {
  data: AnalysisData;
}

const ModernDiagnosticResults: React.FC<ModernDiagnosticResultsProps> = ({ data }) => {
  const [selectedTrackType, setSelectedTrackType] = React.useState(data.trackType || 'road-course');
  
  const recommendations = [
    {
      category: 'Front Suspension',
      priority: 'High',
      action: 'Stiffen front sway bar',
      reason: 'Will reduce understeer in mid-corner transitions',
      impact: 'Expected 0.5-1.0 second lap time improvement'
    },
    {
      category: 'Rear Suspension', 
      priority: 'Medium',
      action: 'Increase rear compression damping by 3 clicks',
      reason: 'Better rear stability under braking',
      impact: 'Improved confidence in heavy braking zones'
    },
    {
      category: 'Tire Pressure',
      priority: 'High', 
      action: 'Front: 32 PSI cold, Rear: 30 PSI cold',
      reason: 'Optimize contact patch for current compound',
      impact: 'Better grip and tire wear consistency'
    }
  ];

  const metrics = {
    overallScore: 78,
    handlingBalance: 65,
    brakeStability: 85,
    cornerEntry: 70,
    cornerExit: 82
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Analysis Report</h2>
        <p className="text-gray-400">Professional suspension analysis for your {data.carType}</p>
      </div>

      {/* Aero-specific feedback components */}
      {data.aeroData && data.issueData && (
        <div className="space-y-6">
          <AeroIssueAnalyzer 
            aeroData={data.aeroData}
            issueData={data.issueData}
            trackData={{ type: selectedTrackType }}
          />
          <EnhancedAeroFeedback 
            aeroData={data.aeroData}
            issueData={data.issueData}
            trackData={{ type: selectedTrackType }}
          />
        </div>
      )}

      <ShockRecommendationChart className="mb-6" />

      <div className="mb-6">
        <TrackTypeSelector value={selectedTrackType} onChange={setSelectedTrackType} />
      </div>

      <EnhancedShockCalculator 
        issue={data.issue} 
        trackType={selectedTrackType}
        tireType={data.tireType || 'street'}
        trackConditions={data.trackConditions || 'dry'}
      />

      <Card className="bg-gray-800/50 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Overall Score</span>
                  <span className="text-white font-medium">{metrics.overallScore}/100</span>
                </div>
                <Progress value={metrics.overallScore} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Handling Balance</span>
                  <span className="text-white font-medium">{metrics.handlingBalance}/100</span>
                </div>
                <Progress value={metrics.handlingBalance} className="h-2" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Corner Entry</span>
                  <span className="text-white font-medium">{metrics.cornerEntry}/100</span>
                </div>
                <Progress value={metrics.cornerEntry} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Corner Exit</span>
                  <span className="text-white font-medium">{metrics.cornerExit}/100</span>
                </div>
                <Progress value={metrics.cornerExit} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-green-500/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Analysis Complete</h3>
            <p className="text-gray-400 mb-4">
              Detailed analysis complete for your {selectedTrackType} setup.
            </p>
            <p className="text-green-400 text-sm">
              Professional recommendations with specific click adjustments!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernDiagnosticResults;