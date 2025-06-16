
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Shield, Eye, EyeOff } from "lucide-react";
import { CommunityEdit } from "@/types/community";
import { toast } from "@/hooks/use-toast";

interface AdminApprovalPanelProps {
  edits: CommunityEdit[];
  onApproveEdit: (editId: string) => void;
  onRejectEdit: (editId: string) => void;
}

export function AdminApprovalPanel({ edits, onApproveEdit, onRejectEdit }: AdminApprovalPanelProps) {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const ADMIN_KEY = "admin123"; // Simple key for demo - in production, use proper auth

  const handleAuthenticate = () => {
    if (adminKey === ADMIN_KEY) {
      setIsAuthenticated(true);
      toast({
        title: "Admin access granted",
        description: "You can now approve or reject proposals.",
      });
    } else {
      toast({
        title: "Invalid admin key",
        description: "Please enter the correct admin key.",
        variant: "destructive",
      });
    }
  };

  const handleApprove = (editId: string) => {
    onApproveEdit(editId);
    toast({
      title: "Proposal approved",
      description: "The proposal has been approved and will be implemented.",
    });
  };

  const handleReject = (editId: string) => {
    onRejectEdit(editId);
    toast({
      title: "Proposal rejected",
      description: "The proposal has been rejected.",
      variant: "destructive",
    });
  };

  const pendingEdits = edits.filter(edit => edit.status === 'pending' || edit.status === 'under_review');

  if (!showPanel) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={() => setShowPanel(true)}
          variant="outline"
          size="sm"
          className="bg-white shadow-lg"
        >
          <Shield className="h-4 w-4 mr-2" />
          Admin Panel
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto">
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle className="text-lg">Admin Panel</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPanel(false)}
            >
              <EyeOff className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Quick approval for pending proposals ({pendingEdits.length})
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!isAuthenticated ? (
            <div className="space-y-3">
              <Input
                type="password"
                placeholder="Enter admin key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAuthenticate()}
              />
              <Button onClick={handleAuthenticate} className="w-full" size="sm">
                Authenticate
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Admin authenticated
              </div>
              
              {pendingEdits.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No pending proposals
                </p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {pendingEdits.map((edit) => (
                    <div key={edit.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{edit.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            by {edit.proposedBy}
                          </p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {edit.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleApprove(edit.id)}
                          className="flex-1"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(edit.id)}
                          className="flex-1"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
