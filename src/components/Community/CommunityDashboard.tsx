
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Edit3, ThumbsUp, TrendingUp, Star, GitBranch, ArrowRight } from "lucide-react";

interface CommunityDashboardProps {
  onNavigateToEdits?: () => void;
}

export function CommunityDashboard({ onNavigateToEdits }: CommunityDashboardProps) {
  const communityStats = [
    { label: "Active Contributors", value: "847", icon: Users, color: "text-blue-600" },
    { label: "Total Edits", value: "2,134", icon: Edit3, color: "text-green-600" },
    { label: "Discussions", value: "356", icon: MessageSquare, color: "text-purple-600" },
    { label: "Votes Cast", value: "5,892", icon: ThumbsUp, color: "text-orange-600" }
  ];

  const recentActivity = [
    {
      type: "edit",
      user: "Sarah Chen",
      action: "Updated NIST AC-2 implementation guidance",
      time: "2 hours ago",
      votes: 12
    },
    {
      type: "discussion",
      user: "Mike Rodriguez",
      action: "Started discussion on PCI-DSS scope clarification",
      time: "4 hours ago",
      votes: 8
    },
    {
      type: "edit",
      user: "Jennifer Park",
      action: "Added new SOX control mapping",
      time: "6 hours ago",
      votes: 15
    }
  ];

  const topContributors = [
    { name: "Dr. Sarah Chen", contributions: 245, reputation: 1520, avatar: "SC" },
    { name: "Mike Rodriguez", contributions: 189, reputation: 1247, avatar: "MR" },
    { name: "Jennifer Park", contributions: 156, reputation: 892, avatar: "JP" },
    { name: "Robert Kim", contributions: 134, reputation: 756, avatar: "RK" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Community Dashboard
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our collaborative community working to improve security controls and compliance frameworks. 
          Contribute your expertise and learn from others.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {communityStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Community Activity
          </CardTitle>
          <CardDescription>Latest contributions and discussions from the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {activity.votes}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Top Contributors
          </CardTitle>
          <CardDescription>Community members making the biggest impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topContributors.map((contributor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-medium">
                    {contributor.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{contributor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {contributor.contributions} contributions • {contributor.reputation} reputation
                    </p>
                  </div>
                </div>
                <Badge variant="outline">Rank #{index + 1}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Edit3 className="h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="text-lg font-semibold">Make Your First Edit</h3>
              <p className="text-muted-foreground">
                Help improve control descriptions and implementation guidance
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={onNavigateToEdits}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Start Contributing
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <MessageSquare className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="text-lg font-semibold">Join Discussions</h3>
              <p className="text-muted-foreground">
                Share knowledge and learn from compliance experts
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                View Discussions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
