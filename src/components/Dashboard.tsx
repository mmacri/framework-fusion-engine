
import { useState, useEffect } from "react";
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
import { MasterFrameworkDashboard } from "@/components/MasterFramework/MasterFrameworkDashboard";

export function Dashboard() {
  const [activeView, setActiveView] = useState("master-framework");
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  useEffect(() => {
    console.log('Dashboard mounted, activeView:', activeView);
  }, []);

  const handleViewChange = (view: string) => {
    console.log('Dashboard view changed to:', view);
    setActiveView(view);
  };

  const handleFrameworkChange = (framework: string) => {
    console.log('Dashboard framework changed to:', framework);
    setSelectedFramework(framework);
  };

  const handleFrameworkSelect = (framework: string) => {
    console.log('Framework selected from overview:', framework);
    setSelectedFramework(framework);
    setActiveView("controls");
  };

  const renderActiveView = () => {
    console.log('Rendering view:', activeView);
    switch (activeView) {
      case "overview":
        return <DashboardOverview onFrameworkSelect={handleFrameworkSelect} />;
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
      case "master-framework":
        return <MasterFrameworkDashboard />;
      default:
        return <DashboardOverview onFrameworkSelect={handleFrameworkSelect} />;
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
