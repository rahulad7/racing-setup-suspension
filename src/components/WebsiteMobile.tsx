import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

const WebsiteMobile: React.FC = () => {
  return (
    <section id="mobile" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Mobile App
            <span className="text-red-500 block">Coming Soon</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            We're developing native iOS and Android apps to give you the ultimate mobile experience. 
            Track your setup changes right from the paddock.
          </p>
          
          <Card className="bg-gray-800/50 border-gray-700 p-8 max-w-2xl mx-auto">
            <CardContent className="text-center">
              <Smartphone className="h-32 w-32 text-blue-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Native Mobile Apps</h3>
              <p className="text-gray-400 mb-6">
                Currently in development for the best performance on both platforms.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="bg-gray-700 rounded-lg px-4 py-2">
                  <span className="text-white font-medium">iOS</span>
                </div>
                <div className="bg-gray-700 rounded-lg px-4 py-2">
                  <span className="text-white font-medium">Android</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WebsiteMobile;