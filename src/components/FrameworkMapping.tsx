
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowRight } from "lucide-react";

export function FrameworkMapping() {
  const mappings = [
    {
      source: "NIST 800-53 AC-1",
      target: "PCI-DSS 7.1",
      relationship: "Similar",
      description: "Both address access control policies"
    },
    {
      source: "HIPAA 164.312(a)(1)",
      target: "NIST 800-53 AU-1",
      relationship: "Equivalent",
      description: "Information system activity review requirements"
    },
    {
      source: "SOX ITGC-01",
      target: "NIST 800-53 AC-2",
      relationship: "Related",
      description: "User account management controls"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Framework Mapping</h1>
        <p className="text-muted-foreground mt-2">
          Visualize relationships between controls across different compliance frameworks
        </p>
      </div>

      <div className="grid gap-4">
        {mappings.map((mapping, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Control Mapping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Badge variant="secondary">{mapping.source}</Badge>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <Badge variant="secondary">{mapping.target}</Badge>
                </div>
                <Badge 
                  variant={mapping.relationship === "Equivalent" ? "default" : "outline"}
                  className={mapping.relationship === "Similar" ? "bg-yellow-100 text-yellow-800" : ""}
                >
                  {mapping.relationship}
                </Badge>
              </div>
              <CardDescription className="mt-3">{mapping.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
