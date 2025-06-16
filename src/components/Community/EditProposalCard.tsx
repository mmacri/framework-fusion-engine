
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, MessageSquare, Clock, User, CheckCircle } from "lucide-react";
import { CommunityEdit } from "@/types/community";

interface EditProposalCardProps {
  edit: CommunityEdit;
  onVote: (editId: string, vote: 'approve' | 'reject') => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => React.ReactNode;
  userVoted?: 'approve' | 'reject';
}

export function EditProposalCard({ edit, onVote, getStatusColor, getStatusIcon, userVoted }: EditProposalCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'control_update': return 'bg-blue-100 text-blue-800';
      case 'new_control': return 'bg-green-100 text-green-800';
      case 'mapping_update': return 'bg-purple-100 text-purple-800';
      case 'new_mapping': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'control_update': return 'Control Update';
      case 'new_control': return 'New Control';
      case 'mapping_update': return 'Mapping Update';
      case 'new_mapping': return 'New Mapping';
      default: return type;
    }
  };

  const isVotingDisabled = edit.status === 'approved' || edit.status === 'rejected' || userVoted;
  const approvalProgress = (edit.votes.approve / 10) * 100; // 10 votes needed for approval

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={getTypeColor(edit.type)}>
                {getTypeLabel(edit.type)}
              </Badge>
              <Badge variant="outline" className={getStatusColor(edit.status)}>
                {getStatusIcon(edit.status)}
                <span className="ml-1 capitalize">{edit.status.replace('_', ' ')}</span>
              </Badge>
              {edit.proposedData?.framework && (
                <Badge variant="outline">
                  {edit.proposedData.framework.toUpperCase()}
                </Badge>
              )}
              {userVoted && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  You voted {userVoted}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{edit.title}</CardTitle>
            <CardDescription className="line-clamp-2">{edit.description}</CardDescription>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {edit.proposedBy}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatDate(edit.proposedAt)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Proposed Changes Preview */}
          <div className="bg-accent p-3 rounded-lg">
            <h4 className="font-medium mb-2">Proposed Changes</h4>
            {edit.proposedData.controlId && (
              <div className="text-sm mb-1">
                <span className="font-medium">Control ID: </span>
                {edit.proposedData.controlId}
              </div>
            )}
            {edit.proposedData.title && (
              <div className="text-sm">
                <span className="font-medium">Title: </span>
                {edit.proposedData.title}
              </div>
            )}
            {edit.proposedData.description && (
              <div className="text-sm mt-1">
                <span className="font-medium">Description: </span>
                {edit.proposedData.description.substring(0, 150)}
                {edit.proposedData.description.length > 150 && "..."}
              </div>
            )}
          </div>

          {/* Approval Progress */}
          {edit.status === 'pending' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Approval Progress</span>
                <span>{edit.votes.approve}/10 votes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(approvalProgress, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Voting and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={userVoted === 'approve' ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onVote(edit.id, 'approve');
                  }}
                  disabled={isVotingDisabled}
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="h-4 w-4" />
                  {edit.votes.approve}
                </Button>
                <Button
                  size="sm"
                  variant={userVoted === 'reject' ? "destructive" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onVote(edit.id, 'reject');
                  }}
                  disabled={isVotingDisabled}
                  className="flex items-center gap-1"
                >
                  <ThumbsDown className="h-4 w-4" />
                  {edit.votes.reject}
                </Button>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                {edit.comments.length} comments
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Click to view details
            </div>
          </div>

          {/* Reviewers */}
          {edit.reviewers.length > 0 && (
            <div className="text-sm">
              <span className="font-medium">Expert Reviewers: </span>
              <span className="text-muted-foreground">{edit.reviewers.length} assigned</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
