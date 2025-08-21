import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Gift } from 'lucide-react';
import { useLicense } from '@/contexts/LicenseContext';

interface FreeTrialBlockProps {
  title: string;
  description: string;
  onUpgrade: () => void;
}

const FreeTrialBlock: React.FC<FreeTrialBlockProps> = ({ 
  title, 
  description, 
  onUpgrade 
}) => {
  const { freeTrialUsed } = useLicense();
  
  return (
    <Card className="bg-slate-700 border-slate-600 text-center py-16">
      <CardContent className="space-y-6">
        <div className="mx-auto w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center">
          {freeTrialUsed ? (
            <Lock className="h-10 w-10 text-white" />
          ) : (
            <Gift className="h-10 w-10 text-white" />
          )}
        </div>
        
        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>
        
        <p className="text-slate-300 text-lg max-w-md mx-auto">
          {freeTrialUsed 
            ? "You've used your free analysis. Upgrade to continue using the app."
            : description
          }
        </p>
        
        <Button 
          onClick={onUpgrade}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg"
        >
          {freeTrialUsed ? "Upgrade to Premium" : "Get Premium Access"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FreeTrialBlock;