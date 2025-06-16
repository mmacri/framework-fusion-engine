
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, CheckCircle, ArrowRight, Download, ExternalLink } from "lucide-react";

export function UserGuide() {
  const guideSteps = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of Framework Fusion",
      steps: [
        "Navigate to the Overview page to see available frameworks",
        "Select a framework to explore its controls",
        "Use the search and filter options to find specific controls",
        "View control details by clicking on individual controls"
      ]
    },
    {
      id: "framework-mapping",
      title: "Framework Mapping",
      description: "Understanding control relationships",
      steps: [
        "Go to the Mapping page from the navigation",
        "Select source and target frameworks",
        "Review mapping relationships and confidence levels",
        "Use filters to find specific mapping types"
      ]
    },
    {
      id: "gap-analysis",
      title: "Gap Analysis",
      description: "Identify coverage gaps",
      steps: [
        "Access the Analysis page",
        "Compare frameworks to identify gaps",
        "Review coverage statistics",
        "Download gap reports for remediation planning"
      ]
    },
    {
      id: "reports",
      title: "Generating Reports",
      description: "Create compliance reports",
      steps: [
        "Visit the Reports page",
        "Select your desired framework and report type",
        "Choose from available templates",
        "Generate and download reports in various formats"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I find controls for a specific framework?",
      answer: "Use the Controls page and select your framework from the dropdown filter. You can also search by control ID, title, or description."
    },
    {
      question: "What do the confidence levels in mappings mean?",
      answer: "Confidence levels (0-100%) indicate how closely related two controls are. Higher percentages mean stronger relationships."
    },
    {
      question: "Can I contribute to the control library?",
      answer: "Yes! Join our community to propose edits, suggest new controls, and improve existing mappings."
    },
    {
      question: "How do I export my analysis results?",
      answer: "Most pages have export options. Look for download buttons to get reports in PDF, Excel, or CSV formats."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          User Guide
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn how to effectively use Framework Fusion for your compliance management needs.
        </p>
      </div>

      <Tabs defaultValue="guide" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guide">Step-by-Step Guide</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="guide" className="space-y-6">
          {guideSteps.map((section, index) => (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-800">{index + 1}</Badge>
                  <CardTitle>{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  Framework Comparison Guide
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Control Implementation Best Practices
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Compliance Mapping Methodology
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Quick Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  Control Categories Cheat Sheet
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Framework Overview PDF
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Mapping Confidence Guide
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
