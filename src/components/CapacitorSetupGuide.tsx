import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Terminal, CheckCircle, Smartphone, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

export function CapacitorSetupGuide() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const setupCommands = [
    {
      title: "Install Capacitor CLI",
      command: "npm install -g @capacitor/cli",
      description: "Install Capacitor globally on your system"
    },
    {
      title: "Add Capacitor to Project",
      command: "npm install @capacitor/core @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar",
      description: "Add core Capacitor packages to your React project"
    },
    {
      title: "Initialize Capacitor",
      command: "npx cap init RaceSetupPro com.racesetuppro.app",
      description: "Initialize Capacitor with your app name and bundle ID"
    },
    {
      title: "Add iOS Platform",
      command: "npx cap add ios",
      description: "Add iOS platform support (requires macOS)"
    },
    {
      title: "Add Android Platform",
      command: "npx cap add android",
      description: "Add Android platform support"
    },
    {
      title: "Build React App",
      command: "npm run build",
      description: "Build your React app for production"
    },
    {
      title: "Sync to Native Projects",
      command: "npx cap sync",
      description: "Copy web assets to native projects"
    },
    {
      title: "Open in Xcode (iOS)",
      command: "npx cap open ios",
      description: "Open iOS project in Xcode for building"
    },
    {
      title: "Open in Android Studio",
      command: "npx cap open android",
      description: "Open Android project in Android Studio"
    }
  ];

  const requirements = [
    { platform: "iOS", requirement: "macOS with Xcode installed" },
    { platform: "Android", requirement: "Android Studio with SDK" },
    { platform: "Both", requirement: "Node.js 16+ and npm" }
  ];

  return (
    <div className="space-y-6">
      <Alert>
        <Smartphone className="h-4 w-4" />
        <AlertDescription>
          <strong>Ready to go mobile!</strong> Follow these steps to convert your React app to native iOS and Android apps.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Prerequisites</CardTitle>
          <CardDescription>Make sure you have these installed before starting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-3">
                <Badge variant="outline">{req.platform}</Badge>
                <span className="text-sm">{req.requirement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Setup Steps</CardTitle>
          <CardDescription>Follow these commands in order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {setupCommands.map((step, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStep(index)}
                      className={completedSteps.includes(index) ? "bg-green-500/20 border-green-500" : ""}
                    >
                      {completedSteps.includes(index) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </Button>
                    <h4 className="font-medium">{step.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3 ml-12">{step.description}</p>
                <div className="bg-muted p-3 rounded-md font-mono text-sm ml-12">
                  {step.command}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Terminal className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Test on Device</p>
                <p className="text-sm text-muted-foreground">Run your app on physical devices or simulators</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Build for Distribution</p>
                <p className="text-sm text-muted-foreground">Create production builds for app stores</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <Button variant="outline" asChild>
              <a href="https://capacitorjs.com/docs" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Capacitor Docs
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://developer.apple.com/xcode/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Download Xcode
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://developer.android.com/studio" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Android Studio
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}