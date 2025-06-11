
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, Download, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GapAnalysisResult {
  sourceFramework: string;
  targetFramework: string;
  totalControls: number;
  mappedControls: number;
  partialMappings: number;
  unmappedControls: number;
  coveragePercentage: number;
  gaps: Gap[];
  recommendations: string[];
}

interface Gap {
  controlId: string;
  title: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  category: string;
  description: string;
  recommendedAction: string;
  mappingStatus: "No Mapping" | "Partial Mapping" | "Indirect Only";
}

const mockGapAnalysis: GapAnalysisResult[] = [
  {
    sourceFramework: "NIST 800-53",
    targetFramework: "PCI-DSS",
    totalControls: 281,
    mappedControls: 187,
    partialMappings: 45,
    unmappedControls: 49,
    coveragePercentage: 67,
    gaps: [
      {
        controlId: "PCI 1.1.1",
        title: "Firewall Configuration Standards",
        priority: "Critical",
        category: "Network Security",
        description: "Document and implement firewall configuration standards for all network boundaries",
        recommendedAction: "Implement SC-7 (Boundary Protection) and map to existing firewall policies",
        mappingStatus: "No Mapping"
      },
      {
        controlId: "PCI 11.2.1",
        title: "Wireless Access Point Inventory",
        priority: "High",
        category: "Wireless Security",
        description: "Maintain inventory of authorized wireless access points",
        recommendedAction: "Enhance CM-8 (Information System Component Inventory) to include wireless devices",
        mappingStatus: "Partial Mapping"
      },
      {
        controlId: "PCI 12.1",
        title: "Information Security Policy",
        priority: "Medium",
        category: "Security Management",
        description: "Establish and maintain an information security policy",
        recommendedAction: "Align with existing PL-1 (Security Planning Policy) requirements",
        mappingStatus: "Indirect Only"
      }
    ],
    recommendations: [
      "Implement additional network boundary protection controls",
      "Enhance wireless security monitoring capabilities",
      "Align security policies with PCI requirements",
      "Conduct quarterly gap assessments"
    ]
  },
  {
    sourceFramework: "PCI-DSS",
    targetFramework: "HIPAA",
    totalControls: 164,
    mappedControls: 89,
    partialMappings: 31,
    unmappedControls: 44,
    coveragePercentage: 54,
    gaps: [
      {
        controlId: "HIPAA 164.312(e)(1)",
        title: "Automatic Logoff",
        priority: "High",
        category: "Access Control",
        description: "Implement automatic logoff procedures for electronic information systems",
        recommendedAction: "Implement session timeout controls beyond current PCI requirements",
        mappingStatus: "No Mapping"
      },
      {
        controlId: "HIPAA 164.312(c)(1)",
        title: "Integrity Controls",
        priority: "Critical",
        category: "Data Integrity",
        description: "Implement controls to ensure PHI is not improperly altered or destroyed",
        recommendedAction: "Enhance data integrity monitoring beyond payment card data",
        mappingStatus: "Partial Mapping"
      }
    ],
    recommendations: [
      "Implement healthcare-specific access controls",
      "Enhance data integrity monitoring for PHI",
      "Develop breach notification procedures",
      "Conduct HIPAA-specific risk assessments"
    ]
  }
];

export function GapAnalysis() {
  const [selectedSource, setSelectedSource] = useState<string>("NIST 800-53");
  const [selectedTarget, setSelectedTarget] = useState<string>("PCI-DSS");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const frameworks = ["NIST 800-53", "PCI-DSS", "HIPAA", "SOX", "Adobe CCF"];

  const currentAnalysis = mockGapAnalysis.find(
    analysis => analysis.sourceFramework === selectedSource && analysis.targetFramework === selectedTarget
  ) || mockGapAnalysis[0];

  const filteredGaps = currentAnalysis.gaps.filter(gap => 
    selectedPriority === "all" || gap.priority === selectedPriority
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-red-600 bg-red-50";
      case "High": return "text-orange-600 bg-orange-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "Low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getMappingStatusIcon = (status: string) => {
    switch (status) {
      case "No Mapping": return <XCircle className="h-4 w-4 text-red-500" />;
      case "Partial Mapping": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "Indirect Only": return <Eye className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Gap Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Identify compliance gaps and mapping opportunities between frameworks
        </p>
      </div>

      {/* Framework Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Source Framework</label>
          <Select value={selectedSource} onValueChange={setSelectedSource}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Target Framework</label>
          <Select value={selectedTarget} onValueChange={setSelectedTarget}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {frameworks.filter(f => f !== selectedSource).map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Filter by Priority</label>
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger>
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gaps">Gap Details</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Coverage Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Controls</CardDescription>
                <CardTitle className="text-3xl">{currentAnalysis.totalControls}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Mapped Controls</CardDescription>
                <CardTitle className="text-3xl text-green-600">{currentAnalysis.mappedControls}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Partial Mappings</CardDescription>
                <CardTitle className="text-3xl text-yellow-600">{currentAnalysis.partialMappings}</CardTitle>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Unmapped Controls</CardDescription>
                <CardTitle className="text-3xl text-red-600">{currentAnalysis.unmappedControls}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Coverage Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Coverage Analysis</CardTitle>
              <CardDescription>
                Mapping coverage from {selectedSource} to {selectedTarget}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Coverage</span>
                  <span className="text-sm text-muted-foreground">{currentAnalysis.coveragePercentage}%</span>
                </div>
                <Progress value={currentAnalysis.coveragePercentage} className="h-3" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Direct Mappings: {currentAnalysis.mappedControls}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span>Partial Mappings: {currentAnalysis.partialMappings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span>No Mappings: {currentAnalysis.unmappedControls}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              {filteredGaps.length} gaps found in {selectedTarget}
            </h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Gap Report
            </Button>
          </div>

          <div className="space-y-4">
            {filteredGaps.map((gap, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{gap.controlId}</Badge>
                      <Badge className={getPriorityColor(gap.priority)}>
                        {gap.priority}
                      </Badge>
                      <Badge variant="secondary">{gap.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {getMappingStatusIcon(gap.mappingStatus)}
                      <span className="text-sm text-muted-foreground">{gap.mappingStatus}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{gap.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{gap.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="font-medium text-blue-900 mb-1">Recommended Action</h4>
                    <p className="text-sm text-blue-800">{gap.recommendedAction}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Recommendations</CardTitle>
              <CardDescription>
                Strategic recommendations for addressing compliance gaps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentAnalysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
