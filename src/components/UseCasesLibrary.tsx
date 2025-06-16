
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Building, Heart, CreditCard, Zap, Eye, ThumbsUp } from "lucide-react";

export function UseCasesLibrary() {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedFramework, setSelectedFramework] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const industries = [
    { id: "healthcare", name: "Healthcare", icon: Heart },
    { id: "financial", name: "Financial Services", icon: CreditCard },
    { id: "technology", name: "Technology", icon: Zap },
    { id: "manufacturing", name: "Manufacturing", icon: Building }
  ];

  const frameworks = ["NIST 800-53", "PCI-DSS", "HIPAA Security", "SOX ITGC", "Adobe CCF"];

  const useCases = [
    {
      id: 1,
      title: "Healthcare HIPAA Compliance Implementation",
      description: "Complete guide for implementing HIPAA security controls in a mid-size healthcare organization",
      industry: "healthcare",
      frameworks: ["HIPAA Security", "NIST 800-53"],
      author: "Dr. Sarah Chen",
      organization: "Regional Medical Center",
      difficulty: "Intermediate",
      duration: "3-6 months",
      likes: 245,
      views: 1834,
      lastUpdated: "2024-12-10",
      tags: ["HIPAA", "Healthcare", "Risk Assessment", "Access Controls"],
      excerpt: "This use case walks through our journey implementing HIPAA security controls across a 500-bed hospital system, including lessons learned and practical implementation tips."
    },
    {
      id: 2,
      title: "PCI-DSS Compliance for E-commerce Platform",
      description: "Step-by-step implementation of PCI-DSS requirements for a growing online retail business",
      industry: "financial",
      frameworks: ["PCI-DSS", "NIST 800-53"],
      author: "Mike Rodriguez",
      organization: "SecureCommerce Inc.",
      difficulty: "Advanced",
      duration: "4-8 months",
      likes: 189,
      views: 1247,
      lastUpdated: "2024-12-08",
      tags: ["PCI-DSS", "E-commerce", "Payment Processing", "Network Security"],
      excerpt: "Real-world experience implementing PCI-DSS Level 1 compliance for an e-commerce platform processing 50M+ transactions annually."
    },
    {
      id: 3,
      title: "SOX IT Controls for Financial Reporting",
      description: "Establishing IT general controls to support SOX compliance in financial reporting systems",
      industry: "financial",
      frameworks: ["SOX ITGC", "NIST 800-53"],
      author: "Jennifer Park",
      organization: "Global Financial Corp",
      difficulty: "Expert",
      duration: "6-12 months",
      likes: 156,
      views: 892,
      lastUpdated: "2024-12-05",
      tags: ["SOX", "Financial Reporting", "IT Controls", "Change Management"],
      excerpt: "Comprehensive approach to implementing SOX ITGC controls across enterprise financial systems, including automation strategies."
    },
    {
      id: 4,
      title: "NIST Cybersecurity Framework for Manufacturing",
      description: "Adapting NIST guidelines for industrial control systems and manufacturing environments",
      industry: "manufacturing",
      frameworks: ["NIST 800-53"],
      author: "Robert Kim",
      organization: "Advanced Manufacturing Solutions",
      difficulty: "Intermediate",
      duration: "2-4 months",
      likes: 203,
      views: 1456,
      lastUpdated: "2024-12-12",
      tags: ["NIST", "Manufacturing", "ICS Security", "Operational Technology"],
      excerpt: "Practical guide for implementing cybersecurity controls in manufacturing environments with legacy systems and operational constraints."
    }
  ];

  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = !searchTerm || 
      useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = !selectedIndustry || useCase.industry === selectedIndustry;
    const matchesFramework = !selectedFramework || useCase.frameworks.includes(selectedFramework);
    
    return matchesSearch && matchesIndustry && matchesFramework;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Use Cases Library
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn from real-world implementations and share your own experiences. 
            Discover practical approaches to compliance across different industries.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 items-center flex-wrap bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
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
              <SelectItem value="">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry.id} value={industry.id}>{industry.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFramework} onValueChange={setSelectedFramework}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Frameworks</SelectItem>
              {frameworks.map(framework => (
                <SelectItem key={framework} value={framework}>{framework}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="bg-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Submit Use Case
          </Button>
        </div>
      </div>

      {/* Industry Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {industries.map(industry => (
          <Card 
            key={industry.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${selectedIndustry === industry.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedIndustry(industry.id)}
          >
            <CardContent className="pt-6 text-center">
              <industry.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">{industry.name}</h3>
              <p className="text-sm text-muted-foreground">
                {useCases.filter(uc => uc.industry === industry.id).length} use cases
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Use Cases */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Use Cases ({filteredUseCases.length})
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Most Popular
            </Button>
            <Button variant="outline" size="sm">
              Recently Added
            </Button>
          </div>
        </div>
        
        {filteredUseCases.map((useCase) => (
          <Card key={useCase.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                  <p className="text-sm text-muted-foreground">{useCase.excerpt}</p>
                </div>
                <div className="ml-4 flex flex-col gap-2">
                  <Badge className={getDifficultyColor(useCase.difficulty)}>
                    {useCase.difficulty}
                  </Badge>
                  <div className="text-right text-xs text-muted-foreground">
                    {useCase.duration}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {useCase.frameworks.map(framework => (
                  <Badge key={framework} variant="secondary" className="text-xs">
                    {framework}
                  </Badge>
                ))}
                {useCase.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>By {useCase.author}</span>
                  <span>•</span>
                  <span>{useCase.organization}</span>
                  <span>•</span>
                  <span>Updated {useCase.lastUpdated}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {useCase.views}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    {useCase.likes}
                  </div>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Read More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <BookOpen className="h-12 w-12 text-green-600 mx-auto" />
            <h3 className="text-lg font-semibold">Share Your Experience</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Help the community by sharing your compliance implementation experience and lessons learned.
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              <BookOpen className="h-4 w-4 mr-2" />
              Submit Your Use Case
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
