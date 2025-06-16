
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-12 w-12 text-blue-600" />
              <h1 className="text-5xl font-bold text-gray-900">
                Framework Fusion Engine
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
                <Globe className="h-3 w-3" />
                Open Source
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 text-gray-700 border-gray-200">
                <Users className="h-3 w-3" />
                Community-Driven
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 bg-gray-100 text-gray-700 border-gray-200">
                <GitBranch className="h-3 w-3" />
                Wikipedia-Style
              </Badge>
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collaborative platform for managing security controls across multiple compliance frameworks. 
              Join thousands of security professionals building the future of compliance management.
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              size="lg" 
              onClick={onEnterApp} 
              className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Enter Platform
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-sm text-gray-500">
              No registration required • Free and open source • Community maintained
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center bg-white border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">{feature.title}</CardTitle>
                    <CardDescription className="mt-2 text-gray-600">{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Getting Started Steps */}
        <Card className="mb-16 bg-white border-gray-200 shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Get Started in Minutes</CardTitle>
            <CardDescription className="text-gray-600">Follow these simple steps to begin using the platform</CardDescription>
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
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">
                    {item.step}
                  </div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Section */}
        <div className="flex items-center justify-center gap-8 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-600">Star us on GitHub</span>
          </div>
          <div className="text-sm text-gray-400">•</div>
          <div className="text-sm text-gray-600">
            Join our community discussions
          </div>
          <div className="text-sm text-gray-400">•</div>
          <div className="text-sm text-gray-600">
            Contribute to the project
          </div>
        </div>
      </div>
    </div>
  );
}
