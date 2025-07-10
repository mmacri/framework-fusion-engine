import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const reportTypes = [
  {
    type: "Framework Reports",
    description: "Generate reports specific to individual compliance frameworks",
    includes: "Control coverage, implementation status, gap analysis"
  },
  {
    type: "Assessment Results",
    description: "Comprehensive summaries of completed assessments",
    includes: "Scores, recommendations, evidence tracking, remediation plans"
  },
  {
    type: "Compliance Dashboard",
    description: "Executive-level overview of organizational compliance posture",
    includes: "Key metrics, trending data, risk indicators, progress tracking"
  }
];

export function ReportTypes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Reporting Capabilities
        </CardTitle>
        <CardDescription>
          Generate comprehensive compliance reports for stakeholders and auditors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reportTypes.map((report, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{report.type}</h3>
              <p className="text-muted-foreground mb-3">{report.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Includes:</span>
                <span>{report.includes}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}