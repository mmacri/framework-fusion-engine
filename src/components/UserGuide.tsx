import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GettingStartedSteps } from "./UserGuide/GettingStartedSteps";
import { CoreFeatures } from "./UserGuide/CoreFeatures";
import { FrameworkGuide } from "./UserGuide/FrameworkGuide";
import { AssessmentWorkflows } from "./UserGuide/AssessmentWorkflows";
import { ReportTypes } from "./UserGuide/ReportTypes";
import { SupportSection } from "./UserGuide/SupportSection";

export function UserGuide() {
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
      <GettingStartedSteps />

      {/* Main Content Tabs */}
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Core Features</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-6">
          <CoreFeatures />
        </TabsContent>

        <TabsContent value="frameworks" className="space-y-6">
          <FrameworkGuide />
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <AssessmentWorkflows />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportTypes />
        </TabsContent>
      </Tabs>

      {/* Support Section */}
      <SupportSection />
    </div>
  );
}