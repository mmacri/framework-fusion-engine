
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, BarChart3, Table } from "lucide-react";

const reportTemplates = [
  {
    title: "Framework Coverage Report",
    description: "Comprehensive analysis of control coverage across selected frameworks",
    type: "Coverage Analysis",
    format: ["PDF", "Excel", "CSV"],
    lastGenerated: "2024-06-10"
  },
  {
    title: "Gap Analysis Summary",
    description: "Detailed gap identification and remediation recommendations",
    type: "Gap Analysis",
    format: ["PDF", "Word"],
    lastGenerated: "2024-06-09"
  },
  {
    title: "Control Mapping Matrix",
    description: "Cross-reference table showing all control relationships",
    type: "Mapping Report",
    format: ["Excel", "CSV", "JSON"],
    lastGenerated: "2024-06-08"
  },
  {
    title: "Compliance Dashboard Export",
    description: "Executive summary with key metrics and status indicators",
    type: "Executive Summary",
    format: ["PDF", "PowerPoint"],
    lastGenerated: "2024-06-07"
  }
];

const recentExports = [
  {
    name: "NIST-PCI Coverage Analysis.pdf",
    type: "Framework Coverage",
    size: "2.4 MB",
    exported: "2024-06-10 14:30",
    status: "Completed"
  },
  {
    name: "Control_Mapping_Matrix.xlsx",
    type: "Data Export",
    size: "890 KB",
    exported: "2024-06-10 09:15",
    status: "Completed"
  },
  {
    name: "Gap_Analysis_HIPAA_SOX.docx",
    type: "Gap Analysis",
    size: "1.2 MB",
    exported: "2024-06-09 16:45",
    status: "Completed"
  }
];

export function Reports() {
  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Reports & Export</h1>
        <p className="text-muted-foreground mt-2">
          Generate comprehensive reports and export data for external analysis
        </p>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Templates
          </CardTitle>
          <CardDescription>
            Pre-configured report templates for common compliance reporting needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTemplates.map((template, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{template.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {template.type}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {template.format.map((format) => (
                      <Badge key={format} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-3 w-3 mr-1" />
                    Generate
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Last generated: {template.lastGenerated}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Export Options */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table className="h-5 w-5" />
              Custom Data Export
            </CardTitle>
            <CardDescription>
              Create custom exports with specific filters and data selections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Export Type</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Controls Only
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  With Mappings
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm">CSV</Button>
                <Button variant="outline" size="sm">Excel</Button>
                <Button variant="outline" size="sm">JSON</Button>
              </div>
            </div>
            
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Exports</CardTitle>
            <CardDescription>
              Download previously generated reports and exports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentExports.map((export_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{export_.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {export_.type} • {export_.size} • {export_.exported}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {export_.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
