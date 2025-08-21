import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLicense } from '@/contexts/LicenseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AccountCreationModal from './AccountCreationModal';

interface FreeAnalysisButtonProps {
  onAnalysisComplete?: () => void;
}

const FreeAnalysisButton: React.FC<FreeAnalysisButtonProps> = ({ onAnalysisComplete }) => {
  const { canUseFreeAdvice, useFreeAdvice } = useLicense();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleFreeAnalysis = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (canUseFreeAdvice()) {
      await useFreeAdvice();
      toast({
        title: 'Free Analysis Activated!',
        description: 'Your free trial has been saved to your account.',
      });
      onAnalysisComplete?.();
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setTimeout(() => handleFreeAnalysis(), 500);
  };

  if (!canUseFreeAdvice()) {
    return null;
  }

  return (
    <>
      <Button 
        onClick={handleFreeAnalysis}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        Get Free Analysis
      </Button>
      
      <AccountCreationModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        planType="free-trial"
        amount="Free"
      />
    </>
  );
};

export default FreeAnalysisButton;