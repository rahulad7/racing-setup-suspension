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
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 w-full">
        <div className="w-full px-4 py-4">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <Logo />
            </div>
            
            <div className="flex items-center justify-center space-x-6 flex-1">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => navigate('/')}
              >
                Home
              </Button>
              
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => navigate('/sample-demo')}
              >
                Sample
              </Button>
              
              <Button 
                className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-semibold shadow-lg hover:shadow-modern transition-all duration-200"
                onClick={handleLaunchAnalysis}
              >
                Launch Online Analysis Tool
              </Button>
              
              <Button 
                variant="outline"
                className="border-gray-600 bg-transparent text-white hover:bg-gray-800/50 hover:border-gray-500 font-medium transition-all duration-200"
                onClick={handleChoosePlan}
              >
                Choose Your Plan
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
                onClick={() => setShowContactModal(true)}
              >
                Contact Us
              </Button>
              
              <Button 
                variant="outline"
                className="border-gray-600 bg-transparent text-white hover:bg-gray-800/50 hover:border-gray-500 font-medium transition-all duration-200"
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
                className="text-gray-300 hover:text-yellow-400 transition-colors p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800 w-full">
              <div className="flex flex-col space-y-3 pt-4 w-full">
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors justify-start w-full"
                  onClick={() => handleNavigation('/')}
                >
                  Home
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-yellow-400 transition-colors justify-start w-full"
                  onClick={() => handleNavigation('/sample-demo')}
                >
                  Sample
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-semibold justify-start w-full"
                  onClick={handleLaunchAnalysis}
                >
                  Launch Online Analysis Tool
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-gray-600 bg-transparent text-white hover:bg-gray-800/50 hover:border-gray-500 font-medium justify-start w-full"
                  onClick={handleChoosePlan}
                >
                  Choose Your Plan
                </Button>
                
                <Button 
                  variant="ghost"
                  className="text-gray-300 hover:text-yellow-400 transition-colors justify-start w-full"
                  onClick={() => setShowContactModal(true)}
                >
                  Contact Us
                </Button>
                
                <Button 
                  variant="outline"
                  className="border-gray-600 bg-transparent text-white hover:bg-gray-800/50 hover:border-gray-500 font-medium justify-start w-full"
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
        <DialogContent className="sm:max-w-md bg-black border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Contact Us</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <p className="text-center text-gray-300">
              Feel free to reach out to us at{' '}
              <a 
                href="mailto:support@racesetuppro.com" 
                className="text-yellow-400 hover:text-yellow-300 font-semibold"
              >
                support@racesetuppro.com
              </a>
              {' '}and we will respond as fast as you go around the track!
            </p>
            <Button 
              onClick={() => window.open('mailto:support@racesetuppro.com', '_blank')}
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-black font-semibold"
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