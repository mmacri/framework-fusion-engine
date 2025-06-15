
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Shield, FileText, BarChart3, Users } from "lucide-react";

interface QuickStartStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  completed: boolean;
}

interface QuickStartGuideProps {
  onStepClick: (stepId: string) => void;
}

export function QuickStartGuide({ onStepClick }: QuickStartGuideProps) {
  const steps: QuickStartStep[] = [
    {
      id: "explore-controls",
      title: "Explore Control Library",
      description: "Browse thousands of controls across NIST, PCI-DSS, HIPAA, and SOX frameworks",
      icon: Shield,
      completed: false
    },
    {
      id: "view-mappings",
      title: "View Framework Mappings",
      description: "See how controls relate across different compliance frameworks",
      icon: FileText,
      completed: false
    },
    {
      id: "analyze-gaps",
      title: "Analyze Coverage Gaps",
      description: "Identify missing controls and implementation gaps in your compliance program",
      icon: BarChart3,
      completed: false
    },
    {
      id: "use-cases",
      title: "Learn from Use Cases",
      description: "Study real-world implementation scenarios and best practices",
      icon: Users,
      completed: false
    }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Quick Start Guide
          <CheckCircle className="h-5 w-5 text-green-500" />
        </CardTitle>
        <CardDescription>
          Get familiar with the platform in 4 simple steps
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => onStepClick(step.id)}
          >
            <div className="mt-1">
              {step.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <step.icon className="h-4 w-4 text-primary" />
                <h4 className="font-medium">{step.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
            <Button variant="ghost" size="sm">
              Start
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
