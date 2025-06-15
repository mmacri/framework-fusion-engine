
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, AlertTriangle, CheckCircle } from "lucide-react";

export function GapAnalysis() {
  const frameworks = [
    {
      name: "NIST 800-53",
      implemented: 85,
      total: 100,
      gaps: ["AC-2", "AU-3", "SC-1"]
    },
    {
      name: "PCI-DSS",
      implemented: 92,
      total: 100,
      gaps: ["2.1", "8.2"]
    },
    {
      name: "HIPAA Security",
      implemented: 78,
      total: 100,
      gaps: ["164.312(a)", "164.308(b)", "164.310(c)"]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Gap Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Identify coverage gaps and optimization opportunities in your compliance program
        </p>
      </div>

      <div className="grid gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                {framework.name}
              </CardTitle>
              <CardDescription>
                {framework.implemented}% implementation coverage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Implementation Progress</span>
                  <span>{framework.implemented}/{framework.total}</span>
                </div>
                <Progress value={framework.implemented} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Missing Controls</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {framework.gaps.map((gap) => (
                    <Badge key={gap} variant="destructive" className="text-xs">
                      {gap}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
