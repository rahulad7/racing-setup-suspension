import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, TrendingUp, Wrench } from 'lucide-react';

const SampleReport: React.FC = () => {
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
      reason: 'Optimize contact patch for R888R compound',
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
        <h2 className="text-3xl font-bold text-white mb-4">Sample Analysis Report</h2>
        <p className="text-gray-400">Professional suspension analysis for your 1998 BMW M3</p>
      </div>

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

      <Card className="bg-gray-800/50 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-500" />
            Setup Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{rec.category}</h4>
                  <Badge 
                    variant={rec.priority === 'High' ? 'destructive' : 'secondary'}
                    className={rec.priority === 'High' ? 'bg-red-600' : 'bg-yellow-600'}
                  >
                    {rec.priority} Priority
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{rec.action}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-400 text-sm">{rec.reason}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-300 text-sm font-medium">{rec.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/50 border-green-500/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Analysis Complete</h3>
            <p className="text-gray-400 mb-4">
              This sample shows the detailed analysis you'll receive for your vehicle setup.
            </p>
            <p className="text-green-400 text-sm">
              Get your personalized report with a paid license!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SampleReport;