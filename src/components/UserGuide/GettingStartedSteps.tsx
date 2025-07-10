import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, BarChart3, GitBranch, ClipboardList, FileText } from "lucide-react";

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

export function GettingStartedSteps() {
  return (
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
  );
}