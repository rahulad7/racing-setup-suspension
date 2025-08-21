import React from 'react';
import AppHeader from '@/components/AppHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Terminal, Download, CheckCircle, Command } from 'lucide-react';
import NodeJSInstallGuide from '../components/NodeJSInstallGuide';
import NodeJSVerification from '../components/NodeJSVerification';
import NodeJSCommands from '../components/NodeJSCommands';

const NodeJSSetup: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Terminal className="h-8 w-8" />
            Node.js Setup Guide
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete guide to installing and setting up Node.js for React development.
            Node.js is essential for running the development tools and build processes.
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">JavaScript Runtime</Badge>
            <Badge variant="secondary">Development Tools</Badge>
            <Badge variant="secondary">Package Manager</Badge>
          </div>
        </div>

        <Tabs defaultValue="install" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="install" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Install
            </TabsTrigger>
            <TabsTrigger value="verify" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Verify
            </TabsTrigger>
            <TabsTrigger value="commands" className="flex items-center gap-2">
              <Command className="h-4 w-4" />
              Commands
            </TabsTrigger>
          </TabsList>

          <TabsContent value="install" className="space-y-6">
            <NodeJSInstallGuide />
            
            <Card>
              <CardHeader>
                <CardTitle>What is Node.js?</CardTitle>
                <CardDescription>
                  Understanding the JavaScript runtime environment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Features</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• JavaScript runtime built on Chrome's V8 engine</li>
                      <li>• Event-driven, non-blocking I/O model</li>
                      <li>• Cross-platform compatibility</li>
                      <li>• Large ecosystem via npm</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">For This Project</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Powers Vite development server</li>
                      <li>• Manages dependencies with npm</li>
                      <li>• Runs build and development scripts</li>
                      <li>• Enables TypeScript compilation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verify" className="space-y-6">
            <NodeJSVerification />
          </TabsContent>

          <TabsContent value="commands" className="space-y-6">
            <NodeJSCommands />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NodeJSSetup;