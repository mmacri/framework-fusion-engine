
import { useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Shield, BarChart3, FileText, BookOpen, Users, Settings, Home, GitBranch } from "lucide-react";
import { ControlLibrary } from "./ControlLibrary";
import { FrameworkMapping } from "./FrameworkMapping";
import { GapAnalysis } from "./GapAnalysis";
import { Reports } from "./Reports";
import { DashboardOverview } from "./DashboardOverview";
import { UserGuide } from "./UserGuide";
import { EnhancedDashboard } from "./EnhancedDashboard";
import { UseCasesLibrary } from "./UseCasesLibrary";
import { CommunityDashboard } from "./Community/CommunityDashboard";

const menuItems = [
  { title: "Overview", icon: Home, component: "overview" },
  { title: "Control Library", icon: Shield, component: "controls" },
  { title: "Framework Mapping", icon: BarChart3, component: "mapping" },
  { title: "Gap Analysis", icon: FileText, component: "gaps" },
  { title: "Reports", icon: FileText, component: "reports" },
  { title: "Community", icon: Users, component: "community" },
  { title: "Use Cases", icon: BookOpen, component: "use-cases" },
  { title: "User Guide", icon: BookOpen, component: "guide" },
  { title: "Enhanced Dashboard", icon: Settings, component: "enhanced" },
];

export function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("overview");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "overview":
        return <DashboardOverview />;
      case "controls":
        return <ControlLibrary />;
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
      case "enhanced":
        return <EnhancedDashboard />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Framework Fusion Engine</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        onClick={() => setActiveComponent(item.component)}
                        isActive={activeComponent === item.component}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1">
          <SidebarTrigger className="m-4" />
          {renderActiveComponent()}
        </main>
      </div>
    </SidebarProvider>
  );
}
