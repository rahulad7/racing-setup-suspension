import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, User, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SignupSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export function SignupSuccessModal({ isOpen, onClose, userEmail }: SignupSuccessModalProps) {
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    onClose();
    navigate('/choose-plan');
  };

  const handleStartAnalysis = () => {
    onClose();
    navigate('/app');
  };
  const handleStartFree = () => {
    onClose();
    navigate('/');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Account Created Successfully!</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{userEmail}</span>
            </div>
            <p className="text-sm text-gray-600">
              Your account has been created and you're now signed in!
            </p>
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-semibold text-gray-900">What's next?</h3>
            
            <div className="space-y-3">
              <Button 
                onClick={handleChoosePlan}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Choose Your Plan
              </Button>
              
              <Button 
                onClick={handleStartAnalysis}
                variant="outline"
                className="w-full"
              >
                Start Analysis Tool
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              You can always upgrade your plan later
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}