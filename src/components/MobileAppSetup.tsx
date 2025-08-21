import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, Zap, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { CapacitorSetupGuide } from "./CapacitorSetupGuide";

export function MobileAppSetup() {
  const benefits = [
    "Native iOS and Android apps",
    "Access to device features (camera, GPS, etc.)",
    "App store distribution",
    "Offline functionality",
    "Push notifications",
    "Better performance"
  ];

  const timeline = [
    { phase: "Setup", duration: "1-2 hours", description: "Install tools and initialize project" },
    { phase: "Development", duration: "1-2 days", description: "Test and optimize for mobile" },
    { phase: "App Store", duration: "1-2 weeks", description: "Submit to Apple and Google stores" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Convert to Native Mobile App
          </CardTitle>
          <CardDescription>
            Transform your React web app into native iOS and Android applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Benefits
              </h4>
              <ul className="space-y-2 text-sm">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                Timeline
              </h4>
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.phase}</span>
                      <span className="text-muted-foreground">{item.duration}</span>
                    </div>
                    <p className="text-muted-foreground text-xs">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          <strong>Ready to start?</strong> Get your specific actionable items and immediate next steps.
        </AlertDescription>
      </Alert>

      <div className="flex gap-4">
        <Button 
          className="flex-1" 
          onClick={() => window.location.href = '/actionable-items'}
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          What Do I Do Next?
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => window.location.href = '/next-steps'}
        >
          View Full Roadmap
        </Button>
      </div>

      <Tabs defaultValue="capacitor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="capacitor">Capacitor Setup</TabsTrigger>
          <TabsTrigger value="alternatives">Other Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="capacitor" className="mt-6">
          <CapacitorSetupGuide />
        </TabsContent>
        
        <TabsContent value="alternatives" className="mt-6">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">React Native</CardTitle>
                <CardDescription>Rewrite using React Native framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Pros:</strong> Better performance, native look and feel</p>
                  <p><strong>Cons:</strong> Requires rewriting components, longer development time</p>
                  <p><strong>Timeline:</strong> 4-8 weeks</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cordova/PhoneGap</CardTitle>
                <CardDescription>Older hybrid app framework</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Pros:</strong> Simple setup, large plugin ecosystem</p>
                  <p><strong>Cons:</strong> Slower performance, being phased out</p>
                  <p><strong>Timeline:</strong> 2-3 weeks</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}