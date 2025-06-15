
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, Settings, HelpCircle } from "lucide-react";

export function UserGuide() {
  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">User Guide</h1>
        <p className="text-muted-foreground mt-2">
          Learn how to use the Framework Fusion Engine effectively
        </p>
      </div>

      <Tabs defaultValue="getting-started" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Quick Start
              </CardTitle>
              <CardDescription>Get up and running in minutes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
                  <div>
                    <h4 className="font-medium">Explore the Control Library</h4>
                    <p className="text-sm text-muted-foreground">Browse thousands of controls across major frameworks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <h4 className="font-medium">View Framework Mappings</h4>
                    <p className="text-sm text-muted-foreground">See how controls relate across different frameworks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">3</div>
                  <div>
                    <h4 className="font-medium">Analyze Gaps</h4>
                    <p className="text-sm text-muted-foreground">Identify coverage gaps in your compliance program</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">4</div>
                  <div>
                    <h4 className="font-medium">Generate Reports</h4>
                    <p className="text-sm text-muted-foreground">Export data and create compliance reports</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Control Library</CardTitle>
                <CardDescription>Comprehensive security control database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access over 2,400 security controls from NIST 800-53, PCI-DSS, HIPAA, SOX, and Adobe CCF frameworks.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Framework Mapping</CardTitle>
                <CardDescription>Cross-framework control relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Visualize how controls from different frameworks relate to each other and identify overlaps.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="best-practices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Implementation Best Practices</CardTitle>
              <CardDescription>Tips for effective compliance management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">Start with Risk Assessment</h4>
                <p className="text-sm text-muted-foreground">Identify your highest risk areas before implementing controls</p>
              </div>
              <div>
                <h4 className="font-medium">Use Framework Mappings</h4>
                <p className="text-sm text-muted-foreground">Leverage control mappings to avoid duplicate work across frameworks</p>
              </div>
              <div>
                <h4 className="font-medium">Regular Gap Analysis</h4>
                <p className="text-sm text-muted-foreground">Perform periodic assessments to identify and address gaps</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions and answers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">How often is the control library updated?</h4>
                <p className="text-sm text-muted-foreground">
                  The control library is updated quarterly to reflect the latest framework revisions and industry best practices.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Can I export my data?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can export reports and data in various formats including PDF, CSV, and Excel.
                </p>
              </div>
              <div>
                <h4 className="font-medium">Is this tool suitable for small organizations?</h4>
                <p className="text-sm text-muted-foreground">
                  Absolutely! The platform scales from small businesses to large enterprises.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
