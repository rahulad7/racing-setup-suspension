import React, { useState } from 'react';
import ModernAppLayout from '@/components/ModernAppLayout';
import HandlingIssuesForm from '@/components/HandlingIssuesForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const Issues: React.FC = () => {
  const [issuesData, setIssuesData] = useState<HandlingIssuesData>({});

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
      </div>
    </ModernAppLayout>
  );
};

export default Issues;