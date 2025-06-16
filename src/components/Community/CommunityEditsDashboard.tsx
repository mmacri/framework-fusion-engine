
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit3, Plus, ThumbsUp, ThumbsDown, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import { CommunityEdit } from "@/types/community";
import { EditProposalCard } from "./EditProposalCard";
import { ProposeEditDialog } from "./ProposeEditDialog";

const mockEdits: CommunityEdit[] = [
  {
    id: "edit-1",
    type: "control_update",
    title: "Update NIST AC-2 for Zero Trust Architecture",
    description: "Enhance access control requirements to include zero trust principles",
    proposedBy: "security_architect_123",
    proposedAt: "2024-12-15T10:30:00Z",
    status: "pending",
    votes: { approve: 12, reject: 2, userVotes: {} },
    proposedData: {
      title: "Account Management - Enhanced for Zero Trust",
      description: "Updated description with zero trust requirements..."
    },
    comments: [],
    reviewers: ["expert_reviewer_1", "compliance_specialist"]
  },
  {
    id: "edit-2", 
    type: "new_control",
    title: "Add Cloud Security Control CS-1",
    description: "New control for cloud-native security requirements",
    proposedBy: "cloud_expert",
    proposedAt: "2024-12-14T15:20:00Z",
    status: "under_review",
    votes: { approve: 8, reject: 1, userVotes: {} },
    proposedData: {
      id: "CS-1",
      title: "Cloud Infrastructure Security",
      description: "Ensure cloud infrastructure meets security baselines..."
    },
    comments: [],
    reviewers: ["cloud_reviewer"]
  }
];

export function CommunityEditsDashboard() {
  const [edits, setEdits] = useState<CommunityEdit[]>(mockEdits);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEdits = edits.filter(edit => {
    const matchesFilter = filter === "all" || edit.status === filter;
    const matchesSearch = edit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         edit.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleVote = (editId: string, vote: 'approve' | 'reject') => {
    setEdits(prev => prev.map(edit => {
      if (edit.id === editId) {
        const newVotes = { ...edit.votes };
        newVotes[vote]++;
        // In real implementation, track user votes to prevent duplicate voting
        return { ...edit, votes: newVotes };
      }
      return edit;
    }));
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Community Edits</h1>
          <p className="text-muted-foreground">Propose and vote on improvements to controls and mappings</p>
        </div>
        <ProposeEditDialog>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Propose Edit
          </Button>
        </ProposeEditDialog>
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
            <EditProposalCard 
              key={edit.id} 
              edit={edit} 
              onVote={handleVote}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          ))}
        </TabsContent>

        <TabsContent value="voting">
          <Card>
            <CardHeader>
              <CardTitle>Voting Guidelines</CardTitle>
              <CardDescription>How the community review process works</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Approval Criteria</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Minimum 10 approval votes</li>
                    <li>• At least 2 expert reviewer approvals</li>
                    <li>• Maximum 3 rejection votes</li>
                    <li>• 7-day review period</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Voting Rights</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• All registered users can vote</li>
                    <li>• Expert reviewers have enhanced weight</li>
                    <li>• Reputation affects vote influence</li>
                    <li>• One vote per user per proposal</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
