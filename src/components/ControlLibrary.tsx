
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Shield, Filter, BookOpen, Link } from "lucide-react";
import { cisControls } from "@/data/controls/cisControls";
import { nistControls } from "@/data/controls/nistControls";
import { pciControls } from "@/data/controls/pciControls";
import { hipaaControls } from "@/data/controls/hipaaControls";
import { soxControls } from "@/data/controls/soxControls";
import { Control } from "@/types/report";

interface ControlLibraryProps {
  selectedFramework: string | null;
}

export function ControlLibrary({ selectedFramework }: ControlLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Combine all controls from different frameworks
  const allControls = useMemo(() => {
    const cisControlsWithFramework = cisControls.map(control => ({
      ...control,
      framework: "CIS Controls v8"
    }));
    
    const nistControlsWithFramework = nistControls.map(control => ({
      ...control,
      framework: "NIST 800-53"
    }));
    
    const pciControlsWithFramework = pciControls.map(control => ({
      ...control,
      framework: "PCI-DSS"
    }));
    
    const hipaaControlsWithFramework = hipaaControls.map(control => ({
      ...control,
      framework: "HIPAA Security"
    }));
    
    const soxControlsWithFramework = soxControls.map(control => ({
      ...control,
      framework: "SOX ITGC"
    }));

    return [
      ...cisControlsWithFramework,
      ...nistControlsWithFramework,
      ...pciControlsWithFramework,
      ...hipaaControlsWithFramework,
      ...soxControlsWithFramework
    ];
  }, []);

  const frameworks = {
    "cis": "CIS Controls v8",
    "nist": "NIST 800-53",
    "pci": "PCI-DSS", 
    "hipaa": "HIPAA Security",
    "sox": "SOX ITGC"
  };

  // Get unique categories from all controls
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(allControls.map(control => control.category))];
    return uniqueCategories.sort();
  }, [allControls]);

  const filteredControls = useMemo(() => {
    return allControls.filter(control => {
      const matchesSearch = !searchTerm || 
        control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        control.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || control.category === selectedCategory;
      const matchesFramework = !selectedFramework || control.framework.toLowerCase().includes(selectedFramework);
      
      return matchesSearch && matchesCategory && matchesFramework;
    });
  }, [allControls, searchTerm, selectedCategory, selectedFramework]);

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
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
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
            <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
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
                 {/* Master Framework Mapping */}
                 {control.masterFrameworkMapping && (
                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                     <h4 className="font-medium text-sm text-blue-800 mb-1">Master Framework Mapping</h4>
                     <div className="text-sm text-blue-700 space-y-1">
                       <p><strong>Master ID:</strong> {control.masterFrameworkMapping.masterId}</p>
                       <p><strong>Correlation:</strong> {control.masterFrameworkMapping.correlationType} ({Math.round(control.masterFrameworkMapping.correlationScore * 100)}%)</p>
                       {control.masterFrameworkMapping.notes && (
                         <p><strong>Notes:</strong> {control.masterFrameworkMapping.notes}</p>
                       )}
                     </div>
                   </div>
                 )}
                 
                 {/* Related Controls */}
                 {control.relatedControls && control.relatedControls.length > 0 && (
                   <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                     <h4 className="font-medium text-sm text-green-800 mb-2">Related Controls</h4>
                     <div className="flex flex-wrap gap-1">
                       {control.relatedControls.map((relatedId, idx) => (
                         <Badge key={idx} variant="outline" className="text-xs bg-white">
                           {relatedId}
                         </Badge>
                       ))}
                     </div>
                   </div>
                 )}

                 <div className="flex gap-2">
                   <Button variant="outline" size="sm">
                     <BookOpen className="h-4 w-4 mr-2" />
                     View Details
                   </Button>
                   <Button variant="outline" size="sm">
                     <Link className="h-4 w-4 mr-2" />
                     Find Correlations
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
