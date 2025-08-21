import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataEntryForm } from './DataEntryForm';
import { ActionableItems } from './ActionableItems';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Database, FileText, CheckSquare, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DataEntry {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  timeEstimate: string;
  cost?: string;
  url?: string;
  completed: boolean;
}

export function AnalysisDataEntry() {
  const [customEntries, setCustomEntries] = useState<DataEntry[]>([]);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const { toast } = useToast();

  const handleSaveEntries = (entries: DataEntry[]) => {
    setCustomEntries(entries);
    toast({
      title: "Data Saved",
      description: `${entries.length} action items saved for analysis.`
    });
  };

  const generateAnalysis = () => {
    const totalItems = customEntries.length;
    const completedItems = customEntries.filter(item => item.completed).length;
    const highPriorityItems = customEntries.filter(item => item.priority === 'high').length;
    const categories = [...new Set(customEntries.map(item => item.category))];
    
    const analysis = {
      totalItems,
      completedItems,
      completionRate: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
      highPriorityItems,
      categories: categories.length,
      categoryBreakdown: categories.map(cat => ({
        name: cat,
        count: customEntries.filter(item => item.category === cat).length
      }))
    };
    
    setAnalysisData(analysis);
    toast({
      title: "Analysis Generated",
      description: "Full analysis report is ready for review."
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Database className="h-6 w-6" />
          Full Analysis Data Entry
        </h2>
        <p className="text-muted-foreground">
          Add all actionable items as data entry points for comprehensive analysis
        </p>
      </div>

      <Tabs defaultValue="default" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="default">Default Items</TabsTrigger>
          <TabsTrigger value="custom">Custom Entry</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="report">Report</TabsTrigger>
        </TabsList>

        <TabsContent value="default" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Standard Actionable Items
              </CardTitle>
              <CardDescription>
                These are the default action items included in every analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ActionableItems />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <DataEntryForm 
            onSave={handleSaveEntries}
            initialEntries={customEntries}
          />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Generate Analysis
              </CardTitle>
              <CardDescription>
                Create a comprehensive analysis from all data entry points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Data Sources:</strong> Default items + {customEntries.length} custom entries
                  </AlertDescription>
                </Alert>
                
                <Button onClick={generateAnalysis} className="w-full" size="lg">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Full Analysis Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          {analysisData ? (
            <Card>
              <CardHeader>
                <CardTitle>Analysis Report</CardTitle>
                <CardDescription>Comprehensive analysis of all action items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{analysisData.totalItems}</div>
                    <div className="text-sm text-muted-foreground">Total Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analysisData.completedItems}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{analysisData.completionRate}%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{analysisData.highPriorityItems}</div>
                    <div className="text-sm text-muted-foreground">High Priority</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Category Breakdown</h4>
                  {analysisData.categoryBreakdown.map((cat: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="capitalize">{cat.name}</span>
                      <Badge variant="outline">{cat.count} items</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No analysis generated yet. Go to the Analysis tab to create a report.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}