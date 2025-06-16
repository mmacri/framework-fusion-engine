
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, MessageSquare, Clock, User, GitCompare, Send } from "lucide-react";
import { CommunityEdit } from "@/types/community";
import { useState } from "react";

interface EditDetailDialogProps {
  edit: CommunityEdit;
  children: React.ReactNode;
  onAddComment: (editId: string, comment: string) => void;
}

export function EditDetailDialog({ edit, children, onAddComment }: EditDetailDialogProps) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(edit.id, newComment.trim());
      setNewComment("");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            {edit.title}
          </DialogTitle>
          <DialogDescription>
            Proposed by {edit.proposedBy} on {formatDate(edit.proposedAt)}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="changes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="changes">Changes</TabsTrigger>
            <TabsTrigger value="discussion">Discussion ({edit.comments.length})</TabsTrigger>
            <TabsTrigger value="review">Review Status</TabsTrigger>
          </TabsList>

          <TabsContent value="changes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proposed Changes</CardTitle>
                <CardDescription>{edit.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Change Details */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Proposed Details</h4>
                      <div className="p-4 bg-green-50 rounded border space-y-3">
                        {edit.proposedData.framework && (
                          <div>
                            <span className="font-medium">Framework: </span>
                            {edit.proposedData.framework.toUpperCase()}
                          </div>
                        )}
                        {edit.proposedData.controlId && (
                          <div>
                            <span className="font-medium">Control ID: </span>
                            {edit.proposedData.controlId}
                          </div>
                        )}
                        {edit.proposedData.title && (
                          <div>
                            <span className="font-medium">Title: </span>
                            {edit.proposedData.title}
                          </div>
                        )}
                        {edit.proposedData.description && (
                          <div>
                            <span className="font-medium">Description: </span>
                            <p className="mt-1 whitespace-pre-wrap">{edit.proposedData.description}</p>
                          </div>
                        )}
                        {edit.proposedData.rationale && (
                          <div>
                            <span className="font-medium">Rationale: </span>
                            <p className="mt-1 whitespace-pre-wrap">{edit.proposedData.rationale}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4">
            <div className="space-y-4">
              {edit.comments.length > 0 ? (
                edit.comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {comment.userId.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{comment.userId}</span>
                            <Badge variant="outline" className="text-xs">
                              {comment.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(comment.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add your comment, feedback, or review..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        size="sm"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Voting Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span>Approve</span>
                      </div>
                      <span className="font-medium text-green-600">{edit.votes.approve}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                        <span>Reject</span>
                      </div>
                      <span className="font-medium text-red-600">{edit.votes.reject}</span>
                    </div>
                    
                    {edit.status === 'pending' && (
                      <div className="mt-4 p-3 bg-blue-50 rounded">
                        <div className="text-sm">
                          <div className="font-medium">Progress to Approval:</div>
                          <div className="mt-1">
                            • {edit.votes.approve}/10 community votes
                          </div>
                          <div>
                            • 0/2 expert reviewer approvals needed
                          </div>
                          <div>
                            • {Math.max(0, 3 - edit.votes.reject)} rejection votes remaining
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Expert Reviewers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {edit.reviewers.length > 0 ? (
                      edit.reviewers.map((reviewer, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {reviewer.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{reviewer}</span>
                          <Badge variant="outline" className="text-xs">
                            Pending
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No expert reviewers assigned</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Review Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Submitted: {formatDate(edit.proposedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Review period ends: {formatDate(new Date(new Date(edit.proposedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
