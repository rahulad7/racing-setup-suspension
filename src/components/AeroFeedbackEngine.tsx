import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Wind, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface AeroFeedbackEngineProps {
  aeroData: any;
  vehicleData?: any;
  trackData?: any;
}

const AeroFeedbackEngine: React.FC<AeroFeedbackEngineProps> = ({ 
  aeroData, 
  vehicleData = {}, 
  trackData = {} 
}) => {
  const generateAeroFeedback = () => {
    const feedback = [];
    const { aeroConfiguration, frontSplitterHeight, rearWingAngle } = aeroData;
    
    // Based on video: Aero balance is critical
    if (aeroConfiguration === 'front-splitter') {
      feedback.push({
        type: 'warning',
        title: 'Front-Only Aero Imbalance',
        message: 'Front splitter without rear wing creates understeer at speed. Consider adding rear wing for balance.',
        priority: 'high'
      });
    }
    
    if (aeroConfiguration === 'rear-wing') {
      feedback.push({
        type: 'warning', 
        title: 'Rear-Only Aero Imbalance',
        message: 'Rear wing without front downforce creates oversteer at speed. Add front splitter for balance.',
        priority: 'high'
      });
    }
    
    // Splitter height feedback (video mentions ground clearance)
    if (frontSplitterHeight && parseFloat(frontSplitterHeight) < 2) {
      feedback.push({
        type: 'warning',
        title: 'Splitter Too Low',
        message: 'Splitter below 2" may scrape and lose effectiveness. Consider raising for durability.',
        priority: 'medium'
      });
    }
    
    if (frontSplitterHeight && parseFloat(frontSplitterHeight) > 4) {
      feedback.push({
        type: 'info',
        title: 'High Splitter Position',
        message: 'Higher splitter reduces downforce but improves ground clearance for street driving.',
        priority: 'low'
      });
    }
    
    // Wing angle feedback (video discusses angle optimization)
    if (rearWingAngle && parseFloat(rearWingAngle) > 20) {
      feedback.push({
        type: 'warning',
        title: 'Excessive Wing Angle',
        message: 'Angles above 20° increase drag significantly. Consider reducing for better top speed.',
        priority: 'medium'
      });
    }
    
    if (rearWingAngle && parseFloat(rearWingAngle) < 5) {
      feedback.push({
        type: 'info',
        title: 'Conservative Wing Angle',
        message: 'Low angles reduce drag but limit downforce. Increase for more grip in corners.',
        priority: 'low'
      });
    }
    
    // Full aero setup feedback
    if (aeroConfiguration === 'full-aero') {
      feedback.push({
        type: 'success',
        title: 'Balanced Aero Package',
        message: 'Front and rear aero allows fine-tuning balance. Adjust splitter/wing ratio as needed.',
        priority: 'low'
      });
    }
    
    return feedback;
  };
  
  const feedback = generateAeroFeedback();
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };
  
  const getVariant = (type: string) => {
    switch (type) {
      case 'warning': return 'destructive';
      case 'success': return 'default';
      default: return 'default';
    }
  };
  
  if (feedback.length === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="h-5 w-5" />
          Aero Setup Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {feedback.map((item, index) => (
          <Alert key={index} variant={getVariant(item.type)}>
            <div className="flex items-start gap-2">
              {getIcon(item.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{item.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {item.priority}
                  </Badge>
                </div>
                <AlertDescription>{item.message}</AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default AeroFeedbackEngine;