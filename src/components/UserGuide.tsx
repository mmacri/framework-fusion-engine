
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
  CheckCircle,
  AlertTriangle,
  Target,
  Users,
  Building
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
    ],
    examples: [
      {
        title: "First Time User",
        scenario: "You're a compliance officer new to the platform",
        steps: [
          "Start with the Dashboard to get an overview of available frameworks",
          "Browse the Control Library to familiarize yourself with different standards",
          "Try the Framework Mapping to see how controls relate to each other",
          "Run a sample Gap Analysis to understand your compliance posture"
        ]
      }
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
    ],
    examples: [
      {
        title: "Finding Access Control Requirements",
        scenario: "You need to implement access controls for a new system",
        steps: [
          "Go to Control Library in the sidebar",
          "Use the search bar to type 'access control'",
          "Filter by your target framework (e.g., NIST 800-53)",
          "Review controls like AC-1, AC-2, AC-3 for comprehensive coverage",
          "Export the filtered list for your implementation team"
        ]
      },
      {
        title: "Comparing Framework Requirements",
        scenario: "You need to understand encryption requirements across frameworks",
        steps: [
          "Search for 'encryption' in the Control Library",
          "Note down relevant controls from each framework",
          "Use Framework Mapping to see how they relate",
          "Document similarities and differences for your team"
        ]
      }
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
    ],
    examples: [
      {
        title: "Leveraging Existing NIST Implementation for PCI Compliance",
        scenario: "Your organization has NIST 800-53 controls and needs PCI-DSS compliance",
        steps: [
          "Navigate to Framework Mapping",
          "Select the 'Framework Matrix' tab",
          "Look for NIST 800-53 → PCI-DSS mapping (shows 67% coverage)",
          "Switch to 'Control Relationships' tab",
          "Review direct mappings like NIST AC-1 → PCI 7.1.1",
          "Use this information to avoid duplicate implementations"
        ]
      },
      {
        title: "Understanding Control Relationships",
        scenario: "You want to see how different frameworks approach user authentication",
        steps: [
          "Go to Framework Mapping → Visual Network",
          "Filter by clicking on NIST, PCI-DSS, and HIPAA badges",
          "Look for authentication-related control clusters",
          "Examine confidence levels for each relationship",
          "Use this to design a unified authentication strategy"
        ]
      }
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
    ],
    examples: [
      {
        title: "Preparing for a PCI-DSS Audit",
        scenario: "You currently have NIST controls and need PCI-DSS compliance",
        steps: [
          "Navigate to Gap Analysis",
          "Set Source Framework to 'NIST 800-53'",
          "Set Target Framework to 'PCI-DSS'",
          "Review the Overview tab showing 67% coverage",
          "Go to Gap Details tab to see specific missing controls",
          "Prioritize 'Critical' and 'High' priority gaps first",
          "Export the gap report for your implementation team"
        ]
      },
      {
        title: "Healthcare Compliance Assessment",
        scenario: "Your organization needs both PCI-DSS and HIPAA compliance",
        steps: [
          "Run Gap Analysis from PCI-DSS to HIPAA",
          "Note the 54% coverage indicating significant gaps",
          "Focus on healthcare-specific requirements like automatic logoff",
          "Use the Recommendations tab for strategic guidance",
          "Plan implementation phases based on priority levels"
        ]
      }
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
      "Share reports with auditors and stakeholders"
    ],
    examples: [
      {
        title: "Audit Documentation Package",
        scenario: "Preparing comprehensive documentation for external auditors",
        steps: [
          "Go to Reports section",
          "Select 'Audit Documentation' template",
          "Choose your implemented frameworks (e.g., NIST + PCI-DSS)",
          "Enable 'Include Relationships' and 'Include Metadata'",
          "Select PDF format for formal presentation",
          "Generate and download the comprehensive audit package"
        ]
      },
      {
        title: "Executive Summary Report",
        scenario: "Creating a high-level compliance overview for leadership",
        steps: [
          "Use 'Executive Summary' template",
          "Select all relevant frameworks for your organization",
          "Choose Excel format for easy data manipulation",
          "Include gap analysis data to show compliance posture",
          "Present coverage percentages and priority recommendations"
        ]
      },
      {
        title: "Technical Implementation Guide",
        scenario: "Providing detailed control requirements to IT teams",
        steps: [
          "Select 'Implementation Guide' template",
          "Focus on specific framework (e.g., NIST 800-53)",
          "Choose CSV format for easy filtering and sorting",
          "Include detailed control descriptions and requirements",
          "Share with technical teams for implementation planning"
        ]
      }
    ]
  }
];

