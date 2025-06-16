
import { useState } from "react";
import { AppNavigation } from "@/components/AppNavigation";
import { DashboardOverview } from "@/components/DashboardOverview";
import { ControlLibrary } from "@/components/ControlLibrary";
import { FrameworkMapping } from "@/components/FrameworkMapping";
import { GapAnalysis } from "@/components/GapAnalysis";
import { CommunityDashboard } from "@/components/Community/CommunityDashboard";
import { CommunityEditsDashboard } from "@/components/Community/CommunityEditsDashboard";
import { UseCasesLibrary } from "@/components/UseCasesLibrary";
import { Reports } from "@/components/Reports";
import { UserGuide } from "@/components/UserGuide";
import { RouteHandler } from "@/components/RouteHandler";

export function Dashboard() {
  const [activeView, setActiveView] = useState("overview");
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const handleViewChange = (view: string) => {
    console.log('Dashboard view changed to:', view);
    setActiveView(view);
  };

  const handleFrameworkChange = (framework: string) => {
    console.log('Dashboard framework changed to:', framework);
    setSelectedFramework(framework);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "overview":
        return <DashboardOverview />;
      case "controls":
        return <ControlLibrary selectedFramework={selectedFramework} />;
      case "mapping":
        return <FrameworkMapping />;
      case "gaps":
        return <GapAnalysis />;
      case "community":
        return <CommunityDashboard />;
      case "community-edits":
        return <CommunityEditsDashboard />;
      case "use-cases":
        return <UseCasesLibrary />;
      case "reports":
        return <Reports />;
      case "guide":
        return <UserGuide />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <RouteHandler 
        onViewChange={handleViewChange} 
        onFrameworkChange={handleFrameworkChange}
      />
      <AppNavigation activeView={activeView} onViewChange={handleViewChange} />
      <main className="flex-1">
        {renderActiveView()}
      </main>
    </div>
  );
}
