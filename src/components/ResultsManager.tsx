import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, FileText, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  id: string;
  name: string;
  vehicleId: string;
  setupData: any;
  issueData: any;
  results: string;
  createdAt: string;
}

interface ResultsManagerProps {
  vehicleId: string;
  onSaveResult?: (name: string, setupData: any, issueData: any, results: string) => void;
}

const ResultsManager: React.FC<ResultsManagerProps> = ({ vehicleId, onSaveResult }) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [resultName, setResultName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadResults();
  }, [vehicleId]);

  const loadResults = async () => {
    try {
      const { data, error } = await supabase
        .from('analysis_results')
        .select('*')
        .eq('vehicle_id', vehicleId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Error loading results:', error);
    }
  };

  const saveResult = async (name: string, setupData: any, issueData: any, results: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('analysis_results')
        .insert({
          name,
          vehicle_id: vehicleId,
          data: setupData,
          issue_data: issueData,
          results,
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Result Saved",
        description: `Analysis result "${name}" has been saved.`
      });

      loadResults();
      setShowSaveDialog(false);
      setResultName('');
    } catch (error) {
      console.error('Error saving result:', error);
      toast({
        title: "Error",
        description: "Failed to save result. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteResult = async (id: string) => {
    try {
      const { error } = await supabase
        .from('analysis_results')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Result Deleted",
        description: "Analysis result has been deleted."
      });

      loadResults();
      if (selectedResult?.id === id) {
        setSelectedResult(null);
      }
    } catch (error) {
      console.error('Error deleting result:', error);
      toast({
        title: "Error",
        description: "Failed to delete result. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save New Result
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Analysis Result</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resultName">Result Name</Label>
                <Input
                  id="resultName"
                  value={resultName}
                  onChange={(e) => setResultName(e.target.value)}
                  placeholder="e.g., Laguna Seca Setup Analysis"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    if (resultName.trim() && onSaveResult) {
                      onSaveResult(resultName, {}, {}, 'Analysis results would go here');
                    }
                  }}
                  disabled={!resultName.trim() || loading}
                >
                  {loading ? 'Saving...' : 'Save Result'}
                </Button>
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {results.map((result) => (
          <Card 
            key={result.id} 
            className={`bg-gray-800/50 border-blue-500/20 cursor-pointer transition-colors ${
              selectedResult?.id === result.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedResult(result)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-400" />
                  <div>
                    <h3 className="font-semibold text-white">{result.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(result.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResult(result.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {results.length === 0 && (
        <Card className="bg-gray-800/50 border-blue-500/20 text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-500">No analysis results saved yet. Run an analysis and save the results to see them here.</p>
          </CardContent>
        </Card>
      )}

      {selectedResult && (
        <Card className="bg-gray-800/50 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">{selectedResult.name} - Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Analysis Results:</h4>
                <p className="text-gray-300">{selectedResult.results}</p>
              </div>
              <div className="text-sm text-gray-400">
                <p>Saved on: {new Date(selectedResult.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsManager;