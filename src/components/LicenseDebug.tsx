import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLicense } from '@/contexts/LicenseContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Bug, Database, User } from 'lucide-react';

const LicenseDebug: React.FC = () => {
  const { user } = useAuth();
  const { licenseType, isLicenseValid, refreshLicense } = useLicense();
  const { toast } = useToast();

  const checkDatabaseLicense = async () => {
    if (!user) {
      toast({
        title: "No User",
        description: "Please log in first",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_licenses')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Database Error",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Database Check",
        description: `Found ${data?.length || 0} licenses in database`,
      });

      console.log('Database licenses:', data);
    } catch (error) {
      console.error('Error checking database:', error);
    }
  };

  const forceRefresh = async () => {
    await refreshLicense();
    toast({
      title: "License Refreshed",
      description: "License data has been reloaded",
    });
  };

  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bug className="h-5 w-5" />
          License Debug
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-gray-300">
          <p><strong>User:</strong> {user ? user.email : 'Not logged in'}</p>
          <p><strong>License Type:</strong> {licenseType || 'None'}</p>
          <p><strong>Valid:</strong> {isLicenseValid ? 'Yes' : 'No'}</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={checkDatabaseLicense}
            disabled={!user}
            size="sm"
            variant="outline"
            className="border-gray-600"
          >
            <Database className="h-4 w-4 mr-2" />
            Check DB
          </Button>
          
          <Button 
            onClick={forceRefresh}
            size="sm"
            variant="outline"
            className="border-gray-600"
          >
            <User className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LicenseDebug;