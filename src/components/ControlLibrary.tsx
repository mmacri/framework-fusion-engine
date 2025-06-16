
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Search, Filter, Edit3, History, MessageSquare, ArrowLeft } from "lucide-react";
import { mockControlsData } from "@/data/reportMockData";
import { EditControlDialog } from "./Community/ControlEditor";
import { VersionHistory } from "./Community/VersionHistory";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ControlLibraryProps {
  selectedFramework?: string | null;
}

export function ControlLibrary({ selectedFramework }: ControlLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFramework, setActiveFramework] = useState(selectedFramework || "all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Get controls from the selected framework or all frameworks
  const allControls = activeFramework === "all" || !activeFramework
    ? Object.values(mockControlsData).flat()
    : mockControlsData[activeFramework] || [];

  const filteredControls = allControls.filter(control => {
    const matchesSearch = 
      control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || control.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filtering
  const categories = [...new Set(allControls.map(control => control.category))];

  const frameworks = Object.keys(mockControlsData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {selectedFramework && (
            <Button variant="outline" size="sm" onClick={() => setActiveFramework("all")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              All Frameworks
            </Button>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Control Library</h1>
            <p className="text-muted-foreground mt-2">
              {activeFramework === "all" ? "Browse security controls across all frameworks" : `${activeFramework} Controls`}
              <span className="ml-2 text-sm">
                • Community-maintained • Wikipedia-style editing
              </span>
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search controls..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={activeFramework} onValueChange={setActiveFramework}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Frameworks</SelectItem>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredControls.length} controls
            {activeFramework !== "all" && ` from ${activeFramework}`}
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid gap-4">
        {filteredControls.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-2">
                <Search className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-medium">No controls found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredControls.map((control) => (
            <Card key={control.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      {control.id} - {control.title}
                    </CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary">{control.category}</Badge>
                      <Badge variant="outline">{control.family}</Badge>
                      <Badge className={
                        control.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                        control.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                        control.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {control.priority}
                      </Badge>
                      {activeFramework === "all" && (
                        <Badge variant="outline" className="text-xs">
                          {Object.keys(mockControlsData).find(fw => mockControlsData[fw].includes(control)) || 'Unknown'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <EditControlDialog control={control}>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </EditControlDialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <History className="h-4 w-4 mr-1" />
                          History
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <VersionHistory controlId={control.id} />
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Discuss
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">{control.description}</CardDescription>
                {control.implementation && (
                  <div className="mt-3 p-3 bg-muted rounded-md">
                    <h4 className="font-medium text-sm mb-1">Implementation:</h4>
                    <p className="text-sm text-muted-foreground">{control.implementation}</p>
                  </div>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-muted-foreground">
                    Last updated by community • 2 days ago
                  </div>
                  <Badge variant={control.status === "Active" ? "default" : "secondary"}>
                    {control.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
