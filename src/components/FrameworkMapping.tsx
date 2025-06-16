
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, GitBranch, ArrowRight, Network, Eye } from "lucide-react";

export function FrameworkMapping() {
  const [sourceFramework, setSourceFramework] = useState("");
  const [targetFramework, setTargetFramework] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const frameworks = ["NIST 800-53", "PCI-DSS", "HIPAA Security", "SOX ITGC", "Adobe CCF"];
  
  const mappings = [
    {
      source: { framework: "NIST 800-53", control: "AC-2", title: "Account Management" },
      target: { framework: "PCI-DSS", control: "REQ-8.1", title: "User Authentication" },
      relationship: "Direct Mapping",
      confidence: "High",
      notes: "Both controls address user account lifecycle management"
    },
    {
      source: { framework: "NIST 800-53", control: "SC-7", title: "Boundary Protection" },
      target: { framework: "PCI-DSS", control: "REQ-1", title: "Network Security Controls" },
      relationship: "Partial Mapping",
      confidence: "Medium",
      notes: "NIST SC-7 is broader but covers similar network protection concepts"
    },
    {
      source: { framework: "SOX ITGC", control: "ITGC-01", title: "User Access Management" },
      target: { framework: "HIPAA Security", control: "164.312(a)(1)", title: "Access Control" },
      relationship: "Conceptual Mapping",
      confidence: "Medium",
      notes: "Both address access control but in different regulatory contexts"
    }
  ];

  const filteredMappings = mappings.filter(mapping => {
    const matchesSearch = !searchTerm || 
      mapping.source.control.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.target.control.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.source.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.target.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = !sourceFramework || mapping.source.framework === sourceFramework;
    const matchesTarget = !targetFramework || mapping.target.framework === targetFramework;
    
    return matchesSearch && matchesSource && matchesTarget;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Framework Mapping
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore relationships and mappings between different compliance frameworks. 
            Understand how controls align across standards.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search mappings..." 
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={sourceFramework} onValueChange={setSourceFramework}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Source Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sources</SelectItem>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={targetFramework} onValueChange={setTargetFramework}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Target Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Targets</SelectItem>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="bg-white">
            <Network className="h-4 w-4 mr-2" />
            Visualize
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-700">1,203</div>
                <div className="text-sm text-blue-600">Total Mappings</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-700">847</div>
                <div className="text-sm text-green-600">Direct Mappings</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-700">283</div>
                <div className="text-sm text-orange-600">Partial Mappings</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-700">73</div>
                <div className="text-sm text-purple-600">Conceptual</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mappings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Control Mappings ({filteredMappings.length})</h2>
        
        {filteredMappings.map((mapping, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  {/* Source */}
                  <div className="bg-blue-50 p-3 rounded-lg flex-1">
                    <Badge variant="outline" className="mb-2 text-xs">{mapping.source.framework}</Badge>
                    <h4 className="font-medium text-blue-900">{mapping.source.control}</h4>
                    <p className="text-sm text-blue-700">{mapping.source.title}</p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex flex-col items-center gap-1">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                    <Badge 
                      variant={
                        mapping.relationship === 'Direct Mapping' ? 'default' :
                        mapping.relationship === 'Partial Mapping' ? 'secondary' : 'outline'
                      }
                      className="text-xs"
                    >
                      {mapping.relationship}
                    </Badge>
                  </div>
                  
                  {/* Target */}
                  <div className="bg-green-50 p-3 rounded-lg flex-1">
                    <Badge variant="outline" className="mb-2 text-xs">{mapping.target.framework}</Badge>
                    <h4 className="font-medium text-green-900">{mapping.target.control}</h4>
                    <p className="text-sm text-green-700">{mapping.target.title}</p>
                  </div>
                </div>
                
                <div className="ml-4 text-center">
                  <Badge 
                    variant={mapping.confidence === 'High' ? 'default' : 'secondary'}
                    className="mb-2"
                  >
                    {mapping.confidence} Confidence
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                </div>
              </div>
              
              {mapping.notes && (
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">{mapping.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
