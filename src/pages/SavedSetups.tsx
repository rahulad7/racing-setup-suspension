import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, MapPin, Car } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import { useVehicleSetupsGlobal } from '@/hooks/useVehicleSetupsGlobal';
import { useToast } from '@/hooks/use-toast';
import SampleData from '@/components/SampleData';

const SavedSetups: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setups, loadSetups, loadSetup } = useVehicleSetupsGlobal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSetups = async () => {
      try {
        await loadSetups();
      } catch (error) {
        console.error('Error loading setups:', error);
        toast({
          title: "Error",
          description: "Failed to load saved setups",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSetups();
  }, [loadSetups, toast]);

  const handleLoadSetup = async (setupId: string) => {
    try {
      await loadSetup(setupId);
      toast({
        title: "Success",
        description: "Setup loaded successfully",
      });
      navigate('/data-entry');
    } catch (error) {
      console.error('Error loading setup:', error);
      toast({
        title: "Error",
        description: "Failed to load setup",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <AppHeader onShowLicenseModal={() => {}} />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:text-blue-400 mb-8"
            onClick={() => navigate('/setup-choice')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Setup Choice
          </Button>
          {loading ? (
            <div className="text-center text-slate-400">Loading setups...</div>
          ) : (
            <>
              {setups.length === 0 ? (
                <div className="space-y-8">
                  <div className="border-t border-slate-700 pt-8">
                    <h2 className="text-2xl font-bold text-white mb-4 text-center">
                      Sample Setup
                    </h2>
                    <SampleData />
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {setups.map((setup) => (
                    <Card key={setup.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Car className="mr-2 h-5 w-5 text-blue-400" />
                          {setup.name}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          <div className="flex items-center mt-2">
                            <MapPin className="mr-1 h-4 w-4" />
                            {setup.track_name || 'Unknown Track'}
                          </div>
                          <div className="flex items-center mt-1">
                            <Calendar className="mr-1 h-4 w-4" />
                            {new Date(setup.created_at).toLocaleDateString()}
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                          onClick={() => handleLoadSetup(setup.id)}
                        >
                          Load Setup
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedSetups;