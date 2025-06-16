import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit3, Plus, ThumbsUp, ThumbsDown, MessageSquare, Clock, CheckCircle, XCircle, Users, TrendingUp } from "lucide-react";
import { CommunityEdit } from "@/types/community";
import { EditProposalCard } from "./EditProposalCard";
import { ProposeEditDialog } from "./ProposeEditDialog";
import { EditDetailDialog } from "./EditDetailDialog";
import { toast } from "@/hooks/use-toast";
import { AdminApprovalPanel } from "./AdminApprovalPanel";

export function CommunityEditsDashboard() {
  const [edits, setEdits] = useState<CommunityEdit[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [userVotes, setUserVotes] = useState<Record<string, 'approve' | 'reject'>>({});

  const filteredEdits = edits.filter(edit => {
    const matchesFilter = filter === "all" || edit.status === filter;
    const matchesSearch = edit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         edit.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleVote = (editId: string, vote: 'approve' | 'reject') => {
    if (userVotes[editId]) {
      toast({
        title: "Already voted",
        description: "You have already voted on this proposal.",
        variant: "destructive",
      });
      return;
    }

    setEdits(prev => prev.map(edit => {
      if (edit.id === editId) {
        const newVotes = { ...edit.votes };
        newVotes[vote]++;
        
        let newStatus = edit.status;
        if (newVotes.approve >= 10 && newVotes.reject <= 3) {
          newStatus = 'approved';
          toast({
            title: "Proposal approved!",
            description: "This proposal has been automatically approved by the community.",
          });
        } else if (newVotes.reject >= 5) {
          newStatus = 'rejected';
          toast({
            title: "Proposal rejected",
            description: "This proposal has been rejected by the community.",
            variant: "destructive",
          });
        }
        
        return { ...edit, votes: newVotes, status: newStatus };
      }
      return edit;
    }));

    setUserVotes(prev => ({ ...prev, [editId]: vote }));
    
    toast({
      title: "Vote recorded",
      description: `Your ${vote} vote has been recorded.`,
    });
  };

  const handleAdminApprove = (editId: string) => {
    setEdits(prev => prev.map(edit => {
      if (edit.id === editId) {
        return { ...edit, status: 'approved' as const };
      }
      return edit;
    }));
  };

  const handleAdminReject = (editId: string) => {
    setEdits(prev => prev.map(edit => {
      if (edit.id === editId) {
        return { ...edit, status: 'rejected' as const };
      }
      return edit;
    }));
  };

  const handleSubmitEdit = (editData: any) => {
    setEdits(prev => [editData, ...prev]);
  };

  const handleAddComment = (editId: string, comment: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      userId: "current_user",
      content: comment,
      timestamp: new Date().toISOString(),
      type: "comment" as const
    };

    setEdits(prev => prev.map(edit => {
      if (edit.id === editId) {
        return { ...edit, comments: [...edit.comments, newComment] };
      }
      return edit;
    }));

    toast({
      title: "Comment added",
      description: "Your comment has been added to the discussion.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'under_review': return <Clock className="h-4 w-4" />;
      case 'pending': return <Edit3 className="h-4 w-4" />;
      default: return <Edit3 className="h-4 w-4" />;
    }
  };

  const stats = {
    total: edits.length,
    pending: edits.filter(e => e.status === 'pending').length,
    approved: edits.filter(e => e.status === 'approved').length,
    rejected: edits.filter(e => e.status === 'rejected').length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Community Proposals</h1>
          <p className="text-muted-foreground">Propose and vote on improvements to controls and mappings</p>
        </div>
        <ProposeEditDialog onSubmitEdit={handleSubmitEdit}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Propose Edit
          </Button>
        </ProposeEditDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Proposals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending Review</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.approved}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{stats.rejected}</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search proposals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Proposals</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="proposals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="voting">Voting Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-4">
          {filteredEdits.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <Edit3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No proposals yet</h3>
                <p className="text-muted-foreground mb-4">
                  Be the first to propose an improvement to the community library!
                </p>
                <ProposeEditDialog onSubmitEdit={handleSubmitEdit}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Proposal
                  </Button>
                </ProposeEditDialog>
              </CardContent>
            </Card>
          ) : (
            filteredEdits.map((edit) => (
              <EditDetailDialog 
                key={edit.id} 
                edit={edit} 
                onAddComment={handleAddComment}
              >
                <div>
                  <EditProposalCard 
                    edit={edit} 
                    onVote={handleVote}
                    getStatusColor={getStatusColor}
                    getStatusIcon={getStatusIcon}
                    userVoted={userVotes[edit.id]}
                  />
                </div>
              </EditDetailDialog>
            ))
          )}
        </TabsContent>

        <TabsContent value="voting">
          <Card>
            <CardHeader>
              <CardTitle>Voting Guidelines</CardTitle>
              <CardDescription>How the community review process works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Approval Criteria</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Minimum 10 approval votes
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      At least 2 expert reviewer approvals
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Maximum 3 rejection votes
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      7-day review period
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Voting Rights</h4>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• All registered users can vote</li>
                    <li>• Expert reviewers have enhanced weight</li>
                    <li>• Reputation affects vote influence</li>
                    <li>• One vote per user per proposal</li>
                    <li>• Anonymous voting to prevent bias</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Quality Standards</h4>
                <p className="text-sm text-muted-foreground">
                  All proposals must include clear rationale, supporting evidence, and follow established
                  framework guidelines. Proposals that improve security posture, compliance accuracy,
                  or usability are prioritized for approval.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AdminApprovalPanel
        edits={edits}
        onApproveEdit={handleAdminApprove}
        onRejectEdit={handleAdminReject}
      />
    </div>
  );
}
