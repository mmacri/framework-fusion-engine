
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, Target, BarChart3 } from "lucide-react";

export function GapAnalysis() {
  const [selectedFramework, setSelectedFramework] = useState("NIST 800-53");
  const [selectedProfile, setSelectedProfile] = useState("healthcare");

  const frameworks = ["NIST 800-53", "PCI-DSS", "HIPAA Security", "SOX ITGC", "Adobe CCF"];
  
  const profiles = [
    { id: "healthcare", name: "Healthcare Organization", description: "HIPAA-focused compliance" },
    { id: "financial", name: "Financial Services", description: "SOX and PCI-DSS focused" },
    { id: "technology", name: "Technology Company", description: "General security frameworks" }
  ];

  const gapAnalysis = {
    "NIST 800-53": {
      totalControls: 945,
      implemented: 723,
      partiallyImplemented: 156,
      notImplemented: 66,
      coverage: 76.5,
      criticalGaps: [
        { control: "AC-2", title: "Account Management", priority: "Critical", impact: "High" },
        { control: "SC-8", title: "Transmission Confidentiality", priority: "High", impact: "Medium" },
        { control: "IR-4", title: "Incident Handling", priority: "High", impact: "High" }
      ],
      recommendations: [
        "Implement automated account provisioning and deprovisioning",
        "Deploy end-to-end encryption for data transmission",
        "Establish formal incident response procedures"
      ]
    }
  };

  const currentAnalysis = gapAnalysis[selectedFramework as keyof typeof gapAnalysis];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Gap Analysis
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Identify coverage gaps and optimization opportunities in your compliance program. 
            Get actionable insights to improve your security posture.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center justify-center flex-wrap bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
          <Select value={selectedFramework} onValueChange={setSelectedFramework}>
            <SelectTrigger className="w-64 bg-white">
              <SelectValue placeholder="Select Framework" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedProfile} onValueChange={setSelectedProfile}>
            <SelectTrigger className="w-64 bg-white">
              <SelectValue placeholder="Organization Profile" />
            </SelectTrigger>
            <SelectContent>
              {profiles.map(profile => (
                <SelectItem key={profile.id} value={profile.id}>
                  {profile.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-700">{currentAnalysis.implemented}</div>
                <div className="text-sm text-green-600">Implemented</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-700">{currentAnalysis.partiallyImplemented}</div>
                <div className="text-sm text-yellow-600">Partial</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-700">{currentAnalysis.notImplemented}</div>
                <div className="text-sm text-red-600">Not Implemented</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-700">{currentAnalysis.coverage}%</div>
                <div className="text-sm text-blue-600">Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage Progress */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Implementation Progress
          </CardTitle>
          <CardDescription>Overall compliance framework coverage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Coverage</span>
              <span>{currentAnalysis.coverage}%</span>
            </div>
            <Progress value={currentAnalysis.coverage} className="h-3" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">{currentAnalysis.implemented}</div>
                <div className="text-sm text-muted-foreground">Fully Implemented</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-yellow-600">{currentAnalysis.partiallyImplemented}</div>
                <div className="text-sm text-muted-foreground">Partially Implemented</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-red-600">{currentAnalysis.notImplemented}</div>
                <div className="text-sm text-muted-foreground">Not Implemented</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Gaps */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Critical Gaps
          </CardTitle>
          <CardDescription>High-priority controls requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentAnalysis.criticalGaps.map((gap, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="destructive" className="text-xs">{gap.control}</Badge>
                    <Badge variant="outline" className="text-xs">{gap.priority}</Badge>
                  </div>
                  <h4 className="font-medium text-red-900">{gap.title}</h4>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={gap.impact === 'High' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {gap.impact} Impact
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Recommendations
          </CardTitle>
          <CardDescription>Actionable steps to improve your compliance posture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentAnalysis.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-green-900">{recommendation}</p>
                </div>
                <Button variant="outline" size="sm" className="text-green-700 border-green-300 hover:bg-green-100">
                  Implement
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
