
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, ThumbsDown, MessageSquare, User, Clock } from "lucide-react";
import { CommunityEdit } from "@/types/community";

interface EditDetailDialogProps {
  edit: CommunityEdit;
  children: React.ReactNode;
}

export function EditDetailDialog({ edit, children }: EditDetailDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In real implementation, this would submit to your backend
      console.log("Adding comment:", newComment);
      setNewComment("");
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{getTypeLabel(edit.type)}</Badge>
            <Badge 
              variant={edit.status === 'approved' ? 'default' : 'secondary'}
              className={edit.status === 'approved' ? 'bg-green-100 text-green-800' : ''}
            >
              {edit.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <DialogTitle>{edit.title}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Proposed by {edit.proposedBy}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(edit.proposedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="proposal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="proposal">Proposal</TabsTrigger>
            <TabsTrigger value="changes">Changes</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="voting">Voting</TabsTrigger>
          </TabsList>

          <TabsContent value="proposal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{edit.description}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Proposed Data</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-muted p-3 rounded overflow-x-auto">
                  {JSON.stringify(edit.proposedData, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Change Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {edit.originalData && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Before:</h4>
                      <pre className="text-xs bg-red-50 p-3 rounded border">
                        {JSON.stringify(edit.originalData, null, 2)}
                      </pre>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-sm mb-2">After:</h4>
                    <pre className="text-xs bg-green-50 p-3 rounded border">
                      {JSON.stringify(edit.proposedData, null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comments & Discussion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {edit.comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                  edit.comments.map((comment) => (
                    <div key={comment.id} className="border-l-2 border-muted pl-4 space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{comment.userId}</span>
                        <span className="text-muted-foreground">{new Date(comment.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))
                )}
                
                <div className="space-y-3 pt-3 border-t">
                  <Textarea
                    placeholder="Add your comment or feedback..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voting" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-green-600" />
                    Approve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{edit.votes.approve}</div>
                  <p className="text-sm text-muted-foreground">votes</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ThumbsDown className="h-5 w-5 text-red-600" />
                    Reject
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">{edit.votes.reject}</div>
                  <p className="text-sm text-muted-foreground">votes</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Approval Rate</span>
                      <span>{Math.round((edit.votes.approve / (edit.votes.approve + edit.votes.reject)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(edit.votes.approve / (edit.votes.approve + edit.votes.reject)) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {edit.status === 'pending' && (
              <Card>
                <CardHeader>
                  <CardTitle>Cast Your Vote</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Approve This Edit
                  </Button>
                  <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Reject This Edit
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
