
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockControlsData } from "@/data/reportMockData";
import { Shield, TrendingUp, Users, FileText, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";

interface DashboardOverviewProps {
  onFrameworkSelect: (framework: string) => void;
}

export function DashboardOverview({ onFrameworkSelect }: DashboardOverviewProps) {
  const frameworks = Object.keys(mockControlsData);
  const totalControls = Object.values(mockControlsData).reduce((acc, controls) => acc + controls.length, 0);

  const frameworkStats = frameworks.map(framework => ({
    name: framework,
    controls: mockControlsData[framework].length,
    criticalControls: mockControlsData[framework].filter(c => c.priority === 'Critical').length,
    coverage: Math.floor(Math.random() * 30) + 70 // Mock coverage percentage
  }));

  const recentActivity = [
    { action: "Updated NIST AC-2 control", time: "2 hours ago", user: "Sarah Chen" },
    { action: "Added PCI-DSS mapping", time: "4 hours ago", user: "Mike Rodriguez" },
    { action: "Reviewed HIPAA controls", time: "6 hours ago", user: "Jennifer Park" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Framework Fusion Engine
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your collaborative platform for managing security controls across multiple compliance frameworks.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{totalControls}</div>
                <div className="text-sm text-muted-foreground">Total Controls</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{frameworks.length}</div>
                <div className="text-sm text-muted-foreground">Frameworks</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">847</div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-muted-foreground">Avg Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Framework Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Framework Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frameworkStats.map((framework) => (
            <Card key={framework.name} className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => onFrameworkSelect(framework.name)}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {framework.name}
                  <Badge variant="secondary">{framework.controls} controls</Badge>
                </CardTitle>
                <CardDescription>
                  {framework.criticalControls} critical controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Coverage</span>
                    <span className="font-medium">{framework.coverage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${framework.coverage}%` }}
                    ></div>
                  </div>
                  <Button variant="outline" className="w-full">
                    View Controls
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from the community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Priority Actions
            </CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                <p className="font-medium text-sm text-orange-800">Review pending edits</p>
                <p className="text-xs text-orange-600">12 community edits awaiting review</p>
              </div>
              <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                <p className="font-medium text-sm text-blue-800">Update control mappings</p>
                <p className="text-xs text-blue-600">3 frameworks have new mapping suggestions</p>
              </div>
              <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                <p className="font-medium text-sm text-green-800">Complete gap analysis</p>
                <p className="text-xs text-green-600">NIST 800-53 coverage assessment ready</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
