
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, FileText, Users, CheckCircle } from "lucide-react";

interface QuickStartGuideProps {
  onStepClick: (stepId: string) => void;
}

export function QuickStartGuide({ onStepClick }: QuickStartGuideProps) {
  const steps = [
    {
      id: "explore-controls",
      icon: Shield,
      title: "Explore Control Library",
      description: "Browse our comprehensive collection of security controls across major frameworks",
      status: "available",
      action: "Browse Controls"
    },
    {
      id: "view-mappings",
      icon: FileText,
      title: "View Framework Mappings",
      description: "Understand relationships between different compliance frameworks",
      status: "available",
      action: "View Mappings"
    },
    {
      id: "analyze-gaps",
      icon: Search,
      title: "Perform Gap Analysis",
      description: "Identify coverage gaps and optimization opportunities in your compliance program",
      status: "available",
      action: "Start Analysis"
    },
    {
      id: "join-community",
      icon: Users,
      title: "Join the Community",
      description: "Contribute improvements, propose new controls, and collaborate with experts",
      status: "available",
      action: "Join Community"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Quick Start Guide</h2>
        <p className="text-muted-foreground">
          Get up and running with Framework Fusion Engine in minutes
        </p>
      </div>

      <div className="grid gap-4">
        {steps.map((step, index) => (
          <Card key={step.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Step {index + 1}
                      </Badge>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onStepClick(step.id)}
                  >
                    {step.action}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-blue-800 text-sm">
              Our community is here to help! Join our discussions or check out the documentation.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                View Documentation
              </Button>
              <Button variant="outline" size="sm" className="border-blue-300 text-blue-700">
                Join Discord
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
