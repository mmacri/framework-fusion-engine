
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, MessageSquare, User, Clock } from "lucide-react";
import { CommunityEdit } from "@/types/community";
import { EditDetailDialog } from "./EditDetailDialog";

interface EditProposalCardProps {
  edit: CommunityEdit;
  onVote: (editId: string, vote: 'approve' | 'reject') => void;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
}

export function EditProposalCard({ edit, onVote, getStatusColor, getStatusIcon }: EditProposalCardProps) {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'control_update': return 'Control Update';
      case 'new_control': return 'New Control';
      case 'mapping_update': return 'Mapping Update';
      case 'new_mapping': return 'New Mapping';
      default: return type;
    }
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

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={getTypeColor(edit.type)} variant="secondary">
                {getTypeLabel(edit.type)}
              </Badge>
              <Badge className={getStatusColor(edit.status)} variant="secondary">
                {getStatusIcon(edit.status)}
                <span className="ml-1 capitalize">{edit.status.replace('_', ' ')}</span>
              </Badge>
            </div>
            <CardTitle className="text-lg">{edit.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{edit.description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{edit.proposedBy}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(edit.proposedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {edit.reviewers.map((reviewer, index) => (
              <Avatar key={index} className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {reviewer.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <span className="font-medium">{edit.votes.approve}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsDown className="h-4 w-4 text-red-600" />
              <span className="font-medium">{edit.votes.reject}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{edit.comments.length}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {edit.status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onVote(edit.id, 'approve')}
                  className="text-green-600 hover:text-green-700"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onVote(edit.id, 'reject')}
                  className="text-red-600 hover:text-red-700"
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </>
            )}
            <EditDetailDialog edit={edit}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </EditDetailDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
