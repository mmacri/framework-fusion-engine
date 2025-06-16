
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shield, Filter, BookOpen } from "lucide-react";

interface ControlLibraryProps {
  selectedFramework: string | null;
}

export function ControlLibrary({ selectedFramework }: ControlLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const frameworks = {
    nist: "NIST 800-53",
    pci: "PCI-DSS",
    hipaa: "HIPAA Security",
    sox: "SOX ITGC",
    iso27001: "ISO 27001"
  };

  const mockControls = [
    {
      id: "AC-1",
      title: "Access Control Policy and Procedures",
      framework: "NIST 800-53",
      category: "Access Control",
      description: "The organization develops, documents, and disseminates access control policy and procedures.",
      implementation: "Establish comprehensive access control policies and procedures.",
      priority: "High"
    },
    {
      id: "PCI-7.1",
      title: "Restrict Access to System Components",
      framework: "PCI-DSS",
      category: "Access Control",
      description: "Limit access to system components and cardholder data by business need-to-know.",
      implementation: "Implement role-based access controls and regular access reviews.",
      priority: "Critical"
    },
    {
      id: "164.308(a)(1)",
      title: "Security Officer",
      framework: "HIPAA Security",
      category: "Administrative",
      description: "Assign responsibility for the development and implementation of security policies.",
      implementation: "Designate a security officer responsible for HIPAA compliance.",
      priority: "High"
    }
  ];

  const filteredControls = mockControls.filter(control => {
    const matchesSearch = !searchTerm || 
      control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || control.category === selectedCategory;
    const matchesFramework = !selectedFramework || control.framework.toLowerCase().includes(selectedFramework);
    
    return matchesSearch && matchesCategory && matchesFramework;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Security Controls Library
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse and search security controls across multiple compliance frameworks
          </p>
          {selectedFramework && (
            <Badge variant="outline" className="text-lg px-4 py-2">
              {frameworks[selectedFramework as keyof typeof frameworks] || selectedFramework}
            </Badge>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search controls..." 
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Access Control">Access Control</SelectItem>
              <SelectItem value="Administrative">Administrative</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            className="bg-white"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{filteredControls.length}</div>
            <div className="text-sm text-muted-foreground">Controls Found</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredControls.filter(c => c.priority === "Critical" || c.priority === "High").length}
            </div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-muted-foreground">Frameworks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls List */}
      <div className="space-y-4">
        {filteredControls.map((control, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{control.id} - {control.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{control.framework}</Badge>
                      <Badge variant="secondary">{control.category}</Badge>
                    </div>
                  </div>
                </div>
                <Badge className={getPriorityColor(control.priority)}>
                  {control.priority}
                </Badge>
              </div>
              <CardDescription>{control.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-1">Implementation Guidance</h4>
                  <p className="text-sm text-muted-foreground">{control.implementation}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    View Mappings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredControls.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No controls found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