const scenarios = [
  {
    icon: Building,
    title: "Financial Services Organization",
    description: "Bank implementing PCI-DSS with existing NIST controls",
    challenge: "Avoid duplicate implementations while ensuring full PCI compliance",
    solution: "Use Framework Mapping to identify overlapping controls, then Gap Analysis to find missing PCI requirements",
    outcome: "67% control reuse, focused implementation on 49 unique PCI controls"
  },
  {
    icon: Users,
    title: "Healthcare Technology Company",
    description: "SaaS provider needing both HIPAA and SOX compliance",
    challenge: "Understand compliance requirements for handling PHI and financial data",
    solution: "Map HIPAA and SOX requirements, identify common controls, create unified implementation plan",
    outcome: "Streamlined compliance program covering both healthcare and financial regulations"
  },
  {
    icon: Target,
    title: "Adobe Partner Organization",
    description: "Agency implementing Adobe CCF for client data security",
    challenge: "Align Adobe's security requirements with existing NIST implementation",
    solution: "Use Adobe CCF to NIST mapping (68% coverage), implement additional Adobe-specific controls",
    outcome: "Certified Adobe partner status with minimal additional security overhead"
  }
];

const quickActions = [
  { 
    title: "Browse NIST Controls", 
    description: "View all NIST 800-53 controls with search and filtering", 
    action: "Go to Control Library",
    howTo: "Sidebar → Control Library → Filter by NIST 800-53"
  },
  { 
    title: "Map PCI to HIPAA", 
    description: "See relationships between payment and healthcare frameworks", 
    action: "Open Framework Mapping",
    howTo: "Sidebar → Framework Mapping → Select PCI-DSS and HIPAA badges"
  },
  { 
    title: "Run Gap Analysis", 
    description: "Identify compliance gaps between frameworks", 
    action: "Start Gap Analysis",
    howTo: "Sidebar → Gap Analysis → Select source and target frameworks"
  },
  { 
    title: "Generate Report", 
    description: "Create compliance documentation for audits", 
    action: "Create Report",
    howTo: "Sidebar → Reports → Choose template → Configure options → Export"
  }
];

const bestPractices = [
  {
    category: "Framework Selection",
    tips: [
      "Start with your primary compliance requirement (e.g., PCI-DSS for payment processing)",
      "Map to supporting frameworks like NIST 800-53 for comprehensive coverage",
      "Consider industry-specific requirements (HIPAA for healthcare, SOX for public companies)",
      "Use Adobe CCF if you're working with Adobe products or services"
    ]
  },
  {
    category: "Gap Analysis Strategy",
    tips: [
      "Run gap analyses quarterly as your organization evolves",
      "Focus on high-confidence mappings first for maximum impact",
      "Prioritize Critical and High priority gaps for immediate attention",
      "Use gap analysis results to plan implementation phases"
    ]
  },
  {
    category: "Report Generation",
    tips: [
      "Include relationship mappings to show auditors control overlaps",
      "Use different formats for different audiences (PDF for auditors, Excel for analysis)",
      "Regular reporting helps track compliance progress over time",
      "Share technical reports with implementation teams for detailed guidance"
    ]
  },
  {
    category: "Implementation Planning",
    tips: [
      "Use control relationships to avoid duplicate implementations",
      "Group similar controls across frameworks for efficient implementation",
      "Consider confidence levels when planning control mappings",
      "Document your implementation decisions for future audits"
    ]
  }
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
          Learn how to effectively use the Compliance Library platform with practical examples and scenarios
        </p>
      </div>

      <Tabs defaultValue="tutorial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tutorial">Step-by-Step Tutorial</TabsTrigger>
          <TabsTrigger value="scenarios">Real-World Scenarios</TabsTrigger>
          <TabsTrigger value="quick">Quick Actions</TabsTrigger>
          <TabsTrigger value="tips">Best Practices</TabsTrigger>
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
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        {step.content.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <p className="text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                      
                      {step.examples && (
                        <>
                          <Separator />
                          <div className="space-y-4">
                            <h4 className="font-medium text-lg">Practical Examples</h4>
                            {step.examples.map((example, index) => (
                              <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                                <div className="flex items-start gap-3">
                                  <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                                  <div>
                                    <h5 className="font-medium">{example.title}</h5>
                                    <p className="text-sm text-muted-foreground">{example.scenario}</p>
                                  </div>
                                </div>
                                <div className="ml-8 space-y-2">
                                  <p className="text-sm font-medium">How to do it:</p>
                                  <ol className="list-decimal list-inside space-y-1">
                                    {example.steps.map((stepItem, stepIndex) => (
                                      <li key={stepIndex} className="text-sm text-muted-foreground">
                                        {stepItem}
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      
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

        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid gap-6">
            {scenarios.map((scenario, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <scenario.icon className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle>{scenario.title}</CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Challenge</h4>
                      <p className="text-sm text-muted-foreground">{scenario.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Solution</h4>
                      <p className="text-sm text-muted-foreground">{scenario.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Outcome</h4>
                      <p className="text-sm text-muted-foreground">{scenario.outcome}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quick" className="space-y-4">
          <div className="grid gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <h4 className="font-medium">{action.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {action.howTo}
                      </Badge>
                    </div>
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
          <div className="grid gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{practice.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {practice.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
