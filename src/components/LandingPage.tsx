
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, BookOpen, GitBranch, ArrowRight, Star, Globe, Search, FileText, BarChart3, CheckCircle } from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  const features = [
    {
      icon: Shield,
      title: "2,400+ Security Controls",
      description: "Comprehensive library covering NIST, PCI-DSS, HIPAA, SOX, and ISO 27001 frameworks"
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Wikipedia-style collaborative editing with expert reviews and community voting"
    },
    {
      icon: Search,
      title: "Gap Analysis",
      description: "Identify coverage gaps and optimization opportunities in your compliance program"
    },
    {
      icon: FileText,
      title: "Framework Mapping",
      description: "Visualize relationships and mappings between different compliance frameworks"
    }
  ];

  const quickStats = [
    { label: "Security Controls", value: "2,400+" },
    { label: "Frameworks", value: "5" },
    { label: "Contributors", value: "847" },
    { label: "Control Mappings", value: "1,200+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-12 w-12 text-primary" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Framework Fusion Engine
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                Open Source
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                Community-Driven
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <GitBranch className="h-3 w-3" />
                Wikipedia-Style
              </Badge>
            </div>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A collaborative platform for managing security controls across multiple compliance frameworks. 
              Join thousands of security professionals building the future of compliance management.
            </p>
          </div>

          <div className="space-y-4">
            <Button size="lg" onClick={onEnterApp} className="text-lg px-8 py-6">
              Enter Platform
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground">
              No registration required • Free and open source • Community maintained
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="mt-2">{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Getting Started Steps */}
        <Card className="mb-16">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get Started in Minutes</CardTitle>
            <CardDescription>Follow these simple steps to begin using the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Browse Controls", desc: "Explore our control library" },
                { step: "2", title: "View Mappings", desc: "See framework relationships" },
                { step: "3", title: "Analyze Gaps", desc: "Identify coverage gaps" },
                { step: "4", title: "Contribute", desc: "Join the community" }
              ].map((item, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">
                    {item.step}
                  </div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Section */}
        <div className="flex items-center justify-center gap-8 pt-8 border-t">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Star us on GitHub</span>
          </div>
          <div className="text-sm text-muted-foreground">•</div>
          <div className="text-sm text-muted-foreground">
            Join our community discussions
          </div>
          <div className="text-sm text-muted-foreground">•</div>
          <div className="text-sm text-muted-foreground">
            Contribute to the project
          </div>
        </div>
      </div>
    </div>
  );
}
