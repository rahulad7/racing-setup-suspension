import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

interface PlanRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanRequiredModal: React.FC<PlanRequiredModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    onClose();
    navigate('/choose-plan');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-white">
            Analysis Requires a Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center space-y-4">
            <p className="text-slate-300">
              To access Race Setup Pro Analysis, you need to sign up for a plan.
            </p>
            <p className="text-sm text-slate-400">
              Choose from our flexible plans to get detailed setup analysis and recommendations.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleChoosePlan}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Choose Your Plan
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="border-slate-600 text-slate-100 hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanRequiredModal;