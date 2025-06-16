
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, Download, Search } from "lucide-react";

export function GapAnalysis() {
  const [sourceFramework, setSourceFramework] = useState("nist");
  const [targetFramework, setTargetFramework] = useState("pci-dss");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const frameworks = [
    { id: "nist", name: "NIST Cybersecurity Framework" },
    { id: "pci-dss", name: "PCI-DSS" },
    { id: "sox", name: "SOX Controls" },
    { id: "hipaa", name: "HIPAA Security Rule" },
    { id: "iso27001", name: "ISO 27001" }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  // Mock gap analysis data based on selected frameworks
  const getGapAnalysisResults = () => {
    const baseResults = {
      covered: 78,
      partiallyCovered: 15,
      notCovered: 7,
      totalControls: 100,
      coveragePercentage: 78
    };

    // Adjust results based on framework selection
    if (sourceFramework === "nist" && targetFramework === "pci-dss") {
      return {
        ...baseResults,
        covered: 85,
        partiallyCovered: 10,
        notCovered: 5,
        coveragePercentage: 85
      };
    }

    return baseResults;
  };

  const gapAnalysisResults = getGapAnalysisResults();

  const gaps = [
    {
      id: "GAP-001",
      title: "Incident Response Documentation",
      severity: "High",
      description: "Missing formal incident response procedures documentation between frameworks",
      recommendation: "Develop comprehensive incident response plan with defined roles and procedures that satisfy both framework requirements",
      affectedControls: [`${sourceFramework.toUpperCase()} IR-1`, `${targetFramework.toUpperCase()} 12.10`],
      estimatedEffort: "2-4 weeks"
    },
    {
      id: "GAP-002", 
      title: "Access Review Automation",
      severity: "Medium",
      description: "Manual access reviews are not aligned between framework requirements",
      recommendation: "Implement automated access review system with quarterly reviews that meets both standards",
      affectedControls: [`${sourceFramework.toUpperCase()} AC-2`, `${targetFramework.toUpperCase()} ITGC-01`],
      estimatedEffort: "1-2 weeks"
    },
    {
      id: "GAP-003",
      title: "Encryption Key Management",
      severity: "Critical",
      description: "Key management processes differ significantly between frameworks",
      recommendation: "Establish unified key management infrastructure with proper lifecycle management",
      affectedControls: [`${sourceFramework.toUpperCase()} SC-12`, `${targetFramework.toUpperCase()} 3.5`],
      estimatedEffort: "4-8 weeks"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return "bg-red-100 text-red-800 border-red-200";
      case 'High': return "bg-orange-100 text-orange-800 border-orange-200";
      case 'Medium': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'Low': return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleExportReport = () => {
    // Simulate report export
    const reportData = {
      sourceFramework: frameworks.find(f => f.id === sourceFramework)?.name,
      targetFramework: frameworks.find(f => f.id === targetFramework)?.name,
      results: gapAnalysisResults,
      gaps: gaps,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gap-analysis-${sourceFramework}-vs-${targetFramework}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Gap Analysis
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Identify coverage gaps and optimization opportunities in your compliance program. 
            Compare frameworks and discover missing controls.
          </p>
        </div>

        {/* Framework Selection */}
        <div className="flex gap-4 items-center justify-center bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
          <Select value={sourceFramework} onValueChange={setSourceFramework}>
            <SelectTrigger className="w-64 bg-white">
              <SelectValue placeholder="Select Source Framework" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.map(framework => (
                <SelectItem key={framework.id} value={framework.id}>{framework.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="text-muted-foreground">vs</div>

          <Select value={targetFramework} onValueChange={setTargetFramework}>
            <SelectTrigger className="w-64 bg-white">
              <SelectValue placeholder="Select Target Framework" />
            </SelectTrigger>
            <SelectContent>
              {frameworks.map(framework => (
                <SelectItem key={framework.id} value={framework.id}>{framework.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            <Search className="h-4 w-4 mr-2" />
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </div>

      {/* Coverage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{gapAnalysisResults.covered}</div>
                <div className="text-sm text-muted-foreground">Fully Covered</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">{gapAnalysisResults.partiallyCovered}</div>
                <div className="text-sm text-muted-foreground">Partially Covered</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold text-red-600">{gapAnalysisResults.notCovered}</div>
                <div className="text-sm text-muted-foreground">Not Covered</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{gapAnalysisResults.coveragePercentage}%</div>
                <div className="text-sm text-muted-foreground">Coverage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coverage Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Coverage Progress</CardTitle>
          <CardDescription>
            Coverage analysis between {frameworks.find(f => f.id === sourceFramework)?.name} and {frameworks.find(f => f.id === targetFramework)?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Coverage</span>
              <span className="text-sm text-muted-foreground">{gapAnalysisResults.coveragePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${gapAnalysisResults.coveragePercentage}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Covered ({gapAnalysisResults.covered})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Partial ({gapAnalysisResults.partiallyCovered})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Missing ({gapAnalysisResults.notCovered})</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identified Gaps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Identified Gaps</h2>
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Gap Report
          </Button>
        </div>
        
        {gaps.map((gap) => (
          <Card key={gap.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{gap.title}</CardTitle>
                    <Badge className={getSeverityColor(gap.severity)} variant="outline">
                      {gap.severity}
                    </Badge>
                  </div>
                  <CardDescription>{gap.description}</CardDescription>
                </div>
                <Badge variant="outline" className="font-mono">{gap.id}</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-800 mb-1">Recommendation</h4>
                <p className="text-sm text-blue-700">{gap.recommendation}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Affected Controls</h4>
                  <div className="flex flex-wrap gap-1">
                    {gap.affectedControls.map((control, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {control}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Estimated Effort</h4>
                  <Badge variant="outline">{gap.estimatedEffort}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <TrendingUp className="h-12 w-12 text-orange-600 mx-auto" />
            <h3 className="text-lg font-semibold">Prioritize Your Improvements</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Focus on critical and high-severity gaps first to maximize your compliance coverage and reduce risk.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleExportReport}>
              <Download className="h-4 w-4 mr-2" />
              Download Action Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
