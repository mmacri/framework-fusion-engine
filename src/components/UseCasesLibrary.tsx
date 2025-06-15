
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, BookOpen, Target, TrendingUp, Users, Shield, FileText, Clock, CheckCircle } from "lucide-react";

interface UseCase {
  id: string;
  title: string;
  category: "financial" | "healthcare" | "technology" | "retail" | "government" | "manufacturing";
  industry: string;
  complexity: "basic" | "intermediate" | "advanced";
  timeToImplement: string;
  frameworks: string[];
  overview: string;
  keyHighlights: string[];
  takeaways: string[];
  valueAdd: string[];
  steps: string[];
  challenges: string[];
  outcomes: string[];
  tags: string[];
}

const mockUseCases: UseCase[] = [
  {
    id: "1",
    title: "Multi-Cloud NIST 800-53 Implementation for Financial Services",
    category: "financial",
    industry: "Banking & Financial Services",
    complexity: "advanced",
    timeToImplement: "6-12 months",
    frameworks: ["NIST 800-53", "PCI-DSS", "SOX"],
    overview: "Large financial institution implementing NIST 800-53 controls across multi-cloud infrastructure while maintaining PCI-DSS and SOX compliance. This comprehensive approach ensures regulatory compliance while enabling digital transformation.",
    keyHighlights: [
      "Integrated multi-cloud security architecture",
      "Automated compliance monitoring and reporting",
      "Cross-framework control mapping and optimization",
      "Real-time risk assessment and remediation"
    ],
    takeaways: [
      "Multi-cloud environments require unified control frameworks",
      "Automation is essential for continuous compliance monitoring",
      "Cross-framework mapping reduces implementation overhead",
      "Regular assessment cycles improve security posture"
    ],
    valueAdd: [
      "40% reduction in compliance audit preparation time",
      "Unified security posture across all cloud environments",
      "Automated evidence collection for auditors",
      "Enhanced risk visibility and management"
    ],
    steps: [
      "Assess current security posture and identify gaps",
      "Design unified control framework architecture",
      "Implement automated monitoring and reporting tools",
      "Train staff on new processes and procedures",
      "Conduct regular assessments and optimization"
    ],
    challenges: [
      "Complex multi-vendor cloud environment",
      "Legacy system integration requirements",
      "Regulatory compliance across multiple jurisdictions",
      "Staff training and change management"
    ],
    outcomes: [
      "Achieved 98% compliance score across all frameworks",
      "Reduced security incidents by 60%",
      "Streamlined audit processes saving 200+ hours annually",
      "Enhanced customer trust and regulatory standing"
    ],
    tags: ["multi-cloud", "automation", "financial", "advanced"]
  },
  {
    id: "2",
    title: "HIPAA Security Rule Implementation for Healthcare Network",
    category: "healthcare",
    industry: "Healthcare & Life Sciences",
    complexity: "intermediate",
    timeToImplement: "3-6 months",
    frameworks: ["HIPAA", "NIST 800-53"],
    overview: "Regional healthcare network implementing comprehensive HIPAA Security Rule controls with NIST 800-53 foundation to protect patient health information across multiple facilities and systems.",
    keyHighlights: [
      "PHI protection across all touchpoints",
      "Role-based access control implementation",
      "Comprehensive audit logging and monitoring",
      "Staff training and awareness programs"
    ],
    takeaways: [
      "PHI requires specialized protection controls",
      "Access controls must be granular and role-based",
      "Audit trails are critical for compliance",
      "Staff training is essential for success"
    ],
    valueAdd: [
      "Enhanced patient data protection",
      "Reduced compliance risks and potential fines",
      "Improved operational efficiency",
      "Strengthened patient trust"
    ],
    steps: [
      "Conduct PHI inventory and risk assessment",
      "Implement technical safeguards and access controls",
      "Establish administrative safeguards and policies",
      "Deploy monitoring and audit capabilities",
      "Train staff and conduct regular assessments"
    ],
    challenges: [
      "Legacy healthcare system integration",
      "Complex user access requirements",
      "Ensuring minimal disruption to patient care",
      "Balancing security with usability"
    ],
    outcomes: [
      "100% HIPAA Security Rule compliance achieved",
      "Zero PHI breaches since implementation",
      "Improved audit results and reduced findings",
      "Enhanced operational security awareness"
    ],
    tags: ["healthcare", "PHI", "access-control", "intermediate"]
  },
  {
    id: "3",
    title: "Agile SOX IT Controls for SaaS Startup",
    category: "technology",
    industry: "Software & Technology",
    complexity: "basic",
    timeToImplement: "2-4 months",
    frameworks: ["SOX", "NIST 800-53"],
    overview: "Fast-growing SaaS startup implementing SOX IT General Controls in an agile development environment while maintaining rapid deployment capabilities and ensuring financial reporting integrity.",
    keyHighlights: [
      "Agile-compatible control implementation",
      "Automated testing and deployment controls",
      "Change management integration with DevOps",
      "Scalable control framework for growth"
    ],
    takeaways: [
      "SOX controls can be implemented in agile environments",
      "Automation reduces control overhead",
      "DevOps integration improves efficiency",
      "Scalability planning is essential for growth"
    ],
    valueAdd: [
      "Maintained development velocity while ensuring compliance",
      "Reduced manual control testing by 70%",
      "Enhanced financial reporting reliability",
      "Improved investor confidence"
    ],
    steps: [
      "Map SOX requirements to development processes",
      "Implement automated testing and validation",
      "Establish change management procedures",
      "Create monitoring and reporting capabilities",
      "Train development teams on SOX requirements"
    ],
    challenges: [
      "Balancing compliance with development speed",
      "Integrating controls into CI/CD pipelines",
      "Managing rapid organizational growth",
      "Ensuring control sustainability"
    ],
    outcomes: [
      "Successful SOX compliance audit",
      "Zero critical control deficiencies",
      "Maintained 2-week development cycles",
      "Enhanced process documentation and controls"
    ],
    tags: ["startup", "agile", "automation", "basic"]
  },
  {
    id: "4",
    title: "Retail PCI-DSS Level 1 Compliance Transformation",
    category: "retail",
    industry: "Retail & E-commerce",
    complexity: "advanced",
    timeToImplement: "8-12 months",
    frameworks: ["PCI-DSS", "NIST 800-53"],
    overview: "Major retail chain achieving PCI-DSS Level 1 compliance across 500+ locations with integrated payment processing, e-commerce platform, and mobile applications while maintaining customer experience.",
    keyHighlights: [
      "End-to-end payment security architecture",
      "Network segmentation and tokenization",
      "Continuous compliance monitoring",
      "Multi-location control standardization"
    ],
    takeaways: [
      "Network segmentation is critical for large deployments",
      "Tokenization reduces PCI scope significantly",
      "Standardization across locations improves consistency",
      "Continuous monitoring enables rapid issue resolution"
    ],
    valueAdd: [
      "Reduced PCI scope by 80% through tokenization",
      "Enhanced customer payment security",
      "Streamlined compliance across all locations",
      "Improved brand reputation and customer trust"
    ],
    steps: [
      "Conduct comprehensive cardholder data discovery",
      "Design and implement network segmentation",
      "Deploy tokenization and encryption solutions",
      "Establish monitoring and incident response",
      "Train staff and conduct regular assessments"
    ],
    challenges: [
      "Complex multi-location architecture",
      "Legacy point-of-sale system upgrades",
      "Balancing security with customer experience",
      "Managing diverse technology environments"
    ],
    outcomes: [
      "Achieved PCI-DSS Level 1 compliance",
      "Reduced compliance costs by 50%",
      "Enhanced payment processing security",
      "Improved customer confidence in payment security"
    ],
    tags: ["retail", "payments", "multi-location", "advanced"]
  },
  {
    id: "5",
    title: "Government Agency Zero Trust Architecture with NIST Framework",
    category: "government",
    industry: "Government & Public Sector",
    complexity: "advanced",
    timeToImplement: "12-18 months",
    frameworks: ["NIST 800-53", "NIST Cybersecurity Framework"],
    overview: "Federal government agency implementing Zero Trust Architecture using NIST frameworks to protect sensitive information and ensure continuous security monitoring across hybrid infrastructure.",
    keyHighlights: [
      "Zero Trust architecture implementation",
      "Continuous monitoring and assessment",
      "Identity and access management transformation",
      "Hybrid cloud security integration"
    ],
    takeaways: [
      "Zero Trust requires comprehensive identity management",
      "Continuous monitoring is essential for threat detection",
      "Hybrid environments need unified security policies",
      "Cultural change management is critical for success"
    ],
    valueAdd: [
      "Enhanced protection of sensitive government data",
      "Improved threat detection and response capabilities",
      "Reduced attack surface and security risks",
      "Enhanced compliance with federal mandates"
    ],
    steps: [
      "Assess current architecture and identify gaps",
      "Design Zero Trust architecture framework",
      "Implement identity and access management",
      "Deploy continuous monitoring capabilities",
      "Train staff and establish new procedures"
    ],
    challenges: [
      "Complex legacy system integration",
      "Strict government security requirements",
      "Change management across large organization",
      "Balancing security with operational efficiency"
    ],
    outcomes: [
      "Successfully implemented Zero Trust architecture",
      "Improved security posture by 85%",
      "Enhanced threat detection capabilities",
      "Met all federal security requirements"
    ],
    tags: ["government", "zero-trust", "federal", "advanced"]
  }
];

