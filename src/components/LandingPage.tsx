
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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 section-spacing">
        <div className="text-center space-y-8 mb-20">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h1 className="text-balance bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Framework Fusion Engine
              </h1>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 border-slate-200">
                <Globe className="h-4 w-4" />
                Open Source
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 border-slate-200">
                <Users className="h-4 w-4" />
                Community-Driven
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 border-slate-200">
                <GitBranch className="h-4 w-4" />
                Wikipedia-Style
              </Badge>
            </div>
            
            <p className="text-xl text-slate-600 max-w-4xl mx-auto text-balance">
              A collaborative platform for managing security controls across multiple compliance frameworks. 
              Join thousands of security professionals building the future of compliance management.
            </p>
          </div>

          <div className="space-y-6">
            <Button size="lg" onClick={onEnterApp} className="text-lg px-8 py-4 h-auto bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              Enter Platform
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <p className="text-sm text-slate-500">
              No registration required • Free and open source • Community maintained
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {quickStats.map((stat, index) => (
            <Card key={index} className="text-center border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Discussions */}
        {discussions && discussions.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-balance mb-4 text-slate-900">Active Community Discussions</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Join the conversation with security professionals worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discussions.slice(0, 6).map((discussion) => (
                <Card key={discussion.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="text-xs font-medium border-blue-200 text-blue-700">
                        {discussion.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {discussion.lastActivity}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardTitle className="text-base mb-2 line-clamp-2 text-slate-900">
                      {discussion.title}
                    </CardTitle>
                    <div className="flex items-center justify-between text-sm text-slate-600">
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
            <Card key={index} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-3 text-slate-900">{feature.title}</CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Getting Started Steps */}
        <Card className="border-slate-200 shadow-sm mb-20 bg-white">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl mb-4 text-slate-900">Get Started in Minutes</CardTitle>
            <CardDescription className="text-lg text-slate-600">
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
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
                      {item.step}
                    </div>
                    <div className="mt-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <item.icon className="h-5 w-5 text-slate-600 mx-auto" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2 text-slate-900">{item.title}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Section */}
        <div className="text-center py-12 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-blue-500" />
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
