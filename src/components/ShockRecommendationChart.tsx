import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ShockRecommendationChartProps {
  className?: string;
}

const ShockRecommendationChart: React.FC<ShockRecommendationChartProps> = ({ className }) => {
  return (
    <Card className={`bg-gray-800/50 border-blue-500/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white text-center">
          Suspension Setup Reference Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/6878478b83c3f8bb4fdcd0d1_1753223412028_698ebc7a.png"
            alt="Suspension Setup Reference Chart"
            className="w-full h-auto rounded-lg border border-gray-600"
          />
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="text-green-400 border-green-400">
              + Increase Setting
            </Badge>
            <Badge variant="outline" className="text-red-400 border-red-400">
              - Decrease Setting
            </Badge>
          </div>
          <p className="text-gray-400 text-sm text-center">
            Reference chart for suspension adjustments based on handling characteristics
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShockRecommendationChart;