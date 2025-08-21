import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckSquare, Plus, Trash2, Save, Database, BarChart3 } from 'lucide-react';
import { useActionableItems, ActionableItem } from '@/hooks/useActionableItems';
import { useToast } from '@/hooks/use-toast';

export function DataEntryActionableItems() {
  const { items, loading, addItem, toggleCompleted, deleteItem } = useActionableItems();
  const { toast } = useToast();
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    category: 'immediate',
    time_estimate: '',
    cost: '',
    url: ''
  });

  const handleAddItem = async () => {
    if (newItem.title && newItem.description) {
      await addItem({
        ...newItem,
        completed: false
      });
      setNewItem({
        title: '',
        description: '',
        priority: 'medium',
        category: 'immediate',
        time_estimate: '',
        cost: '',
        url: ''
      });
    }
  };

  const generateAnalysis = () => {
    const total = items.length;
    const completed = items.filter(i => i.completed).length;
    const highPriority = items.filter(i => i.priority === 'high').length;
    
    toast({
      title: 'Analysis Generated',
      description: `${completed}/${total} items completed. ${highPriority} high priority items remaining.`
    });
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Database className="h-6 w-6" />
          Actionable Items Data Entry
        </h2>
        <p className="text-muted-foreground">
          Add and track all actionable items for comprehensive analysis
        </p>
        <Badge variant="outline">
          {completedCount}/{totalCount} Completed
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Action Item</CardTitle>
          <CardDescription>Create custom actionable items for analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                placeholder="Enter action title"
              />
            </div>
            <div>
              <Label>Time Estimate</Label>
              <Input
                value={newItem.time_estimate}
                onChange={(e) => setNewItem({...newItem, time_estimate: e.target.value})}
                placeholder="e.g., 5 min"
              />
            </div>
          </div>
          
          <div>
            <Label>Description</Label>
            <Textarea
              value={newItem.description}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              placeholder="Describe what needs to be done"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Priority</Label>
              <Select value={newItem.priority} onValueChange={(value: any) => setNewItem({...newItem, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="deployment">Deployment</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cost (optional)</Label>
              <Input
                value={newItem.cost}
                onChange={(e) => setNewItem({...newItem, cost: e.target.value})}
                placeholder="e.g., $99/year"
              />
            </div>
          </div>

          <Button onClick={handleAddItem} className="w-full" disabled={loading}>
            <Plus className="h-4 w-4 mr-2" />
            Add Action Item
          </Button>
        </CardContent>
      </Card>

      {items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>All Action Items ({items.length})</CardTitle>
            <CardDescription>Track progress and manage your actionable items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className={`flex items-center justify-between p-3 border rounded ${item.completed ? 'bg-green-50' : ''}`}>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleCompleted(item.id)}
                    />
                    <div className={item.completed ? 'opacity-50' : ''}>
                      <div className={`font-medium ${item.completed ? 'line-through' : ''}`}>{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={item.priority === 'high' ? 'destructive' : 'default'}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline">{item.time_estimate}</Badge>
                        {item.cost && <Badge variant="outline">{item.cost}</Badge>}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <Button onClick={generateAnalysis} className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Analysis Report
            </Button>
          </CardContent>
        </Card>
      )}

      <Alert>
        <CheckSquare className="h-4 w-4" />
        <AlertDescription>
          <strong>Analysis Ready:</strong> All items become data points for comprehensive analysis and reporting.
        </AlertDescription>
      </Alert>
    </div>
  );
}