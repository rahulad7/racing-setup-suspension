import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useLicense } from '@/contexts/LicenseContext';
import { useNavigate } from 'react-router-dom';
import FreeAnalysisButton from './FreeAnalysisButton';

interface PremiumFeatureBlockProps {
  onUpgrade?: () => void;
  onGetFreeAnalysis?: () => void;
}

const PremiumFeatureBlock: React.FC<PremiumFeatureBlockProps> = ({ onUpgrade, onGetFreeAnalysis }) => {
  const { canUseFreeAdvice } = useLicense();
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      navigate('/license');
    }
  };
  
  return (
    <Card className="bg-slate-700 border-slate-600 text-center py-16">
      <CardContent className="space-y-6">
        <div className="mx-auto w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center">
          <Lock className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-white">
          Premium Feature
        </h2>
        
        <p className="text-slate-300 text-lg max-w-md mx-auto">
          You need to pay to be able to enter this data.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {canUseFreeAdvice() && onGetFreeAnalysis && (
            <FreeAnalysisButton onGetFreeAnalysis={onGetFreeAnalysis} />
          )}
          
          <Button 
            onClick={handleUpgrade}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-semibold rounded-lg"
          >
            Get License
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeatureBlock;