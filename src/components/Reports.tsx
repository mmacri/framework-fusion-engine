import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Download, FileText, Table, BarChart3, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: "compliance" | "gap" | "mapping" | "custom";
  frameworks: string[];
  lastGenerated?: string;
  downloadCount: number;
}

const reportTemplates: ReportTemplate[] = [
  {
    id: "1",
    name: "NIST to PCI Mapping Report",
    description: "Comprehensive mapping analysis between NIST 800-53 and PCI-DSS controls",
    type: "mapping",
    frameworks: ["NIST 800-53", "PCI-DSS"],
    lastGenerated: "2024-01-15",
    downloadCount: 47
  },
  {
    id: "2",
    name: "HIPAA Compliance Gap Analysis",
    description: "Detailed gap analysis for HIPAA Security Rule compliance requirements",
    type: "gap",
    frameworks: ["HIPAA", "NIST 800-53"],
    lastGenerated: "2024-01-12",
    downloadCount: 23
  },
  {
    id: "3",
    name: "Multi-Framework Control Matrix",
    description: "Cross-reference matrix showing control relationships across all frameworks",
    type: "compliance",
    frameworks: ["NIST 800-53", "PCI-DSS", "HIPAA", "SOX", "Adobe CCF"],
    lastGenerated: "2024-01-10",
    downloadCount: 156
  },
  {
    id: "4",
    name: "SOX IT Controls Assessment",
    description: "Assessment report focusing on SOX IT General Controls",
    type: "compliance",
    frameworks: ["SOX", "NIST 800-53"],
    lastGenerated: "2024-01-08",
    downloadCount: 34
  }
];

const exportFormats = [
  { value: "pdf", label: "PDF Report", icon: FileText },
  { value: "excel", label: "Excel Spreadsheet", icon: Table },
  { value: "csv", label: "CSV Data", icon: Table },
  { value: "json", label: "JSON Data", icon: BarChart3 }
];

export function Reports() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeRelationships, setIncludeRelationships] = useState(true);
  const [includeGaps, setIncludeGaps] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");

  const frameworks = ["NIST 800-53", "PCI-DSS", "HIPAA", "SOX", "Adobe CCF"];

  const handleFrameworkToggle = (framework: string) => {
    setSelectedFrameworks(prev => 
      prev.includes(framework) 
        ? prev.filter(f => f !== framework)
        : [...prev, framework]
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "compliance": return "bg-blue-100 text-blue-800";
      case "gap": return "bg-red-100 text-red-800";
      case "mapping": return "bg-green-100 text-green-800";
      case "custom": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const generateReport = () => {
    // In a real implementation, this would trigger the report generation
    console.log("Generating report with:", {
      template: selectedTemplate,
      frameworks: selectedFrameworks,
      format: selectedFormat,
      options: {
        includeMetadata,
        includeRelationships,
        includeGaps
      },
      custom: {
        title: customTitle,
        description: customDescription
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Reports & Export</h1>
        <p className="text-muted-foreground mt-2">
          Generate comprehensive compliance reports and export data
        </p>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Report</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge className={getTypeColor(template.type)}>
                          {template.type}
                        </Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {template.frameworks.map(framework => (
                          <Badge key={framework} variant="outline" className="text-xs">
                            {framework}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      {template.lastGenerated && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Last generated: {template.lastGenerated}</span>
                        </div>
                      )}
                      <span>Downloaded {template.downloadCount} times</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Configuration</CardTitle>
                  <CardDescription>
                    Customize your report settings and content
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Report Title</label>
                    <Input
                      placeholder="Enter custom report title"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea
                      placeholder="Enter report description and purpose"
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Include Frameworks</label>
                    <div className="space-y-2">
                      {frameworks.map(framework => (
                        <div key={framework} className="flex items-center space-x-2">
                          <Checkbox
                            id={framework}
                            checked={selectedFrameworks.includes(framework)}
                            onCheckedChange={(checked) => {
                              if (checked === true) {
                                setSelectedFrameworks(prev => [...prev, framework]);
                              } else {
                                setSelectedFrameworks(prev => prev.filter(f => f !== framework));
                              }
                            }}
                          />
                          <label htmlFor={framework} className="text-sm">
                            {framework}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Export Format</label>
                    <div className="grid grid-cols-2 gap-2">
                      {exportFormats.map(format => (
                        <Button
                          key={format.value}
                          variant={selectedFormat === format.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFormat(format.value)}
                          className="justify-start"
                        >
                          <format.icon className="h-4 w-4 mr-2" />
                          {format.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Content Options</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="metadata"
                          checked={includeMetadata}
                          onCheckedChange={(checked) => setIncludeMetadata(checked === true)}
                        />
                        <label htmlFor="metadata" className="text-sm">
                          Include control metadata
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="relationships"
                          checked={includeRelationships}
                          onCheckedChange={(checked) => setIncludeRelationships(checked === true)}
                        />
                        <label htmlFor="relationships" className="text-sm">
                          Include relationship mappings
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="gaps"
                          checked={includeGaps}
                          onCheckedChange={(checked) => setIncludeGaps(checked === true)}
                        />
                        <label htmlFor="gaps" className="text-sm">
                          Include gap analysis
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Preview</CardTitle>
                  <CardDescription>
                    Preview of your custom report configuration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Title</h4>
                    <p className="text-sm text-muted-foreground">
                      {customTitle || "Custom Compliance Report"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {customDescription || "No description provided"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Included Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedFrameworks.length > 0 ? (
                        selectedFrameworks.map(framework => (
                          <Badge key={framework} variant="outline" className="text-xs">
                            {framework}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No frameworks selected</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-1">Export Format</h4>
                    <Badge variant="secondary">
                      {exportFormats.find(f => f.value === selectedFormat)?.label}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Content Sections</h4>
                    <div className="space-y-1">
                      {includeMetadata && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          Control Metadata
                        </div>
                      )}
                      {includeRelationships && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          Relationship Mappings
                        </div>
                      )}
                      {includeGaps && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          Gap Analysis
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={generateReport}
                className="w-full"
                disabled={selectedFrameworks.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Automate report generation and delivery (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  Scheduled reporting functionality will be available in the next release
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
