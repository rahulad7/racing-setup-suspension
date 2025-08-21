import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Wind, ArrowUp, ArrowDown, Settings } from 'lucide-react';

interface AeroIssueAnalyzerProps {
  aeroData: any;
  issueData: any;
  trackData?: any;
}

const AeroIssueAnalyzer: React.FC<AeroIssueAnalyzerProps> = ({ 
  aeroData, 
  issueData, 
  trackData = {} 
}) => {
  const generateAeroRecommendations = () => {
    const recommendations = [];
    const { 
      aeroConfiguration,
      frontSplitterHeight,
      rearWingAngle,
      rearWingEndPlates,
      diffuserType
    } = aeroData;
    
    // High-speed stability issues
    if (issueData.wanderingHighSpeed || issueData.instability) {
      if (aeroConfiguration === 'none' || aeroConfiguration === 'front-splitter') {
        recommendations.push({
          type: 'critical',
          title: 'Add Rear Wing for High-Speed Stability',
          issue: 'High-speed wandering/instability',
          solution: 'Install rear wing at 8-12° angle with medium end plates',
          technical: 'Rear downforce creates stability at speed by increasing rear grip and reducing lift'
        });
      } else if (rearWingAngle && parseFloat(rearWingAngle) < 8) {
        recommendations.push({
          type: 'adjust',
          title: 'Increase Rear Wing Angle',
          issue: 'Insufficient rear downforce for stability',
          solution: `Increase wing angle from ${rearWingAngle}° to 10-15°`,
          technical: 'Higher angle increases rear downforce but adds drag - balance for your track'
        });
      }
    }
    
    // Entry understeer issues
    if (issueData.entryUndersteer || issueData.wontTurnIn) {
      if (frontSplitterHeight && parseFloat(frontSplitterHeight) > 3) {
        recommendations.push({
          type: 'adjust',
          title: 'Lower Front Splitter',
          issue: 'Entry understeer - insufficient front downforce',
          solution: `Lower splitter from ${frontSplitterHeight}" to 2-2.5"`,
          technical: 'Lower splitter increases front downforce, improving turn-in response'
        });
      }
      
      if (rearWingAngle && parseFloat(rearWingAngle) > 12) {
        recommendations.push({
          type: 'adjust',
          title: 'Reduce Rear Wing Angle',
          issue: 'Aero balance too rear-biased causing understeer',
          solution: `Reduce wing angle from ${rearWingAngle}° to 8-10°`,
          technical: 'Less rear downforce shifts aero balance forward, reducing understeer'
        });
      }
    }
    
    // Exit oversteer issues
    if (issueData.exitOversteer || issueData.snapOversteer) {
      if (rearWingAngle && parseFloat(rearWingAngle) < 10) {
        recommendations.push({
          type: 'adjust',
          title: 'Increase Rear Wing Angle',
          issue: 'Exit oversteer - insufficient rear downforce',
          solution: `Increase wing angle from ${rearWingAngle}° to 12-15°`,
          technical: 'More rear downforce provides stability under acceleration'
        });
      }
      
      if (rearWingEndPlates === 'small') {
        recommendations.push({
          type: 'adjust',
          title: 'Upgrade to Medium End Plates',
          issue: 'Small end plates limit wing efficiency',
          solution: 'Install medium end plates for better airflow management',
          technical: 'Larger end plates reduce tip vortices, increasing wing efficiency'
        });
      }
    }
    
    // Mid-corner understeer
    if (issueData.midCornerUndersteer) {
      recommendations.push({
        type: 'balance',
        title: 'Optimize Aero Balance',
        issue: 'Mid-corner understeer suggests rear-biased aero',
        solution: 'Reduce rear wing 2-3° OR lower front splitter 0.5"',
        technical: 'Shift aero balance forward to improve mid-corner turn-in'
      });
    }
    
    // Entry oversteer
    if (issueData.entryOversteer) {
      if (frontSplitterHeight && parseFloat(frontSplitterHeight) < 2.5) {
        recommendations.push({
          type: 'adjust',
          title: 'Raise Front Splitter',
          issue: 'Excessive front downforce causing entry oversteer',
          solution: `Raise splitter from ${frontSplitterHeight}" to 3-3.5"`,
          technical: 'Reducing front downforce shifts balance rearward for stability'
        });
      }
    }
    
    return recommendations;
  };
  
  const recommendations = generateAeroRecommendations();
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <ArrowUp className="h-4 w-4 text-red-500" />;
      case 'adjust': return <Settings className="h-4 w-4 text-blue-500" />;
      case 'balance': return <ArrowDown className="h-4 w-4 text-orange-500" />;
      default: return <Wind className="h-4 w-4" />;
    }
  };
  
  if (recommendations.length === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Aero-Specific Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <Alert key={index} className="border-l-4 border-l-blue-500">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {getIcon(rec.type)}
                <h4 className="font-semibold">{rec.title}</h4>
                <Badge variant="outline">{rec.type}</Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-red-600">Issue: </span>
                  {rec.issue}
                </div>
                <div>
                  <span className="font-medium text-green-600">Solution: </span>
                  {rec.solution}
                </div>
                <div className="bg-gray-50 p-2 rounded text-xs">
                  <span className="font-medium">Technical: </span>
                  {rec.technical}
                </div>
              </div>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default AeroIssueAnalyzer;