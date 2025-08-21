import React, { useState, useEffect } from 'react';
import ModernAppLayout from '@/components/ModernAppLayout';
import HandlingIssuesForm from '@/components/HandlingIssuesForm';
import RunAnalysisModal from '@/components/RunAnalysisModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVehicleSetupsGlobal } from '@/hooks/useVehicleSetupsGlobal';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, User, Database } from 'lucide-react';
interface HandlingIssue {
  id: string;
  label: string;
  cornerEntry?: boolean;
  midCorner?: boolean;
  cornerExit?: boolean;
  highSpeed?: boolean;
  lowSpeed?: boolean;
  underBraking?: boolean;
}

interface HandlingIssuesData {
  [key: string]: HandlingIssue;
}

const Troubleshooting: React.FC = () => {
  const [issuesData, setIssuesData] = useState<HandlingIssuesData>({});
  const [selectedSetupId, setSelectedSetupId] = useState<string>('');
  const [showRunAnalysisModal, setShowRunAnalysisModal] = useState(false);
  const { setups, loading, loadSetups } = useVehicleSetupsGlobal();
  const { user, loading: authLoading } = useAuth();
  // Force load setups when component mounts
  useEffect(() => {
    if (user && !loading) {
      loadSetups();
    }
  }, [user, loadSetups]);

  // Debug logging
  useEffect(() => {
    console.log('Troubleshooting Debug:', {
      user: user ? { id: user.id, email: user.email } : null,
      authLoading,
      setupsLoading: loading,
      setupsCount: setups.length,
      setups: setups.map(s => ({ id: s.id, name: s.name, track: s.track_name }))
    });
  }, [user, authLoading, loading, setups]);
  const handleIssueChange = (issueId: string, field: keyof HandlingIssue, value: boolean) => {
    setIssuesData(prev => {
      const newData = { ...prev };
      
      if (field === 'label' && value) {
        // Initialize the issue
        newData[issueId] = { id: issueId, label: issueId, ...prev[issueId] };
      } else if (field !== 'label') {
        // Update specific field
        if (newData[issueId]) {
          newData[issueId] = { ...newData[issueId], [field]: value };
        }
      }
      
      return newData;
    });
  };

  const handleAnalyze = () => {
    const selectedIssues = Object.values(issuesData);
    console.log('Selected issues:', selectedIssues);
    // Here you would typically send this data to your analysis engine
  };

  const handleRunAnalysis = (vehicleId: string, setupId: string) => {
    console.log('Running analysis for vehicle:', vehicleId, 'setup:', setupId);
    // Here you would run the actual analysis
    // For now, just log the selection
  };

  const hasSelectedIssues = Object.keys(issuesData).length > 0;

  return (
    <ModernAppLayout>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Track Car Handling Issues</h1>
          <p className="text-muted-foreground">
            Identify and categorize your car's handling problems for targeted setup recommendations
          </p>
        </div>

        {/* Saved Setups Card */}
        <Card>
          <CardHeader>
            <CardTitle>Saved Setups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-lg">Which setup would you like help with?</p>
              <Select value={selectedSetupId} onValueChange={setSelectedSetupId} disabled={!user || loading}>
                <SelectTrigger>
                  <SelectValue placeholder={
                    !user ? "Please sign in to view setups..." :
                    loading ? "Loading setups..." :
                    setups.length === 0 ? "No saved setups found" :
                    "Select a saved setup..."
                  } />
                </SelectTrigger>
                <SelectContent>
                  {loading ? (
                    <SelectItem value="loading" disabled>Loading setups...</SelectItem>
                  ) : !user ? (
                    <SelectItem value="no-auth" disabled>Please sign in first</SelectItem>
                  ) : setups.length === 0 ? (
                    <SelectItem value="no-setups" disabled>No saved setups found</SelectItem>
                  ) : (
                    setups.map((setup) => (
                      <SelectItem key={setup.id} value={setup.id}>
                        {setup.name} {setup.track_name ? `- ${setup.track_name}` : ''}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <HandlingIssuesForm 
          data={issuesData}
          onChange={handleIssueChange}
        />

        {hasSelectedIssues && (
          <Card>
            <CardHeader>
              <CardTitle>Selected Issues Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.values(issuesData).map(issue => (
                  <div key={issue.id} className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium">{issue.label}</p>
                    <div className="text-sm text-muted-foreground">
                      Occurs during: {[
                        issue.cornerEntry && 'Corner Entry',
                        issue.midCorner && 'Mid-Corner', 
                        issue.cornerExit && 'Corner Exit',
                        issue.highSpeed && 'High Speed',
                        issue.lowSpeed && 'Low Speed',
                        issue.underBraking && 'Under Braking'
                      ].filter(Boolean).join(', ') || 'Not specified'}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button onClick={handleAnalyze} className="w-full">
                  Analyze Issues & Get Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Run Analysis Button - Fixed at bottom */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Button 
            onClick={() => setShowRunAnalysisModal(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
          >
            Run Analysis
          </Button>
        </div>

        {/* Run Analysis Modal */}
        <RunAnalysisModal
          isOpen={showRunAnalysisModal}
          onClose={() => setShowRunAnalysisModal(false)}
          onConfirm={handleRunAnalysis}
        />
      </div>
    </ModernAppLayout>
  );
};

export default Troubleshooting;