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
import { Button } from "@/components/ui/button";

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
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

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

  // Show welcome screen first
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-6xl mx-auto py-12">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="h-12 w-12 text-primary" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Framework Fusion Engine
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A collaborative platform for managing security controls across multiple compliance frameworks.
              </p>
            </div>
            <Button size="lg" onClick={handleGetStarted} className="text-lg px-8 py-6">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
