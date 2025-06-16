
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
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Framework Fusion</h1>
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 border-gray-200">Community Edition</Badge>
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
                    className={`flex items-center gap-2 ${
                      activeView === item.id 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </NavigationMenuItem>
              ))}

              {/* Community Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-9 text-gray-700 hover:text-blue-600">
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[300px] gap-3 p-4 bg-white border border-gray-200">
                    {communityItems.map((item) => (
                      <NavigationMenuLink key={item.id} asChild>
                        <Button
                          variant={activeView === item.id ? "default" : "ghost"}
                          size="sm"
                          onClick={() => onViewChange(item.id)}
                          className={`w-full justify-start gap-2 ${
                            activeView === item.id 
                              ? "bg-blue-600 text-white hover:bg-blue-700" 
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                          }`}
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
                <NavigationMenuTrigger className="h-9 text-gray-700 hover:text-blue-600">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[300px] gap-3 p-4 bg-white border border-gray-200">
                    {resourceItems.map((item) => (
                      <NavigationMenuLink key={item.id} asChild>
                        <Button
                          variant={activeView === item.id ? "default" : "ghost"}
                          size="sm"
                          onClick={() => onViewChange(item.id)}
                          className={`w-full justify-start gap-2 ${
                            activeView === item.id 
                              ? "bg-blue-600 text-white hover:bg-blue-700" 
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                          }`}
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
