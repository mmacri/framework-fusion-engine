import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  GitBranch, 
  BarChart3, 
  ClipboardList, 
  FileText, 
  Users, 
  PlayCircle, 
  BookOpen,
  ArrowRight,
  CheckCircle,
  Target,
  Database,
  Network,
  TrendingUp
} from "lucide-react";

export function UserGuide() {
  const gettingStartedSteps = [
    {
      step: 1,
      title: "Explore the Master Framework",
      description: "Start with the unified master framework that correlates controls across all supported frameworks",
      icon: BarChart3,
      time: "5 min",
      actions: ["Browse correlated controls", "Understand master framework structure", "View framework relationships"]
    },
    {
      step: 2,
      title: "Check Control Mappings",
      description: "Discover how controls relate between NIST, PCI-DSS, HIPAA, SOX, CIS, and custom frameworks",
      icon: GitBranch,
      time: "10 min",
      actions: ["View control correlations", "Understand mapping confidence", "Explore cross-framework relationships"]
    },
    {
      step: 3,
      title: "Run Assessments",
      description: "Use built-in assessment tools to evaluate your compliance posture",
      icon: ClipboardList,
      time: "15-30 min",
      actions: ["Start compliance Q&A", "Complete auditor assessment", "Track project compliance"]
    },
    {
      step: 4,
      title: "Generate Reports",
      description: "Create comprehensive compliance reports for stakeholders",
      icon: FileText,
      time: "5 min",
      actions: ["Select report type", "Customize parameters", "Export in multiple formats"]
    }
  ];

  const coreFeatures = [
    {
      icon: BarChart3,
      title: "Master Framework",
      description: "Unified view of all compliance frameworks with correlated controls and relationships",
      capabilities: [
        "2,400+ controls across frameworks",
        "Real-time correlation mapping",
        "Confidence scoring for relationships",
        "Framework coverage analysis"
      ]
    },
    {
      icon: GitBranch,
      title: "Control Mapping",
      description: "Visual representation of how controls relate across different compliance frameworks",
      capabilities: [
        "Interactive correlation viewer",
        "Cross-framework navigation",
        "Mapping confidence indicators",
        "Clickable control references"
      ]
    },
    {
      icon: ClipboardList,
      title: "Assessment Tools",
      description: "Comprehensive assessment capabilities for different compliance scenarios",
      capabilities: [
        "Compliance Q&A questionnaires",
        "Auditor assessment workflows",
        "Project-specific compliance tracking",
        "Progress monitoring and scoring"
      ]
    },
    {
      icon: FileText,
      title: "Advanced Reporting",
      description: "Generate detailed compliance reports tailored to your organization's needs",
      capabilities: [
        "Framework-specific reports",
        "Assessment result summaries",
        "Compliance dashboard views",
        "Export to PDF, Excel, CSV"
      ]
    },
    {
      icon: Users,
      title: "Community Features",
      description: "Collaborative platform for improving and maintaining framework accuracy",
      capabilities: [
        "Propose control improvements",
        "Community validation process",
        "Discussion forums",
        "Version control for changes"
      ]
    }
  ];

  const frameworkGuide = [
    {
      framework: "Master Framework",
      description: "The central correlation engine that unifies all supported frameworks",
      useCase: "Start here to understand relationships between all frameworks",
      keyFeature: "Correlation mapping with confidence scores"
    },
    {
      framework: "NIST Cybersecurity Framework",
      description: "Comprehensive cybersecurity guidelines with 108 subcategories",
      useCase: "Enterprise cybersecurity risk management",
      keyFeature: "Five core functions: Identify, Protect, Detect, Respond, Recover"
    },
    {
      framework: "PCI-DSS",
      description: "Payment card industry data security standards",
      useCase: "Organizations handling credit card transactions",
      keyFeature: "12 high-level requirements with detailed sub-controls"
    },
    {
      framework: "HIPAA",
      description: "Healthcare information privacy and security requirements",
      useCase: "Healthcare organizations and business associates",
      keyFeature: "Administrative, physical, and technical safeguards"
    },
    {
      framework: "SOX",
      description: "Financial reporting and internal controls requirements",
      useCase: "Public companies and financial reporting",
      keyFeature: "IT general controls and application controls"
    },
    {
      framework: "CIS Controls",
      description: "Prioritized cybersecurity best practices",
      useCase: "Organizations seeking practical cybersecurity implementation",
      keyFeature: "20 critical security controls with implementation groups"
    }
  ];

  const assessmentWorkflows = [
    {
      type: "Compliance Q&A",
      purpose: "Interactive questionnaire for compliance readiness assessment",
      process: "Answer targeted questions about your organization's security posture",
      output: "Compliance score with recommendations for improvement"
    },
    {
      type: "Auditor Assessment",
      purpose: "Comprehensive evaluation tool for audit preparation",
      process: "Detailed review of controls implementation and evidence collection",
      output: "Audit-ready documentation and gap analysis"
    },
    {
      type: "Project Assessment",
      purpose: "Track compliance requirements for specific projects or initiatives",
      process: "Project-specific control mapping and progress tracking",
      output: "Project compliance status and milestone tracking"
    }
  ];

  const reportTypes = [
    {
      type: "Framework Reports",
      description: "Generate reports specific to individual compliance frameworks",
      includes: "Control coverage, implementation status, gap analysis"
    },
    {
      type: "Assessment Results",
      description: "Comprehensive summaries of completed assessments",
      includes: "Scores, recommendations, evidence tracking, remediation plans"
    },
    {
      type: "Compliance Dashboard",
      description: "Executive-level overview of organizational compliance posture",
      includes: "Key metrics, trending data, risk indicators, progress tracking"
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Framework Fusion User Guide
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Complete guide to using Framework Fusion for compliance management, 
          control mapping, and organizational assessment
        </p>
      </div>

      {/* Quick Start */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="h-6 w-6 text-primary" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>
            Get productive with Framework Fusion in under 30 minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {gettingStartedSteps.map((step) => (
              <div key={step.step} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  {step.step}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <step.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <Badge variant="outline" className="ml-auto">{step.time}</Badge>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {step.actions.map((action, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Core Features</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <div className="grid gap-6">
            {coreFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="mt-2">{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {feature.capabilities.map((capability, capIndex) => (
                      <div key={capIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{capability}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Supported Frameworks & Master Correlation
              </CardTitle>
              <CardDescription>
                Framework Fusion provides a unified master framework that correlates controls across all supported compliance standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {frameworkGuide.map((framework, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{framework.framework}</h3>
                      <Badge variant="outline">{framework.keyFeature}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{framework.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="font-medium">Use Case:</span>
                      <span>{framework.useCase}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Assessment Workflows
              </CardTitle>
              <CardDescription>
                Comprehensive assessment tools for different compliance scenarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {assessmentWorkflows.map((workflow, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{workflow.type}</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-primary">Purpose:</span>
                        <p className="mt-1">{workflow.purpose}</p>
                      </div>
                      <div>
                        <span className="font-medium text-primary">Process:</span>
                        <p className="mt-1">{workflow.process}</p>
                      </div>
                      <div>
                        <span className="font-medium text-primary">Output:</span>
                        <p className="mt-1">{workflow.output}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Reporting Capabilities
              </CardTitle>
              <CardDescription>
                Generate comprehensive compliance reports for stakeholders and auditors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTypes.map((report, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{report.type}</h3>
                    <p className="text-muted-foreground mb-3">{report.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Includes:</span>
                      <span>{report.includes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Support Section */}
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Shield className="h-12 w-12 text-green-600 mx-auto" />
            <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Framework Fusion provides everything you need for comprehensive compliance management. 
              Start with the Master Framework to understand control relationships, then use assessments 
              and reporting to maintain your compliance posture.
            </p>
            <div className="flex gap-3 justify-center">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowRight className="h-4 w-4 mr-2" />
                Start with Master Framework
              </Button>
              <Button variant="outline">
                <Network className="h-4 w-4 mr-2" />
                View Control Mappings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}