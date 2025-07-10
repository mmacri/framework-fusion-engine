
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  TrendingUp
} from "lucide-react";

interface AppNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function AppNavigation({ activeView, onViewChange }: AppNavigationProps) {
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

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">
                  Compliance Framework Library
                </h1>
                <Badge variant="outline" className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border-blue-200">
                  Master Framework System
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-1">
            {/* Main Navigation Items */}
            {mainNavItems.map((item) => (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  activeView === item.id 
                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
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
                      ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <ClipboardList className="h-4 w-4" />
                  <span>Assessments</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50 p-2"
              >
                {assessmentItems.map((item, index) => (
                  <div key={item.id}>
                    <DropdownMenuItem
                      onClick={() => onViewChange(item.id)}
                      className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
                        activeView === item.id 
                          ? "bg-blue-50 text-blue-900" 
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mt-0.5 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
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
                      ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Reports</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50 p-2"
              >
                {reportItems.map((item, index) => (
                  <div key={item.id}>
                    <DropdownMenuItem
                      onClick={() => onViewChange(item.id)}
                      className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
                        activeView === item.id 
                          ? "bg-blue-50 text-blue-900" 
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mt-0.5 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
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
                      ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50 p-2"
              >
                {communityItems.map((item, index) => (
                  <div key={item.id}>
                    <DropdownMenuItem
                      onClick={() => onViewChange(item.id)}
                      className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
                        activeView === item.id 
                          ? "bg-blue-50 text-blue-900" 
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mt-0.5 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
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
                      ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Resources</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50 p-2"
              >
                {resourceItems.map((item, index) => (
                  <div key={item.id}>
                    <DropdownMenuItem
                      onClick={() => onViewChange(item.id)}
                      className={`flex items-start space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
                        activeView === item.id 
                          ? "bg-blue-50 text-blue-900" 
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mt-0.5 text-blue-600" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </DropdownMenuItem>
                    {index < resourceItems.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
