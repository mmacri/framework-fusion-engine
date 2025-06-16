
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, FileText, BarChart3, ArrowRight, Star, CheckCircle } from "lucide-react";

interface WelcomeSectionProps {
  onGetStarted: () => void;
}

export function WelcomeSection({ onGetStarted }: WelcomeSectionProps) {
  const features = [
    {
      icon: Shield,
      title: "2,400+ Security Controls",
      description: "Comprehensive library across major frameworks",
      highlight: "Complete Coverage"
    },
    {
      icon: FileText,
      title: "Framework Mapping",
      description: "Understand relationships between standards",
      highlight: "AI-Powered"
    },
    {
      icon: BarChart3,
      title: "Gap Analysis",
      description: "Identify coverage gaps and opportunities",
      highlight: "Actionable Insights"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Collaborative improvement and validation",
      highlight: "Open Source"
    }
  ];

  const supportedFrameworks = [
    "NIST 800-53",
    "PCI-DSS", 
    "HIPAA Security",
    "SOX ITGC",
    "Adobe CCF"
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            Community Edition - Free & Open Source
          </Badge>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Framework Fusion
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The open-source platform for managing security controls across multiple compliance frameworks. 
            Streamline your compliance efforts with intelligent mapping and community-driven insights.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={onGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Get Started
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline">
            View on GitHub
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary" className="mx-auto mb-2">{feature.highlight}</Badge>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Supported Frameworks */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Supported Frameworks
          </CardTitle>
          <CardDescription>
            Comprehensive coverage of major compliance and security frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-3">
            {supportedFrameworks.map((framework) => (
              <Badge key={framework} variant="outline" className="px-4 py-2 bg-white">
                {framework}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Value Proposition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-blue-700">For Compliance Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Centralized control management
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Automated gap analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Multi-framework reporting
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="text-green-700">For Security Professionals</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Control implementation guidance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Framework mapping insights
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Best practice sharing
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-purple-700">For Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Reduced compliance costs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Faster audit preparation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Risk reduction
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
