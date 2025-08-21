import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, MapPin, Calendar, TrendingUp } from 'lucide-react';

interface TrackSession {
  id: string;
  trackName: string;
  date: string;
  vehicleId: string;
  vehicleName: string;
  issues: string[];
  improvements: string[];
  lapTime?: string;
}

interface TrackHistoryProps {
  sessions: TrackSession[];
  onSessionSelect: (session: TrackSession) => void;
}

const TrackHistory: React.FC<TrackHistoryProps> = ({ sessions, onSessionSelect }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getIssueColor = (issue: string) => {
    if (issue.toLowerCase().includes('understeer')) return 'bg-blue-500/20 text-blue-400';
    if (issue.toLowerCase().includes('oversteer')) return 'bg-red-500/20 text-red-400';
    if (issue.toLowerCase().includes('braking')) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-gray-500/20 text-gray-400';
  };

  return (
    <Card className="bg-gray-800/50 border-red-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <History className="h-5 w-5" />
          Track History
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No track sessions recorded yet.</p>
            <p className="text-sm mt-2">Complete your first analysis to start building history.</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sessions.map((session) => (
              <div key={session.id} className="p-4 border border-gray-600 rounded-lg hover:border-red-500/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-400" />
                      {session.trackName}
                    </h3>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(session.date)}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">{session.vehicleName}</p>
                  </div>
                  {session.lapTime && (
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {session.lapTime}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2">
                  {session.issues.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Issues Addressed:</p>
                      <div className="flex flex-wrap gap-1">
                        {session.issues.slice(0, 3).map((issue, index) => (
                          <Badge key={index} className={`text-xs ${getIssueColor(issue)}`}>
                            {issue}
                          </Badge>
                        ))}
                        {session.issues.length > 3 && (
                          <Badge className="text-xs bg-gray-500/20 text-gray-400">
                            +{session.issues.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {session.improvements.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Improvements Made:</p>
                      <div className="flex flex-wrap gap-1">
                        {session.improvements.slice(0, 2).map((improvement, index) => (
                          <Badge key={index} className="text-xs bg-green-500/20 text-green-400">
                            {improvement}
                          </Badge>
                        ))}
                        {session.improvements.length > 2 && (
                          <Badge className="text-xs bg-gray-500/20 text-gray-400">
                            +{session.improvements.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={() => onSessionSelect(session)}
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrackHistory;