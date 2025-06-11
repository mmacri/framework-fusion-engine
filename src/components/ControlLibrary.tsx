import { useState, useEffect } from "react";
import { Search, Filter, Download, Eye, ArrowUpDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Control {
  id: string;
  controlId: string;
  framework: string;
  title: string;
  description: string;
  family: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Active" | "Draft" | "Deprecated";
  implementationGuidance: string;
  testingProcedures: string;
  mappedControls: string[];
}

const mockControls: Control[] = [
  {
    id: "1",
    controlId: "AC-1",
    framework: "NIST 800-53",
    title: "Access Control Policy and Procedures",
    description: "The organization develops, documents, and disseminates access control policy and procedures.",
    family: "Access Control",
    priority: "Critical",
    status: "Active",
    implementationGuidance: "Establish formal access control policies that define roles, responsibilities, and procedures for managing user access to systems and data.",
    testingProcedures: "Review documented access control policies and verify implementation through sampling of user accounts and access reviews.",
    mappedControls: ["PCI 7.1.1", "HIPAA 164.312(a)(1)", "Adobe CCF-001"]
  },
  {
    id: "2",
    controlId: "7.1.1",
    framework: "PCI-DSS",
    title: "Access Control Systems",
    description: "Limit access to computing resources and cardholder information by business need-to-know.",
    family: "Access Control",
    priority: "Critical",
    status: "Active",
    implementationGuidance: "Implement role-based access controls that restrict user access based on job responsibilities and business requirements.",
    testingProcedures: "Examine user access lists and verify that access is limited to minimum necessary for job function.",
    mappedControls: ["NIST AC-1", "Adobe CCF-001"]
  },
  {
    id: "3",
    controlId: "164.312(a)(1)",
    framework: "HIPAA",
    title: "Access Control",
    description: "Assign a unique name and/or number for identifying and tracking user identity.",
    family: "Access Control",
    priority: "High",
    status: "Active",
    implementationGuidance: "Implement unique user identification systems to ensure accountability and traceability of system access.",
    testingProcedures: "Review user account naming conventions and verify uniqueness across systems.",
    mappedControls: ["NIST AC-1", "SOX CC6.1"]
  },
  {
    id: "4",
    controlId: "CC6.1",
    framework: "SOX",
    title: "Logical Access",
    description: "The entity implements logical access security software, infrastructure, and architectures.",
    family: "Access Control",
    priority: "High",
    status: "Active",
    implementationGuidance: "Deploy and maintain logical access controls including authentication, authorization, and access monitoring systems.",
    testingProcedures: "Test logical access controls and review access management processes and procedures.",
    mappedControls: ["HIPAA 164.312(a)(1)"]
  },
  {
    id: "5",
    controlId: "CCF-001",
    framework: "Adobe CCF",
    title: "Identity and Access Management",
    description: "Organization has implemented identity and access management controls to protect systems and data.",
    family: "Access Control",
    priority: "Critical",
    status: "Active",
    implementationGuidance: "Establish comprehensive IAM program including identity lifecycle management, access provisioning, and regular access reviews.",
    testingProcedures: "Assess IAM implementation including user onboarding/offboarding processes and periodic access certifications.",
    mappedControls: ["NIST AC-1", "PCI 7.1.1"]
  },
  {
    id: "6",
    controlId: "AU-1",
    framework: "NIST 800-53",
    title: "Audit and Accountability Policy",
    description: "The organization develops, documents, and disseminates audit and accountability policy.",
    family: "Audit and Accountability",
    priority: "High",
    status: "Active",
    implementationGuidance: "Establish audit policies that define what events to log, retention requirements, and review procedures.",
    testingProcedures: "Review audit policies and verify implementation through log analysis and audit trail testing.",
    mappedControls: ["PCI 10.1", "SOX CC7.1"]
  }
];

interface ControlLibraryProps {
  selectedFramework?: string | null;
}

export function ControlLibrary({ selectedFramework }: ControlLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFrameworkFilter, setSelectedFrameworkFilter] = useState<string>("all");
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("controlId");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Handle framework selection from sidebar
  useEffect(() => {
    if (selectedFramework) {
      setSelectedFrameworkFilter(selectedFramework);
    }
  }, [selectedFramework]);

  const frameworks = Array.from(new Set(mockControls.map(c => c.framework)));
  const families = Array.from(new Set(mockControls.map(c => c.family)));
  const priorities = Array.from(new Set(mockControls.map(c => c.priority)));

  const filteredControls = mockControls
    .filter(control => {
      const matchesSearch = control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           control.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           control.controlId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFramework = selectedFrameworkFilter === "all" || control.framework === selectedFrameworkFilter;
      const matchesFamily = selectedFamily === "all" || control.family === selectedFamily;
      const matchesPriority = selectedPriority === "all" || control.priority === selectedPriority;
      
      return matchesSearch && matchesFramework && matchesFamily && matchesPriority;
    })
    .sort((a, b) => {
      const aVal = a[sortField as keyof Control];
      const bVal = b[sortField as keyof Control];
      const modifier = sortDirection === "asc" ? 1 : -1;
      return aVal < bVal ? -modifier : aVal > bVal ? modifier : 0;
    });

  const clearFrameworkFilter = () => {
    setSelectedFrameworkFilter("all");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case "NIST 800-53": return "bg-blue-100 text-blue-800";
      case "PCI-DSS": return "bg-green-100 text-green-800";
      case "HIPAA": return "bg-purple-100 text-purple-800";
      case "SOX": return "bg-orange-100 text-orange-800";
      case "Adobe CCF": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Control Library</h1>
            <p className="text-muted-foreground mt-2">
              Browse and manage compliance controls across all frameworks
            </p>
          </div>
          {selectedFramework && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm px-3 py-1">
                Filtered by: {selectedFramework}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFrameworkFilter}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search controls, descriptions, or IDs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={selectedFrameworkFilter} onValueChange={setSelectedFrameworkFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Frameworks</SelectItem>
            {frameworks.map(framework => (
              <SelectItem key={framework} value={framework}>{framework}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedFamily} onValueChange={setSelectedFamily}>
          <SelectTrigger>
            <SelectValue placeholder="Family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Families</SelectItem>
            {families.map(family => (
              <SelectItem key={family} value={family}>{family}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {priorities.map(priority => (
              <SelectItem key={priority} value={priority}>{priority}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredControls.length} controls found
          </span>
          {selectedFramework && (
            <span className="text-xs text-muted-foreground">
              • Showing all {selectedFramework} controls
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
          }}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort {sortDirection === "asc" ? "↑" : "↓"}
          </Button>
        </div>
      </div>

      {/* Controls Grid - Display all controls without pagination */}
      <div className="grid gap-4">
        {filteredControls.map((control) => (
          <Card key={control.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getFrameworkColor(control.framework)}>
                    {control.controlId}
                  </Badge>
                  <Badge className={getPriorityColor(control.priority)}>
                    {control.priority}
                  </Badge>
                  <Badge variant="secondary">{control.family}</Badge>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <Badge variant="outline" className={getFrameworkColor(control.framework)}>
                          {control.controlId}
                        </Badge>
                        {control.title}
                      </DialogTitle>
                      <DialogDescription>
                        {control.framework} - {control.family}
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="details" className="w-full">
                      <TabsList>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="implementation">Implementation</TabsTrigger>
                        <TabsTrigger value="testing">Testing</TabsTrigger>
                        <TabsTrigger value="mappings">Mappings</TabsTrigger>
                      </TabsList>
                      <TabsContent value="details" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-sm text-muted-foreground">{control.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Framework</h4>
                            <p className="text-sm text-muted-foreground">{control.framework}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Family</h4>
                            <p className="text-sm text-muted-foreground">{control.family}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Priority</h4>
                            <Badge className={getPriorityColor(control.priority)}>
                              {control.priority}
                            </Badge>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Status</h4>
                            <Badge variant={control.status === "Active" ? "default" : "secondary"}>
                              {control.status}
                            </Badge>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="implementation" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Implementation Guidance</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{control.implementationGuidance}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="testing" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Testing Procedures</h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{control.testingProcedures}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="mappings" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Mapped Controls</h4>
                          <div className="flex flex-wrap gap-2">
                            {control.mappedControls.map(mappedControl => (
                              <Badge key={mappedControl} variant="outline">
                                {mappedControl}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </div>
              <CardTitle className="text-lg">{control.title}</CardTitle>
              <CardDescription className="text-sm">
                {control.framework}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {control.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Mapped to:</span>
                  <div className="flex gap-1 flex-wrap">
                    {control.mappedControls.map(mapped => (
                      <Badge key={mapped} variant="outline" className="text-xs">
                        {mapped}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Badge variant={control.status === "Active" ? "default" : "secondary"}>
                  {control.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredControls.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No controls found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => {
              setSearchTerm("");
              setSelectedFrameworkFilter("all");
              setSelectedFamily("all");
              setSelectedPriority("all");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
