import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Target } from "lucide-react";

const frameworkGuide = [
  {
    framework: "Master Framework",
    description: "The central correlation engine that unifies all supported frameworks",
    useCase: "Start here to understand relationships between all frameworks",
    keyFeature: "Correlation mapping with confidence scores"
  },
  {
    framework: "NIST Cybersecurity Framework",
    description: "Comprehensive cybersecurity guidelines with 108 subcategories",
    useCase: "Enterprise cybersecurity risk management",
    keyFeature: "Five core functions: Identify, Protect, Detect, Respond, Recover"
  },
  {
    framework: "PCI-DSS",
    description: "Payment card industry data security standards",
    useCase: "Organizations handling credit card transactions",
    keyFeature: "12 high-level requirements with detailed sub-controls"
  },
  {
    framework: "HIPAA",
    description: "Healthcare information privacy and security requirements",
    useCase: "Healthcare organizations and business associates",
    keyFeature: "Administrative, physical, and technical safeguards"
  },
  {
    framework: "SOX",
    description: "Financial reporting and internal controls requirements",
    useCase: "Public companies and financial reporting",
    keyFeature: "IT general controls and application controls"
  },
  {
    framework: "CIS Controls",
    description: "Prioritized cybersecurity best practices",
    useCase: "Organizations seeking practical cybersecurity implementation",
    keyFeature: "20 critical security controls with implementation groups"
  }
];

export function FrameworkGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Supported Frameworks & Master Correlation
        </CardTitle>
        <CardDescription>
          Framework Fusion provides a unified master framework that correlates controls across all supported compliance standards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {frameworkGuide.map((framework, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{framework.framework}</h3>
                <Badge variant="outline">{framework.keyFeature}</Badge>
              </div>
              <p className="text-muted-foreground mb-3">{framework.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-medium">Use Case:</span>
                <span>{framework.useCase}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}