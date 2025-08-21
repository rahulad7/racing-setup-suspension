import React from 'react';

interface ShockAdjustment {
  component: string;
  location: string;
  direction: 'increase' | 'decrease';
  clicks: number;
  reason: string;
}

interface ShockClickCalculatorProps {
  issue: string;
  trackType: string;
}

const ShockClickCalculator: React.FC<ShockClickCalculatorProps> = ({ issue, trackType }) => {
  const calculateShockAdjustments = (): ShockAdjustment[] => {
    const adjustments: ShockAdjustment[] = [];
    
    // Analyze issue and provide specific click recommendations
    if (issue.toLowerCase().includes('understeer')) {
      adjustments.push({
        component: 'Spring Rate',
        location: 'Front',
        direction: 'decrease',
        clicks: 2,
        reason: 'Reduce front grip to balance handling'
      });
      adjustments.push({
        component: 'Sway Bar',
        location: 'Front',
        direction: 'decrease',
        clicks: 3,
        reason: 'Allow more front roll for better turn-in'
      });
      adjustments.push({
        component: 'Shock Compression',
        location: 'Front',
        direction: 'decrease',
        clicks: 2,
        reason: 'Soften front for better compliance'
      });
    }
    
    if (issue.toLowerCase().includes('oversteer')) {
      adjustments.push({
        component: 'Spring Rate',
        location: 'Rear',
        direction: 'decrease',
        clicks: 2,
        reason: 'Reduce rear stiffness for stability'
      });
      adjustments.push({
        component: 'Sway Bar',
        location: 'Rear',
        direction: 'decrease',
        clicks: 3,
        reason: 'Allow more rear compliance'
      });
      adjustments.push({
        component: 'Shock Rebound',
        location: 'Rear',
        direction: 'increase',
        clicks: 2,
        reason: 'Control rear wheel movement'
      });
    }
    
    if (issue.toLowerCase().includes('brake')) {
      adjustments.push({
        component: 'Shock Compression',
        location: 'Front',
        direction: 'increase',
        clicks: 3,
        reason: 'Improve brake stability and control dive'
      });
    }
    
    return adjustments;
  };

  const adjustments = calculateShockAdjustments();
  
  return (
    <div className="space-y-3">
      {adjustments.map((adj, index) => (
        <div key={index} className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">
              {adj.component} - {adj.location}
            </span>
            <span className={`font-bold text-lg ${
              adj.direction === 'increase' ? 'text-green-400' : 'text-red-400'
            }`}>
              {adj.direction === 'increase' ? '+' : '-'}{adj.clicks} clicks
            </span>
          </div>
          <p className="text-gray-400 text-sm">{adj.reason}</p>
        </div>
      ))}
    </div>
  );
};

export default ShockClickCalculator;