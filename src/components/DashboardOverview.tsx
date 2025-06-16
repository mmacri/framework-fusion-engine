
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockControlsData } from "@/data/reportMockData";
import { Shield, FileText, BarChart3, Users, TrendingUp, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

interface DashboardOverviewProps {
  onFrameworkSelect: (framework: string) => void;
}

export function DashboardOverview({ onFrameworkSelect }: DashboardOverviewProps) {
  const frameworks = Object.keys(mockControlsData);
  const totalControls = Object.values(mockControlsData).flat().length;

  const frameworkStats = frameworks.map(framework => {
    const controls = mockControlsData[framework];
    const activeControls = controls.filter(c => c.status === 'Active').length;
    const criticalControls = controls.filter(c => c.priority === 'Critical').length;
    
    return {
      name: framework,
      totalControls: controls.length,
      activeControls,
      criticalControls,
      coverage: Math.round((activeControls / controls.length) * 100)
    };
  });

  const recentActivity = [
    {
      type: "update",
      title: "NIST 800-53 controls updated",
      description: "15 controls received implementation guidance updates",
      time: "2 hours ago",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      type: "mapping",
      title: "New PCI-DSS mappings added",
      description: "8 new control relationships identified",
      time: "4 hours ago", 
      icon: FileText,
      color: "text-green-600"
    },
    {
      type: "analysis",
      title: "Gap analysis completed",
      description: "HIPAA to NIST framework comparison finished",
      time: "6 hours ago",
      icon: BarChart3,
      color: "text-orange-600"
    }
  ];

  const quickStats = [
    {
      label: "Total Controls",
      value: totalControls.toLocaleString(),
      icon: Shield,
      change: "+12 this week",
      changeType: "positive"
    },
    {
      label: "Framework Mappings", 
      value: "1,247",
      icon: FileText,
      change: "+23 this week",
      changeType: "positive"
    },
    {
      label: "Active Contributors",
      value: "847",
      icon: Users,
      change: "+45 this month",
      changeType: "positive"
    },
    {
      label: "Coverage Rate",
      value: "94%",
      icon: TrendingUp,
      change: "+2% this month",
      changeType: "positive"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Framework Fusion Dashboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive platform for managing security controls across multiple compliance frameworks. 
          Start exploring or contribute to our growing community.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Framework Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Framework Overview
            </CardTitle>
            <CardDescription>
              Explore security controls across {frameworks.length} major compliance frameworks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {frameworkStats.map((framework) => (
              <div key={framework.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{framework.name}</h4>
                    <Badge variant="outline">{framework.totalControls} controls</Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onFrameworkSelect(framework.name)}
                  >
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Coverage</span>
                    <span>{framework.coverage}%</span>
                  </div>
                  <Progress value={framework.coverage} className="h-2" />
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    {framework.activeControls} active
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-orange-600" />
                    {framework.criticalControls} critical
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and community contributions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Shield className="h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="text-lg font-semibold">Explore Controls</h3>
              <p className="text-muted-foreground">
                Browse our comprehensive library of security controls
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => onFrameworkSelect("NIST 800-53")}
              >
                View Controls
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <FileText className="h-12 w-12 text-green-600 mx-auto" />
              <h3 className="text-lg font-semibold">Framework Mapping</h3>
              <p className="text-muted-foreground">
                Discover relationships between different frameworks
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                View Mappings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Users className="h-12 w-12 text-purple-600 mx-auto" />
              <h3 className="text-lg font-semibold">Join Community</h3>
              <p className="text-muted-foreground">
                Contribute to the growing knowledge base
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Start Contributing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
