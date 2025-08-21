import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Terminal, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const NodeJSVerification: React.FC = () => {
  const [nodeVersion, setNodeVersion] = useState<string | null>(null);
  const [npmVersion, setNpmVersion] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkVersions = async () => {
    setIsChecking(true);
    try {
      // Simulate version check (in real app, this would be server-side)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock versions for demonstration
      setNodeVersion('v18.17.0');
      setNpmVersion('9.6.7');
    } catch (error) {
      setNodeVersion(null);
      setNpmVersion(null);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkVersions();
  }, []);

  const isNodeInstalled = nodeVersion !== null;
  const isNpmInstalled = npmVersion !== null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Node.js Verification
        </CardTitle>
        <CardDescription>
          Check if Node.js and npm are properly installed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Installation Status</span>
          <Button 
            onClick={checkVersions} 
            disabled={isChecking}
            variant="outline"
            size="sm"
          >
            {isChecking ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Check Again
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              {isNodeInstalled ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">Node.js</span>
            </div>
            <div className="flex items-center gap-2">
              {nodeVersion && (
                <Badge variant="secondary">{nodeVersion}</Badge>
              )}
              <Badge variant={isNodeInstalled ? "default" : "destructive"}>
                {isNodeInstalled ? "Installed" : "Not Found"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              {isNpmInstalled ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">npm</span>
            </div>
            <div className="flex items-center gap-2">
              {npmVersion && (
                <Badge variant="secondary">{npmVersion}</Badge>
              )}
              <Badge variant={isNpmInstalled ? "default" : "destructive"}>
                {isNpmInstalled ? "Installed" : "Not Found"}
              </Badge>
            </div>
          </div>
        </div>

        {!isNodeInstalled && (
          <Alert>
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Node.js is not installed. Please install it to continue with development.
            </AlertDescription>
          </Alert>
        )}

        {isNodeInstalled && isNpmInstalled && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Node.js and npm are properly installed! You can now run development commands.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default NodeJSVerification;