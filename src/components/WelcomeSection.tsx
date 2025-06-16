
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, BookOpen, GitBranch, ArrowRight, Star, Globe } from "lucide-react";

interface WelcomeSectionProps {
  onGetStarted: () => void;
}

export function WelcomeSection({ onGetStarted }: WelcomeSectionProps) {
  return (
    <div className="text-center space-y-8">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Shield className="h-10 w-10 text-primary mx-auto mb-2" />
            <CardTitle>2,400+ Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Comprehensive library covering NIST, PCI-DSS, HIPAA, SOX, and ISO 27001
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <Users className="h-10 w-10 text-primary mx-auto mb-2" />
            <CardTitle>Community Driven</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Collaborate with experts worldwide to improve and maintain security standards
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <BookOpen className="h-10 w-10 text-primary mx-auto mb-2" />
            <CardTitle>Real Use Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Learn from practical implementations and share your own experiences
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Button size="lg" onClick={onGetStarted} className="text-lg px-8 py-6">
          Get Started
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
        <p className="text-sm text-muted-foreground">
          No registration required • Free and open source • Community maintained
        </p>
      </div>

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
  );
}
