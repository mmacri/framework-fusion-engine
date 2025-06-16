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

const initialMockEdits: CommunityEdit[] = [
  {
    id: "edit-1",
    type: "control_update",
    title: "Update NIST AC-2 for Zero Trust Architecture",
    description: "Enhance access control requirements to include zero trust principles and continuous verification mechanisms",
    proposedBy: "security_architect_123",
    proposedAt: "2024-12-15T10:30:00Z",
    status: "pending",
    votes: { approve: 12, reject: 2, userVotes: {} },
    proposedData: {
      title: "Account Management - Enhanced for Zero Trust",
      description: "Updated description with zero trust requirements including continuous verification, least privilege access, and dynamic policy enforcement...",
      framework: "nist",
      controlId: "AC-2"
    },
    comments: [
      {
        id: "comment-1",
        userId: "reviewer_expert",
        content: "This looks great! The zero trust principles are well integrated. Consider adding more specific implementation guidance for cloud environments.",
        timestamp: "2024-12-15T11:00:00Z",
        type: "review"
      }
    ],
    reviewers: ["expert_reviewer_1", "compliance_specialist"]
  },
  {
    id: "edit-2", 
    type: "new_control",
    title: "Add Cloud Security Control CS-1",
    description: "New control for cloud-native security requirements focusing on container security and microservices architecture",
    proposedBy: "cloud_expert",
    proposedAt: "2024-12-14T15:20:00Z",
    status: "under_review",
    votes: { approve: 15, reject: 1, userVotes: {} },
    proposedData: {
      id: "CS-1",
      title: "Cloud Infrastructure Security",
      description: "Ensure cloud infrastructure meets security baselines including container image scanning, runtime protection, and network segmentation...",
      framework: "nist"
    },
    comments: [],
    reviewers: ["cloud_reviewer", "security_architect_123"]
  },
  {
    id: "edit-3",
    type: "mapping_update",
    title: "Improve ISO 27001 to NIST Mapping Accuracy",
    description: "Update mapping confidence levels and add missing relationships between ISO 27001 A.9.1.1 and NIST AC controls",
    proposedBy: "compliance_mapper",
    proposedAt: "2024-12-13T09:15:00Z",
    status: "approved",
    votes: { approve: 18, reject: 0, userVotes: {} },
    proposedData: {
      sourceControl: "ISO27001-A.9.1.1",
      targetControl: "NIST-AC-2",
      confidence: "high",
      rationale: "Direct mapping based on access control requirements"
    },
    comments: [],
    reviewers: ["mapping_specialist"]
  }
];

export function CommunityEditsDashboard() {
  const [edits, setEdits] = useState<CommunityEdit[]>(initialMockEdits);
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
    // Check if user already voted
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
        
        // Auto-approve if thresholds are met
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

    // Track user vote
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
          <h1 className="text-3xl font-bold">Community Edits</h1>
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
          placeholder="Search edits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Edits</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="proposals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="proposals">Edit Proposals</TabsTrigger>
          <TabsTrigger value="voting">Voting Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-4">
          {filteredEdits.map((edit) => (
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
          ))}
          
          {filteredEdits.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No proposals found matching your criteria.</p>
              </CardContent>
            </Card>
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

      {/* Admin Panel */}
      <AdminApprovalPanel
        edits={edits}
        onApproveEdit={handleAdminApprove}
        onRejectEdit={handleAdminReject}
      />
    </div>
  );
}
