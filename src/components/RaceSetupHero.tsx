import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Car, Zap, Target, TrendingUp } from 'lucide-react';

const RaceSetupHero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-black overflow-hidden w-full">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-green-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 py-8 md:py-20">
        {/* Main hero content */}
        <div className="text-center w-full max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 md:mb-12 flex justify-center">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/6878478b83c3f8bb4fdcd0d1_1753210534580_31753e04.png"
              alt="Setup Pro Logo"
              className="h-20 md:h-32 object-contain"
            />
          </div>

          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-4">
            Start Cutting Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              Lap Times
            </span>
          </h1>

          {/* Pricing subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-yellow-400 font-semibold mb-3 md:mb-4 px-4">
            For as Little as $14.95
          </p>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            From first timers to experienced racers -<br className="hidden sm:block" />
            we have the right plan for you
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-modern hover:shadow-modern-lg transition-all duration-200 w-full sm:w-auto"
              onClick={() => navigate('/data-entry?tab=vehicles')}
            >
              <Car className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Launch Online Analysis Tool
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-gray-600 bg-transparent text-white hover:bg-gray-800/50 hover:border-gray-500 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium transition-all duration-200 w-full sm:w-auto"
              onClick={() => navigate('/sample-demo')}
            >
              <Target className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              View Sample Analysis
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto px-4 w-full">
            <div className="bg-black/80 border border-gray-800 rounded-xl p-4 md:p-6 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-200 w-full backdrop-blur-sm">
              <div className="bg-yellow-400/10 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <Car className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">For Racers, by Racers</h3>
              <p className="text-sm md:text-base text-gray-400">Developed by racers with real world experience for authentic racing insights</p>
            </div>

            <div className="bg-black/80 border border-gray-800 rounded-xl p-4 md:p-6 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-200 w-full backdrop-blur-sm">
              <div className="bg-green-400/10 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-green-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">Vehicle Specific Results</h3>
              <p className="text-sm md:text-base text-gray-400">More than 25 data points, specific to your car</p>
            </div>

            <div className="bg-black/80 border border-gray-800 rounded-xl p-4 md:p-6 hover:bg-gray-900/50 hover:border-gray-700 transition-all duration-200 sm:col-span-2 lg:col-span-1 w-full backdrop-blur-sm">
              <div className="bg-blue-400/10 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">Performance Tracking</h3>
              <p className="text-sm md:text-base text-gray-400">Track improvements and maintain setup history across sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceSetupHero;