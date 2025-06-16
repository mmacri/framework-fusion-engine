
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
  HelpCircle,
  Edit3
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
    { id: "gaps", label: "Analysis", icon: Search }
  ];

  const communityItems = [
    { id: "community", label: "Community Home", icon: Users },
    { id: "community-edits", label: "Propose Edits", icon: Edit3 }
  ];

  const resourceItems = [
    { id: "use-cases", label: "Use Cases", icon: BookOpen },
    { id: "reports", label: "Reports", icon: Download },
    { id: "guide", label: "User Guide", icon: HelpCircle }
  ];

  return (
    <div className="nav-clean sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Framework Fusion</h1>
              <Badge variant="secondary" className="text-xs font-medium">Community Edition</Badge>
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
                    className="flex items-center gap-2 font-medium"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </NavigationMenuItem>
              ))}

              {/* Community Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 font-medium">
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[300px] gap-3 p-4 bg-background border border-border rounded-lg shadow-clean-lg">
                    {communityItems.map((item) => (
                      <NavigationMenuLink key={item.id} asChild>
                        <Button
                          variant={activeView === item.id ? "default" : "ghost"}
                          size="sm"
                          onClick={() => onViewChange(item.id)}
                          className="w-full justify-start gap-2 font-medium"
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 font-medium">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[300px] gap-3 p-4 bg-background border border-border rounded-lg shadow-clean-lg">
                    {resourceItems.map((item) => (
                      <NavigationMenuLink key={item.id} asChild>
                        <Button
                          variant={activeView === item.id ? "default" : "ghost"}
                          size="sm"
                          onClick={() => onViewChange(item.id)}
                          className="w-full justify-start gap-2 font-medium"
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
