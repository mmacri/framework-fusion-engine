
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WelcomeSection } from "@/components/WelcomeSection";
import { QuickStartGuide } from "@/components/QuickStartGuide";
import { Shield, FileText, BarChart3, Users, BookOpen, Download, ExternalLink } from "lucide-react";

export function PublicDashboard() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  const handleQuickStartStep = (stepId: string) => {
    // This would trigger navigation to specific sections
    console.log(`Navigate to: ${stepId}`);
  };

  const frameworkStats = [
    { name: "NIST 800-53", controls: 945, coverage: "Complete" },
    { name: "PCI-DSS", controls: 281, coverage: "Complete" },
    { name: "HIPAA Security", controls: 164, coverage: "Complete" },
    { name: "SOX ITGC", controls: 127, coverage: "Complete" },
    { name: "Adobe CCF", controls: 892, coverage: "Complete" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Control Library",
      description: "Browse 2,400+ security controls across major frameworks",
      action: "Explore Controls"
    },
    {
      icon: FileText,
      title: "Framework Mapping",
      description: "Visualize relationships between different compliance frameworks",
      action: "View Mappings"
    },
    {
      icon: BarChart3,
      title: "Gap Analysis",
      description: "Identify coverage gaps and optimization opportunities",
      action: "Analyze Gaps"
    },
    {
      icon: Users,
      title: "Use Cases",
      description: "Learn from real-world implementation scenarios",
      action: "Browse Cases"
    }
  ];

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-6xl mx-auto py-12">
          <WelcomeSection onGetStarted={handleGetStarted} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Compliance Management Platform</h1>
        <p className="text-muted-foreground mt-2">
          Open-source tool for managing security controls across multiple compliance frameworks
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{feature.description}</CardDescription>
                  <Button variant="outline" size="sm" className="w-full">
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
                <CardDescription>Current coverage across all frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary">2,400+</div>
                      <div className="text-sm text-muted-foreground">Security Controls</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">5</div>
                      <div className="text-sm text-muted-foreground">Major Frameworks</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-primary">1,200+</div>
                      <div className="text-sm text-muted-foreground">Control Mappings</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">Use Cases</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What's New</CardTitle>
                <CardDescription>Latest updates and improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium text-sm">Enhanced AI Recommendations</p>
                      <p className="text-xs text-muted-foreground">Improved control mapping suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium text-sm">New Use Case Library</p>
                      <p className="text-xs text-muted-foreground">Real-world implementation scenarios</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium text-sm">Improved Framework Coverage</p>
                      <p className="text-xs text-muted-foreground">Added Adobe CCF support</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="getting-started">
          <QuickStartGuide onStepClick={handleQuickStartStep} />
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supported Frameworks</CardTitle>
              <CardDescription>
                Comprehensive coverage of major compliance and security frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {frameworkStats.map((framework) => (
                  <div key={framework.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{framework.name}</h4>
                      <p className="text-sm text-muted-foreground">{framework.controls} controls</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600 font-medium">{framework.coverage}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
                  User Guide
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  API Documentation
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Best Practices
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Downloads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  Framework Mapping CSV
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Control Library Export
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Report Templates
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
