import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AppStoreGuide } from "./AppStoreGuide";
import { PWASetup } from "./PWASetup";
import { AppStoreOptimization } from "./AppStoreOptimization";
import { NativeAppGuide } from "./NativeAppGuide";
import { AppStoreMetrics } from "./AppStoreMetrics";
import { CheckCircle, ExternalLink, Smartphone, Globe, Apple, Play, TrendingUp } from "lucide-react";

export function AppStoreDistribution() {
  const [activeTab, setActiveTab] = useState("pwa");

  const developmentSteps = [
    {
      title: "Convert to Mobile App",
      description: "Use React Native, Capacitor, or Cordova",
      status: "pending",
      timeframe: "2-4 weeks"
    },
    {
      title: "Developer Account Setup",
      description: "Register with Apple ($99/year) and Google ($25 one-time)",
      status: "pending",
      timeframe: "1-2 days"
    },
    {
      title: "App Store Optimization",
      description: "Create app icons, screenshots, and descriptions",
      status: "pending",
      timeframe: "1 week"
    },
    {
      title: "Review Process",
      description: "Submit for Apple/Google review",
      status: "pending",
      timeframe: "1-7 days"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">App Store Distribution</h1>
        <p className="text-muted-foreground">Get RaceSetup Pro on mobile devices and app stores</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="pwa">PWA Install</TabsTrigger>
          <TabsTrigger value="guide">Store Guide</TabsTrigger>
          <TabsTrigger value="native">Native Apps</TabsTrigger>
          <TabsTrigger value="aso">Optimization</TabsTrigger>
          <TabsTrigger value="metrics">Analytics</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="pwa">
          <PWASetup />
        </TabsContent>

        <TabsContent value="guide">
          <AppStoreGuide />
        </TabsContent>

        <TabsContent value="native">
          <NativeAppGuide />
        </TabsContent>

        <TabsContent value="aso">
          <AppStoreOptimization />
        </TabsContent>

        <TabsContent value="metrics">
          <AppStoreMetrics />
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Development Roadmap</CardTitle>
              <CardDescription>
                Steps to get RaceSetup Pro in official app stores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {developmentSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    {step.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <Badge variant="outline" className="mt-2">
                      {step.timeframe}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="h-5 w-5" />
                  iOS App Store
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Requirements:</p>
                <ul className="text-sm space-y-1">
                  <li>• Apple Developer Account ($99/year)</li>
                  <li>• iOS app conversion</li>
                  <li>• App Store review process</li>
                  <li>• 30% revenue share to Apple</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Google Play Store
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Requirements:</p>
                <ul className="text-sm space-y-1">
                  <li>• Google Play Console ($25 one-time)</li>
                  <li>• Android app conversion</li>
                  <li>• Play Store review process</li>
                  <li>• 30% revenue share to Google</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Smartphone className="h-4 w-4" />
            <AlertDescription>
              <strong>Recommendation:</strong> Start with PWA distribution for immediate availability, then develop native apps for app stores.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}