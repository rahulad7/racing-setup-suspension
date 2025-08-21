import React, { useState } from 'react';
import { Shield, Trash2, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface Track {
  id: string;
  name: string;
  submission_count: number;
  is_approved: boolean;
  region?: string;
  track_type?: string;
  created_at: string;
}

interface TrackAdminControlsProps {
  tracks: Track[];
  onTracksUpdate: () => void;
  isAdmin: boolean;
}

const TrackAdminControls: React.FC<TrackAdminControlsProps> = ({
  tracks,
  onTracksUpdate,
  isAdmin
}) => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  if (!isAdmin) {
    return null;
  }

  const handleApproveTrack = async (trackId: string, trackName: string) => {
    setLoading(trackId);
    try {
      const { error } = await supabase.functions.invoke('admin-approve-track', {
        body: { trackId }
      });
      
      if (error) throw error;
      
      toast({
        title: 'Track Approved',
        description: `${trackName} has been approved and added to the list.`
      });
      
      onTracksUpdate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve track',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };

  const handleDeleteTrack = async (trackId: string, trackName: string) => {
    setLoading(trackId);
    try {
      const { error } = await supabase.functions.invoke('admin-delete-track', {
        body: { trackId }
      });
      
      if (error) throw error;
      
      toast({
        title: 'Track Deleted',
        description: `${trackName} has been removed.`
      });
      
      onTracksUpdate();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete track',
        variant: 'destructive'
      });
    } finally {
      setLoading(null);
    }
  };

  const pendingTracks = tracks.filter(t => !t.is_approved);
  const approvedTracks = tracks.filter(t => t.is_approved);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Track Administration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingTracks.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Pending Approval ({pendingTracks.length})</h4>
              <div className="space-y-2">
                {pendingTracks.map((track) => (
                  <div key={track.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{track.name}</span>
                      <Badge variant="outline">{track.submission_count} submissions</Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApproveTrack(track.id, track.name)}
                        disabled={loading === track.id}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" disabled={loading === track.id}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Track</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{track.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteTrack(track.id, track.name)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="font-medium mb-2">Approved Tracks ({approvedTracks.length})</h4>
            <div className="text-sm text-slate-600">
              {approvedTracks.length} tracks currently available in the dropdown
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackAdminControls;