
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Edit3, ThumbsUp, TrendingUp, Award } from "lucide-react";

interface CommunityDashboardProps {
  onNavigateToEdits?: () => void;
}

export function CommunityDashboard({ onNavigateToEdits }: CommunityDashboardProps) {
  const stats = [
    { label: "Active Contributors", value: "847", icon: Users },
    { label: "Pending Edits", value: "23", icon: Edit3 },
    { label: "This Month's Contributions", value: "156", icon: TrendingUp },
    { label: "Community Score", value: "4.8/5", icon: Award }
  ];

  const recentActivity = [
    {
      type: "edit",
      user: "security_expert_123", 
      action: "Updated NIST AC-2 implementation guidance",
      time: "2 hours ago",
      votes: 12
    },
    {
      type: "discussion",
      user: "compliance_guru",
      action: "Started discussion on PCI-DSS scope reduction",
      time: "5 hours ago",
      votes: 8
    },
    {
      type: "mapping",
      user: "analyst_pro", 
      action: "Proposed new HIPAA to ISO 27001 mapping",
      time: "1 day ago",
      votes: 15
    }
  ];

  const topContributors = [
    { name: "security_expert_123", contributions: 45, score: 98 },
    { name: "compliance_guru", contributions: 38, score: 95 },
    { name: "analyst_pro", contributions: 32, score: 92 },
    { name: "framework_wizard", contributions: 29, score: 88 },
    { name: "audit_master", contributions: 25, score: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Community Dashboard
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Collaborate with security professionals to improve compliance frameworks
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <stat.icon className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Edit3 className="h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="text-lg font-semibold">Propose Edit</h3>
              <p className="text-muted-foreground">Suggest improvements to controls or mappings</p>
              <Button onClick={onNavigateToEdits} className="w-full bg-blue-600 hover:bg-blue-700">
                Start Editing
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <MessageSquare className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="text-lg font-semibold">Join Discussion</h3>
              <p className="text-muted-foreground">Participate in community conversations</p>
              <Button variant="outline" className="w-full">
                Browse Discussions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <ThumbsUp className="h-12 w-12 text-purple-600 mx-auto" />
              <h3 className="text-lg font-semibold">Review Edits</h3>
              <p className="text-muted-foreground">Help validate community contributions</p>
              <Button variant="outline" className="w-full">
                Review Pending
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Community Activity</CardTitle>
          <CardDescription>Latest contributions from the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {activity.type[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{activity.votes}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
          <CardDescription>Community members making the biggest impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topContributors.map((contributor, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{contributor.name}</p>
                    <p className="text-sm text-muted-foreground">{contributor.contributions} contributions</p>
                  </div>
                </div>
                <Badge variant="outline">Score: {contributor.score}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
