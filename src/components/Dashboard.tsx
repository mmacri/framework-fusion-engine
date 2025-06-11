
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

  const renderContent = () => {
    switch (activeView) {
      case "controls":
        return <ControlLibrary />;
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
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </SidebarProvider>
  );
}
