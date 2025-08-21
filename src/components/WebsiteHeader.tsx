import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const WebsiteHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTrackCosts = () => {
    const element = document.getElementById('track-costs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateToSample = () => {
    navigate('/sample-demo');
    setIsMenuOpen(false);
  };

  const navigateToApp = () => {
    navigate('/saved-setups');
    setIsMenuOpen(false);
  };

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-blue-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left spacer */}
          <div className="flex-1"></div>
          
          {/* Centered navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-6 flex-1">
            <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors">
              Features
            </button>
            <button onClick={scrollToTrackCosts} className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </button>
            <button onClick={navigateToSample} className="text-gray-300 hover:text-white transition-colors">
              Sample
            </button>
            <Button 
              onClick={navigateToApp}
              className="bg-red-600 hover:bg-red-700"
            >
              Launch Online Analysis Tool
            </Button>
          </nav>
          
          {/* Right-aligned signup button */}
          <div className="flex items-center flex-1 justify-end">
            <Button 
              variant="outline"
              className="text-black bg-white border-gray-300 hover:bg-gray-100 hover:text-black font-medium"
              onClick={handleAuthClick}
            >
              {user ? 'Sign Out' : 'Sign In'}
            </Button>
          </div>
          
          <button 
            className="md:hidden text-white ml-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col space-y-3 items-center">
              <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors">
                Features
              </button>
              <button onClick={scrollToTrackCosts} className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </button>
              <button onClick={navigateToSample} className="text-gray-300 hover:text-white transition-colors">
                Sample
              </button>
              <Button 
                onClick={navigateToApp}
                className="bg-red-600 hover:bg-red-700 w-fit mt-2"
              >
                Launch Online Analysis Tool
              </Button>
              <Button 
                variant="outline"
                className="text-black bg-white border-gray-300 hover:bg-gray-100 hover:text-black font-medium w-fit mt-2"
                onClick={handleAuthClick}
              >
                {user ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default WebsiteHeader;