
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, HelpCircle, Users, Shield, FileText, BarChart3, Search } from "lucide-react";

export function UserGuide() {
  const quickStartSteps = [
    {
      step: 1,
      title: "Explore the Dashboard",
      description: "Start with the overview to understand available frameworks and recent activity",
      time: "2 min"
    },
    {
      step: 2, 
      title: "Browse Controls",
      description: "Navigate to the Controls Library to explore security controls by framework",
      time: "5 min"
    },
    {
      step: 3,
      title: "View Mappings", 
      description: "Check Framework Mapping to understand relationships between controls",
      time: "3 min"
    },
    {
      step: 4,
      title: "Run Gap Analysis",
      description: "Use Gap Analysis to identify coverage gaps in your compliance program",
      time: "10 min"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Controls Library",
      description: "Browse 2,400+ security controls across NIST, PCI-DSS, HIPAA, SOX, and ISO 27001",
      actions: ["Search controls", "Filter by framework", "View implementation guidance"]
    },
    {
      icon: FileText,
      title: "Framework Mapping",
      description: "Explore relationships and mappings between different compliance frameworks",
      actions: ["View control relationships", "Understand equivalencies", "Identify overlaps"]
    },
    {
      icon: BarChart3,
      title: "Gap Analysis",
      description: "Identify coverage gaps and optimization opportunities in your compliance program",
      actions: ["Assess current state", "Identify critical gaps", "Generate remediation plans"]
    },
    {
      icon: Users,
      title: "Community Features",
      description: "Participate in collaborative editing and community discussions",
      actions: ["Propose edits", "Review contributions", "Engage in discussions"]
    }
  ];

  const faqItems = [
    {
      question: "How do I get started with Framework Fusion?",
      answer: "Begin by exploring the Dashboard Overview to understand the platform. Then navigate to the Controls Library to browse security controls, or run a Gap Analysis to assess your current compliance posture."
    },
    {
      question: "Can I contribute to the control library?",
      answer: "Yes! Framework Fusion is community-driven. You can propose edits to existing controls, suggest new mappings, and participate in discussions through the Community section."
    },
    {
      question: "How accurate are the control mappings?",
      answer: "Our mappings are maintained by security experts and the community. Each mapping includes a confidence score and is regularly reviewed for accuracy. You can also contribute to improve mappings."
    },
    {
      question: "Can I export reports and data?",
      answer: "Absolutely! Use the Reports section to generate compliance reports, gap analysis documents, and export data in various formats including PDF, Excel, and CSV."
    },
    {
      question: "Is Framework Fusion suitable for my organization size?",
      answer: "Framework Fusion is designed to scale from small organizations to large enterprises. The platform provides value whether you're just starting your compliance journey or maintaining mature programs."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          User Guide
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn how to effectively use Framework Fusion for your compliance management needs
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>
            Get up and running with Framework Fusion in under 20 minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {quickStartSteps.map((step) => (
              <div key={step.step} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <Badge variant="outline">{step.time}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature Guide */}
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Key Actions:</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {feature.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Video Tutorials</CardTitle>
                <CardDescription>Step-by-step video guides for common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Getting Started with Framework Fusion",
                    "Running Your First Gap Analysis", 
                    "Understanding Control Mappings",
                    "Contributing to the Community"
                  ].map((tutorial, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Play className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{tutorial}</span>
                      </div>
                      <Badge variant="outline">Coming Soon</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Written Guides</CardTitle>
                <CardDescription>Detailed documentation for advanced features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Complete Control Library Reference",
                  "Advanced Gap Analysis Techniques",
                  "Custom Report Generation",
                  "Community Contribution Guidelines"
                ].map((guide, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{guide}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Common questions and answers about Framework Fusion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-lg">{item.question}</h4>
                    <p className="text-muted-foreground">{item.answer}</p>
                    {index < faqItems.length - 1 && <hr className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Support */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Users className="h-12 w-12 text-blue-600 mx-auto" />
            <h3 className="text-lg font-semibold">Need More Help?</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Join our community discussions or reach out to our support team for assistance with any questions.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Community Forum
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
