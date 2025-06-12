
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

// Generate comprehensive mock data for all frameworks
const generateNISTControls = (): Control[] => {
  const nistFamilies = [
    "Access Control", "Audit and Accountability", "Assessment, Authorization, and Monitoring",
    "Configuration Management", "Contingency Planning", "Identification and Authentication",
    "Incident Response", "Maintenance", "Media Protection", "Physical and Environmental Protection",
    "Planning", "Personnel Security", "Risk Assessment", "System and Services Acquisition",
    "System and Communications Protection", "System and Information Integrity"
  ];
  
  const controls: Control[] = [];
  
  nistFamilies.forEach((family, familyIndex) => {
    const familyCode = family.split(' ')[0].substring(0, 2).toUpperCase();
    const controlsPerFamily = Math.floor(945 / nistFamilies.length) + (familyIndex < 945 % nistFamilies.length ? 1 : 0);
    
    for (let i = 1; i <= controlsPerFamily; i++) {
      const controlId = `${familyCode}-${i}`;
      const priorities = ["Critical", "High", "Medium", "Low"] as const;
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      
      controls.push({
        id: `nist-${familyIndex}-${i}`,
        controlId,
        framework: "NIST 800-53",
        title: `${family} Control ${i}`,
        description: `This control addresses ${family.toLowerCase()} requirements and establishes necessary procedures for maintaining security compliance.`,
        family,
        priority,
        status: "Active",
        implementationGuidance: `Implement comprehensive ${family.toLowerCase()} measures including policy development, technical controls, and regular monitoring procedures.`,
        testingProcedures: `Verify ${family.toLowerCase()} implementation through documentation review, technical testing, and compliance validation.`,
        mappedControls: []
      });
    }
  });
  
  return controls;
};

const generatePCIControls = (): Control[] => {
  const pciRequirements = [
    "Install and maintain a firewall configuration",
    "Do not use vendor-supplied defaults",
    "Protect stored cardholder data",
    "Encrypt transmission of cardholder data",
    "Protect all systems against malware",
    "Develop and maintain secure systems",
    "Restrict access to cardholder data",
    "Identify and authenticate access",
    "Restrict physical access to cardholder data",
    "Track and monitor all access",
    "Regularly test security systems",
    "Maintain a policy that addresses information security"
  ];
  
  const controls: Control[] = [];
  
  pciRequirements.forEach((requirement, reqIndex) => {
    const controlsPerReq = Math.floor(281 / pciRequirements.length) + (reqIndex < 281 % pciRequirements.length ? 1 : 0);
    
    for (let i = 1; i <= controlsPerReq; i++) {
      const controlId = `${reqIndex + 1}.${i}`;
      const priorities = ["Critical", "High", "Medium"] as const;
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      
      controls.push({
        id: `pci-${reqIndex}-${i}`,
        controlId,
        framework: "PCI-DSS",
        title: `Requirement ${reqIndex + 1}.${i}`,
        description: `${requirement} - detailed implementation requirement for PCI DSS compliance.`,
        family: "Payment Card Security",
        priority,
        status: "Active",
        implementationGuidance: `Implement ${requirement.toLowerCase()} through proper technical and administrative controls.`,
        testingProcedures: `Test compliance with requirement through validation of implementation and effectiveness.`,
        mappedControls: []
      });
    }
  });
  
  return controls;
};

const generateHIPAAControls = (): Control[] => {
  const hipaaCategories = [
    "Administrative Safeguards", "Physical Safeguards", "Technical Safeguards"
  ];
  
  const controls: Control[] = [];
  
  hipaaCategories.forEach((category, catIndex) => {
    const controlsPerCategory = Math.floor(164 / hipaaCategories.length) + (catIndex < 164 % hipaaCategories.length ? 1 : 0);
    
    for (let i = 1; i <= controlsPerCategory; i++) {
      const controlId = `164.${300 + catIndex * 10 + Math.floor(i / 10)}.${String.fromCharCode(97 + (i % 10))}(${i})`;
      const priorities = ["High", "Medium", "Low"] as const;
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      
      controls.push({
        id: `hipaa-${catIndex}-${i}`,
        controlId,
        framework: "HIPAA",
        title: `${category} ${i}`,
        description: `HIPAA ${category.toLowerCase()} requirement for protecting electronic protected health information.`,
        family: category,
        priority,
        status: "Active",
        implementationGuidance: `Implement ${category.toLowerCase()} to ensure proper protection of ePHI in accordance with HIPAA requirements.`,
        testingProcedures: `Verify implementation of ${category.toLowerCase()} through audit procedures and compliance testing.`,
        mappedControls: []
      });
    }
  });
  
  return controls;
};

const generateSOXControls = (): Control[] => {
  const soxCategories = [
    "Control Environment", "Risk Assessment", "Control Activities", "Information & Communication", "Monitoring"
  ];
  
  const controls: Control[] = [];
  
  soxCategories.forEach((category, catIndex) => {
    const controlsPerCategory = Math.floor(127 / soxCategories.length) + (catIndex < 127 % soxCategories.length ? 1 : 0);
    
    for (let i = 1; i <= controlsPerCategory; i++) {
      const controlId = `CC${catIndex + 1}.${i}`;
      const priorities = ["High", "Medium", "Low"] as const;
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      
      controls.push({
        id: `sox-${catIndex}-${i}`,
        controlId,
        framework: "SOX",
        title: `${category} Control ${i}`,
        description: `SOX-compliant ${category.toLowerCase()} control for financial reporting and internal controls.`,
        family: category,
        priority,
        status: "Active",
        implementationGuidance: `Establish ${category.toLowerCase()} controls to ensure accurate financial reporting and compliance with SOX requirements.`,
        testingProcedures: `Test ${category.toLowerCase()} effectiveness through control testing and validation procedures.`,
        mappedControls: []
      });
    }
  });
  
  return controls;
};

// Combine all controls
const mockControls: Control[] = [
  ...generateNISTControls(),
  ...generatePCIControls(),
  ...generateHIPAAControls(),
  ...generateSOXControls()
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

      {/* Controls Grid - Display ALL controls without any limit */}
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
                            {control.mappedControls.length > 0 ? (
                              control.mappedControls.map(mappedControl => (
                                <Badge key={mappedControl} variant="outline">
                                  {mappedControl}
                                </Badge>
                              ))
                            ) : (
                              <p className="text-sm text-muted-foreground">No mapped controls</p>
                            )}
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
                  <span className="text-xs text-muted-foreground">Family:</span>
                  <Badge variant="outline" className="text-xs">
                    {control.family}
                  </Badge>
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
