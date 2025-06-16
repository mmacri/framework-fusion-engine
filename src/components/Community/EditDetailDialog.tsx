
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, ThumbsDown, MessageSquare, Clock, User, GitCompare } from "lucide-react";
import { CommunityEdit } from "@/types/community";
import { useState } from "react";

interface EditDetailDialogProps {
  edit: CommunityEdit;
  children: React.ReactNode;
}

export function EditDetailDialog({ edit, children }: EditDetailDialogProps) {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    // In real implementation, this would add comment to backend
    console.log("Adding comment:", newComment);
    setNewComment("");
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
            Proposed by {edit.proposedBy} on {new Date(edit.proposedAt).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="changes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="changes">Changes</TabsTrigger>
            <TabsTrigger value="discussion">Discussion ({edit.comments.length})</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>

          <TabsContent value="changes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Proposed Changes</CardTitle>
                <CardDescription>{edit.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {edit.originalData && (
                      <div>
                        <h4 className="font-medium mb-2 text-red-600">Current Version</h4>
                        <div className="p-3 bg-red-50 rounded border">
                          <pre className="text-sm whitespace-pre-wrap">
                            {JSON.stringify(edit.originalData, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Proposed Version</h4>
                      <div className="p-3 bg-green-50 rounded border">
                        <pre className="text-sm whitespace-pre-wrap">
                          {JSON.stringify(edit.proposedData, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4">
            <div className="space-y-4">
              {edit.comments.map((comment) => (
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
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add your comment or review..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <Button 
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      size="sm"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Comment
                    </Button>
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
                      <span className="font-medium">{edit.votes.approve}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                        <span>Reject</span>
                      </div>
                      <span className="font-medium">{edit.votes.reject}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Reviewers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {edit.reviewers.map((reviewer, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {reviewer.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{reviewer}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
