
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileText, Download, Calendar, Filter, BarChart3, PieChart, TrendingUp } from "lucide-react";

export function Reports() {
  const [selectedFramework, setSelectedFramework] = useState("");
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("30");

  const frameworks = ["NIST 800-53", "PCI-DSS", "HIPAA Security", "SOX ITGC", "Adobe CCF"];
  
  const reportTypes = [
    { id: "compliance", name: "Compliance Summary", description: "Overall compliance status and metrics" },
    { id: "gaps", name: "Gap Analysis", description: "Detailed analysis of implementation gaps" },
    { id: "mappings", name: "Framework Mappings", description: "Cross-framework control relationships" },
    { id: "audit", name: "Audit Trail", description: "Change history and community contributions" }
  ];

  const preBuiltReports = [
    {
      title: "Q4 2024 Compliance Dashboard",
      description: "Comprehensive quarterly compliance review across all frameworks",
      framework: "All Frameworks",
      type: "Compliance Summary",
      lastUpdated: "2024-12-15",
      size: "2.4 MB",
      status: "Ready"
    },
    {
      title: "NIST 800-53 Implementation Status",
      description: "Detailed implementation status for NIST security controls",
      framework: "NIST 800-53",
      type: "Gap Analysis",
      lastUpdated: "2024-12-14",
      size: "1.8 MB",
      status: "Ready"
    },
    {
      title: "PCI-DSS to NIST Mapping Report",
      description: "Cross-reference mapping between PCI-DSS and NIST frameworks",
      framework: "PCI-DSS",
      type: "Framework Mappings",
      lastUpdated: "2024-12-13",
      size: "956 KB",
      status: "Generating"
    },
    {
      title: "Community Contributions Audit",
      description: "Review of recent community edits and voting activity",
      framework: "All Frameworks",
      type: "Audit Trail",
      lastUpdated: "2024-12-12",
      size: "1.2 MB",
      status: "Ready"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate comprehensive reports and insights from your compliance framework data. 
            Export detailed analysis for stakeholders and auditors.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-700">47</div>
                  <div className="text-sm text-blue-600">Reports Generated</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-700">12</div>
                  <div className="text-sm text-green-600">Active Dashboards</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-700">89%</div>
                  <div className="text-sm text-purple-600">Avg Coverage</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-700">234</div>
                  <div className="text-sm text-orange-600">Downloads</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Report Generator */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Generate New Report
          </CardTitle>
          <CardDescription>Create custom reports based on your requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger>
                <SelectValue placeholder="Select Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Frameworks</SelectItem>
                {frameworks.map(framework => (
                  <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map(type => (
                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <PieChart className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map(type => (
              <div key={type.id} className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <h4 className="font-medium mb-1">{type.name}</h4>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pre-built Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-green-600" />
            Available Reports
          </CardTitle>
          <CardDescription>Recently generated reports ready for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {preBuiltReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{report.title}</h4>
                    <Badge 
                      variant={report.status === 'Ready' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Framework: {report.framework}</span>
                    <span>•</span>
                    <span>Type: {report.type}</span>
                    <span>•</span>
                    <span>Updated: {report.lastUpdated}</span>
                    <span>•</span>
                    <span>Size: {report.size}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {report.status === 'Ready' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </>
                  )}
                  {report.status === 'Generating' && (
                    <Button variant="outline" size="sm" disabled>
                      Generating...
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
