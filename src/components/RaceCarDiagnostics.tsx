import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface DiagnosticResult {
  problem: string;
  solutions: string[];
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'entry' | 'exit' | 'mid-corner';
  caution?: string;
  important?: string;
}

interface RaceCarDiagnosticsProps {
  setupData: any;
  issueData: any;
  aeroData?: any;
  trackData?: any;
}

const RaceCarDiagnostics: React.FC<RaceCarDiagnosticsProps> = ({ 
  setupData, 
  issueData, 
  aeroData,
  trackData 
}) => {
  const analyzeSetup = (): DiagnosticResult[] => {
    const results: DiagnosticResult[] = [];
    
    // Entry understeer analysis
    if (issueData?.entryUndersteer) {
      results.push({
        problem: 'entry understeer',
        solutions: [
          'soften front springs',
          'soften front compression',
          'lower front ride height'
        ],
        severity: 'high',
        category: 'entry',
        caution: "Don't raise front ride height to deal with entry oversteer.",
        important: 'Run front ride height as low as possible. While there should be no hard contact, it is okay for the car to lightly touch under braking or on bumps.'
      });
    }
    
    // Entry oversteer analysis
    if (issueData?.entryOversteer) {
      results.push({
        problem: 'entry oversteer',
        solutions: [
          'stiffen front springs',
          'stiffen front compression'
        ],
        severity: 'high',
        category: 'entry'
      });
    }
    
    // Exit understeer analysis
    if (issueData?.exitUndersteer) {
      results.push({
        problem: 'exit understeer',
        solutions: [
          'stiffen rear springs',
          'stiffen rear shock compression',
          'raise rear ride height',
          'stiffen rear anti-roll bar'
        ],
        severity: 'high',
        category: 'exit'
      });
    }
    
    // Exit oversteer analysis
    if (issueData?.exitOversteer) {
      results.push({
        problem: 'exit oversteer',
        solutions: [
          'soften rear springs',
          'soften rear shock compression',
          'lower rear ride height',
          'soften rear anti-roll bar'
        ],
        severity: 'high',
        category: 'exit',
        caution: 'If the car works better when you raise the front ride height, the springs are too soft. If the car works better when you go lower, the springs are too stiff.'
      });
    }
    
    // Mid-corner understeer analysis
    if (issueData?.midCornerUndersteer) {
      results.push({
        problem: 'mid-corner understeer',
        solutions: [
          'stiffen front springs',
          'stiffen front sway bar',
          'increase front preload'
        ],
        severity: 'medium',
        category: 'mid-corner',
        important: 'Mid-corner understeer is one of the hardest things for the driver to sense and understand. It requires a completely different fix than entry or exit understeer. In almost all cases, in fact, the fix is the opposite of what you would do for entry or exit understeer.'
      });
    }
    
    return results;
  };
  
  const results = analyzeSetup();
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'entry': return 'bg-red-100 text-red-800';
      case 'exit': return 'bg-green-100 text-green-800';
      case 'mid-corner': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Suspension analysis */}
      <div className="space-y-4">
        {results.map((result, index) => (
          <Card key={index} className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg capitalize">
                  {result.problem}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getCategoryColor(result.category)}>
                    {result.category}
                  </Badge>
                  <Badge className={getSeverityColor(result.severity)}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {result.severity}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Solutions:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {result.solutions.map((solution, idx) => (
                    <li key={idx} className="text-sm">{solution}</li>
                  ))}
                </ul>
              </div>
              
              {result.caution && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-semibold text-yellow-800 mb-1 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Caution:
                  </h4>
                  <p className="text-sm text-yellow-700">{result.caution}</p>
                </div>
              )}
              
              {result.important && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-800 mb-1 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    Important:
                  </h4>
                  <p className="text-sm text-blue-700">{result.important}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RaceCarDiagnostics;