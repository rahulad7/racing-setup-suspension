import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Clock, AlertCircle, Apple, Play, Code, Smartphone } from "lucide-react";

export function AppStoreProcess() {
  const processSteps = [
    {
      phase: "Preparation",
      duration: "1-2 weeks",
      status: "ready",
      tasks: [
        "Choose mobile framework (Capacitor recommended)",
        "Set up development environment",
        "Install required dependencies",
        "Configure build tools"
      ]
    },
    {
      phase: "App Conversion",
      duration: "2-3 weeks",
      status: "pending",
      tasks: [
        "Convert React components to mobile",
        "Add native device features",
        "Implement offline functionality",
        "Test on iOS and Android devices"
      ]
    },
    {
      phase: "Store Setup",
      duration: "3-5 days",
      status: "pending",
      tasks: [
        "Register Apple Developer Account ($99/year)",
        "Register Google Play Console ($25 one-time)",
        "Create app store listings",
        "Prepare app icons and screenshots"
      ]
    },
    {
      phase: "Submission",
      duration: "1-7 days",
      status: "pending",
      tasks: [
        "Build production app bundles",
        "Submit to Apple App Store",
        "Submit to Google Play Store",
        "Monitor review process"
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">App Store Distribution Process</h2>
        <p className="text-muted-foreground">Complete roadmap to get your app in iOS and Android stores</p>
      </div>

      <Alert>
        <Smartphone className="h-4 w-4" />
        <AlertDescription>
          <strong>Total Timeline:</strong> 4-6 weeks from start to app store approval
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {processSteps.map((step, index) => (
          <Card key={index} className={step.status === 'ready' ? 'border-green-200' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(step.status)}
                  Phase {index + 1}: {step.phase}
                </CardTitle>
                <Badge variant="outline">{step.duration}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {step.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {task}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              iOS App Store
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Requirements:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Apple Developer Account ($99/year)</li>
                <li>• iOS app binary (.ipa file)</li>
                <li>• App Store review (1-7 days)</li>
                <li>• 30% revenue share</li>
              </ul>
            </div>
            <Button className="w-full" variant="outline">
              Start iOS Development
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Google Play Store
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">Requirements:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Google Play Console ($25 one-time)</li>
                <li>• Android app bundle (.aab file)</li>
                <li>• Play Store review (1-3 days)</li>
                <li>• 30% revenue share</li>
              </ul>
            </div>
            <Button className="w-full" variant="outline">
              Start Android Development
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}