import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Smartphone, Apple, Play, Globe, Info } from "lucide-react";

export function AppStoreGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">App Store Distribution Guide</h1>
        <p className="text-muted-foreground">Get RaceSetup Pro listed in mobile app stores</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Your current web app needs to be converted to a mobile app for app store distribution.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ios">iOS App Store</TabsTrigger>
          <TabsTrigger value="android">Google Play</TabsTrigger>
          <TabsTrigger value="pwa">PWA Option</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Mobile App Conversion Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">React Native</CardTitle>
                    <CardDescription>Convert to native mobile app</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Native performance
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Full app store features
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Offline capabilities
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Capacitor/Cordova</CardTitle>
                    <CardDescription>Wrap existing web app</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Faster development
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Reuse existing code
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Cross-platform
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5" />
                iOS App Store Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline">1</Badge>
                  <div>
                    <h4 className="font-medium">Apple Developer Account</h4>
                    <p className="text-sm text-muted-foreground">$99/year membership required</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">2</Badge>
                  <div>
                    <h4 className="font-medium">Convert to iOS App</h4>
                    <p className="text-sm text-muted-foreground">Use React Native or Capacitor</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">3</Badge>
                  <div>
                    <h4 className="font-medium">App Store Guidelines</h4>
                    <p className="text-sm text-muted-foreground">Follow Apple's review guidelines</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">4</Badge>
                  <div>
                    <h4 className="font-medium">App Store Connect</h4>
                    <p className="text-sm text-muted-foreground">Submit app for review</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="android" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Google Play Store Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline">1</Badge>
                  <div>
                    <h4 className="font-medium">Google Play Console</h4>
                    <p className="text-sm text-muted-foreground">$25 one-time registration fee</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">2</Badge>
                  <div>
                    <h4 className="font-medium">Android App Bundle</h4>
                    <p className="text-sm text-muted-foreground">Build APK/AAB file</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">3</Badge>
                  <div>
                    <h4 className="font-medium">Play Console Policies</h4>
                    <p className="text-sm text-muted-foreground">Meet Google's content policies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">4</Badge>
                  <div>
                    <h4 className="font-medium">Release Management</h4>
                    <p className="text-sm text-muted-foreground">Upload and publish app</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pwa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Progressive Web App (PWA)
              </CardTitle>
              <CardDescription>
                Alternative to traditional app stores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  PWAs can be installed directly from your website and don't require app store approval.
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge variant="outline">✓</Badge>
                  <div>
                    <h4 className="font-medium">Service Worker</h4>
                    <p className="text-sm text-muted-foreground">Enable offline functionality</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">✓</Badge>
                  <div>
                    <h4 className="font-medium">Web App Manifest</h4>
                    <p className="text-sm text-muted-foreground">Define app metadata and icons</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">✓</Badge>
                  <div>
                    <h4 className="font-medium">HTTPS Required</h4>
                    <p className="text-sm text-muted-foreground">Secure connection mandatory</p>
                  </div>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                Convert to PWA (Recommended Start)
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}