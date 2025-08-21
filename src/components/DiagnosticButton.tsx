import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Stethoscope, AlertTriangle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RaceCarDiagnostics from './RaceCarDiagnostics';

interface DiagnosticButtonProps {
  setupData?: any;
  issueData?: any;
}

const DiagnosticButton: React.FC<DiagnosticButtonProps> = ({ setupData, issueData }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const runDiagnostics = async () => {
    setIsRunning(true);
    toast({
      title: "Running Race Car Diagnostics",
      description: "Analyzing your vehicle setup for race track conditions..."
    });

    // Simulate diagnostic analysis
    setTimeout(() => {
      setShowResults(true);
      setIsRunning(false);
      
      toast({
        title: "Diagnostics Complete",
        description: "Race car setup analysis completed with recommendations."
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Race Car Setup Diagnostics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Advanced diagnostics for race cars on race tracks. Analyzes handling characteristics and provides setup recommendations based on professional racing data.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={runDiagnostics} 
              disabled={isRunning}
              size="lg"
              className="w-full"
            >
              {isRunning ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Setup...
                </>
              ) : (
                <>
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Run Race Car Diagnostics
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <Card>
          <CardHeader>
            <CardTitle>Race Car Diagnostic Results</CardTitle>
          </CardHeader>
          <CardContent>
            <RaceCarDiagnostics setupData={setupData} issueData={issueData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiagnosticButton;