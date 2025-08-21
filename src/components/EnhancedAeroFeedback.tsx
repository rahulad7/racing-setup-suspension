import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Wind, Target, Zap, TrendingUp } from 'lucide-react';

interface EnhancedAeroFeedbackProps {
  aeroData: any;
  issueData: any;
  trackData?: any;
}

const EnhancedAeroFeedback: React.FC<EnhancedAeroFeedbackProps> = ({ 
  aeroData, 
  issueData, 
  trackData = {} 
}) => {
  const generateDetailedFeedback = () => {
    const feedback = [];
    const { 
      aeroConfiguration,
      frontSplitterHeight,
      rearWingAngle,
      rearWingEndPlates,
      diffuserType,
      frontCanards,
      canardNumber
    } = aeroData;
    
    // Comprehensive aero balance analysis
    if (issueData.entryUndersteer && issueData.exitOversteer) {
      feedback.push({
        type: 'balance',
        title: 'Aero Balance Mismatch Detected',
        analysis: 'Entry understeer + exit oversteer indicates front-biased aero balance',
        currentSetup: `Splitter: ${frontSplitterHeight}", Wing: ${rearWingAngle}°`,
        recommendation: 'Increase rear wing angle by 3-5° OR raise front splitter 0.5"',
        expectedResult: 'Better entry turn-in with improved exit stability',
        priority: 'high'
      });
    }
    
    // Track-specific aero advice
    if (trackData.type === 'road-course' && issueData.wanderingHighSpeed) {
      const currentDownforce = calculateDownforceLevel(aeroData);
      feedback.push({
        type: 'track-specific',
        title: 'Road Course High-Speed Stability',
        analysis: `Current downforce level: ${currentDownforce}. High-speed sections require rear stability`,
        currentSetup: `Wing angle: ${rearWingAngle}°, End plates: ${rearWingEndPlates}`,
        recommendation: rearWingAngle < 12 ? 'Increase wing to 12-15° with medium end plates' : 'Consider larger end plates',
        expectedResult: 'Improved straight-line stability with manageable drag penalty',
        priority: 'high'
      });
    }
    
    // Canard optimization
    if (frontCanards && canardNumber && issueData.wontTurnIn) {
      feedback.push({
        type: 'optimization',
        title: 'Front Canard Effectiveness',
        analysis: `${canardNumber} canards installed but still experiencing turn-in issues`,
        currentSetup: `Canards: ${canardNumber}, Splitter: ${frontSplitterHeight}"`,
        recommendation: canardNumber < 4 ? 'Add 2 more canards for increased front downforce' : 'Lower splitter to 2" for maximum effect',
        expectedResult: 'Sharper turn-in response and reduced entry understeer',
        priority: 'medium'
      });
    }
    
    // Diffuser integration analysis
    if (diffuserType && issueData.exitOversteer) {
      feedback.push({
        type: 'integration',
        title: 'Rear Aero Package Integration',
        analysis: `${diffuserType} diffuser with ${rearWingAngle}° wing causing exit instability`,
        currentSetup: `Diffuser: ${diffuserType}, Wing: ${rearWingAngle}°, End plates: ${rearWingEndPlates}`,
        recommendation: 'Increase wing angle 2-3° to balance diffuser downforce',
        expectedResult: 'More predictable exit behavior with maintained downforce',
        priority: 'medium'
      });
    }
    
    // Tire wear correlation
    if (issueData.tireWear) {
      const aeroBalance = calculateAeroBalance(aeroData);
      feedback.push({
        type: 'wear-analysis',
        title: 'Aero-Related Tire Wear',
        analysis: `Current aero balance: ${aeroBalance}% front. Uneven wear suggests imbalance`,
        currentSetup: getAeroSetupSummary(aeroData),
        recommendation: aeroBalance > 55 ? 'Reduce front downforce or increase rear' : 'Increase front downforce or reduce rear',
        expectedResult: 'More even tire wear and improved overall balance',
        priority: 'medium'
      });
    }
    
    return feedback;
  };
  
  const calculateDownforceLevel = (aero: any) => {
    // Simplified downforce calculation
    let level = 0;
    if (aero.frontSplitterHeight) level += (4 - parseFloat(aero.frontSplitterHeight)) * 10;
    if (aero.rearWingAngle) level += parseFloat(aero.rearWingAngle) * 2;
    if (aero.canardNumber) level += parseInt(aero.canardNumber) * 5;
    
    if (level < 30) return 'Low';
    if (level < 60) return 'Medium';
    return 'High';
  };
  
  const calculateAeroBalance = (aero: any) => {
    // Simplified front/rear balance calculation
    let frontForce = 0;
    let rearForce = 0;
    
    if (aero.frontSplitterHeight) frontForce += (4 - parseFloat(aero.frontSplitterHeight)) * 10;
    if (aero.canardNumber) frontForce += parseInt(aero.canardNumber) * 5;
    if (aero.rearWingAngle) rearForce += parseFloat(aero.rearWingAngle) * 2;
    
    const total = frontForce + rearForce;
    return total > 0 ? Math.round((frontForce / total) * 100) : 50;
  };
  
  const getAeroSetupSummary = (aero: any) => {
    const parts = [];
    if (aero.frontSplitterHeight) parts.push(`Splitter: ${aero.frontSplitterHeight}"`);
    if (aero.rearWingAngle) parts.push(`Wing: ${aero.rearWingAngle}°`);
    if (aero.canardNumber) parts.push(`Canards: ${aero.canardNumber}`);
    return parts.join(', ');
  };
  
  const feedback = generateDetailedFeedback();
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'balance': return <Target className="h-4 w-4" />;
      case 'track-specific': return <TrendingUp className="h-4 w-4" />;
      case 'optimization': return <Zap className="h-4 w-4" />;
      default: return <Wind className="h-4 w-4" />;
    }
  };
  
  if (feedback.length === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Detailed Aero Analysis & Setup Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {feedback.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              {getIcon(item.type)}
              <h4 className="font-semibold">{item.title}</h4>
              <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                {item.priority}
              </Badge>
            </div>
            
            <div className="grid gap-3 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <span className="font-medium text-blue-800">Analysis: </span>
                <span className="text-blue-700">{item.analysis}</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded">
                <span className="font-medium text-gray-800">Current Setup: </span>
                <span className="text-gray-700">{item.currentSetup}</span>
              </div>
              
              <div className="bg-green-50 p-3 rounded">
                <span className="font-medium text-green-800">Recommendation: </span>
                <span className="text-green-700">{item.recommendation}</span>
              </div>
              
              <div className="bg-purple-50 p-3 rounded">
                <span className="font-medium text-purple-800">Expected Result: </span>
                <span className="text-purple-700">{item.expectedResult}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EnhancedAeroFeedback;