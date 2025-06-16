
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { 
  Shield, 
  Home, 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  Search,
  Download,
  HelpCircle 
} from "lucide-react";

interface AppNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function AppNavigation({ activeView, onViewChange }: AppNavigationProps) {
  const mainNavItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "controls", label: "Controls", icon: Shield },
    { id: "mapping", label: "Mapping", icon: FileText },
    { id: "gaps", label: "Analysis", icon: Search },
    { id: "community", label: "Community", icon: Users }
  ];

  const resourceItems = [
    { id: "use-cases", label: "Use Cases", icon: BookOpen },
    { id: "reports", label: "Reports", icon: Download },
    { id: "guide", label: "User Guide", icon: HelpCircle }
  ];

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-semibold">Framework Fusion</h1>
              <Badge variant="secondary" className="text-xs">Community Edition</Badge>
            </div>
          </div>

          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList>
              {/* Main Navigation */}
              {mainNavItems.map((item) => (
                <NavigationMenuItem key={item.id}>
                  <Button
                    variant={activeView === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onViewChange(item.id)}
                    className="flex items-center gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </NavigationMenuItem>
              ))}

              {/* Resources Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[300px] gap-3 p-4">
                    {resourceItems.map((item) => (
                      <NavigationMenuLink key={item.id} asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewChange(item.id)}
                          className="w-full justify-start gap-2"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}
