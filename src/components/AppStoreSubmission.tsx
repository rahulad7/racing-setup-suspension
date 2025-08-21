import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Upload, Apple, Play, DollarSign, Clock } from "lucide-react";

export function AppStoreSubmission() {
  const iosSteps = [
    {
      title: "Apple Developer Account",
      description: "Register and pay $99/year fee",
      cost: "$99/year",
      time: "1-2 days"
    },
    {
      title: "App Store Connect",
      description: "Create app listing and metadata",
      cost: "Free",
      time: "2-3 hours"
    },
    {
      title: "Build & Archive",
      description: "Create signed iOS build in Xcode",
      cost: "Free",
      time: "1-2 hours"
    },
    {
      title: "Submit for Review",
      description: "Upload to App Store Connect",
      cost: "Free",
      time: "1-7 days review"
    }
  ];

  const androidSteps = [
    {
      title: "Google Play Console",
      description: "Register and pay one-time fee",
      cost: "$25 one-time",
      time: "1 day"
    },
    {
      title: "Create App Listing",
      description: "Add app details and screenshots",
      cost: "Free",
      time: "2-3 hours"
    },
    {
      title: "Generate Signed APK",
      description: "Build production Android app",
      cost: "Free",
      time: "1 hour"
    },
    {
      title: "Publish to Store",
      description: "Upload and release app",
      cost: "Free",
      time: "1-3 days review"
    }
  ];

  const requirements = [
    "App icons (multiple sizes)",
    "Screenshots for all device sizes",
    "App description and keywords",
    "Privacy policy URL",
    "Age rating classification",
    "Contact information"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">App Store Submission Guide</h2>
        <p className="text-muted-foreground">Step-by-step process to publish your mobile app</p>
      </div>

      <Alert>
        <Upload className="h-4 w-4" />
        <AlertDescription>
          <strong>Before submitting:</strong> Ensure your app is fully tested and meets all store guidelines.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              iOS App Store Submission
            </CardTitle>
            <CardDescription>Apple App Store process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {iosSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {step.cost}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {step.time}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Total Cost: $99/year</p>
              <p className="text-sm text-muted-foreground">Review time: 1-7 days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Google Play Store Submission
            </CardTitle>
            <CardDescription>Google Play Store process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {androidSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {step.cost}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {step.time}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Total Cost: $25 one-time</p>
              <p className="text-sm text-muted-foreground">Review time: 1-3 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission Requirements</CardTitle>
          <CardDescription>What you need before submitting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 md:grid-cols-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{req}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="flex-1">
          Start iOS Submission
        </Button>
        <Button variant="outline" className="flex-1">
          Start Android Submission
        </Button>
      </div>
    </div>
  );
}