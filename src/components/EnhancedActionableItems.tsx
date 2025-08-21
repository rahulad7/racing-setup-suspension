import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckSquare, ExternalLink, Download, CreditCard, Terminal, Plus, Edit } from 'lucide-react';
import { AnalysisDataEntry } from './AnalysisDataEntry';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  action: string;
  url?: string;
  priority: string;
  timeEstimate: string;
  cost?: string;
  note?: string;
  completed: boolean;
  category: string;
}

export function EnhancedActionableItems() {
  const [items, setItems] = useState<ActionItem[]>([
    {
      id: '1',
      title: 'Install Node.js',
      description: 'Download and install Node.js v16 or higher',
      action: 'Download from nodejs.org',
      url: 'https://nodejs.org',
      priority: 'high',
      timeEstimate: '5 min',
      completed: false,
      category: 'immediate'
    },
    {
      id: '2',
      title: 'Install Git',
      description: 'Version control system for your code',
      action: 'Download from git-scm.com',
      url: 'https://git-scm.com',
      priority: 'high',
      timeEstimate: '5 min',
      completed: false,
      category: 'immediate'
    },
    {
      id: '3',
      title: 'Create Apple Developer Account',
      description: 'Required for iOS app submission',
      action: 'Sign up at developer.apple.com',
      url: 'https://developer.apple.com',
      priority: 'high',
      timeEstimate: '15 min',
      cost: '$99/year',
      completed: false,
      category: 'immediate'
    },
    {
      id: '4',
      title: 'Create Google Play Console Account',
      description: 'Required for Android app submission',
      action: 'Sign up at play.google.com/console',
      url: 'https://play.google.com/console',
      priority: 'high',
      timeEstimate: '10 min',
      cost: '$25 one-time',
      completed: false,
      category: 'immediate'
    },
    {
      id: '5',
      title: 'Install Xcode (macOS only)',
      description: 'Required for iOS development',
      action: 'Download from Mac App Store',
      priority: 'medium',
      timeEstimate: '30-60 min',
      note: 'Large download (10+ GB)',
      completed: false,
      category: 'development'
    },
    {
      id: '6',
      title: 'Install Android Studio',
      description: 'Required for Android development',
      action: 'Download from developer.android.com',
      url: 'https://developer.android.com/studio',
      priority: 'medium',
      timeEstimate: '20-30 min',
      completed: false,
      category: 'development'
    }
  ]);

  const toggleCompleted = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  const immediateActions = items.filter(item => item.category === 'immediate');
  const developmentActions = items.filter(item => item.category === 'development');
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  const nextCommands = [
    'npm install @capacitor/core @capacitor/cli',
    'npx cap init',
    'npx cap add ios',
    'npx cap add android',
    'npm run build',
    'npx cap sync'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <CheckSquare className="h-6 w-6" />
          Enhanced Actionable Items
        </h2>
        <p className="text-muted-foreground">
          Track progress and add custom items for comprehensive analysis
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline">
            {completedCount}/{totalCount} Completed
          </Badge>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Items
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Full Analysis Data Entry</DialogTitle>
              </DialogHeader>
              <AnalysisDataEntry />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertDescription>
          <strong>Progress Tracking:</strong> Check off items as you complete them. All items become data points for analysis.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">🚨 Immediate Actions (Do These First)</h3>
          <div className="grid gap-4">
            {immediateActions.map((item) => (
              <Card key={item.id} className={item.completed ? 'opacity-75 bg-green-50' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleCompleted(item.id)}
                      />
                      <div>
                        <CardTitle className={`text-base ${item.completed ? 'line-through' : ''}`}>
                          {item.title}
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
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
                      <Button size="sm" asChild disabled={item.completed}>
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
            {developmentActions.map((item) => (
              <Card key={item.id} className={item.completed ? 'opacity-75 bg-green-50' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleCompleted(item.id)}
                      />
                      <div>
                        <CardTitle className={`text-base ${item.completed ? 'line-through' : ''}`}>
                          {item.title}
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
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
                      <Button size="sm" variant="outline" asChild disabled={item.completed}>
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
          <strong>Analysis Ready:</strong> All completed items and custom entries will be included in your comprehensive analysis report.
        </AlertDescription>
      </Alert>
    </div>
  );
}