import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose, onAccept }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-red-500/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Important Disclaimer
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm text-gray-300">
          <p>
            <strong className="text-red-400">IMPORTANT:</strong> The recommendations provided by this app are for informational purposes only.
          </p>
          
          <p>
            We assume your vehicle is in safe operating condition. You are solely responsible for:
          </p>
          
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Vehicle safety and maintenance</li>
            <li>Proper installation of any modifications</li>
            <li>Testing changes in controlled environments</li>
            <li>Compliance with racing regulations</li>
          </ul>
          
          <p className="text-red-400 font-semibold">
            By using this app, you assume all responsibility and risk. Always consult qualified professionals for safety-critical modifications.
          </p>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-gray-600">
            Cancel
          </Button>
          <Button onClick={onAccept} className="bg-red-600 hover:bg-red-700">
            I Understand & Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};