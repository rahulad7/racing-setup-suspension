import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FreeLicenseExpiredProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FreeLicenseExpired({ isOpen, onClose }: FreeLicenseExpiredProps) {
  const navigate = useNavigate();

  const handleGetLicense = () => {
    onClose();
    navigate('/license');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-center text-white">
            Free Trial Used
          </DialogTitle>
        </DialogHeader>
        
        <Card className="border-0 bg-transparent">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <CardDescription className="text-center text-gray-300">
              You've already used your free analysis. To continue using our service, you'll need to purchase a license.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-gray-400">
              Choose from our flexible pricing options to get more analyses and unlock premium features.
            </div>
            <Button 
              onClick={handleGetLicense}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Get License
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}