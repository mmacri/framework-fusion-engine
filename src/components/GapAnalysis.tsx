
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BarChart3, AlertTriangle, CheckCircle, Target, TrendingUp } from "lucide-react";

export function GapAnalysis() {
  const [selectedFramework, setSelectedFramework] = useState("nist");
  const [selectedOrg, setSelectedOrg] = useState("healthcare");

  const frameworks = {
    nist: "NIST 800-53",
    pci: "PCI-DSS", 
    hipaa: "HIPAA Security",
    sox: "SOX ITGC",
    iso27001: "ISO 27001"
  };

  const organizationTypes = {
    healthcare: "Healthcare Organization",
    financial: "Financial Services",
    retail: "Retail/E-commerce",
    manufacturing: "Manufacturing",
    technology: "Technology Company"
  };

  const mockGapData = {
    nist: {
      healthcare: {
        totalControls: 945,
        implemented: 623,
        partiallyImplemented: 189,
        notImplemented: 133,
        coverage: 86,
        criticalGaps: 12,
        highRiskGaps: 23
      }
    },
    pci: {
      healthcare: {
        totalControls: 281,
        implemented: 201,
        partiallyImplemented: 48,
        notImplemented: 32,
        coverage: 89,
        criticalGaps: 5,
        highRiskGaps: 12
      }
    }
  };

  const currentData = mockGapData[selectedFramework as keyof typeof mockGapData]?.[selectedOrg as keyof typeof mockGapData.nist] || mockGapData.nist.healthcare;

  const gapDetails = [
    {
      control: "AC-2 Account Management",
      status: "Not Implemented",
      risk: "Critical",
      description: "Automated account management processes are missing",
      recommendation: "Implement automated user provisioning and deprovisioning"
    },
    {
      control: "SC-7 Boundary Protection",
      status: "Partially Implemented", 
      risk: "High",
      description: "Network segmentation exists but lacks monitoring",
      recommendation: "Deploy network monitoring and intrusion detection"
    },
    {
      control: "AU-12 Audit Generation",
      status: "Not Implemented",
      risk: "High", 
      description: "Comprehensive audit logging is not configured",
      recommendation: "Implement centralized logging and SIEM solution"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Implemented": return "bg-green-100 text-green-800";
      case "Partially Implemented": return "bg-yellow-100 text-yellow-800";
      case "Not Implemented": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gap Analysis
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Identify coverage gaps and optimization opportunities in your compliance program
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center justify-center flex-wrap bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <Select value={selectedFramework} onValueChange={setSelectedFramework}>
            <SelectTrigger className="w-64 bg-white">
              <SelectValue placeholder="Select Framework" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(frameworks).map(([key, name]) => (
                <SelectItem key={key} value={key}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedOrg} onValueChange={setSelectedOrg}>
            <SelectTrigger className="w-64 bg-white">
              <SelectValue placeholder="Organization Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(organizationTypes).map(([key, name]) => (
                <SelectItem key={key} value={key}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{currentData.coverage}%</div>
                <div className="text-sm text-muted-foreground">Overall Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{currentData.implemented}</div>
                <div className="text-sm text-muted-foreground">Implemented</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{currentData.criticalGaps}</div>
                <div className="text-sm text-muted-foreground">Critical Gaps</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{currentData.highRiskGaps}</div>
                <div className="text-sm text-muted-foreground">High Risk Gaps</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Status</CardTitle>
          <CardDescription>
            Breakdown of control implementation across {frameworks[selectedFramework as keyof typeof frameworks]}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Implemented</span>
              <span>{currentData.implemented}/{currentData.totalControls}</span>
            </div>
            <Progress value={(currentData.implemented / currentData.totalControls) * 100} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Partially Implemented</span>
              <span>{currentData.partiallyImplemented}/{currentData.totalControls}</span>
            </div>
            <Progress value={(currentData.partiallyImplemented / currentData.totalControls) * 100} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Not Implemented</span>
              <span>{currentData.notImplemented}/{currentData.totalControls}</span>
            </div>
            <Progress value={(currentData.notImplemented / currentData.totalControls) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Critical Gaps */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Gaps</CardTitle>
          <CardDescription>
            Controls requiring immediate attention based on risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gapDetails.map((gap, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{gap.control}</h4>
                  <div className="flex gap-2">
                    <Badge className={getRiskColor(gap.risk)}>{gap.risk} Risk</Badge>
                    <Badge className={getStatusColor(gap.status)}>{gap.status}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{gap.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <h5 className="font-medium text-blue-800 text-sm mb-1">Recommendation</h5>
                  <p className="text-sm text-blue-700">{gap.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Target className="h-12 w-12 text-blue-600 mx-auto" />
            <h3 className="text-lg font-semibold">Generate Remediation Plan</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Create a prioritized action plan to address identified gaps and improve your compliance posture.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
