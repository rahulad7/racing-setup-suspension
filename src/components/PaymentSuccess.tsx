import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLicense } from '@/contexts/LicenseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { purchaseLicense, refreshLicense } = useLicense();
  const { user } = useAuth();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const PayerID = searchParams.get('PayerID');
    
    if (token && PayerID) {
      handlePaymentCapture(token);
    } else {
      // Check if we have stored payment info
      const planType = localStorage.getItem('paypal_plan_type');
      if (planType && user) {
        // Force refresh license from database
        refreshLicense().then(() => {
          setSuccess(true);
          setProcessing(false);
          toast({
            title: 'Payment Successful!',
            description: 'Your license has been activated.',
          });
        }).catch(() => {
          // Fallback to local storage
          purchaseLicense(planType as 'two-days' | 'monthly' | 'annual');
          setSuccess(true);
          setProcessing(false);
        });
      } else {
        setError('Payment information not found');
        setProcessing(false);
      }
    }
  }, [searchParams, purchaseLicense, refreshLicense, user, toast]);

  const handlePaymentCapture = async (orderID: string) => {
    try {
      setProcessing(true);
      const planType = localStorage.getItem('paypal_plan_type') || 'monthly';
      const userId = user?.id || localStorage.getItem('paypal_user_id');
      
      if (!userId) {
        throw new Error('User not found. Please log in and try again.');
      }
      
      console.log('Processing payment for user:', userId, 'plan:', planType);
      
      const { data, error } = await supabase.functions.invoke('process-license-purchase', {
        body: { 
          orderID, 
          licenseType: planType,
          userId 
        },
      });

      if (error) {
        console.error('Payment processing error:', error);
        throw new Error(`Payment processing failed: ${error.message}`);
      }

      if (data?.success) {
        // Update local license state
        purchaseLicense(planType as 'two-days' | 'monthly' | 'annual');
        
        // Force refresh from database
        await new Promise(resolve => setTimeout(resolve, 1000));
        await refreshLicense();
        
        // Clean up localStorage
        localStorage.removeItem('paypal_order_id');
        localStorage.removeItem('paypal_plan_type');
        localStorage.removeItem('paypal_user_id');
        
        setSuccess(true);
        toast({
          title: 'Payment Successful!',
          description: 'Your license has been activated.',
        });
      } else {
        throw new Error(data?.error || 'Payment processing failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Payment processing failed';
      setError(errorMessage);
      toast({
        title: 'Payment Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (processing) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Processing Payment...
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300">
              Please wait while we activate your license.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Payment Error
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-300">{error}</p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/license')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Try Again
              </Button>
              <Button 
                onClick={() => navigate('/app')}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Go to App
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-300">
            Your license has been activated and you can now access all features.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/app')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Using App
            </Button>
            <Button 
              onClick={() => navigate('/license')}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              View License
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;