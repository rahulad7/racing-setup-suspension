import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TireTypeSelector } from './TireTypeSelector';
import { TrackConditionsSelector } from './TrackConditionsSelector';

interface ShockAdjustment {
  component: string;
  location: string;
  direction: 'increase' | 'decrease';
  clicks: number;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

interface EnhancedShockCalculatorProps {
  issue: string;
  trackType: string;
  tireType: string;
  trackConditions: string;
}

const EnhancedShockCalculator: React.FC<EnhancedShockCalculatorProps> = ({ 
  issue, 
  trackType, 
  tireType, 
  trackConditions 
}) => {
  const [selectedTireType, setSelectedTireType] = React.useState(tireType);
  const [selectedConditions, setSelectedConditions] = React.useState(trackConditions);
  
  const calculateDetailedAdjustments = (): ShockAdjustment[] => {
    const adjustments: ShockAdjustment[] = [];
    
    // Base adjustments for issues
    if (issue.toLowerCase().includes('understeer')) {
      adjustments.push({
        component: 'Front Spring Rate',
        location: 'Front',
        direction: 'decrease',
        clicks: getTrackAdjustment(2, trackType, 'spring'),
        reason: 'Reduce front grip to balance handling',
        priority: 'high'
      });
      
      adjustments.push({
        component: 'Front Sway Bar',
        location: 'Front', 
        direction: 'decrease',
        clicks: getTrackAdjustment(3, trackType, 'sway'),
        reason: 'Allow more front roll for better turn-in',
        priority: 'high'
      });
    }
    
    if (issue.toLowerCase().includes('oversteer')) {
      adjustments.push({
        component: 'Rear Spring Rate',
        location: 'Rear',
        direction: 'decrease', 
        clicks: getTrackAdjustment(2, trackType, 'spring'),
        reason: 'Reduce rear stiffness for stability',
        priority: 'high'
      });
      
      adjustments.push({
        component: 'Rear Sway Bar',
        location: 'Rear',
        direction: 'decrease',
        clicks: getTrackAdjustment(2, trackType, 'sway'),
        reason: 'Allow more rear compliance',
        priority: 'high'
      });
    }
    
    // Tire-specific adjustments
    if (selectedTireType === 'slick' || selectedTireType === 'semi-slick') {
      adjustments.push({
        component: 'Shock Compression',
        location: 'All',
        direction: 'increase',
        clicks: selectedTireType === 'slick' ? 2 : 1,
        reason: 'Racing tires need more compression for contact patch',
        priority: 'medium'
      });
    }
    
    if (selectedTireType === 'drag') {
      adjustments.push({
        component: 'Rear Shock Extension',
        location: 'Rear',
        direction: 'decrease',
        clicks: 4,
        reason: 'Softer rear for better launch traction',
        priority: 'high'
      });
    }
    
    // Condition-specific adjustments
    if (selectedConditions === 'wet' || selectedConditions === 'damp') {
      adjustments.push({
        component: 'Shock Rebound',
        location: 'All',
        direction: 'decrease',
        clicks: selectedConditions === 'wet' ? 3 : 2,
        reason: 'Softer rebound for wet conditions and better tire contact',
        priority: 'high'
      });
    }
    
    if (selectedConditions === 'hot') {
      adjustments.push({
        component: 'Shock Compression',
        location: 'All',
        direction: 'increase',
        clicks: 1,
        reason: 'Stiffer setup for hot track conditions',
        priority: 'medium'
      });
    }
    
    if (selectedConditions === 'cold') {
      adjustments.push({
        component: 'All Dampers',
        location: 'All',
        direction: 'decrease',
        clicks: 2,
        reason: 'Softer overall for cold tire warmup',
        priority: 'medium'
      });
    }
    
    return adjustments;
  };
  
  const getTrackAdjustment = (baseClicks: number, track: string, component: string): number => {
    let multiplier = 1;
    
    if (track === 'oval-superspeedway') {
      multiplier = component === 'spring' ? 1.5 : 1.2;
    } else if (track === 'autocross') {
      multiplier = component === 'sway' ? 1.3 : 0.8;
    } else if (track === 'drag-strip') {
      multiplier = component === 'spring' ? 0.7 : 1.0;
    }
    
    return Math.round(baseClicks * multiplier);
  };
  
  const adjustments = calculateDetailedAdjustments();
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TireTypeSelector value={selectedTireType} onChange={setSelectedTireType} />
        <TrackConditionsSelector value={selectedConditions} onChange={setSelectedConditions} />
      </div>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Detailed Shock Adjustments</CardTitle>
          <p className="text-gray-400 text-sm">
            Customized for {selectedTireType} tires in {selectedConditions} conditions
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {adjustments.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              No specific adjustments needed for current setup
            </p>
          ) : (
            adjustments.map((adj, index) => (
              <div key={index} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{adj.component}</span>
                    <Badge variant={adj.priority === 'high' ? 'destructive' : 'secondary'}>
                      {adj.priority}
                    </Badge>
                  </div>
                  <span className={`font-bold text-lg ${
                    adj.direction === 'increase' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {adj.direction === 'increase' ? '+' : '-'}{adj.clicks} clicks
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{adj.reason}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedShockCalculator;