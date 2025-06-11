
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Sidebar";
import { ControlLibrary } from "@/components/ControlLibrary";
import { FrameworkMapping } from "@/components/FrameworkMapping";
import { GapAnalysis } from "@/components/GapAnalysis";
import { Reports } from "@/components/Reports";
import { DashboardOverview } from "@/components/DashboardOverview";
import { UserGuide } from "@/components/UserGuide";

export function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const handleFrameworkClick = (frameworkName: string) => {
    setSelectedFramework(frameworkName);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    if (view !== "controls") {
      setSelectedFramework(null);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "controls":
        return <ControlLibrary selectedFramework={selectedFramework} />;
      case "mapping":
        return <FrameworkMapping />;
      case "gaps":
        return <GapAnalysis />;
      case "reports":
        return <Reports />;
      case "guide":
        return <UserGuide />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar 
          activeView={activeView} 
          onViewChange={handleViewChange}
          onFrameworkClick={handleFrameworkClick}
        />
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </SidebarProvider>
  );
}
