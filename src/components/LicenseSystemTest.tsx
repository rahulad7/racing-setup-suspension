import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface LicenseData {
  id: string;
  license_type: string;
  status: string;
  expires_at: string;
  analyses_used: number;
  setups_saved: number;
  vehicles_created: number;
}

interface PlanLimits {
  name: string;
  vehicleLimit: number;
  analysisLimit: number | null; // null = unlimited
  setupLimit: number | null; // null = unlimited
  price: number;
  duration: string;
}

const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    name: 'Free Trial',
    vehicleLimit: 1,
    analysisLimit: 1,
    setupLimit: null, // unlimited
    price: 0,
    duration: '1 day'
  },
  two_day: {
    name: 'Two Day Plan',
    vehicleLimit: 1,
    analysisLimit: null, // unlimited
    setupLimit: null, // unlimited
    price: 14.95,
    duration: '2 days'
  },
  monthly: {
    name: 'Monthly Plan',
    vehicleLimit: 4,
    analysisLimit: null, // unlimited
    setupLimit: null, // unlimited
    price: 29.95,
    duration: '1 month'
  },
  annual: {
    name: 'Annual Plan',
    vehicleLimit: 8,
    analysisLimit: null, // unlimited
    setupLimit: null, // unlimited
    price: 99.95,
    duration: '1 year'
  }
};

export const LicenseSystemTest: React.FC = () => {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState<LicenseData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLicenses = async () => {
    try {
      const { data, error } = await supabase
        .from('user_licenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLicenses(data || []);
    } catch (error) {
      console.error('Error fetching licenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const testUsageIncrement = async (licenseId: string, type: 'analysis' | 'setup' | 'vehicle') => {
    const field = type === 'analysis' ? 'analyses_used' : 
                  type === 'setup' ? 'setups_saved' : 'vehicles_created';
    
    const { error } = await supabase
      .from('user_licenses')
      .update({ [field]: supabase.sql`${field} + 1` })
      .eq('id', licenseId);

    if (!error) {
      fetchLicenses();
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  const canPerformAction = (license: LicenseData, action: 'analysis' | 'setup' | 'vehicle') => {
    const limits = PLAN_LIMITS[license.license_type];
    if (!limits) return false;

    switch (action) {
      case 'analysis':
        return limits.analysisLimit === null || license.analyses_used < limits.analysisLimit;
      case 'setup':
        return limits.setupLimit === null || license.setups_saved < limits.setupLimit;
      case 'vehicle':
        return license.vehicles_created < limits.vehicleLimit;
      default:
        return false;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>License System Test Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Testing all four license plans and their limits
          </p>
          
          <div className="grid gap-4">
            {licenses.map((license) => {
              const limits = PLAN_LIMITS[license.license_type];
              const isExpired = new Date(license.expires_at) < new Date();
              
              return (
                <Card key={license.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold">{limits?.name || license.license_type}</h3>
                        <p className="text-sm text-gray-600">
                          ${limits?.price} - {limits?.duration}
                        </p>
                      </div>
                      <Badge variant={isExpired ? "destructive" : "default"}>
                        {license.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {license.vehicles_created}/{limits?.vehicleLimit}
                        </p>
                        <p className="text-sm text-gray-600">Vehicles</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {license.analyses_used}/{limits?.analysisLimit || '∞'}
                        </p>
                        <p className="text-sm text-gray-600">Analyses</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {license.setups_saved}/{limits?.setupLimit || '∞'}
                        </p>
                        <p className="text-sm text-gray-600">Setups</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => testUsageIncrement(license.id, 'vehicle')}
                        disabled={!canPerformAction(license, 'vehicle')}
                      >
                        Add Vehicle
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => testUsageIncrement(license.id, 'analysis')}
                        disabled={!canPerformAction(license, 'analysis')}
                      >
                        Run Analysis
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => testUsageIncrement(license.id, 'setup')}
                        disabled={!canPerformAction(license, 'setup')}
                      >
                        Save Setup
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};