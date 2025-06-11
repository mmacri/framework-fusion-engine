
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

const gapAnalysisData = [
  {
    sourceFramework: "NIST 800-53",
    targetFramework: "PCI-DSS",
    gaps: [
      {
        controlId: "NIST-SC-7",
        title: "Boundary Protection",
        description: "No direct equivalent in PCI-DSS for network boundary protection requirements",
        severity: "High",
        recommendation: "Map to PCI Requirement 1 (Install and maintain firewall configuration)"
      },
      {
        controlId: "NIST-AU-6",
        title: "Audit Review and Reporting",
        description: "PCI has limited audit review requirements compared to NIST",
        severity: "Medium",
        recommendation: "Enhance PCI 10.6 with additional review procedures"
      }
    ],
    coverage: 78
  },
  {
    sourceFramework: "PCI-DSS",
    targetFramework: "HIPAA",
    gaps: [
      {
        controlId: "PCI-3.4",
        title: "PAN Protection in Logs",
        description: "HIPAA does not specifically address payment card data protection",
        severity: "Low",
        recommendation: "Not applicable for healthcare environments"
      }
    ],
    coverage: 65
  }
];

export function GapAnalysis() {
  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Gap Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Identify coverage gaps and unmapped controls between frameworks
        </p>
      </div>

      {/* Analysis Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configure Gap Analysis</CardTitle>
          <CardDescription>
            Select frameworks to compare and identify gaps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Source Framework</label>
              <Select defaultValue="nist">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nist">NIST 800-53</SelectItem>
                  <SelectItem value="pci">PCI-DSS</SelectItem>
                  <SelectItem value="hipaa">HIPAA Security</SelectItem>
                  <SelectItem value="sox">SOX ITGC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Target Framework</label>
              <Select defaultValue="pci">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nist">NIST 800-53</SelectItem>
                  <SelectItem value="pci">PCI-DSS</SelectItem>
                  <SelectItem value="hipaa">HIPAA Security</SelectItem>
                  <SelectItem value="sox">SOX ITGC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button>Run Analysis</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gap Results */}
      <div className="space-y-4">
        {gapAnalysisData.map((analysis, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {analysis.sourceFramework} → {analysis.targetFramework}
                    <Badge variant="outline">
                      {analysis.coverage}% Coverage
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {analysis.gaps.length} gaps identified
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.gaps.map((gap, gapIndex) => (
                  <div key={gapIndex} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{gap.controlId}</span>
                          <Badge 
                            className={
                              gap.severity === "High" ? "bg-red-100 text-red-800" :
                              gap.severity === "Medium" ? "bg-yellow-100 text-yellow-800" :
                              "bg-green-100 text-green-800"
                            }
                          >
                            {gap.severity}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm mb-2">{gap.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{gap.description}</p>
                      </div>
                      <AlertTriangle 
                        className={`h-5 w-5 ${
                          gap.severity === "High" ? "text-red-500" :
                          gap.severity === "Medium" ? "text-yellow-500" :
                          "text-green-500"
                        }`}
                      />
                    </div>
                    
                    <div className="bg-muted rounded-md p-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <span className="text-sm font-medium">Recommendation: </span>
                          <span className="text-sm text-muted-foreground">{gap.recommendation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
