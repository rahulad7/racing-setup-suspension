import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from './FileUpload';
import { AIAnalysisResults } from './AIAnalysisResults';
import HandlingDiagnosisReport from './HandlingDiagnosisReport';
import HandlingRecommendationsModal from './HandlingRecommendationsModal';
import PlanRequiredModal from './PlanRequiredModal';
import { supabase } from '@/lib/supabase';
import { useSupabaseFormPersistence } from '@/hooks/useSupabaseFormPersistence';
import { useLicensePlan } from '@/hooks/useLicensePlan';
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

const commonIssues = [
  { id: 'understeer', label: 'Understeer (car won\'t turn in)' },
  { id: 'oversteer', label: 'Oversteer (rear slides out)' },
  { id: 'snapOversteer', label: 'Snap oversteer (sudden loss of rear)' },
  { id: 'liftOffOversteer', label: 'Lift-off oversteer' },
  { id: 'wandering', label: 'Car wandering/unstable on straights' },
  { id: 'poorBraking', label: 'Poor braking performance' },
  { id: 'brakeLockup', label: 'Brake lockup (front or rear)' },
  { id: 'brakeBalance', label: 'Poor brake balance' },
  { id: 'trailBraking', label: 'Difficulty trail braking' },
];

interface HandlingIssuesFormProps {
  data?: { [key: string]: HandlingIssue };
  onChange?: (issueId: string, field: keyof HandlingIssue, value: boolean) => void;
}

