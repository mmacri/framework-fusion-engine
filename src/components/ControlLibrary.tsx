
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ExternalLink } from "lucide-react";

const sampleControls = [
  {
    id: "NIST-AC-1",
    framework: "NIST 800-53",
    title: "Access Control Policy and Procedures",
    description: "The organization develops, documents, and disseminates access control policy and procedures.",
    family: "Access Control",
    priority: "High",
    status: "Active",
    mappedControls: ["PCI-7.1.1", "HIPAA-164.312(a)(1)"],
    lastUpdated: "2024-05-15"
  },
  {
    id: "PCI-8.2.1",
    framework: "PCI-DSS",
    title: "User Identity Verification",
    description: "Using unique identification for each user, authentication credentials are assigned.",
    family: "Access Control",
    priority: "Critical",
    status: "Active",
    mappedControls: ["NIST-IA-2", "HIPAA-164.312(d)"],
    lastUpdated: "2024-04-20"
  },
  {
    id: "HIPAA-164.312(a)(1)",
    framework: "HIPAA Security",
    title: "Assigned Security Responsibility",
    description: "A covered entity must assign security responsibility to a specific individual.",
    family: "Administrative Safeguards",
    priority: "High",
    status: "Active",
    mappedControls: ["NIST-AC-1", "SOX-CC6.1"],
    lastUpdated: "2024-03-10"
  },
  {
    id: "SOX-CC6.1",
    framework: "SOX ITGC",
    title: "Logical and Physical Access Controls",
    description: "The entity implements logical and physical access security measures.",
    family: "Control Activities",
    priority: "High",
    status: "Active",
    mappedControls: ["NIST-AC-3", "PCI-7.1"],
    lastUpdated: "2024-06-01"
  },
  {
    id: "ADOBE-CCF-001",
    framework: "Adobe CCF",
    title: "Information Security Management",
    description: "Adobe maintains an information security management system.",
    family: "Information Security",
    priority: "Critical",
    status: "Active",
    mappedControls: ["NIST-CA-1", "PCI-12.1"],
    lastUpdated: "2024-06-10"
  }
];

const priorityColors = {
  Critical: "bg-red-100 text-red-800",
  High: "bg-orange-100 text-orange-800",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-800"
};

export function ControlLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("all");
  const [selectedFamily, setSelectedFamily] = useState("all");

  const filteredControls = sampleControls.filter(control => {
    const matchesSearch = control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFramework = selectedFramework === "all" || control.framework === selectedFramework;
    const matchesFamily = selectedFamily === "all" || control.family === selectedFamily;
    
    return matchesSearch && matchesFramework && matchesFamily;
  });

  const frameworks = [...new Set(sampleControls.map(c => c.framework))];
  const families = [...new Set(sampleControls.map(c => c.family))];

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Control Library</h1>
        <p className="text-muted-foreground mt-2">
          Browse and search across all compliance framework controls
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search controls by ID, title, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger className="w-full lg:w-48">
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
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Family" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Families</SelectItem>
                {families.map(family => (
                  <SelectItem key={family} value={family}>{family}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredControls.length} controls
          </p>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredControls.map((control) => (
            <Card key={control.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{control.id}</CardTitle>
                      <Badge variant="outline">{control.framework}</Badge>
                      <Badge 
                        className={priorityColors[control.priority as keyof typeof priorityColors]}
                      >
                        {control.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-base font-medium">
                      {control.title}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{control.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="font-medium">Family: </span>
                    <span className="text-muted-foreground">{control.family}</span>
                  </div>
                  <div>
                    <span className="font-medium">Status: </span>
                    <span className="text-muted-foreground">{control.status}</span>
                  </div>
                  <div>
                    <span className="font-medium">Last Updated: </span>
                    <span className="text-muted-foreground">{control.lastUpdated}</span>
                  </div>
                </div>

                {control.mappedControls.length > 0 && (
                  <div className="mt-4">
                    <span className="text-sm font-medium">Mapped Controls: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {control.mappedControls.map((mapped) => (
                        <Badge key={mapped} variant="secondary" className="text-xs">
                          {mapped}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
