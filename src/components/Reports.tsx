
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockControlsData } from "@/data/reportMockData";
import { Download, FileText, Calendar, Settings, BarChart3, Shield, FileSpreadsheet } from "lucide-react";

export function Reports() {
  const [selectedFramework, setSelectedFramework] = useState("all");
  const [reportType, setReportType] = useState("all");

  const frameworks = Object.keys(mockControlsData);

  const reportTemplates = [
    {
      id: "compliance-summary",
      title: "Compliance Summary Report",
      description: "High-level overview of compliance status across all frameworks",
      icon: BarChart3,
      format: ["PDF", "Excel"],
      estimatedSize: "2-5 pages",
      color: "from-blue-50 to-blue-100 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      id: "control-detail",
      title: "Detailed Control Assessment",
      description: "Comprehensive analysis of individual controls and their implementation status",
      icon: Shield,
      format: ["PDF", "Word"],
      estimatedSize: "15-25 pages",
      color: "from-green-50 to-green-100 border-green-200",
      iconColor: "text-green-600"
    },
    {
      id: "gap-analysis",
      title: "Gap Analysis Report",
      description: "Identifies missing controls and areas for improvement",
      icon: FileText,
      format: ["PDF", "Excel"],
      estimatedSize: "8-12 pages",
      color: "from-orange-50 to-orange-100 border-orange-200",
      iconColor: "text-orange-600"
    },
    {
      id: "mapping-matrix",
      title: "Framework Mapping Matrix",
      description: "Cross-reference matrix showing relationships between frameworks",
      icon: FileSpreadsheet,
      format: ["Excel", "CSV"],
      estimatedSize: "1-3 sheets",
      color: "from-purple-50 to-purple-100 border-purple-200",
      iconColor: "text-purple-600"
    }
  ];

  const recentReports = [
    {
      name: "Q4 2024 Compliance Summary",
      framework: "NIST 800-53",
      type: "Compliance Summary",
      generated: "2024-12-15",
      size: "2.4 MB",
      format: "PDF"
    },
    {
      name: "PCI-DSS Gap Analysis",
      framework: "PCI-DSS",
      type: "Gap Analysis",
      generated: "2024-12-10",
      size: "1.8 MB",
      format: "Excel"
    },
    {
      name: "HIPAA Control Assessment",
      framework: "HIPAA Security",
      type: "Control Detail",
      generated: "2024-12-08",
      size: "3.2 MB",
      format: "PDF"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Reports & Export
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate comprehensive compliance reports and export data for stakeholders. 
            Choose from various templates and formats.
          </p>
        </div>

        {/* Quick Generate */}
        <div className="flex gap-4 items-center justify-center bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
          <Select value={selectedFramework} onValueChange={setSelectedFramework}>
            <SelectTrigger className="w-64 bg-white">
              <SelectValue placeholder="Select Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Frameworks</SelectItem>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-64 bg-white">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {reportTemplates.map(template => (
                <SelectItem key={template.id} value={template.id}>{template.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Report Templates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTemplates.map((template) => (
            <Card key={template.id} className={`bg-gradient-to-br ${template.color} hover:shadow-lg transition-shadow cursor-pointer`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <template.icon className={`h-6 w-6 ${template.iconColor}`} />
                  {template.title}
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Formats:</span>
                    <div className="flex gap-1 mt-1">
                      {template.format.map(format => (
                        <Badge key={format} variant="secondary" className="text-xs">{format}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Size:</span>
                    <div className="text-muted-foreground mt-1">{template.estimatedSize}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Reports</h2>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentReports.map((report, index) => (
                <div key={index} className="p-4 hover:bg-accent transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{report.framework}</span>
                          <span>•</span>
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.generated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-sm">
                        <div className="font-medium">{report.size}</div>
                        <Badge variant="outline" className="text-xs">{report.format}</Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Download className="h-12 w-12 text-green-600 mx-auto" />
            <h3 className="text-lg font-semibold">Custom Export Options</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Need a specific format or custom report? Configure advanced export options to meet your requirements.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700">
                <Settings className="h-4 w-4 mr-2" />
                Custom Export
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                API Access
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
