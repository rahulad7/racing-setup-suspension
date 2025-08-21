import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

interface AIAnalysisResultsProps {
  analysis: string;
  loading?: boolean;
}

export function AIAnalysisResults({ analysis, loading }: AIAnalysisResultsProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) return null;

  let parsedAnalysis;
  try {
    parsedAnalysis = JSON.parse(analysis);
  } catch {
    // If not JSON, treat as plain text
    parsedAnalysis = { analysis: analysis };
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            AI Setup Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {parsedAnalysis.rootCause && (
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                Root Cause Analysis
              </h4>
              <p className="text-sm text-gray-700">{parsedAnalysis.rootCause}</p>
            </div>
          )}

          {parsedAnalysis.recommendations && (
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Recommendations
              </h4>
              {Array.isArray(parsedAnalysis.recommendations) ? (
                <ul className="space-y-1">
                  {parsedAnalysis.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700">• {rec}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-700">{parsedAnalysis.recommendations}</p>
              )}
            </div>
          )}

          {parsedAnalysis.priorities && (
            <div>
              <h4 className="font-semibold mb-2">Priority Order</h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(parsedAnalysis.priorities) ? (
                  parsedAnalysis.priorities.map((priority: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {index + 1}. {priority}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-700">{parsedAnalysis.priorities}</p>
                )}
              </div>
            </div>
          )}

          {parsedAnalysis.analysis && !parsedAnalysis.rootCause && (
            <div>
              <h4 className="font-semibold mb-2">Analysis</h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{parsedAnalysis.analysis}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}