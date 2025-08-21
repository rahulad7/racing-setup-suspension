import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export function EmailVerificationModal({ isOpen, onClose, userEmail }: EmailVerificationModalProps) {
  const { toast } = useToast();
  const [isResending, setIsResending] = React.useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: userEmail,
      });

      if (error) throw error;

      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || 'Failed to resend verification email',
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">Verify Your Email</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-center">
            <p className="text-gray-700 mb-2">
              We've sent a verification link to:
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="font-medium text-gray-900">{userEmail}</span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600 text-center">
              Click the verification link in your email to activate your account and access the analysis tool.
            </p>
            
            <div className="border-t pt-4">
              <Button 
                onClick={handleResendEmail}
                disabled={isResending}
                variant="outline"
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              Didn't receive the email? Check your spam folder or click resend.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}