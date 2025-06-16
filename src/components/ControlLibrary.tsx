
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockControlsData, Control } from "@/data/reportMockData";
import { Search, Filter, Shield, Eye, Edit } from "lucide-react";

interface ControlLibraryProps {
  selectedFramework?: string | null;
}

export function ControlLibrary({ selectedFramework }: ControlLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedControlFramework, setSelectedControlFramework] = useState(selectedFramework || "");

  const frameworks = Object.keys(mockControlsData);
  
  // Get all controls from selected framework or all frameworks
  const getAllControls = () => {
    if (selectedControlFramework) {
      return mockControlsData[selectedControlFramework] || [];
    }
    return Object.values(mockControlsData).flat();
  };

  const allControls = getAllControls();

  // Get unique categories and priorities
  const categories = [...new Set(allControls.map(control => control.category))];
  const priorities = ['Critical', 'High', 'Medium', 'Low'];

  // Filter controls
  const filteredControls = allControls.filter(control => {
    const matchesSearch = !searchTerm || 
      control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = !selectedPriority || control.priority === selectedPriority;
    const matchesCategory = !selectedCategory || control.category === selectedCategory;
    
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return "bg-red-100 text-red-800";
      case 'High': return "bg-orange-100 text-orange-800";
      case 'Medium': return "bg-yellow-100 text-yellow-800";
      case 'Low': return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return "bg-green-100 text-green-800";
      case 'Draft': return "bg-yellow-100 text-yellow-800";
      case 'Deprecated': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const ControlDetailDialog = ({ control }: { control: Control }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {control.id}: {control.title}
          </DialogTitle>
          <DialogDescription>{control.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Category</h4>
              <Badge variant="outline">{control.category}</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Family</h4>
              <Badge variant="outline">{control.family}</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Priority</h4>
              <Badge className={getPriorityColor(control.priority)}>{control.priority}</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Status</h4>
              <Badge className={getStatusColor(control.status)}>{control.status}</Badge>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Implementation</h4>
            <p className="text-sm text-muted-foreground bg-accent p-3 rounded-lg">
              {control.implementation}
            </p>
          </div>

          {control.mappings && control.mappings.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Related Controls</h4>
              <div className="flex flex-wrap gap-1">
                {control.mappings.map((mapping, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {mapping}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Control Library
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore and manage security controls across multiple compliance frameworks. 
            Search, filter, and contribute to our comprehensive control database.
          </p>
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
          
          <Select value={selectedControlFramework} onValueChange={setSelectedControlFramework}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="All Frameworks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Frameworks</SelectItem>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Priorities</SelectItem>
              {priorities.map(priority => (
                <SelectItem key={priority} value={priority}>{priority}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="bg-white">
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Controls Count */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Controls ({filteredControls.length})
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Contribute
          </Button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid gap-4">
        {filteredControls.map((control) => (
          <Card key={control.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">
                    {control.id}: {control.title}
                  </CardTitle>
                  <CardDescription>{control.description}</CardDescription>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getPriorityColor(control.priority)}>
                    {control.priority}
                  </Badge>
                  <Badge className={getStatusColor(control.status)} variant="outline">
                    {control.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary">{control.category}</Badge>
                <Badge variant="outline">{control.family}</Badge>
                {control.mappings?.slice(0, 2).map((mapping, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {mapping}
                  </Badge>
                ))}
                {control.mappings && control.mappings.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{control.mappings.length - 2} more
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Implementation guidance available
                </div>
                <ControlDetailDialog control={control} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredControls.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Controls Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find the controls you're looking for.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
