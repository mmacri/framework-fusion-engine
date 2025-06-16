
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Building, Shield, FileText, Clock, Star, Download } from "lucide-react";

export function UseCasesLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedFramework, setSelectedFramework] = useState("all");

  const useCases = [
    {
      id: "uc-001",
      title: "Healthcare HIPAA Compliance Implementation",
      description: "Complete implementation of HIPAA Security Rule controls for a mid-size healthcare provider",
      industry: "Healthcare",
      frameworks: ["HIPAA Security", "NIST 800-53"],
      difficulty: "Advanced",
      duration: "12-16 weeks",
      rating: 4.8,
      downloads: 1247,
      content: {
        overview: "This use case covers the complete implementation of HIPAA Security Rule requirements for a 500-bed hospital system.",
        challenges: ["Legacy system integration", "Staff training", "Risk assessment"],
        solutions: ["Phased implementation approach", "Comprehensive training program", "Regular risk assessments"],
        outcomes: ["100% HIPAA compliance", "Reduced security incidents by 75%", "Improved audit readiness"]
      }
    },
    {
      id: "uc-002", 
      title: "PCI-DSS Compliance for E-commerce Platform",
      description: "Payment card security implementation for online retail platform processing 100K+ transactions monthly",
      industry: "Retail",
      frameworks: ["PCI-DSS", "NIST 800-53"],
      difficulty: "Intermediate",
      duration: "8-12 weeks",
      rating: 4.6,
      downloads: 892,
      content: {
        overview: "Implementation of PCI-DSS requirements for a growing e-commerce platform.",
        challenges: ["Cardholder data encryption", "Network segmentation", "Vulnerability management"],
        solutions: ["End-to-end encryption", "DMZ implementation", "Automated scanning"],
        outcomes: ["PCI-DSS Level 1 compliance", "Zero data breaches", "Customer trust improvement"]
      }
    },
    {
      id: "uc-003",
      title: "SOX ITGC Implementation for Financial Services",
      description: "IT General Controls implementation for publicly traded financial services company",
      industry: "Financial Services",
      frameworks: ["SOX ITGC", "NIST 800-53"],
      difficulty: "Advanced",
      duration: "16-20 weeks",
      rating: 4.9,
      downloads: 654,
      content: {
        overview: "Comprehensive SOX ITGC program for a regional bank with $5B in assets.",
        challenges: ["Change management controls", "Access management", "Data integrity"],
        solutions: ["Automated change controls", "Role-based access", "Data validation controls"],
        outcomes: ["Clean SOX audit", "Improved operational efficiency", "Enhanced controls"]
      }
    },
    {
      id: "uc-004",
      title: "Multi-Framework Cloud Security Implementation",
      description: "Implementing security controls across multiple frameworks for cloud-first organization",
      industry: "Technology",
      frameworks: ["NIST 800-53", "Adobe CCF", "ISO 27001"],
      difficulty: "Expert",
      duration: "20-24 weeks",
      rating: 4.7,
      downloads: 423,
      content: {
        overview: "Cloud security implementation covering multiple compliance frameworks.",
        challenges: ["Multi-cloud environment", "DevSecOps integration", "Continuous compliance"],
        solutions: ["Unified security platform", "Automated compliance checks", "Security as code"],
        outcomes: ["Multi-framework compliance", "50% faster deployments", "Continuous monitoring"]
      }
    }
  ];

  const industries = ["Healthcare", "Financial Services", "Retail", "Technology", "Government"];
  const frameworks = ["NIST 800-53", "PCI-DSS", "HIPAA Security", "SOX ITGC", "Adobe CCF", "ISO 27001"];

  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = !searchTerm || 
      useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = selectedIndustry === "all" || useCase.industry === selectedIndustry;
    const matchesFramework = selectedFramework === "all" || useCase.frameworks.includes(selectedFramework);
    
    return matchesSearch && matchesIndustry && matchesFramework;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return "bg-green-100 text-green-800";
      case 'Intermediate': return "bg-yellow-100 text-yellow-800";
      case 'Advanced': return "bg-orange-100 text-orange-800";
      case 'Expert': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Use Cases Library
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn from real-world implementation scenarios across industries and frameworks. 
            Get practical guidance for your compliance journey.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-wrap bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
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
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFramework} onValueChange={setSelectedFramework}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="All Frameworks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Frameworks</SelectItem>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredUseCases.map((useCase) => (
          <Card key={useCase.id} className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      {useCase.industry}
                    </Badge>
                    <Badge className={getDifficultyColor(useCase.difficulty)}>
                      {useCase.difficulty}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {useCase.duration}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {useCase.frameworks.map((framework, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {framework}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{useCase.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {useCase.downloads} downloads
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Key Challenges</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    {useCase.content.challenges.slice(0, 2).map((challenge, index) => (
                      <li key={index}>• {challenge}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Solutions</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    {useCase.content.solutions.slice(0, 2).map((solution, index) => (
                      <li key={index}>• {solution}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Outcomes</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    {useCase.content.outcomes.slice(0, 2).map((outcome, index) => (
                      <li key={index}>• {outcome}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2">
                  <Button size="sm" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUseCases.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Use Cases Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters to find relevant use cases.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
