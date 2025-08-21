import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, Smartphone, Zap, ExternalLink } from "lucide-react";

export function NativeAppGuide() {
  const frameworks = [
    {
      name: "Capacitor",
      description: "Ionic's native runtime for web apps",
      pros: ["Easy React integration", "Native plugin access", "Hot reload"],
      cons: ["Larger app size", "Performance overhead"],
      difficulty: "Easy",
      timeframe: "1-2 weeks"
    },
    {
      name: "React Native",
      description: "Facebook's cross-platform framework",
      pros: ["Native performance", "Large community", "Code sharing"],
      cons: ["Learning curve", "Platform differences"],
      difficulty: "Medium",
      timeframe: "3-4 weeks"
    },
    {
      name: "Cordova",
      description: "Apache's hybrid app platform",
      pros: ["Mature ecosystem", "Plugin variety", "Simple setup"],
      cons: ["Slower performance", "Outdated approach"],
      difficulty: "Easy",
      timeframe: "1-2 weeks"
    }
  ];

  const steps = [
    "Choose conversion framework",
    "Set up development environment",
    "Convert React components",
    "Add native features",
    "Test on devices",
    "Build for stores"
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Native App Conversion
          </CardTitle>
          <CardDescription>
            Convert your React app to native iOS and Android apps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {frameworks.map((framework, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{framework.name}</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">{framework.difficulty}</Badge>
                    <Badge variant="secondary">{framework.timeframe}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{framework.description}</p>
                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-green-600 mb-1">Pros:</p>
                    <ul className="text-xs space-y-1">
                      {framework.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-600 mb-1">Cons:</p>
                    <ul className="text-xs space-y-1">
                      {framework.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Development Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          <strong>Recommended:</strong> Start with Capacitor for fastest time-to-market, then consider React Native for performance optimization.
        </AlertDescription>
      </Alert>
    </div>
  );
}