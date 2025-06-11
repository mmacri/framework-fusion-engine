
import { useState } from "react";
import { 
  Search,
  Shield,
  FileText,
  BarChart3,
  Download,
  Settings,
  ChevronRight
} from "lucide-react";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    id: "dashboard",
  },
  {
    title: "Control Library",
    icon: Shield,
    id: "controls",
  },
  {
    title: "Framework Mapping",
    icon: FileText,
    id: "mapping",
  },
  {
    title: "Gap Analysis",
    icon: Search,
    id: "gaps",
  },
  {
    title: "Reports & Export",
    icon: Download,
    id: "reports",
  },
];

const frameworks = [
  { name: "NIST 800-53", id: "nist", count: 945 },
  { name: "PCI-DSS", id: "pci", count: 281 },
  { name: "HIPAA Security", id: "hipaa", count: 164 },
  { name: "SOX ITGC", id: "sox", count: 127 },
  { name: "Adobe CCF", id: "adobe", count: 892 },
];

interface SidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
}

export function Sidebar({ activeView = "dashboard", onViewChange }: SidebarProps) {
  return (
    <SidebarContainer className="border-r border-border bg-card">
      <SidebarHeader className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Compliance Library</h1>
            <p className="text-sm text-muted-foreground">Control Relationship Platform</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange?.(item.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      activeView === item.id && "bg-accent text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Frameworks
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {frameworks.map((framework) => (
                <SidebarMenuItem key={framework.id}>
                  <SidebarMenuButton className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground">
                    <span className="truncate">{framework.name}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {framework.count}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}
