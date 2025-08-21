import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { PWAInstaller } from "./PWAInstaller";
import { CheckCircle, Wifi, WifiOff, Zap, Shield } from "lucide-react";

export function PWASetup() {
  const features = [
    {
      icon: WifiOff,
      title: "Offline Access",
      description: "Works without internet connection"
    },
    {
      icon: Zap,
      title: "Fast Loading",
      description: "Instant startup and navigation"
    },
    {
      icon: Shield,
      title: "Secure",
      description: "HTTPS encryption and security"
    },
    {
      icon: CheckCircle,
      title: "Auto Updates",
      description: "Always get the latest features"
    }
  ];

  const offlineFeatures = [
    "View saved suspension setups",
    "Access diagnostic tools",
    "Browse track history",
    "Use calculation tools",
    "View help documentation"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Progressive Web App</h2>
        <p className="text-muted-foreground">
          Install RaceSetup Pro for the best mobile experience
        </p>
      </div>

      <PWAInstaller />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>PWA Features</CardTitle>
            <CardDescription>
              Benefits of installing the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WifiOff className="h-5 w-5" />
              Offline Capabilities
            </CardTitle>
            <CardDescription>
              What works without internet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {offlineFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Installation Instructions</CardTitle>
          <CardDescription>
            Platform-specific installation steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">iOS Safari</Badge>
              <div className="text-sm space-y-1">
                <p>1. Tap the Share button</p>
                <p>2. Select "Add to Home Screen"</p>
                <p>3. Tap "Add" to confirm</p>
              </div>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">Android Chrome</Badge>
              <div className="text-sm space-y-1">
                <p>1. Tap the menu (⋮)</p>
                <p>2. Select "Install app"</p>
                <p>3. Tap "Install" to confirm</p>
              </div>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">Desktop</Badge>
              <div className="text-sm space-y-1">
                <p>1. Look for install icon in address bar</p>
                <p>2. Click the install button</p>
                <p>3. Confirm installation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Pro Tip:</strong> Once installed, the app will work offline and receive automatic updates.
        </AlertDescription>
      </Alert>
    </div>
  );
}