import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useVehicleSetupsGlobal } from '@/hooks/useVehicleSetupsGlobal';

const DatabaseTestComponent: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [setupName, setSetupName] = useState('Test Setup');
  const { setups, loadSetups, saveSetup } = useVehicleSetupsGlobal();

  const testSaveSetup = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      const testSetupData = {
        setup_name: setupName,
        vehicle_name: 'Test Vehicle',
        track_name: 'Test Track',
        setup_data: {
          front_tire_pressure: 30,
          rear_tire_pressure: 28,
          front_spring_rate: 500,
          rear_spring_rate: 450,
          test_timestamp: new Date().toISOString()
        }
      };

      await saveSetup(testSetupData);
      setTestResult('✅ Setup saved successfully!');
      
      // Reload setups to verify
      await loadSetups();
      
    } catch (error) {
      console.error('Test save error:', error);
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testLoadSetups = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      await loadSetups();
      setTestResult(`✅ Loaded ${setups.length} setups successfully!`);
    } catch (error) {
      console.error('Test load error:', error);
      setTestResult(`❌ Load Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testAuth = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      
      if (user) {
        setTestResult(`✅ User authenticated: ${user.email}`);
      } else {
        setTestResult('❌ No user authenticated');
      }
    } catch (error) {
      console.error('Auth test error:', error);
      setTestResult(`❌ Auth Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Database Test Component</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            value={setupName}
            onChange={(e) => setSetupName(e.target.value)}
            placeholder="Setup name for testing"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button onClick={testAuth} disabled={loading}>
            Test Auth
          </Button>
          <Button onClick={testSaveSetup} disabled={loading}>
            Test Save Setup
          </Button>
          <Button onClick={testLoadSetups} disabled={loading}>
            Test Load Setups
          </Button>
        </div>

        {testResult && (
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm">{testResult}</p>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-semibold">Current Setups ({setups.length}):</h3>
          {setups.map((setup) => (
            <div key={setup.id} className="p-2 bg-gray-50 rounded">
              <p className="font-medium">{setup.setup_name}</p>
              <p className="text-sm text-gray-600">
                {setup.vehicle_name} - {setup.track_name}
              </p>
              <p className="text-xs text-gray-500">
                Created: {new Date(setup.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseTestComponent;