
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, FileText, BarChart3, TrendingUp, ArrowRight, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface DashboardOverviewProps {
  onFrameworkSelect: (framework: string) => void;
}

export function DashboardOverview({ onFrameworkSelect }: DashboardOverviewProps) {
  const frameworks = [
    { 
      id: "cis", 
      name: "CIS Controls v8", 
      controls: 153, 
      coverage: 100, 
      status: "complete",
      description: "Center for Internet Security Controls - Implementation Groups IG1, IG2, IG3"
    },
    { 
      id: "nist", 
      name: "NIST 800-53", 
      controls: 945, 
      coverage: 100, 
      status: "complete",
      description: "Comprehensive security controls for federal information systems"
    },
    { 
      id: "pci", 
      name: "PCI-DSS", 
      controls: 281, 
      coverage: 100, 
      status: "complete",
      description: "Payment card industry data security standards"
    },
    { 
      id: "hipaa", 
      name: "HIPAA Security", 
      controls: 164, 
      coverage: 100, 
      status: "complete",
      description: "Healthcare information privacy and security requirements"
    },
    { 
      id: "sox", 
      name: "SOX ITGC", 
      controls: 127, 
      coverage: 100, 
      status: "complete",
      description: "IT general controls for financial reporting"
    },
    { 
      id: "iso", 
      name: "ISO 27001", 
      controls: 114, 
      coverage: 85, 
      status: "in-progress",
      description: "International standard for information security management"
    }
  ];

  const recentActivity = [
    {
      type: "mapping",
      title: "Updated NIST AC-2 to PCI-DSS mapping",
      user: "security_expert_123",
      time: "2 hours ago",
      confidence: "High"
    },
    {
      type: "control",
      title: "Enhanced SOX IT-1 implementation guidance",
      user: "compliance_guru",
      time: "5 hours ago",
      confidence: "Medium"
    },
    {
      type: "analysis",
      title: "Completed gap analysis for healthcare org",
      user: "analyst_pro",
      time: "1 day ago",
      confidence: "High"
    }
  ];

  const platformStats = [
    { label: "Total Controls", value: "2,400+", icon: Shield },
    { label: "Active Contributors", value: "847", icon: Users },
    { label: "Control Mappings", value: "1,200+", icon: FileText },
    { label: "Gap Analyses", value: "156", icon: BarChart3 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-yellow-100 text-yellow-800";
      default: return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Framework Fusion Engine
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Streamline compliance across multiple frameworks with AI-powered control mapping and gap analysis
        </p>
      </div>


      {/* Supported Frameworks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Supported Frameworks
          </CardTitle>
          <CardDescription>
            Comprehensive coverage of major compliance and security frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {frameworks.map((framework) => (
              <div key={framework.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{framework.name}</h4>
                    <Badge className={getStatusColor(framework.status)}>
                      {getStatusIcon(framework.status)}
                      <span className="ml-1 capitalize">{framework.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{framework.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>{framework.controls} controls</span>
                    <span>{framework.coverage}% coverage</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => onFrameworkSelect(framework.id)}
                  className="ml-4"
                >
                  View Controls
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Community Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Community Activity
          </CardTitle>
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
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">by {activity.user} • {activity.time}</p>
                  </div>
                </div>
                <Badge variant="outline">
                  {activity.confidence} Confidence
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