const HandlingIssuesForm: React.FC<HandlingIssuesFormProps> = ({ data, onChange }) => {
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [issueDetails, setIssueDetails] = useState<HandlingIssue | null>(null);
  const [showReport, setShowReport] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [analysisLoading, setAnalysisLoading] = useState(false);

  // Move hooks to top level
  const { formData: setupData } = useSupabaseFormPersistence('setup-tabs');
  const { formData: trackData } = useSupabaseFormPersistence('track-form');
  const { isLicenseValid, isFreeTrialPlan, isTwoDayPlan, isMonthlyPlan, isAnnualPlan } = useLicensePlan();
  const handleIssueSelect = (issueId: string) => {
    setSelectedIssue(issueId);
    const issue = commonIssues.find(i => i.id === issueId);
    if (issue) {
      setIssueDetails({
        id: issueId,
        label: issue.label,
        cornerEntry: false,
        midCorner: false,
        cornerExit: false,
        highSpeed: false,
        lowSpeed: false,
        underBraking: false
      });
    }
    setShowReport(false);
  };

  const handleDetailCheckbox = (field: keyof HandlingIssue, value: boolean) => {
    if (issueDetails) {
      setIssueDetails(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleRaceSetupProAnalysis = async () => {
    if (!issueDetails) return;

    // Check if user has a valid license
    if (!isLicenseValid) {
      setShowPlanModal(true);
      return;
    }

    setAnalysisLoading(true);
    try {
      // Determine analysis depth based on plan
      let analysisType = 'basic';
      if (isFreeTrialPlan()) {
        analysisType = 'basic';
      } else if (isTwoDayPlan()) {
        analysisType = 'standard';
      } else if (isMonthlyPlan()) {
        analysisType = 'advanced';
      } else if (isAnnualPlan()) {
        analysisType = 'premium';
      }

      const { data, error } = await supabase.functions.invoke('analyze-setup-data', {
        body: {
          setupData,
          trackData,
          fileUrls: uploadedFiles,
          issueDescription: `${issueDetails.label}: ${issueDescription}`,
          analysisType
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        // Provide fallback analysis for better user experience
        setAiAnalysis(`Analysis temporarily unavailable. Based on your selected issue "${issueDetails.label}", here are some general recommendations:

• Check suspension settings and alignment
• Review tire pressures and compound choice
• Verify aerodynamic balance
• Consider brake balance adjustments

Please try again later or contact support if the issue persists.`);
        setShowReport(true);
        return;
      }
      
      if (data?.analysis) {
        setAiAnalysis(data.analysis);
      } else {
        setAiAnalysis('Analysis completed but no specific recommendations were generated. Please check your setup data and try again.');
      }
      
      setShowReport(true);
    } catch (error) {
      console.error('Race Setup Pro Analysis error:', error);
      // Provide fallback analysis for better user experience
      setAiAnalysis(`Analysis temporarily unavailable. Based on your selected issue "${issueDetails.label}", here are some general recommendations:

• Check suspension settings and alignment
• Review tire pressures and compound choice
• Verify aerodynamic balance
• Consider brake balance adjustments

Please try again later or contact support if the issue persists.`);
      setShowReport(true);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const handleShowRecommendations = () => {
    setShowModal(true);
  };

  const handleAcceptDisclaimer = () => {
    setShowModal(false);
    // Here you would show the actual recommendations
    console.log('User accepted disclaimer, showing recommendations...');
  };
  const getSelectedSubOptions = (): string[] => {
    if (!issueDetails) return [];
    const options: string[] = [];
    if (issueDetails.cornerEntry) options.push('Corner Entry');
    if (issueDetails.midCorner) options.push('Mid-Corner');
    if (issueDetails.cornerExit) options.push('Corner Exit');
    if (issueDetails.highSpeed) options.push('High Speed');
    if (issueDetails.lowSpeed) options.push('Low Speed');
    if (issueDetails.underBraking) options.push('Under Braking');
    return options;
  };

  const hasSelectedSubOptions = issueDetails && (
    issueDetails.cornerEntry || issueDetails.midCorner || issueDetails.cornerExit ||
    issueDetails.highSpeed || issueDetails.lowSpeed || issueDetails.underBraking
  );

  if (showReport && issueDetails) {
    return (
      <>
        <HandlingDiagnosisReport
          selectedIssue={issueDetails.label}
          selectedSubOptions={getSelectedSubOptions()}
          onShowRecommendations={handleShowRecommendations}
        />
        <HandlingRecommendationsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAccept={handleAcceptDisclaimer}
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Track Car Handling Issues</CardTitle>
          <p className="text-sm text-slate-400">
            Select a handling problem you're experiencing, then specify when it occurs
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-white">Select Handling Issue:</Label>
            <Select value={selectedIssue} onValueChange={handleIssueSelect}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Choose a handling issue..." />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {commonIssues.map((issue) => (
                  <SelectItem 
                    key={issue.id} 
                    value={issue.id}
                    className="text-white hover:bg-slate-600"
                  >
                    {issue.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {issueDetails && (
            <div className="space-y-4 p-4 border border-slate-600 rounded-lg bg-slate-800/30">
              <h3 className="font-medium text-white">When does this issue occur?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cornerEntry"
                    checked={issueDetails.cornerEntry || false}
                    onCheckedChange={(checked) => handleDetailCheckbox('cornerEntry', !!checked)}
                  />
                  <Label htmlFor="cornerEntry" className="text-slate-300">Corner Entry</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="midCorner"
                    checked={issueDetails.midCorner || false}
                    onCheckedChange={(checked) => handleDetailCheckbox('midCorner', !!checked)}
                  />
                  <Label htmlFor="midCorner" className="text-slate-300">Mid-Corner</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cornerExit"
                    checked={issueDetails.cornerExit || false}
                    onCheckedChange={(checked) => handleDetailCheckbox('cornerExit', !!checked)}
                  />
                  <Label htmlFor="cornerExit" className="text-slate-300">Corner Exit</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="highSpeed"
                    checked={issueDetails.highSpeed || false}
                    onCheckedChange={(checked) => handleDetailCheckbox('highSpeed', !!checked)}
                  />
                  <Label htmlFor="highSpeed" className="text-slate-300">High Speed</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowSpeed"
                    checked={issueDetails.lowSpeed || false}
                    onCheckedChange={(checked) => handleDetailCheckbox('lowSpeed', !!checked)}
                  />
                  <Label htmlFor="lowSpeed" className="text-slate-300">Low Speed</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="underBraking"
                    checked={issueDetails.underBraking || false}
                    onCheckedChange={(checked) => handleDetailCheckbox('underBraking', !!checked)}
                  />
                  <Label htmlFor="underBraking" className="text-slate-300">Under Braking</Label>
                </div>
              </div>
            </div>
          )}

          {issueDetails && (
            <>
              <div className="space-y-2">
                <Label className="text-white">Describe the issue in detail:</Label>
                <Textarea
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  placeholder="Describe what you're experiencing, when it happens, and any other relevant details..."
                  className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                />
              </div>

            </>
          )}
        </CardContent>
      </Card>


      {issueDetails && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button 
              onClick={handleRaceSetupProAnalysis}
              disabled={analysisLoading}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 text-xl font-bold rounded-lg shadow-lg"
              size="lg"
            >
              {analysisLoading ? 'Analyzing...' : 'Race Setup Pro Analysis'}
            </Button>
          </div>

          {aiAnalysis && (
            <AIAnalysisResults analysis={aiAnalysis} loading={analysisLoading} />
          )}
        </div>
      )}

      <PlanRequiredModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
      />
    </div>
  );
};

export default HandlingIssuesForm;