
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, AlertTriangle, CheckCircle, Clock, Target, Zap, Brain } from "lucide-react";
import { ComplianceMetrics, AIRecommendation } from "@/types/analytics";
import { Assessment } from "@/types/assessment";

const mockMetrics: ComplianceMetrics = {
  overall: 78,
  byFramework: {
    "NIST 800-53": 82,
    "PCI-DSS": 75,
    "HIPAA": 81,
    "SOX": 73
  },
  trendData: [],
  riskScore: 24,
  maturityLevel: 3.2
};

const mockRecommendations: AIRecommendation[] = [
  {
    id: "1",
    type: "mapping",
    title: "Optimize NIST to PCI Control Mapping",
    description: "AI identified potential improvements in control AC-2 to PCI 8.2.1 mapping",
    confidence: 87,
    impact: "medium",
    suggestedAction: "Review and update mapping relationships for better coverage",
    estimatedEffort: "2-4 hours",
    relatedControls: ["AC-2", "PCI 8.2.1"]
  },
  {
    id: "2",
    type: "gap",
    title: "Critical Gap in Access Control",
    description: "Missing implementation for privileged access management controls",
    confidence: 94,
    impact: "critical",
    suggestedAction: "Implement PAM solution and update control status",
    estimatedEffort: "2-3 weeks",
    relatedControls: ["AC-6", "AC-17"]
  },
  {
    id: "3",
    type: "optimization",
    title: "Consolidate Duplicate Controls",
    description: "Found 12 overlapping controls that can be streamlined",
    confidence: 76,
    impact: "low",
    suggestedAction: "Merge similar controls to reduce assessment overhead",
    estimatedEffort: "4-6 hours",
    relatedControls: ["Multiple"]
  }
];

const mockAssessments: Assessment[] = [
  {
    id: "1",
    title: "Q1 2024 SOX Assessment",
    framework: "SOX",
    status: "in_progress",
    createdBy: "user1",
    assignedTo: ["user1", "user2"],
    dueDate: "2024-03-31",
    progress: 65,
    controls: [],
    findings: []
  },
  {
    id: "2",
    title: "HIPAA Security Rule Review",
    framework: "HIPAA",
    status: "completed",
    createdBy: "user2",
    assignedTo: ["user2"],
    dueDate: "2024-02-15",
    progress: 100,
    controls: [],
    findings: []
  }
];

interface EnhancedDashboardProps {
  metrics?: ComplianceMetrics;
  recommendations?: AIRecommendation[];
  assessments?: Assessment[];
}

export function EnhancedDashboard({ 
  metrics = mockMetrics, 
  recommendations = mockRecommendations,
  assessments = mockAssessments 
}: EnhancedDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical": return "text-red-600 bg-red-50";
      case "high": return "text-orange-600 bg-orange-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-50";
      case "in_progress": return "text-blue-600 bg-blue-50";
      case "draft": return "text-gray-600 bg-gray-50";
      default: return "text-yellow-600 bg-yellow-50";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Enhanced Compliance Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          AI-powered insights and advanced analytics for your compliance program
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.overall}%</div>
                <Progress value={metrics.overall} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{metrics.riskScore}</div>
                <p className="text-xs text-muted-foreground">Medium Risk</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Maturity Level</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.maturityLevel}</div>
                <p className="text-xs text-muted-foreground">Optimizing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Assessments</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assessments.filter(a => a.status === 'in_progress').length}</div>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Framework Compliance */}
          <Card>
            <CardHeader>
              <CardTitle>Framework Compliance Status</CardTitle>
              <CardDescription>Current compliance levels across all frameworks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(metrics.byFramework).map(([framework, percentage]) => (
                <div key={framework} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{framework}</span>
                    <span className="text-sm text-muted-foreground">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Recommendations
              </CardTitle>
              <CardDescription>
                Machine learning insights to optimize your compliance program
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getImpactColor(rec.impact)}>
                        {rec.impact}
                      </Badge>
                      <Badge variant="secondary">{rec.confidence}% confident</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h5 className="font-medium text-blue-900 mb-1">Suggested Action</h5>
                    <p className="text-sm text-blue-800">{rec.suggestedAction}</p>
                    <p className="text-xs text-blue-600 mt-1">Estimated effort: {rec.estimatedEffort}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm">Implement</Button>
                    <Button variant="outline" size="sm">Learn More</Button>
                    <Button variant="ghost" size="sm">Dismiss</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Active Assessments</h3>
            <Button>
              <Clock className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
          </div>

          <div className="grid gap-4">
            {assessments.map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <CardDescription>Framework: {assessment.framework}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(assessment.status)}>
                      {assessment.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{assessment.progress}%</span>
                  </div>
                  <Progress value={assessment.progress} />
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                    <span>{assessment.assignedTo.length} assignees</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Generate Report</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Advanced Analytics
              </CardTitle>
              <CardDescription>
                Detailed insights and trends for your compliance program
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    Interactive analytics charts and visualizations will be displayed here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
