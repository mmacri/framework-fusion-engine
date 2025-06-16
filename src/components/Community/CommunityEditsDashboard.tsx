
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit3, Plus, Search, Filter, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

export function CommunityEditsDashboard() {
  const [showNewEdit, setShowNewEdit] = useState(false);
  const [editType, setEditType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const pendingEdits = [
    {
      id: 1,
      type: "Control Update",
      title: "Enhance NIST AC-2 Implementation Guidance", 
      author: "security_expert_123",
      created: "2024-12-15",
      votes: { up: 12, down: 2 },
      status: "Under Review",
      description: "Adding more specific guidance for automated account management processes"
    },
    {
      id: 2,
      type: "New Mapping",
      title: "PCI-DSS 8.2 to NIST AC-7 Mapping",
      author: "compliance_guru", 
      created: "2024-12-14",
      votes: { up: 8, down: 1 },
      status: "Pending Approval",
      description: "Proposed mapping between PCI-DSS account lockout and NIST unsuccessful logon attempts"
    },
    {
      id: 3,
      type: "Control Update",
      title: "Update HIPAA 164.312(a)(1) Examples",
      author: "healthcare_specialist",
      created: "2024-12-13", 
      votes: { up: 15, down: 0 },
      status: "Approved",
      description: "Adding real-world implementation examples for unique user identification"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Pending Approval": return "bg-blue-100 text-blue-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmitEdit = () => {
    console.log("Submitting edit proposal");
    setShowNewEdit(false);
    // In a real implementation, this would submit to the backend
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Propose Edits
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contribute to the community by proposing improvements to controls, mappings, and implementation guidance
          </p>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Button 
            onClick={() => setShowNewEdit(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Propose New Edit
          </Button>
        </div>
      </div>

      {/* New Edit Form */}
      {showNewEdit && (
        <Card>
          <CardHeader>
            <CardTitle>Propose New Edit</CardTitle>
            <CardDescription>Submit your contribution to the community for review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Edit Type</label>
                <Select value={editType} onValueChange={setEditType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select edit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="control-update">Control Update</SelectItem>
                    <SelectItem value="new-mapping">New Mapping</SelectItem>
                    <SelectItem value="mapping-update">Mapping Update</SelectItem>
                    <SelectItem value="implementation-guide">Implementation Guide</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Framework</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nist">NIST 800-53</SelectItem>
                    <SelectItem value="pci">PCI-DSS</SelectItem>
                    <SelectItem value="hipaa">HIPAA Security</SelectItem>
                    <SelectItem value="sox">SOX ITGC</SelectItem>
                    <SelectItem value="iso27001">ISO 27001</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input placeholder="Brief description of your proposed edit" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea 
                placeholder="Detailed explanation of the proposed changes and rationale"
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Proposed Changes</label>
              <Textarea 
                placeholder="Specific text or content changes you're proposing"
                rows={6}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSubmitEdit} className="bg-blue-600 hover:bg-blue-700">
                <Edit3 className="h-4 w-4 mr-2" />
                Submit for Review
              </Button>
              <Button variant="outline" onClick={() => setShowNewEdit(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-4 items-center flex-wrap bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search pending edits..." 
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select>
          <SelectTrigger className="w-48 bg-white">
            <SelectValue placeholder="Edit Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="control-update">Control Updates</SelectItem>
            <SelectItem value="new-mapping">New Mappings</SelectItem>
            <SelectItem value="mapping-update">Mapping Updates</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-48 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="bg-white">
          <Filter className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      </div>

      {/* Pending Edits */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Community Edit Proposals</h2>
        
        {pendingEdits.map((edit) => (
          <Card key={edit.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Edit3 className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{edit.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{edit.type}</Badge>
                      <Badge className={getStatusColor(edit.status)}>{edit.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>by {edit.author}</p>
                  <p>{edit.created}</p>
                </div>
              </div>
              <CardDescription>{edit.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {edit.votes.up}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {edit.votes.down}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Comments
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Guidelines */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-3">Contribution Guidelines</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
              Ensure all proposed changes are accurate and well-researched
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
              Provide clear rationale and supporting documentation
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
              Follow the community's formatting and style guidelines
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
              Be respectful and constructive in all interactions
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
