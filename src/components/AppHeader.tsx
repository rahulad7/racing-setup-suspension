import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import UserStatusDisplay from './UserStatusDisplay';

interface AppHeaderProps {
  onShowLicenseModal: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onShowLicenseModal }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [showContactModal, setShowContactModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLaunchAnalysis = () => {
    navigate('/data-entry?tab=vehicles');
    setIsMobileMenuOpen(false);
  };

  const handleAuthClick = async () => {
    if (user) {
      try {
        await signOut();
        toast({
          title: "Signed out successfully",
          description: "You have been signed out of your account.",
        });
      } catch (error) {
        toast({
          title: "Sign out failed",
          description: "There was a problem signing you out. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const handleChoosePlan = () => {
    navigate('/choose-plan');
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50 w-full">
        <div className="w-full px-4 py-4">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <Logo />
            </div>
            
            <div className="flex items-center justify-center space-x-4 flex-1">
              <Button 
                variant="ghost" 
                className="text-white hover:text-blue-400"
                onClick={() => navigate('/')}
              >
                Home
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-white hover:text-blue-400"
                onClick={() => navigate('/sample-demo')}
              >
                Sample
              </Button>
              
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold"
                onClick={handleLaunchAnalysis}
              >
                Launch Online Analysis Tool
              </Button>
              
              <Button 
                variant="outline"
                className="border-blue-600 bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 font-semibold"
                onClick={handleChoosePlan}
              >
                Choose Your Plan
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost"
                className="text-white hover:text-blue-400"
                onClick={() => setShowContactModal(true)}
              >
                Contact Us
              </Button>
              
              <Button 
                variant="outline"
                className="text-black bg-white border-gray-300 hover:bg-gray-100 hover:text-black font-medium"
                onClick={handleAuthClick}
              >
                {user ? 'Sign Out' : 'Sign In'}
              </Button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Logo />
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost"
                className="text-white hover:text-blue-400 p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700 w-full">
              <div className="flex flex-col space-y-3 pt-4 w-full">
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-blue-400 justify-start w-full"
                  onClick={() => handleNavigation('/')}
                >
                  Home
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-blue-400 justify-start w-full"
                  onClick={() => handleNavigation('/sample-demo')}
                >
                  Sample
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold justify-start w-full"
                  onClick={handleLaunchAnalysis}
                >
                  Launch Online Analysis Tool
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-blue-600 bg-white text-blue-700 hover:bg-blue-50 hover:text-black font-semibold justify-start w-full"
                  onClick={handleChoosePlan}
                >
                  Choose Your Plan
                </Button>
                
                <Button 
                  variant="ghost"
                  className="text-white hover:text-blue-400 justify-start w-full"
                  onClick={() => setShowContactModal(true)}
                >
                  Contact Us
                </Button>
                
                <Button 
                  variant="outline"
                  className="text-black bg-white border-gray-300 hover:bg-gray-100 hover:text-black font-medium justify-start w-full"
                  onClick={handleAuthClick}
                >
                  {user ? 'Sign Out' : 'Sign In'}
                </Button>
              </div>
            </div>
          )}
          
          {/* User Status Display */}
          <div className="mt-4 w-full">
            <UserStatusDisplay />
          </div>
        </div>
      </header>

      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <p className="text-center text-gray-700">
              Feel free to reach out to us at{' '}
              <a 
                href="mailto:support@racesetuppro.com" 
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                support@racesetuppro.com
              </a>
              {' '}and we will respond as fast as you go around the track!
            </p>
            <Button 
              onClick={() => window.open('mailto:support@racesetuppro.com', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Send Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppHeader;