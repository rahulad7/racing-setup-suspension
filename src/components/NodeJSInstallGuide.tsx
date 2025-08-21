import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Download, Terminal, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const NodeJSInstallGuide: React.FC = () => {
  const openNodeJSWebsite = () => {
    window.open('https://nodejs.org/', '_blank');
  };

  const openNVMWebsite = () => {
    window.open('https://github.com/nvm-sh/nvm', '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Node.js Installation Guide
          </CardTitle>
          <CardDescription>
            Install Node.js to run JavaScript development tools and build processes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Node.js is required for this React application's development environment
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Installation Methods</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Official Installer</CardTitle>
                  <Badge variant="secondary">Recommended</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Download the LTS version from the official website
                  </p>
                  <Button onClick={openNodeJSWebsite} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Node.js
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    <p>• Windows: .msi installer</p>
                    <p>• macOS: .pkg installer</p>
                    <p>• Linux: Binary packages</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">NVM (Node Version Manager)</CardTitle>
                  <Badge variant="outline">Advanced</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Manage multiple Node.js versions
                  </p>
                  <Button onClick={openNVMWebsite} variant="outline" className="w-full">
                    <Terminal className="h-4 w-4 mr-2" />
                    Get NVM
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    <p>• Install: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash</p>
                    <p>• Use: nvm install --lts</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NodeJSInstallGuide;