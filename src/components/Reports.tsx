
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileText, BarChart3, Shield, Calendar, Filter } from "lucide-react";
import { QuickReportsDropdown } from "./Reports/QuickReportsDropdown";

export function Reports() {
  const [selectedFramework, setSelectedFramework] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [includeGaps, setIncludeGaps] = useState(true);
  const [includeMappings, setIncludeMappings] = useState(true);
  const [includeImplementation, setIncludeImplementation] = useState(false);

  const frameworks = {
    all: "All Frameworks",
    nist: "NIST 800-53",
    pci: "PCI-DSS",
    hipaa: "HIPAA Security", 
    sox: "SOX ITGC",
    iso27001: "ISO 27001"
  };

  const reportTemplates = [
    {
      id: "compliance-summary",
      title: "Compliance Summary Report",
      description: "High-level overview of compliance status across all frameworks",
      icon: Shield,
      estimatedTime: "2-3 minutes",
      formats: ["PDF", "Excel", "Word"]
    },
    {
      id: "gap-analysis",
      title: "Gap Analysis Report", 
      description: "Detailed analysis of control gaps and remediation recommendations",
      icon: BarChart3,
      estimatedTime: "5-7 minutes",
      formats: ["PDF", "Excel"]
    },
    {
      id: "control-mappings",
      title: "Framework Mapping Report",
      description: "Cross-framework control mappings and relationships",
      icon: FileText,
      estimatedTime: "3-4 minutes", 
      formats: ["PDF", "Excel", "CSV"]
    },
    {
      id: "implementation-guide",
      title: "Implementation Guide",
      description: "Step-by-step implementation guidance for selected controls",
      icon: FileText,
      estimatedTime: "10-15 minutes",
      formats: ["PDF", "Word"]
    }
  ];

  const recentReports = [
    {
      name: "NIST Compliance Assessment - Q4 2024",
      type: "Gap Analysis",
      created: "2024-12-15",
      format: "PDF",
      size: "2.4 MB"
    },
    {
      name: "PCI-DSS Control Mappings",
      type: "Framework Mapping", 
      created: "2024-12-10",
      format: "Excel",
      size: "1.8 MB"
    },
    {
      name: "Healthcare Compliance Summary",
      type: "Compliance Summary",
      created: "2024-12-05", 
      format: "PDF",
      size: "3.1 MB"
    }
  ];

  const handleGenerateReport = (templateId: string) => {
    console.log(`Generating report: ${templateId}`);
    // In a real implementation, this would trigger report generation
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Reports & Export
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Generate comprehensive reports for compliance documentation and auditing
            </p>
          </div>
          <div className="flex gap-2">
            <QuickReportsDropdown />
          </div>
        </div>

        {/* Report Configuration */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Report Configuration
            </CardTitle>
            <CardDescription>
              Customize your report settings and content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Framework</label>
                <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(frameworks).map(([key, name]) => (
                      <SelectItem key={key} value={key}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Export Format</label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="word">Word</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">Include Sections</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="gaps" 
                    checked={includeGaps} 
                    onCheckedChange={(checked) => setIncludeGaps(checked === true)}
                  />
                  <label htmlFor="gaps" className="text-sm">Gap Analysis</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mappings" 
                    checked={includeMappings} 
                    onCheckedChange={(checked) => setIncludeMappings(checked === true)}
                  />
                  <label htmlFor="mappings" className="text-sm">Control Mappings</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="implementation" 
                    checked={includeImplementation} 
                    onCheckedChange={(checked) => setIncludeImplementation(checked === true)}
                  />
                  <label htmlFor="implementation" className="text-sm">Implementation Guidance</label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <template.icon className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Est. {template.estimatedTime}
                  </span>
                  <div className="flex gap-1">
                    {template.formats.map((format) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  onClick={() => handleGenerateReport(template.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Previously generated reports available for download
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{report.type}</Badge>
                      <span>•</span>
                      <span>{report.created}</span>
                      <span>•</span>
                      <span>{report.format}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto" />
            <h3 className="text-lg font-semibold">Bulk Export</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Export all data for backup or migration purposes. Includes controls, mappings, and analysis results.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
