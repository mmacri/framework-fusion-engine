
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Search, FileText, BarChart3, Users, Download, ArrowRight, Clock } from "lucide-react";

interface QuickStartGuideProps {
  onStepClick: (stepId: string) => void;
}

export function QuickStartGuide({ onStepClick }: QuickStartGuideProps) {
  const quickStartSteps = [
    {
      id: "explore-frameworks",
      title: "Explore Frameworks",
      description: "Start by browsing available compliance frameworks and their controls",
      icon: Shield,
      duration: "5 minutes",
      difficulty: "Beginner",
      actions: [
        "Browse the framework overview",
        "Select a framework of interest", 
        "Review control categories"
      ]
    },
    {
      id: "search-controls",
      title: "Search Controls",
      description: "Learn how to find specific controls using search and filters",
      icon: Search,
      duration: "10 minutes", 
      difficulty: "Beginner",
      actions: [
        "Use the search functionality",
        "Apply category filters",
        "View control details"
      ]
    },
    {
      id: "understand-mappings",
      title: "Understand Mappings",
      description: "Discover how controls relate across different frameworks",
      icon: FileText,
      duration: "15 minutes",
      difficulty: "Intermediate", 
      actions: [
        "Explore the mapping page",
        "Compare framework relationships",
        "Review confidence levels"
      ]
    },
    {
      id: "perform-analysis",
      title: "Perform Gap Analysis",
      description: "Identify coverage gaps and optimization opportunities",
      icon: BarChart3,
      duration: "20 minutes",
      difficulty: "Intermediate",
      actions: [
        "Run a gap analysis",
        "Review coverage statistics",
        "Identify improvement areas"
      ]
    },
    {
      id: "generate-reports",
      title: "Generate Reports",
      description: "Create compliance reports for stakeholders",
      icon: Download,
      duration: "10 minutes",
      difficulty: "Beginner",
      actions: [
        "Select report templates",
        "Customize report parameters",
        "Download in preferred format"
      ]
    },
    {
      id: "join-community",
      title: "Join the Community",
      description: "Contribute to the growing knowledge base",
      icon: Users,
      duration: "Ongoing",
      difficulty: "All Levels",
      actions: [
        "Propose control improvements",
        "Vote on community edits",
        "Share implementation experiences"
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Quick Start Guide</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow these steps to get the most out of Framework Fusion. 
          Each step builds upon the previous one to give you a comprehensive understanding.
        </p>
      </div>

      <div className="grid gap-6">
        {quickStartSteps.map((step, index) => (
          <Card key={step.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => onStepClick(step.id)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </div>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={getDifficultyColor(step.difficulty)}>
                    {step.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {step.duration}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">What you'll do:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {step.actions.map((action, actionIndex) => (
                      <li key={actionIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="group">
                    Start Step
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Need Help?</h3>
            <p className="text-muted-foreground">
              Our community is here to help you succeed. Join discussions, ask questions, and share your experiences.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline">
                View Documentation
              </Button>
              <Button>
                Join Community
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
