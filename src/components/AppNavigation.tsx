
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Shield, 
  Home, 
  BookOpen, 
  Users, 
  FileText, 
  BarChart3, 
  ChevronDown,
  HelpCircle,
  Edit3,
  ClipboardList,
  TrendingUp,
  Menu,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function AppNavigation({ activeView, onViewChange }: AppNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const mainNavItems = [
    { id: "master-framework", label: "Master Framework", icon: BarChart3 },
    { id: "overview", label: "Overview", icon: Home }
  ];

  const assessmentItems = [
    { id: "compliance-qa", label: "Compliance Q&A", icon: ClipboardList, description: "Interactive compliance questionnaire" },
    { id: "auditor-assessment", label: "Auditor Assessment", icon: Users, description: "Comprehensive auditor review tools" },
    { id: "project-assessment", label: "Project Assessment", icon: TrendingUp, description: "Project-specific compliance tracking" }
  ];

  const reportItems = [
    { id: "framework-reports", label: "Framework Reports", icon: FileText, description: "Generate framework-based reports" },
    { id: "assessment-reports", label: "Assessment Results", icon: BarChart3, description: "View completed assessment results" },
    { id: "compliance-dashboard", label: "Compliance Dashboard", icon: TrendingUp, description: "Overview of compliance status" }
  ];

  const communityItems = [
    { id: "community", label: "Community Home", icon: Users, description: "Community dashboard and discussions" },
    { id: "community-edits", label: "Propose Edits", icon: Edit3, description: "Suggest framework improvements" }
  ];

  const resourceItems = [
    { id: "use-cases", label: "Use Cases", icon: BookOpen, description: "Framework implementation examples" },
    { id: "guide", label: "User Guide", icon: HelpCircle, description: "Help and documentation" }
  ];

  const isActiveSection = (sectionItems: any[]) => 
    sectionItems.some(item => item.id === activeView);

  const NavigationItems = () => (
    <>
      {/* Main Navigation Items */}
      {mainNavItems.map((item) => (
        <Button
          key={item.id}
          variant={activeView === item.id ? "default" : "ghost"}
          size="sm"
          onClick={() => {
            onViewChange(item.id);
            setMobileMenuOpen(false);
          }}
          className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
            activeView === item.id 
              ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
              : "text-foreground hover:text-primary hover:bg-primary/10"
          }`}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Button>
      ))}

      {/* Assessments Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isActiveSection(assessmentItems) ? "default" : "ghost"}
            size="sm"
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActiveSection(assessmentItems)
                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                : "text-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            <span>Assessments</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-80 bg-popover border border-border shadow-lg rounded-lg z-50 p-2"
        >
          {assessmentItems.map((item, index) => (
            <div key={item.id}>
              <DropdownMenuItem
                onClick={() => {
                  onViewChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
                  activeView === item.id 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </DropdownMenuItem>
              {index < assessmentItems.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reports Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isActiveSection(reportItems) ? "default" : "ghost"}
            size="sm"
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActiveSection(reportItems)
                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                : "text-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Reports</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-80 bg-popover border border-border shadow-lg rounded-lg z-50 p-2"
        >
          {reportItems.map((item, index) => (
            <div key={item.id}>
              <DropdownMenuItem
                onClick={() => {
                  onViewChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
                  activeView === item.id 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </DropdownMenuItem>
              {index < reportItems.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Community Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isActiveSection(communityItems) ? "default" : "ghost"}
            size="sm"
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActiveSection(communityItems)
                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                : "text-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Community</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-80 bg-popover border border-border shadow-lg rounded-lg z-50 p-2"
        >
          {communityItems.map((item, index) => (
            <div key={item.id}>
              <DropdownMenuItem
                onClick={() => {
                  onViewChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
                  activeView === item.id 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </DropdownMenuItem>
              {index < communityItems.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Resources Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isActiveSection(resourceItems) ? "default" : "ghost"}
            size="sm"
            className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
              isActiveSection(resourceItems)
                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                : "text-foreground hover:text-primary hover:bg-primary/10"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Resources</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-80 bg-popover border border-border shadow-lg rounded-lg z-50 p-2"
        >
          {resourceItems.map((item, index) => (
            <div key={item.id}>
              <DropdownMenuItem
                onClick={() => {
                  onViewChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
                  activeView === item.id 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </DropdownMenuItem>
              {index < resourceItems.length - 1 && <DropdownMenuSeparator />}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-foreground leading-tight">
                  Framework Fusion
                </h1>
                <Badge variant="outline" className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                  Engine
                </Badge>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center space-x-1">
              <NavigationItems />
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <span className="font-bold text-foreground">Framework Fusion</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-2">
                  <NavigationItems />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
}
