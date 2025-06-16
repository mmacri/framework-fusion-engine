
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Download, HelpCircle, Users, Search, Shield, FileText } from "lucide-react";

export function UserGuide() {
  const guideCategories = [
    {
      title: "Getting Started",
      icon: Play,
      description: "Learn the basics of Framework Fusion Engine",
      color: "from-blue-50 to-blue-100 border-blue-200",
      iconColor: "text-blue-600",
      guides: [
        { title: "Platform Overview", duration: "5 min", type: "Video" },
        { title: "First Steps", duration: "3 min", type: "Article" },
        { title: "Navigation Guide", duration: "4 min", type: "Interactive" }
      ]
    },
    {
      title: "Control Management",
      icon: Shield,
      description: "Working with security controls and frameworks",
      color: "from-green-50 to-green-100 border-green-200",
      iconColor: "text-green-600",
      guides: [
        { title: "Browsing Controls", duration: "6 min", type: "Video" },
        { title: "Search & Filtering", duration: "4 min", type: "Article" },
        { title: "Understanding Categories", duration: "8 min", type: "Article" }
      ]
    },
    {
      title: "Community Features",
      icon: Users,
      description: "Contributing and collaborating with the community",
      color: "from-purple-50 to-purple-100 border-purple-200",
      iconColor: "text-purple-600",
      guides: [
        { title: "Making Edits", duration: "10 min", type: "Video" },
        { title: "Voting System", duration: "5 min", type: "Article" },
        { title: "Discussion Forums", duration: "7 min", type: "Interactive" }
      ]
    },
    {
      title: "Advanced Features",
      icon: FileText,
      description: "Framework mapping, gap analysis, and reporting",
      color: "from-orange-50 to-orange-100 border-orange-200",
      iconColor: "text-orange-600",
      guides: [
        { title: "Framework Mapping", duration: "12 min", type: "Video" },
        { title: "Gap Analysis", duration: "15 min", type: "Article" },
        { title: "Generating Reports", duration: "8 min", type: "Video" }
      ]
    }
  ];

  const quickLinks = [
    { title: "FAQ", icon: HelpCircle, description: "Frequently asked questions", link: "#" },
    { title: "Video Tutorials", icon: Play, description: "Step-by-step video guides", link: "#" },
    { title: "API Documentation", icon: FileText, description: "Technical integration guides", link: "#" },
    { title: "Community Forum", icon: Users, description: "Get help from the community", link: "#" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            User Guide & Documentation
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know to effectively use Framework Fusion Engine. 
          From basic navigation to advanced community features.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Play className="h-5 w-5 mr-2" />
            Start Tutorial
          </Button>
          <Button variant="outline" size="lg">
            <Download className="h-5 w-5 mr-2" />
            Download PDF Guide
          </Button>
        </div>
      </div>

      {/* Quick Start */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-blue-600" />
            Quick Start (5 minutes)
          </CardTitle>
          <CardDescription>Get up and running with the essential features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mx-auto mb-2">1</div>
              <h4 className="font-medium mb-1">Browse Controls</h4>
              <p className="text-xs text-muted-foreground">Explore the control library</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold mx-auto mb-2">2</div>
              <h4 className="font-medium mb-1">Search & Filter</h4>
              <p className="text-xs text-muted-foreground">Find specific controls</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mx-auto mb-2">3</div>
              <h4 className="font-medium mb-1">View Mappings</h4>
              <p className="text-xs text-muted-foreground">See framework relationships</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold mx-auto mb-2">4</div>
              <h4 className="font-medium mb-1">Contribute</h4>
              <p className="text-xs text-muted-foreground">Make your first edit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guide Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guideCategories.map((category, index) => (
          <Card key={index} className={`bg-gradient-to-br ${category.color} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                {category.title}
              </CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.guides.map((guide, guideIndex) => (
                  <div key={guideIndex} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-accent cursor-pointer transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{guide.title}</h4>
                      <p className="text-xs text-muted-foreground">{guide.duration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{guide.type}</Badge>
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>More ways to get help and learn about the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <div key={index} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <link.icon className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">{link.title}</h4>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <HelpCircle className="h-12 w-12 text-green-600 mx-auto" />
            <h3 className="text-lg font-semibold">Still need help?</h3>
            <p className="text-muted-foreground">
              Our community and support team are here to help you succeed with Framework Fusion Engine.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700">
                <Users className="h-4 w-4 mr-2" />
                Community Forum
              </Button>
              <Button variant="outline">
                <HelpCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
