
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Star } from "lucide-react";

export function UseCasesLibrary() {
  const useCases = [
    {
      title: "Financial Services Compliance",
      description: "How a regional bank implemented multi-framework compliance using NIST and PCI-DSS controls",
      industry: "Financial Services",
      frameworks: ["NIST 800-53", "PCI-DSS"],
      duration: "6 months",
      rating: 4.8
    },
    {
      title: "Healthcare Privacy Implementation",
      description: "Large hospital system's approach to HIPAA compliance with integrated risk management",
      industry: "Healthcare",
      frameworks: ["HIPAA Security", "NIST 800-53"],
      duration: "4 months",
      rating: 4.9
    },
    {
      title: "SOX IT Controls for Manufacturing",
      description: "How a manufacturing company established SOX IT general controls across multiple locations",
      industry: "Manufacturing",
      frameworks: ["SOX ITGC", "NIST 800-53"],
      duration: "8 months",
      rating: 4.7
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Use Cases Library</h1>
        <p className="text-muted-foreground mt-2">
          Learn from real-world compliance implementation scenarios and best practices
        </p>
      </div>

      <div className="grid gap-6">
        {useCases.map((useCase, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {useCase.title}
              </CardTitle>
              <CardDescription>{useCase.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{useCase.industry}</Badge>
                {useCase.frameworks.map((framework) => (
                  <Badge key={framework} variant="outline">{framework}</Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {useCase.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    {useCase.rating}
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  Read Case Study
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
