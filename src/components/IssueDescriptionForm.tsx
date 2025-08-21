import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import TrackConditionsForm from './TrackConditionsForm';

interface IssueDescriptionData {
  issueDescription: string;
  // Entry issues
  entryUndersteer: boolean;
  entryOversteer: boolean;
  // Exit issues
  exitUndersteer: boolean;
  exitOversteer: boolean;
  // Mid-corner issues
  midCornerUndersteer: boolean;
  // General issues
  wanderingHighSpeed: boolean;
  wontTurnIn: boolean;
  snapOversteer: boolean;
  poorBraking: boolean;
  instability: boolean;
  tireWear: boolean;
  // Track conditions
  temperature: string;
  weather: 'sunny' | 'cloudy' | '';
  trackSurface: 'dry' | 'wet' | '';
}

interface IssueDescriptionFormProps {
  data: IssueDescriptionData;
  onChange: (field: keyof IssueDescriptionData, value: string | boolean) => void;
}

const IssueDescriptionForm: React.FC<IssueDescriptionFormProps> = ({ data, onChange }) => {
  const entryIssues = [
    { key: 'entryUndersteer' as const, label: 'Entry Understeer' },
    { key: 'entryOversteer' as const, label: 'Entry Oversteer' }
  ];
  
  const exitIssues = [
    { key: 'exitUndersteer' as const, label: 'Exit Understeer' },
    { key: 'exitOversteer' as const, label: 'Exit Oversteer' }
  ];
  
  const midCornerIssues = [
    { key: 'midCornerUndersteer' as const, label: 'Mid-Corner Understeer' }
  ];
  
  const generalIssues = [
    { key: 'wanderingHighSpeed' as const, label: 'Wandering at high speed' },
    { key: 'wontTurnIn' as const, label: "Won't turn in" },
    { key: 'snapOversteer' as const, label: 'Snap oversteer' },
    { key: 'poorBraking' as const, label: 'Poor braking performance' },
    { key: 'instability' as const, label: 'Car instability' },
    { key: 'tireWear' as const, label: 'Uneven tire wear' }
  ];

  const renderIssueSection = (title: string, issues: typeof entryIssues, color: string) => (
    <div>
      <h4 className={`font-medium mb-3 ${color}`}>{title}</h4>
      <div className="grid grid-cols-1 gap-2">
        {issues.map((issue) => (
          <div key={issue.key} className="flex items-center space-x-2">
            <Checkbox
              id={issue.key}
              checked={data[issue.key]}
              onCheckedChange={(checked) => onChange(issue.key, !!checked)}
            />
            <Label htmlFor={issue.key} className="text-sm">
              {issue.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <TrackConditionsForm
        data={{
          temperature: data.temperature,
          weather: data.weather,
          trackSurface: data.trackSurface
        }}
        onChange={onChange}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Race Car Handling Issues</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {renderIssueSection('Corner Entry', entryIssues, 'text-red-700')}
              <Separator />
              {renderIssueSection('Corner Exit', exitIssues, 'text-green-700')}
            </div>
            
            <div className="space-y-4">
              {renderIssueSection('Mid-Corner', midCornerIssues, 'text-blue-700')}
              <Separator />
              {renderIssueSection('General Issues', generalIssues, 'text-gray-700')}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <Label>Additional Details</Label>
            <Textarea
              value={data.issueDescription}
              onChange={(e) => onChange('issueDescription', e.target.value)}
              placeholder="Describe specific handling characteristics, track conditions, or other details about the issues you're experiencing..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueDescriptionForm;