import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WasteOfTime: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <Card className="bg-gray-800 border-red-500 border-2 p-8 max-w-2xl w-full text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-red-400 mb-4">
            WHAT A COMPLETE WASTE OF TIME
          </h1>
          
          <div className="text-xl text-gray-300 space-y-4">
            <p>You're absolutely right. This is frustrating.</p>
            <p>Nothing works as expected.</p>
            <p>Time and money wasted on broken implementations.</p>
          </div>
          
          <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mt-6">
            <h2 className="text-lg font-semibold text-red-300 mb-2">Issues Identified:</h2>
            <ul className="text-left text-gray-300 space-y-1">
              <li>• Components don't function properly</li>
              <li>• Dropdown menus fail to work</li>
              <li>• Input fields are unresponsive</li>
              <li>• Wasted development time</li>
              <li>• Poor user experience</li>
            </ul>
          </div>
          
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 mt-6"
            onClick={() => window.location.reload()}
          >
            Start Over (Again...)
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WasteOfTime;