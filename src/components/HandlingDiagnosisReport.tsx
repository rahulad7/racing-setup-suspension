import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, TrendingUp, Wrench } from 'lucide-react';

interface HandlingDiagnosisReportProps {
  selectedIssue: string;
  selectedSubOptions: string[];
  onShowRecommendations: () => void;
}

const HandlingDiagnosisReport: React.FC<HandlingDiagnosisReportProps> = ({
  selectedIssue,
  selectedSubOptions,
  onShowRecommendations
}) => {
  // Generate metrics based on selected issues
  const generateMetrics = () => {
    const baseScore = 85;
    const reduction = selectedSubOptions.length * 5;
    return {
      overallScore: Math.max(baseScore - reduction, 40),
      handlingBalance: Math.max(75 - reduction, 35),
      brakeStability: Math.max(80 - (reduction * 0.8), 45),
      cornerEntry: Math.max(70 - reduction, 30),
      cornerExit: Math.max(78 - (reduction * 0.6), 40)
    };
  };

  const metrics = generateMetrics();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Handling Diagnosis Report</h2>
        <p className="text-gray-400">Analysis based on your reported issues</p>
      </div>

      <Card className="bg-gray-800/50 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white">Reported Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="text-white font-medium mb-2">Primary Issue:</h4>
              <Badge className="bg-red-600 text-white">{selectedIssue}</Badge>
            </div>
            <div>
              <h4 className="text-white font-medium mb-2">Specific Symptoms:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSubOptions.map((option, index) => (
                  <Badge key={index} variant="secondary" className="bg-yellow-600">
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Performance Impact Analysis
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
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Brake Stability</span>
                  <span className="text-white font-medium">{metrics.brakeStability}/100</span>
                </div>
                <Progress value={metrics.brakeStability} className="h-2" />
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
            <h3 className="text-xl font-semibold text-white mb-2">Diagnosis Complete</h3>
            <p className="text-gray-400 mb-6">
              Your handling issues have been analyzed. Click below to see specific recommendations.
            </p>
            <Button 
              onClick={onShowRecommendations}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              See Handling Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HandlingDiagnosisReport;