import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface HandlingRecommendationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const HandlingRecommendationsModal: React.FC<HandlingRecommendationsModalProps> = ({
  isOpen,
  onClose,
  onAccept
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-500">
            <AlertTriangle className="h-5 w-5" />
            Important Disclaimer
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            The handling recommendations provided are suggestions based on your inputs and common setup practices. 
          </p>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong className="text-yellow-400">You are solely responsible</strong> for all vehicle modifications and setup changes. Always:
          </p>
          
          <ul className="text-gray-300 text-sm space-y-1 ml-4">
            <li>• Test changes gradually and safely</li>
            <li>• Consult with professional mechanics</li>
            <li>• Ensure modifications comply with regulations</li>
            <li>• Understand the risks involved</li>
          </ul>
          
          <p className="text-red-400 text-xs font-medium">
            By proceeding, you acknowledge full responsibility for any modifications made to your vehicle.
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="text-gray-900 border-gray-300 hover:bg-gray-100">
            Cancel
          </Button>
          <Button onClick={onAccept} className="bg-blue-600 hover:bg-blue-700">
            I Understand & Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HandlingRecommendationsModal;