
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Users, Clock, CheckCircle } from "lucide-react";
import { Collaboration, User } from "@/types/user";

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "admin",
    lastActive: "2024-01-15T10:30:00Z",
    permissions: []
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com", 
    role: "analyst",
    lastActive: "2024-01-15T11:15:00Z",
    permissions: []
  }
];

const mockCollaborations: Collaboration[] = [
  {
    id: "1",
    userId: "1",
    controlId: "AC-2",
    type: "comment",
    content: "This control needs to be updated to reflect our new identity management system implementation.",
    timestamp: "2024-01-15T09:30:00Z",
    status: "active"
  },
  {
    id: "2",
    userId: "2",
    controlId: "AC-2",
    type: "suggestion",
    content: "I suggest we map this to our existing IAM policies and add evidence from the recent audit.",
    timestamp: "2024-01-15T10:45:00Z",
    status: "active"
  }
];

interface CollaborationPanelProps {
  controlId: string;
  users?: User[];
  collaborations?: Collaboration[];
}

export function CollaborationPanel({ 
  controlId, 
  users = mockUsers, 
  collaborations = mockCollaborations 
}: CollaborationPanelProps) {
  const [newComment, setNewComment] = useState("");

  const getUser = (userId: string) => users.find(u => u.id === userId);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "comment": return <MessageSquare className="h-4 w-4" />;
      case "suggestion": return <CheckCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "comment": return "bg-blue-100 text-blue-800";
      case "suggestion": return "bg-green-100 text-green-800";
      case "approval": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Here you would typically call an API to save the comment
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  const relevantCollaborations = collaborations.filter(c => c.controlId === controlId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Collaboration & Comments
        </CardTitle>
        <CardDescription>
          Team discussions and suggestions for control {controlId}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Active Users */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Active Users:</span>
          <div className="flex -space-x-2">
            {users.slice(0, 5).map((user) => (
              <Avatar key={user.id} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        {/* Comments and Discussions */}
        <div className="space-y-3">
          {relevantCollaborations.map((collab) => {
            const user = getUser(collab.userId);
            return (
              <div key={collab.id} className="border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="text-xs">
                        {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.name}</span>
                    <Badge className={getTypeColor(collab.type)} variant="secondary">
                      {getTypeIcon(collab.type)}
                      <span className="ml-1 capitalize">{collab.type}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(collab.timestamp).toLocaleString()}
                  </div>
                </div>
                
                <p className="text-sm">{collab.content}</p>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Reply</Button>
                  <Button variant="ghost" size="sm">Resolve</Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Comment */}
        <div className="space-y-3 pt-3 border-t border-border">
          <Textarea
            placeholder="Add a comment or suggestion..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <div className="flex gap-2">
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Add Comment
            </Button>
            <Button variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Suggest Change
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
