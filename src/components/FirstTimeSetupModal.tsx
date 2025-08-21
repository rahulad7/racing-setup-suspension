import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface FirstTimeSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FirstTimeSetupModal: React.FC<FirstTimeSetupModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Setup Information
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed pt-2">
            You can enter as much or as little information as you want, the results of the analysis will be more in depth with the more information you provide.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Got it, let's start!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FirstTimeSetupModal;