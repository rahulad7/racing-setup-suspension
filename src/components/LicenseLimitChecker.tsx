import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LimitCheckResult {
  allowed: boolean;
  reason?: string;
  currentUsage?: {
    vehicles: number;
    analyses: number;
    setups: number;
  };
  limits?: {
    vehicles: number;
    analyses: number | null;
    setups: number | null;
  };
}

export const LicenseLimitChecker: React.FC = () => {
  const { user } = useAuth();
  const [result, setResult] = useState<LimitCheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const checkLimit = async (action: string) => {
    if (!user) {
      setResult({ allowed: false, reason: 'Not logged in' });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-license-limits', {
        body: { userId: user.id, action }
      });

      if (error) throw error;
      setResult(data);
    } catch (error) {
      console.error('Error checking limits:', error);
      setResult({ allowed: false, reason: 'Error checking limits' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Limit Checker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={() => checkLimit('create_vehicle')}
            disabled={loading}
            size="sm"
          >
            Check Vehicle Limit
          </Button>
          <Button 
            onClick={() => checkLimit('run_analysis')}
            disabled={loading}
            size="sm"
          >
            Check Analysis Limit
          </Button>
          <Button 
            onClick={() => checkLimit('save_setup')}
            disabled={loading}
            size="sm"
          >
            Check Setup Limit
          </Button>
        </div>

        {result && (
          <Alert className={result.allowed ? "border-green-500" : "border-red-500"}>
            <AlertDescription>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant={result.allowed ? "default" : "destructive"}>
                    {result.allowed ? "ALLOWED" : "BLOCKED"}
                  </Badge>
                  {result.reason && <span>{result.reason}</span>}
                </div>
                
                {result.currentUsage && result.limits && (
                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    <div>
                      <strong>Vehicles:</strong> {result.currentUsage.vehicles}/{result.limits.vehicles}
                    </div>
                    <div>
                      <strong>Analyses:</strong> {result.currentUsage.analyses}/{result.limits.analyses || '∞'}
                    </div>
                    <div>
                      <strong>Setups:</strong> {result.currentUsage.setups}/{result.limits.setups || '∞'}
                    </div>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};