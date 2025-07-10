import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BarChart3, GitBranch, ClipboardList, FileText, Users } from "lucide-react";

const coreFeatures = [
  {
    icon: BarChart3,
    title: "Master Framework",
    description: "Unified view of all compliance frameworks with correlated controls and relationships",
    capabilities: [
      "2,400+ controls across frameworks",
      "Real-time correlation mapping",
      "Confidence scoring for relationships",
      "Framework coverage analysis"
    ]
  },
  {
    icon: GitBranch,
    title: "Control Mapping",
    description: "Visual representation of how controls relate across different compliance frameworks",
    capabilities: [
      "Interactive correlation viewer",
      "Cross-framework navigation",
      "Mapping confidence indicators",
      "Clickable control references"
    ]
  },
  {
    icon: ClipboardList,
    title: "Assessment Tools",
    description: "Comprehensive assessment capabilities for different compliance scenarios",
    capabilities: [
      "Compliance Q&A questionnaires",
      "Auditor assessment workflows",
      "Project-specific compliance tracking",
      "Progress monitoring and scoring"
    ]
  },
  {
    icon: FileText,
    title: "Advanced Reporting",
    description: "Generate detailed compliance reports tailored to your organization's needs",
    capabilities: [
      "Framework-specific reports",
      "Assessment result summaries",
      "Compliance dashboard views",
      "Export to PDF, Excel, CSV"
    ]
  },
  {
    icon: Users,
    title: "Community Features",
    description: "Collaborative platform for improving and maintaining framework accuracy",
    capabilities: [
      "Propose control improvements",
      "Community validation process",
      "Discussion forums",
      "Version control for changes"
    ]
  }
];

export function CoreFeatures() {
  return (
    <div className="grid gap-6">
      {coreFeatures.map((feature, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {feature.capabilities.map((capability, capIndex) => (
                <div key={capIndex} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{capability}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}