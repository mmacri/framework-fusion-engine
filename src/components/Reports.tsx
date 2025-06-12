
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Download, FileText, Table, BarChart3, Calendar, CheckCircle, Loader2, TrendingUp, Users, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { reportService } from "@/services/reportService";
import { ReportPreview } from "@/components/Reports/ReportPreview";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: "compliance" | "gap" | "mapping" | "custom";
  frameworks: string[];
  lastGenerated?: string;
  downloadCount: number;
  complexity: "basic" | "intermediate" | "advanced";
}

const reportTemplates: ReportTemplate[] = [
  {
    id: "1",
    name: "NIST to PCI Comprehensive Mapping",
    description: "Detailed cross-reference analysis between NIST 800-53 and PCI-DSS with gap identification and implementation guidance",
    type: "mapping",
    frameworks: ["NIST 800-53", "PCI-DSS"],
    lastGenerated: "2024-01-15",
    downloadCount: 47,
    complexity: "advanced"
  },
  {
    id: "2",
    name: "HIPAA Security Rule Gap Analysis",
    description: "Comprehensive gap analysis for HIPAA Security Rule with detailed remediation recommendations and timeline",
    type: "gap",
    frameworks: ["HIPAA", "NIST 800-53"],
    lastGenerated: "2024-01-12",
    downloadCount: 23,
    complexity: "intermediate"
  },
  {
    id: "3",
    name: "Multi-Framework Control Matrix",
    description: "Executive-level cross-reference matrix showing control relationships and coverage across all major compliance frameworks",
    type: "compliance",
    frameworks: ["NIST 800-53", "PCI-DSS", "HIPAA", "SOX"],
    lastGenerated: "2024-01-10",
    downloadCount: 156,
    complexity: "advanced"
  },
  {
    id: "4",
    name: "SOX IT Controls Readiness Assessment",
    description: "Focused assessment report for SOX IT General Controls with implementation status and audit readiness scoring",
    type: "compliance",
    frameworks: ["SOX", "NIST 800-53"],
    lastGenerated: "2024-01-08",
    downloadCount: 34,
    complexity: "intermediate"
  },
  {
    id: "5",
    name: "Quick Compliance Overview",
    description: "High-level summary report perfect for executive briefings and initial assessments",
    type: "custom",
    frameworks: ["NIST 800-53", "PCI-DSS"],
    lastGenerated: "2024-01-14",
    downloadCount: 89,
    complexity: "basic"
  }
];

const exportFormats = [
  { value: "pdf", label: "PDF Report", icon: FileText, description: "Professional formatted report" },
  { value: "excel", label: "Excel Spreadsheet", icon: Table, description: "Detailed data analysis" },
  { value: "csv", label: "CSV Data", icon: Table, description: "Raw data export" },
  { value: "json", label: "JSON Data", icon: BarChart3, description: "Structured data format" }
];

export function Reports() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("1");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [includeRelationships, setIncludeRelationships] = useState(true);
  const [includeGaps, setIncludeGaps] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const frameworks = ["NIST 800-53", "PCI-DSS", "HIPAA", "SOX"];

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

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "basic": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const generateReport = async () => {
    if (selectedFrameworks.length === 0) {
      toast({
        title: "No frameworks selected",
        description: "Please select at least one framework to generate a report.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      await reportService.generateReport({
        title: customTitle || "Enhanced Compliance Report",
        description: customDescription || "Comprehensive compliance analysis and mapping report",
        frameworks: selectedFrameworks,
        format: selectedFormat as 'pdf' | 'excel' | 'csv' | 'json',
        includeMetadata,
        includeRelationships,
        includeGaps
      });

      toast({
        title: "Report generated successfully",
        description: `Your enhanced ${selectedFormat.toUpperCase()} report has been downloaded with detailed mappings and analysis.`,
      });
    } catch (error) {
      toast({
        title: "Error generating report",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateTemplateReport = async (template: any) => {
    setIsGenerating(true);
    try {
      await reportService.generateReport({
        title: template.name,
        description: template.description,
        frameworks: template.frameworks,
        format: 'pdf',
        includeMetadata: true,
        includeRelationships: template.type === 'mapping' || template.type === 'compliance',
        includeGaps: template.type === 'gap'
      });

      toast({
        title: "Report generated successfully",
        description: `${template.name} has been downloaded with comprehensive analysis and detailed mappings.`,
      });
    } catch (error) {
      toast({
        title: "Error generating report",
        description: "There was an error generating the template report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Enhanced Reports & Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Generate comprehensive compliance reports with detailed mappings, gap analysis, and executive insights
        </p>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Report Templates
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Custom Report
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics Dashboard
          </TabsTrigger>
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
                        <Badge className={getComplexityColor(template.complexity)}>
                          {template.complexity}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">
                        {template.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {template.frameworks.map(framework => (
                          <Badge key={framework} variant="outline" className="text-xs">
                            {framework}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => generateTemplateReport(template)}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4 mr-2" />
                        )}
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
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Downloaded {template.downloadCount} times</span>
                      </div>
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
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Report Configuration
                  </CardTitle>
                  <CardDescription>
                    Customize your report settings and content for comprehensive analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Report Title</label>
                    <Input
                      placeholder="Enter comprehensive report title"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Description & Purpose</label>
                    <Textarea
                      placeholder="Describe the report scope, audience, and intended use case"
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Compliance Frameworks</label>
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
                          <label htmlFor={framework} className="text-sm font-medium">
                            {framework}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Export Format</label>
                    <div className="grid grid-cols-1 gap-2">
                      {exportFormats.map(format => (
                        <Button
                          key={format.value}
                          variant={selectedFormat === format.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedFormat(format.value)}
                          className="justify-start h-auto p-3"
                        >
                          <div className="flex items-center gap-3">
                            <format.icon className="h-4 w-4" />
                            <div className="text-left">
                              <div className="font-medium">{format.label}</div>
                              <div className="text-xs text-muted-foreground">{format.description}</div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">Advanced Content Options</label>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="metadata"
                          checked={includeMetadata}
                          onCheckedChange={(checked) => setIncludeMetadata(checked === true)}
                        />
                        <div>
                          <label htmlFor="metadata" className="text-sm font-medium">
                            Include detailed control metadata
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Implementation guidance, enhancements, and related controls
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="relationships"
                          checked={includeRelationships}
                          onCheckedChange={(checked) => setIncludeRelationships(checked === true)}
                        />
                        <div>
                          <label htmlFor="relationships" className="text-sm font-medium">
                            Include relationship mappings & analysis
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Cross-framework mappings with confidence scores and gap analysis
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="gaps"
                          checked={includeGaps}
                          onCheckedChange={(checked) => setIncludeGaps(checked === true)}
                        />
                        <div>
                          <label htmlFor="gaps" className="text-sm font-medium">
                            Include comprehensive gap analysis
                          </label>
                          <p className="text-xs text-muted-foreground">
                            Detailed remediation recommendations and implementation priorities
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ReportPreview
                title={customTitle}
                description={customDescription}
                frameworks={selectedFrameworks}
                includeMetadata={includeMetadata}
                includeRelationships={includeRelationships}
                includeGaps={includeGaps}
                format={selectedFormat}
              />

              <Button 
                onClick={generateReport}
                className="w-full h-12"
                disabled={selectedFrameworks.length === 0 || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Enhanced Report...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Generate Enhanced Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics Dashboard
              </CardTitle>
              <CardDescription>
                Interactive compliance analytics and trend analysis (Coming Soon)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">
                    Advanced analytics dashboard with interactive charts and trend analysis will be available in the next release
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
