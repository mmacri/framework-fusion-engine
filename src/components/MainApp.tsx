
import { useState } from "react";
import { AppNavigation } from "./AppNavigation";
import { ControlLibrary } from "./ControlLibrary";
import { FrameworkMapping } from "./FrameworkMapping";
import { GapAnalysis } from "./GapAnalysis";
import { Reports } from "./Reports";
import { DashboardOverview } from "./DashboardOverview";
import { UserGuide } from "./UserGuide";
import { UseCasesLibrary } from "./UseCasesLibrary";
import { CommunityDashboard } from "./Community/CommunityDashboard";

export function MainApp() {
  const [activeView, setActiveView] = useState("overview");
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const handleFrameworkSelect = (framework: string) => {
    setSelectedFramework(framework);
    setActiveView("controls");
  };

  const renderActiveComponent = () => {
    switch (activeView) {
      case "overview":
        return <DashboardOverview onFrameworkSelect={handleFrameworkSelect} />;
      case "controls":
        return <ControlLibrary selectedFramework={selectedFramework} />;
      case "mapping":
        return <FrameworkMapping />;
      case "gaps":
        return <GapAnalysis />;
      case "reports":
        return <Reports />;
      case "community":
        return <CommunityDashboard />;
      case "use-cases":
        return <UseCasesLibrary />;
      case "guide":
        return <UserGuide />;
      default:
        return <DashboardOverview onFrameworkSelect={handleFrameworkSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />
      <main className="container mx-auto px-6 py-6">
        {renderActiveComponent()}
      </main>
    </div>
  );
}