export function UseCasesLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedComplexity, setSelectedComplexity] = useState<string>("all");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  const filteredUseCases = mockUseCases.filter(useCase => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || useCase.category === selectedCategory;
    const matchesComplexity = selectedComplexity === "all" || useCase.complexity === selectedComplexity;
    
    return matchesSearch && matchesCategory && matchesComplexity;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "financial": return "bg-blue-100 text-blue-800";
      case "healthcare": return "bg-green-100 text-green-800";
      case "technology": return "bg-purple-100 text-purple-800";
      case "retail": return "bg-orange-100 text-orange-800";
      case "government": return "bg-red-100 text-red-800";
      case "manufacturing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "basic": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Use Cases Library</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive collection of real-world compliance implementation scenarios
        </p>
      </div>

      {selectedUseCase ? (
        <div className="space-y-6">
          <Button variant="outline" onClick={() => setSelectedUseCase(null)}>
            ← Back to Library
          </Button>
          
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{selectedUseCase.title}</CardTitle>
                  <CardDescription className="text-lg">{selectedUseCase.industry}</CardDescription>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={getCategoryColor(selectedUseCase.category)}>
                      {selectedUseCase.category}
                    </Badge>
                    <Badge className={getComplexityColor(selectedUseCase.complexity)}>
                      {selectedUseCase.complexity}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedUseCase.timeToImplement}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="highlights">Highlights</TabsTrigger>
                  <TabsTrigger value="implementation">Steps</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                  <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                  <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">{selectedUseCase.overview}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="highlights" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Key Highlights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedUseCase.keyHighlights.map((highlight, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Key Takeaways
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedUseCase.takeaways.map((takeaway, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              {takeaway}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Value Added
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedUseCase.valueAdd.map((value, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                              {value}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="implementation" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Implementation Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {selectedUseCase.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            <p className="text-sm">{step}</p>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="challenges" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Challenges & Solutions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedUseCase.challenges.map((challenge, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="outcomes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Outcomes & Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedUseCase.outcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm">{outcome}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="frameworks" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Frameworks & Standards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 flex-wrap">
                        {selectedUseCase.frameworks.map((framework, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {framework}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search use cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="financial">Financial Services</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
              <SelectTrigger>
                <SelectValue placeholder="All Complexity Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Complexity Levels</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Use Cases Grid */}
          <div className="grid gap-6">
            {filteredUseCases.map((useCase) => (
              <Card key={useCase.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedUseCase(useCase)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{useCase.title}</CardTitle>
                      <CardDescription>{useCase.industry}</CardDescription>
                      <div className="flex gap-2 flex-wrap">
                        <Badge className={getCategoryColor(useCase.category)}>
                          {useCase.category}
                        </Badge>
                        <Badge className={getComplexityColor(useCase.complexity)}>
                          {useCase.complexity}
                        </Badge>
                        <Badge variant="outline">
                          <Clock className="h-3 w-3 mr-1" />
                          {useCase.timeToImplement}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {useCase.overview}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {useCase.frameworks.slice(0, 3).map((framework, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {framework}
                        </Badge>
                      ))}
                      {useCase.frameworks.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{useCase.frameworks.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredUseCases.length === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">No use cases found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
