import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckSquare, ExternalLink, Download, CreditCard, Terminal } from "lucide-react";

export function ActionableItems() {
  const immediateActions = [
    {
      title: "Install Node.js",
      description: "Download and install Node.js v16 or higher",
      action: "Download from nodejs.org",
      url: "https://nodejs.org",
      priority: "high",
      timeEstimate: "5 min"
    },
    {
      title: "Install Git",
      description: "Version control system for your code",
      action: "Download from git-scm.com",
      url: "https://git-scm.com",
      priority: "high",
      timeEstimate: "5 min"
    },
    {
      title: "Create Apple Developer Account",
      description: "Required for iOS app submission",
      action: "Sign up at developer.apple.com",
      url: "https://developer.apple.com",
      priority: "high",
      timeEstimate: "15 min",
      cost: "$99/year"
    },
    {
      title: "Create Google Play Console Account",
      description: "Required for Android app submission",
      action: "Sign up at play.google.com/console",
      url: "https://play.google.com/console",
      priority: "high",
      timeEstimate: "10 min",
      cost: "$25 one-time"
    }
  ];

  const developmentActions = [
    {
      title: "Install Xcode (macOS only)",
      description: "Required for iOS development",
      action: "Download from Mac App Store",
      priority: "medium",
      timeEstimate: "30-60 min",
      note: "Large download (10+ GB)"
    },
    {
      title: "Install Android Studio",
      description: "Required for Android development",
      action: "Download from developer.android.com",
      url: "https://developer.android.com/studio",
      priority: "medium",
      timeEstimate: "20-30 min"
    }
  ];

  const nextCommands = [
    "npm install @capacitor/core @capacitor/cli",
    "npx cap init",
    "npx cap add ios",
    "npx cap add android",
    "npm run build",
    "npx cap sync"
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <CheckSquare className="h-6 w-6" />
          Your Actionable Items
        </h2>
        <p className="text-muted-foreground">
          Complete these tasks to start building your mobile app
        </p>
      </div>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertDescription>
          <strong>Start Here:</strong> Complete the "Immediate Actions" first, then move to development tools.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">🚨 Immediate Actions (Do These First)</h3>
          <div className="grid gap-4">
            {immediateActions.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                      <Badge variant="outline">{item.timeEstimate}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.action}</span>
                      {item.cost && (
                        <Badge variant="outline" className="text-xs">
                          <CreditCard className="h-3 w-3 mr-1" />
                          {item.cost}
                        </Badge>
                      )}
                    </div>
                    {item.url && (
                      <Button size="sm" asChild>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Go Now
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">🛠️ Development Tools (Install After Above)</h3>
          <div className="grid gap-4">
            {developmentActions.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                      <Badge variant="outline">{item.timeEstimate}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.action}</span>
                      {item.note && (
                        <Badge variant="outline" className="text-xs">
                          {item.note}
                        </Badge>
                      )}
                    </div>
                    {item.url && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">⚡ Commands to Run Next</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">After installing tools above, run these commands:</CardTitle>
              <CardDescription>Copy and paste these into your terminal, one at a time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {nextCommands.map((command, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <code className="text-sm">{command}</code>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => navigator.clipboard.writeText(command)}
                    >
                      Copy
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Alert>
        <CheckSquare className="h-4 w-4" />
        <AlertDescription>
          <strong>Next:</strong> Once you complete the immediate actions, you'll be ready to start the technical setup.
        </AlertDescription>
      </Alert>
    </div>
  );
}