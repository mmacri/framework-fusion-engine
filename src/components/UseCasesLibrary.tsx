
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Search, Building, Shield, FileText, Clock, Users, Target } from "lucide-react";

export function UseCasesLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedFramework, setSelectedFramework] = useState("all");

  const industries = {
    all: "All Industries",
    healthcare: "Healthcare",
    financial: "Financial Services", 
    retail: "Retail/E-commerce",
    manufacturing: "Manufacturing",
    technology: "Technology",
    government: "Government"
  };

  const frameworks = {
    all: "All Frameworks",
    nist: "NIST 800-53",
    pci: "PCI-DSS",
    hipaa: "HIPAA",
    sox: "SOX",
    iso27001: "ISO 27001"
  };

  const useCases = [
    {
      title: "Healthcare HIPAA Compliance Assessment",
      industry: "healthcare",
      framework: "hipaa",
      description: "Complete HIPAA Security Rule compliance assessment for a mid-size hospital system",
      objectives: ["Assess current HIPAA compliance posture", "Identify critical security gaps", "Develop remediation roadmap"],
      timeline: "4-6 weeks",
      complexity: "Medium",
      outcome: "92% compliance improvement, reduced audit findings by 85%",
      tags: ["PHI Protection", "Risk Assessment", "Administrative Safeguards"]
    },
    {
      title: "Financial Services PCI-DSS Implementation", 
      industry: "financial",
      framework: "pci",
      description: "PCI-DSS compliance program implementation for online payment processor",
      objectives: ["Achieve PCI-DSS Level 1 compliance", "Implement security controls", "Establish ongoing monitoring"],
      timeline: "8-12 weeks", 
      complexity: "High",
      outcome: "Successfully passed QSA assessment, zero critical findings",
      tags: ["Card Data Protection", "Network Security", "Access Control"]
    },
    {
      title: "Manufacturing ISO 27001 Certification",
      industry: "manufacturing", 
      framework: "iso27001",
      description: "ISO 27001 information security management system implementation",
      objectives: ["Establish ISMS framework", "Implement security controls", "Achieve ISO 27001 certification"],
      timeline: "12-16 weeks",
      complexity: "High", 
      outcome: "ISO 27001 certification achieved, 40% reduction in security incidents",
      tags: ["ISMS", "Risk Management", "Continuous Improvement"]
    },
    {
      title: "E-commerce Multi-Framework Assessment",
      industry: "retail",
      framework: "nist",
      description: "Comprehensive security assessment across NIST and PCI-DSS for e-commerce platform",
      objectives: ["Multi-framework gap analysis", "Unified control implementation", "Streamlined compliance"],
      timeline: "6-8 weeks",
      complexity: "Medium",
      outcome: "75% reduction in compliance overhead, unified security program",
      tags: ["Multi-Framework", "E-commerce", "Customer Data"]
    },
    {
      title: "Startup Security Program Establishment",
      industry: "technology",
      framework: "nist", 
      description: "Building security program from scratch for rapidly growing SaaS startup",
      objectives: ["Establish baseline security", "Implement scalable controls", "Prepare for compliance"],
      timeline: "3-4 weeks",
      complexity: "Low",
      outcome: "Security program established, ready for SOC 2 Type II",
      tags: ["Startup", "Scalability", "Cloud Security"]
    },
    {
      title: "Government Agency NIST Modernization",
      industry: "government", 
      framework: "nist",
      description: "Modernizing legacy NIST 800-53 implementation for federal agency",
      objectives: ["Update control implementations", "Improve automation", "Enhance monitoring"],
      timeline: "16-20 weeks",
      complexity: "High",
      outcome: "90% automation achieved, 60% faster incident response",
      tags: ["Legacy Modernization", "Automation", "Federal Compliance"]
    }
  ];

  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = !searchTerm || 
      useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = selectedIndustry === "all" || useCase.industry === selectedIndustry;
    const matchesFramework = selectedFramework === "all" || useCase.framework === selectedFramework;
    
    return matchesSearch && matchesIndustry && matchesFramework;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800"; 
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Use Cases Library
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world compliance implementation examples and success stories across industries
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search use cases..." 
              className="pl-10 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(industries).map(([key, name]) => (
                <SelectItem key={key} value={key}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFramework} onValueChange={setSelectedFramework}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Framework" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(frameworks).map(([key, name]) => (
                <SelectItem key={key} value={key}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{filteredUseCases.length}</div>
            <div className="text-sm text-muted-foreground">Use Cases</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(industries).length - 1}
            </div>
            <div className="text-sm text-muted-foreground">Industries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Object.keys(frameworks).length - 1}
            </div>
            <div className="text-sm text-muted-foreground">Frameworks</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-muted-foreground">Avg Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Use Cases */}
      <div className="space-y-6">
        {filteredUseCases.map((useCase, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">
                        {industries[useCase.industry as keyof typeof industries]}
                      </Badge>
                      <Badge variant="outline">
                        {frameworks[useCase.framework as keyof typeof frameworks]}
                      </Badge>
                      <Badge className={getComplexityColor(useCase.complexity)}>
                        {useCase.complexity} Complexity
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {useCase.timeline}
                  </div>
                </div>
              </div>
              <CardDescription className="text-base">{useCase.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Objectives
                </h4>
                <ul className="space-y-1">
                  {useCase.objectives.map((objective, objIndex) => (
                    <li key={objIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-green-800 mb-1 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Outcome
                </h4>
                <p className="text-sm text-green-700">{useCase.outcome}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {useCase.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUseCases.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No use cases found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Users className="h-12 w-12 text-blue-600 mx-auto" />
            <h3 className="text-lg font-semibold">Share Your Success Story</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Help the community by sharing your compliance implementation experience and lessons learned.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BookOpen className="h-4 w-4 mr-2" />
              Submit Use Case
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
