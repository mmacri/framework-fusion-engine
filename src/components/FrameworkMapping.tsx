import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { mockControlsData, mockRelationships } from "@/data/reportMockData";
import { GitBranch, Search, Link, ArrowRight, Filter } from "lucide-react";

export function FrameworkMapping() {
  const [sourceFramework, setSourceFramework] = useState("all");
  const [targetFramework, setTargetFramework] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const frameworks = Object.keys(mockControlsData);

  const filteredRelationships = mockRelationships.filter(rel => {
    const matchesSearch = !searchTerm || 
      rel.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSource = sourceFramework === "all" || rel.source.includes(sourceFramework);
    const matchesTarget = targetFramework === "all" || rel.target.includes(targetFramework);
    
    return matchesSearch && matchesSource && matchesTarget;
  });

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-100 text-green-800";
    if (confidence >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getMappingTypeColor = (type: string) => {
    switch (type) {
      case 'Equivalent': return "bg-blue-100 text-blue-800";
      case 'Supplemental': return "bg-purple-100 text-purple-800";
      case 'Supporting': return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
            Understand how controls relate across standards.
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
              <SelectItem value="all">All Sources</SelectItem>
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
              <SelectItem value="all">All Targets</SelectItem>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            className="bg-white"
            onClick={() => {
              setSearchTerm("");
              setSourceFramework("all");
              setTargetFramework("all");
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
            <div className="text-2xl font-bold text-primary">{mockRelationships.length}</div>
            <div className="text-sm text-muted-foreground">Total Mappings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockRelationships.filter(r => r.confidence >= 90).length}
            </div>
            <div className="text-sm text-muted-foreground">High Confidence</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {mockRelationships.filter(r => r.mappingType === 'Equivalent').length}
            </div>
            <div className="text-sm text-muted-foreground">Direct Mappings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{frameworks.length}</div>
            <div className="text-sm text-muted-foreground">Frameworks</div>
          </CardContent>
        </Card>
      </div>

      {/* Mappings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Control Mappings ({filteredRelationships.length})
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <GitBranch className="h-4 w-4 mr-2" />
              View Network
            </Button>
            <Button variant="outline" size="sm">
              Export Mappings
            </Button>
          </div>
        </div>
        
        {filteredRelationships.map((relationship, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-mono">
                    {relationship.source}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge variant="outline" className="font-mono">
                    {relationship.target}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getConfidenceColor(relationship.confidence)}>
                    {relationship.confidence}% confidence
                  </Badge>
                  <Badge className={getMappingTypeColor(relationship.mappingType)}>
                    {relationship.mappingType}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg">{relationship.relationship}</CardTitle>
              <CardDescription>{relationship.description}</CardDescription>
            </CardHeader>
            
            {relationship.gapAnalysis && (
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-800 mb-1">Gap Analysis</h4>
                  <p className="text-sm text-yellow-700">{relationship.gapAnalysis}</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Link className="h-12 w-12 text-blue-600 mx-auto" />
            <h3 className="text-lg font-semibold">Contribute to Mappings</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Help improve framework mappings by suggesting new relationships or validating existing ones.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link className="h-4 w-4 mr-2" />
              Suggest Mapping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
