
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Shield, 
  FileText, 
  BarChart3, 
  Download, 
  Search,
  ChevronRight,
  Play,
  CheckCircle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const steps = [
  {
    id: "overview",
    title: "Getting Started",
    description: "Understanding the platform",
    icon: BookOpen,
    content: [
      "Welcome to the Compliance Library - your comprehensive platform for managing compliance frameworks and controls",
      "Navigate using the sidebar to access different sections",
      "View real-time mappings between different compliance frameworks",
      "Generate detailed reports for compliance audits"
    ]
  },
  {
    id: "controls",
    title: "Control Library",
    description: "Browse and search controls",
    icon: Shield,
    content: [
      "Browse controls from multiple frameworks (NIST, PCI-DSS, HIPAA, SOX, Adobe CCF)",
      "Use the search function to find specific controls quickly",
      "Filter by framework, category, or implementation status",
      "View detailed control descriptions and requirements",
      "Export control lists for documentation"
    ]
  },
  {
    id: "mapping",
    title: "Framework Mapping",
    description: "Explore control relationships",
    icon: FileText,
    content: [
      "View interactive network visualizations of control relationships",
      "Filter mappings by specific frameworks using badges",
      "Explore direct mappings, partial overlaps, and indirect support relationships",
      "Use the matrix view to see coverage percentages between frameworks",
      "Understand confidence levels for each mapping relationship"
    ]
  },
  {
    id: "gaps",
    title: "Gap Analysis",
    description: "Identify compliance gaps",
    icon: Search,
    content: [
      "Select your target compliance framework",
      "Compare against your current implementation status",
      "View detailed gap analysis with priority recommendations",
      "Track implementation progress over time",
      "Export gap analysis reports for remediation planning"
    ]
  },
  {
    id: "reports",
    title: "Reports & Export",
    description: "Generate compliance reports",
    icon: Download,
    content: [
      "Choose from pre-built report templates or create custom reports",
      "Select multiple frameworks for cross-framework analysis",
      "Export in various formats: PDF, Excel, CSV, or JSON",
      "Include metadata, relationships, and gap analysis in reports",
      "Schedule automated report generation (coming soon)"
    ]
  }
];

const quickActions = [
  { title: "Browse NIST Controls", description: "View all NIST 800-53 controls", action: "Go to Control Library" },
  { title: "Map PCI to HIPAA", description: "See relationships between frameworks", action: "Open Framework Mapping" },
  { title: "Run Gap Analysis", description: "Identify compliance gaps", action: "Start Gap Analysis" },
  { title: "Generate Report", description: "Create compliance documentation", action: "Create Report" }
];

export function UserGuide() {
  const [activeStep, setActiveStep] = useState("overview");
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">User Guide</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to effectively use the Compliance Library platform
        </p>
      </div>

      <Tabs defaultValue="tutorial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tutorial">Step-by-Step Tutorial</TabsTrigger>
          <TabsTrigger value="quick">Quick Actions</TabsTrigger>
          <TabsTrigger value="tips">Tips & Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="tutorial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Tutorial Steps</h3>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <Button
                    key={step.id}
                    variant={activeStep === step.id ? "default" : "outline"}
                    className="w-full justify-start h-auto p-3"
                    onClick={() => setActiveStep(step.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {index + 1}
                        </span>
                        <step.icon className="h-4 w-4" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium">{step.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {step.description}
                        </div>
                      </div>
                      {completedSteps.includes(step.id) && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              {steps.map((step) => (
                activeStep === step.id && (
                  <Card key={step.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <step.icon className="h-6 w-6" />
                        <div>
                          <CardTitle>{step.title}</CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {step.content.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <p className="text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">
                          Step {steps.findIndex(s => s.id === step.id) + 1} of {steps.length}
                        </Badge>
                        <Button 
                          onClick={() => markStepComplete(step.id)}
                          disabled={completedSteps.includes(step.id)}
                        >
                          {completedSteps.includes(step.id) ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Mark Complete
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quick" className="space-y-4">
          <div className="grid gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h4 className="font-medium">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Button variant="outline">
                    {action.action}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium">Framework Selection</h4>
                  <p className="text-sm text-muted-foreground">
                    Start with your primary compliance requirement (e.g., PCI-DSS for payment processing) 
                    and then map to supporting frameworks like NIST 800-53 for comprehensive coverage.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium">Report Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    Include relationship mappings in reports to show auditors how controls in different 
                    frameworks support each other, reducing duplicate implementation efforts.
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium">Gap Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Regularly run gap analyses as your organization grows and compliance requirements 
                    evolve. Focus on high-confidence mappings first for maximum impact.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
