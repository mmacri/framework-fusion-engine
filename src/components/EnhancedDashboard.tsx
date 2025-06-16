
import { useState } from "react";
import { DashboardOverview } from "./DashboardOverview";
import { ControlLibrary } from "./ControlLibrary";
import { FrameworkMapping } from "./FrameworkMapping";
import { GapAnalysis } from "./GapAnalysis";
import { Reports } from "./Reports";
import { CommunityDashboard } from "./Community/CommunityDashboard";

export function EnhancedDashboard() {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const handleFrameworkSelect = (framework: string) => {
    setSelectedFramework(framework);
  };

  return (
    <div className="space-y-6">
      <DashboardOverview onFrameworkSelect={handleFrameworkSelect} />
      
      {selectedFramework && (
        <div className="mt-8">
          <ControlLibrary selectedFramework={selectedFramework} />
        </div>
      )}
      
      <div className="grid gap-8">
        <FrameworkMapping />
        <GapAnalysis />
        <Reports />
        <CommunityDashboard />
      </div>
    </div>
  );
}
