
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Zap, Shield, ArrowRight, Star } from "lucide-react";

interface WelcomeSectionProps {
  onGetStarted: () => void;
}

export function WelcomeSection({ onGetStarted }: WelcomeSectionProps) {
  const features = [
    {
      icon: Shield,
      title: "Multi-Framework Support",
      description: "Work with NIST, PCI-DSS, HIPAA, SOX, and more compliance frameworks"
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations for control mapping and gap analysis"
    },
    {
      icon: Users,
      title: "Collaboration Ready",
      description: "Share assessments and reports with your team members"
    },
    {
      icon: BookOpen,
      title: "Rich Use Cases",
      description: "Learn from real-world compliance implementation scenarios"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Framework Fusion Engine</h1>
          <Badge className="bg-blue-100 text-blue-800">Free Tool</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive compliance management platform for mapping, analyzing, and managing 
          security controls across multiple frameworks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <feature.icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center space-y-4">
        <Button onClick={onGetStarted} size="lg" className="text-lg px-8 py-3">
          Get Started
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>No registration required</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>Open source</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>Community driven</span>
          </div>
        </div>
      </div>
    </div>
  );
}
