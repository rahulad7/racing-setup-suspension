import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, Terminal, Smartphone, Zap } from "lucide-react";

export function CapacitorQuickStart() {
  const setupCommands = [
    {
      step: "Install Capacitor",
      command: "npm install @capacitor/core @capacitor/cli",
      description: "Add Capacitor to your existing React project"
    },
    {
      step: "Initialize Capacitor",
      command: "npx cap init",
      description: "Configure app name and bundle ID"
    },
    {
      step: "Add Platforms",
      command: "npx cap add ios && npx cap add android",
      description: "Add iOS and Android platforms"
    },
    {
      step: "Build Web Assets",
      command: "npm run build",
      description: "Build your React app for production"
    },
    {
      step: "Sync to Native",
      command: "npx cap sync",
      description: "Copy web assets to native projects"
    },
    {
      step: "Open in IDE",
      command: "npx cap open ios && npx cap open android",
      description: "Open Xcode and Android Studio"
    }
  ];

  const requirements = [
    {
      platform: "iOS Development",
      items: ["macOS computer", "Xcode installed", "iOS Simulator", "Apple Developer Account"]
    },
    {
      platform: "Android Development",
      items: ["Android Studio", "Android SDK", "Java Development Kit", "Android Emulator"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Zap className="h-6 w-6" />
          Capacitor Quick Start
        </h2>
        <p className="text-muted-foreground">Convert your React app to native mobile apps in minutes</p>
      </div>

      <Alert>
        <Smartphone className="h-4 w-4" />
        <AlertDescription>
          <strong>Recommended:</strong> Capacitor is the fastest way to get your React app into app stores with minimal code changes.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Setup Commands
          </CardTitle>
          <CardDescription>Run these commands in your project directory</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {setupCommands.map((cmd, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{index + 1}</Badge>
                <span className="font-medium">{cmd.step}</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <code className="text-sm">{cmd.command}</code>
              </div>
              <p className="text-sm text-muted-foreground">{cmd.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {requirements.map((req, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{req.platform}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {req.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps After Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="outline">1</Badge>
              <div>
                <h4 className="font-medium">Test on Devices</h4>
                <p className="text-sm text-muted-foreground">Run on iOS simulator and Android emulator</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline">2</Badge>
              <div>
                <h4 className="font-medium">Add Native Features</h4>
                <p className="text-sm text-muted-foreground">Camera, GPS, push notifications, etc.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline">3</Badge>
              <div>
                <h4 className="font-medium">Build for Production</h4>
                <p className="text-sm text-muted-foreground">Create signed builds for app stores</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="flex-1">
          <Code className="h-4 w-4 mr-2" />
          Start Development
        </Button>
        <Button variant="outline" className="flex-1">
          View Documentation
        </Button>
      </div>
    </div>
  );
}