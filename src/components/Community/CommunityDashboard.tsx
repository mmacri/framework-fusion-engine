
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Edit3, GitBranch, MessageSquare, Star, Clock } from "lucide-react";

export function CommunityDashboard() {
  const recentEdits = [
    {
      id: 1,
      title: "Updated NIST AC-2 Implementation",
      editor: "security_expert_123",
      timestamp: "2 hours ago",
      status: "pending_review"
    },
    {
      id: 2,
      title: "Added PCI-DSS 4.0.1 Control",
      editor: "compliance_pro",
      timestamp: "5 hours ago",
      status: "approved"
    },
    {
      id: 3,
      title: "Enhanced HIPAA Control Mapping",
      editor: "healthcare_admin",
      timestamp: "1 day ago",
      status: "under_discussion"
    }
  ];

  const communityStats = {
    totalContributors: 847,
    activeEditors: 23,
    pendingReviews: 12,
    approvedEdits: 2458
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Community Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Collaborate with security professionals to maintain and improve our control library
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{communityStats.totalContributors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Editors</CardTitle>
            <Edit3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{communityStats.activeEditors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{communityStats.pendingReviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Edits</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{communityStats.approvedEdits}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent-activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="pending-reviews">Pending Reviews</TabsTrigger>
          <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
        </TabsList>

        <TabsContent value="recent-activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Community Edits</CardTitle>
              <CardDescription>Latest contributions from community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEdits.map((edit) => (
                  <div key={edit.id} className="flex items-center justify-between border-b pb-2">
                    <div className="space-y-1">
                      <h4 className="font-medium">{edit.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        by {edit.editor} • {edit.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        edit.status === 'approved' ? 'default' : 
                        edit.status === 'pending_review' ? 'secondary' : 'outline'
                      }>
                        {edit.status.replace('_', ' ')}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <GitBranch className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending-reviews">
          <Card>
            <CardHeader>
              <CardTitle>Edits Awaiting Review</CardTitle>
              <CardDescription>Help review and approve community contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                12 edits are currently pending community review and approval.
              </p>
              <Button className="mt-4">Review Pending Edits</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributors">
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Community members making the biggest impact</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Recognize and celebrate our most active community contributors.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
