
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, FileText, Search, BarChart3, TrendingUp, Clock, CheckCircle } from "lucide-react";

interface DashboardOverviewProps {
  onFrameworkSelect?: (framework: string) => void;
}

export function DashboardOverview({ onFrameworkSelect }: DashboardOverviewProps) {
  const frameworks = [
    { name: "NIST 800-53", controls: 945, color: "bg-blue-500", recent: true },
    { name: "PCI-DSS", controls: 281, color: "bg-green-500", recent: false },
    { name: "HIPAA Security", controls: 164, color: "bg-purple-500", recent: true },
    { name: "SOX ITGC", controls: 127, color: "bg-orange-500", recent: false },
    { name: "Adobe CCF", controls: 892, color: "bg-red-500", recent: true }
  ];

  const recentActivity = [
    { action: "Updated NIST AC-2 Implementation", user: "security_expert", time: "2 hours ago", type: "update" },
    { action: "Added new PCI-DSS control mapping", user: "compliance_pro", time: "5 hours ago", type: "new" },
    { action: "Community vote approved", user: "review_team", time: "1 day ago", type: "approval" }
  ];

  const quickActions = [
    { 
      title: "Browse Controls", 
      description: "Explore security controls by framework",
      icon: Shield,
      action: () => onFrameworkSelect?.("NIST 800-53"),
      color: "bg-blue-50 hover:bg-blue-100"
    },
    { 
      title: "View Mappings", 
      description: "See relationships between frameworks",
      icon: FileText,
      action: () => {},
      color: "bg-green-50 hover:bg-green-100"
    },
    { 
      title: "Run Analysis", 
      description: "Identify gaps in your compliance",
      icon: Search,
      action: () => {},
      color: "bg-purple-50 hover:bg-purple-100"
    },
    { 
      title: "Join Community", 
      description: "Contribute to the knowledge base",
      icon: Users,
      action: () => {},
      color: "bg-orange-50 hover:bg-orange-100"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2 py-8">
        <h1 className="text-3xl font-bold">Welcome to Framework Fusion Engine</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your collaborative platform for managing security controls across multiple compliance frameworks.
          Explore, contribute, and enhance the community knowledge base.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card key={index} className={`cursor-pointer transition-colors ${action.color}`} onClick={action.action}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <action.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">{action.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{action.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Controls</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,409</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contributors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">+23 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Need your vote</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mappings</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,203</div>
            <p className="text-xs text-muted-foreground">Cross-framework links</p>
          </CardContent>
        </Card>
      </div>

      {/* Framework Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Frameworks</CardTitle>
          <CardDescription>Click on any framework to explore its controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {frameworks.map((framework) => (
              <div 
                key={framework.name}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onFrameworkSelect?.(framework.name)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${framework.color}`} />
                  <div>
                    <h4 className="font-medium">{framework.name}</h4>
                    <p className="text-sm text-muted-foreground">{framework.controls} controls</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {framework.recent && (
                    <Badge variant="secondary" className="text-xs">Recent</Badge>
                  )}
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Community Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Community Activity</CardTitle>
          <CardDescription>Latest contributions from the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">by {activity.user} • {activity.time}</p>
                </div>
                <Badge variant={activity.type === 'approval' ? 'default' : 'secondary'}>
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
