import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SaveSetupLicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SaveSetupLicenseModal: React.FC<SaveSetupLicenseModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate('/choose-plan');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lock className="h-5 w-5 text-orange-500" />
            Upgrade Required to Save Setups
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-center">
            <div className="bg-orange-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700">
                Setup saving is a premium feature. Upgrade your plan to save and manage unlimited vehicle setups.
              </p>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Save unlimited setups</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Access setup history</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Manage multiple vehicles</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpgrade}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveSetupLicenseModal;