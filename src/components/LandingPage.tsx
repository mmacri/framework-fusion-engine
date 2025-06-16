
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, BookOpen, GitBranch, ArrowRight, Star, Globe, Search, FileText, BarChart3, CheckCircle, MessageSquare, Calendar, TrendingUp } from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
  discussions: Array<{
    id: string;
    title: string;
    author: string;
    replies: number;
    lastActivity: string;
    category: string;
  }>;
}

export function LandingPage({ onEnterApp, discussions }: LandingPageProps) {
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
    { label: "Security Controls", value: "2,400+", icon: Shield },
    { label: "Frameworks", value: "5", icon: FileText },
    { label: "Contributors", value: "847", icon: Users },
    { label: "Control Mappings", value: "1,200+", icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen gradient-clean">
      {/* Hero Section */}
      <div className="container mx-auto px-6 section-spacing">
        <div className="text-center space-y-8 mb-20">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-balance">
                Framework Fusion Engine
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <Globe className="h-4 w-4" />
                Open Source
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <Users className="h-4 w-4" />
                Community-Driven
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <GitBranch className="h-4 w-4" />
                Wikipedia-Style
              </Badge>
            </div>
            
            <p className="text-xl text-professional max-w-4xl mx-auto text-balance">
              A collaborative platform for managing security controls across multiple compliance frameworks. 
              Join thousands of security professionals building the future of compliance management.
            </p>
          </div>

          <div className="space-y-6">
            <Button size="lg" onClick={onEnterApp} className="text-lg px-8 py-4 h-auto shadow-clean-md">
              Enter Platform
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground">
              No registration required • Free and open source • Community maintained
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {quickStats.map((stat, index) => (
            <Card key={index} className="card-clean text-center border-0 shadow-clean">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Discussions */}
        {discussions.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-balance mb-4">Active Community Discussions</h2>
              <p className="text-professional max-w-2xl mx-auto">
                Join the conversation with security professionals worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discussions.slice(0, 6).map((discussion) => (
                <Card key={discussion.id} className="card-clean border-0 shadow-clean">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="text-xs font-medium">
                        {discussion.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {discussion.lastActivity}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardTitle className="text-base mb-2 line-clamp-2">
                      {discussion.title}
                    </CardTitle>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>by {discussion.author}</span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {discussion.replies}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="card-clean border-0 shadow-clean">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                    <CardDescription className="text-professional leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Getting Started Steps */}
        <Card className="card-clean border-0 shadow-clean-md mb-20">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl mb-4">Get Started in Minutes</CardTitle>
            <CardDescription className="text-lg text-professional">
              Follow these simple steps to begin using the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Browse Controls", desc: "Explore our comprehensive control library", icon: Search },
                { step: "2", title: "View Mappings", desc: "See framework relationships", icon: FileText },
                { step: "3", title: "Analyze Gaps", desc: "Identify coverage gaps", icon: BarChart3 },
                { step: "4", title: "Contribute", desc: "Join the community", icon: Users }
              ].map((item, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-xl mx-auto shadow-clean">
                      {item.step}
                    </div>
                    <div className="mt-3 p-2 bg-muted rounded-lg">
                      <item.icon className="h-5 w-5 text-muted-foreground mx-auto" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                    <p className="text-sm text-professional">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Section */}
        <div className="text-center py-12 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Star us on GitHub</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Join community discussions</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Contribute to the project</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
