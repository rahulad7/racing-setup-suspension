import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Circle, Clock, ArrowRight, Smartphone, Code, Upload } from "lucide-react";

export function NextStepsGuide() {
  const currentStep = 1; // This would be dynamic based on user progress

  const steps = [
    {
      id: 1,
      title: "Prerequisites Setup",
      description: "Install required development tools",
      timeEstimate: "30-60 minutes",
      status: "current",
      tasks: [
        "Install Node.js (v16 or higher)",
        "Install Git",
        "For iOS: Install Xcode (macOS only)",
        "For Android: Install Android Studio",
        "Create Apple Developer Account ($99/year)",
        "Create Google Play Console Account ($25 one-time)"
      ]
    },
    {
      id: 2,
      title: "Capacitor Integration",
      description: "Add mobile capabilities to your React app",
      timeEstimate: "15-30 minutes",
      status: "pending",
      tasks: [
        "Run: npm install @capacitor/core @capacitor/cli",
        "Run: npx cap init (enter app name and bundle ID)",
        "Run: npx cap add ios && npx cap add android",
        "Run: npm run build",
        "Run: npx cap sync"
      ]
    },
    {
      id: 3,
      title: "Mobile Testing",
      description: "Test your app on mobile devices",
      timeEstimate: "1-2 hours",
      status: "pending",
      tasks: [
        "Run: npx cap open ios (opens Xcode)",
        "Run: npx cap open android (opens Android Studio)",
        "Test on iOS Simulator",
        "Test on Android Emulator",
        "Test on physical devices",
        "Fix any mobile-specific issues"
      ]
    },
    {
      id: 4,
      title: "App Store Preparation",
      description: "Prepare assets and metadata for submission",
      timeEstimate: "2-4 hours",
      status: "pending",
      tasks: [
        "Create app icons (multiple sizes)",
        "Create screenshots for all device sizes",
        "Write app description and keywords",
        "Prepare privacy policy",
        "Set up app store listings",
        "Configure app signing certificates"
      ]
    },
    {
      id: 5,
      title: "App Store Submission",
      description: "Submit to iOS App Store and Google Play",
      timeEstimate: "1-2 hours",
      status: "pending",
      tasks: [
        "Build production iOS app in Xcode",
        "Submit to App Store Connect",
        "Build production Android app (AAB format)",
        "Submit to Google Play Console",
        "Wait for review (1-7 days)",
        "Respond to any review feedback"
      ]
    }
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'current':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <ArrowRight className="h-6 w-6" />
          Your Next Steps
        </h2>
        <p className="text-muted-foreground">
          Follow this roadmap to get your app into iOS and Android app stores
        </p>
      </div>

      <Alert>
        <Smartphone className="h-4 w-4" />
        <AlertDescription>
          <strong>Current Status:</strong> You're on Step {currentStep} of 5. 
          Estimated total time: 5-10 hours over 1-2 weeks.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={step.id} className={getStepColor(step.status)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStepIcon(step.status)}
                  <div>
                    <CardTitle className="text-lg">
                      Step {step.id}: {step.title}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{step.timeEstimate}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {step.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className={step.status === 'current' ? 'font-medium' : ''}>
                      {task}
                    </span>
                  </div>
                ))}
              </div>
              {step.status === 'current' && (
                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full">
                    <Code className="h-4 w-4 mr-2" />
                    Start Step {step.id}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge variant="outline">💡</Badge>
            <div>
              <h4 className="font-medium">Development Environment</h4>
              <p className="text-sm text-muted-foreground">
                iOS development requires macOS. Android development works on any OS.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline">💰</Badge>
            <div>
              <h4 className="font-medium">Costs</h4>
              <p className="text-sm text-muted-foreground">
                Apple Developer: $99/year, Google Play: $25 one-time fee
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Badge variant="outline">⏱️</Badge>
            <div>
              <h4 className="font-medium">Review Times</h4>
              <p className="text-sm text-muted-foreground">
                iOS: 1-7 days, Android: 1-3 days (can be longer for new accounts)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="flex-1">
          <Upload className="h-4 w-4 mr-2" />
          View Detailed Guide
        </Button>
        <Button variant="outline" className="flex-1">
          Get Help
        </Button>
      </div>
    </div>
  );
}