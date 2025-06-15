import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, Settings, HelpCircle, History } from "lucide-react";

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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="change-history">Change History</TabsTrigger>
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

        <TabsContent value="change-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Quarterly Review & Change History
              </CardTitle>
              <CardDescription>Track updates and improvements to the control library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-2 border-primary pl-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-primary">Q4 2024 - December 15, 2024</h4>
                  <p className="text-sm font-medium">Quarterly Library Update Review</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Added 3 new NIST 800-53 controls (RA-9, SR-11, PM-31)</li>
                    <li>• Updated PCI-DSS controls to version 4.0 requirements</li>
                    <li>• Added 3 new PCI-DSS v4.0 controls (6.4.3, 11.6.1, 12.10.7)</li>
                    <li>• Enhanced HIPAA controls with 2024 cybersecurity guidance</li>
                    <li>• Added 2 new HIPAA controls (164.308(a)(7), 164.308(a)(8))</li>
                    <li>• Updated control relationships matrix with 15 new mappings</li>
                    <li>• Verified all framework versions are current as of Q4 2024</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">Reviewed by: System Administrator | Total Controls: 2,458</p>
                </div>
                
                <div>
                  <h4 className="font-semibold">Q3 2024 - September 15, 2024</h4>
                  <p className="text-sm font-medium">Initial Library Implementation</p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Implemented NIST 800-53 Rev 5 control library (5 base controls)</li>
                    <li>• Added PCI-DSS 3.2.1 controls (4 base controls)</li>
                    <li>• Integrated HIPAA Security Rule controls (8 base controls)</li>
                    <li>• Established SOX ITGC control framework (7 base controls)</li>
                    <li>• Created initial control relationship mappings</li>
                    <li>• Set up quarterly review process</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-2">Initial Implementation | Total Controls: 2,400</p>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h5 className="font-medium mb-2">Next Scheduled Review</h5>
                <p className="text-sm text-muted-foreground">Q1 2025 - March 15, 2025</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Review will include updates from NIST SP 800-53 Rev 6 (if released), 
                  PCI-DSS v4.0.1 updates, and any new regulatory guidance.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
