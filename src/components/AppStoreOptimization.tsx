import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Star, Download, Users, TrendingUp } from "lucide-react";

export function AppStoreOptimization() {
  const asoTips = [
    {
      category: "Keywords",
      items: [
        "Race car suspension",
        "Motorsport setup",
        "Track day tools",
        "Racing diagnostics"
      ]
    },
    {
      category: "Screenshots",
      items: [
        "Suspension setup interface",
        "Diagnostic results",
        "Track history view",
        "Payment success flow"
      ]
    },
    {
      category: "Description",
      items: [
        "Professional suspension tuning",
        "Real-time diagnostics",
        "Track-specific setups",
        "Offline functionality"
      ]
    }
  ];

  const metrics = [
    { label: "Install Rate", value: "12.5%", trend: "up" },
    { label: "User Rating", value: "4.8/5", trend: "stable" },
    { label: "Retention", value: "85%", trend: "up" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            App Store Optimization
          </CardTitle>
          <CardDescription>
            Maximize visibility and downloads in app stores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="mt-2">
                  {metric.trend === 'up' ? '↗' : '→'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {asoTips.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{section.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <Star className="h-4 w-4" />
        <AlertDescription>
          <strong>Pro Tip:</strong> Encourage users to rate and review your app to improve store rankings.
        </AlertDescription>
      </Alert>
    </div>
  );
}