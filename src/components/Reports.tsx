
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, BarChart3, Users } from "lucide-react";

export function Reports() {
  const reports = [
    {
      title: "Compliance Summary Report",
      description: "Overview of compliance status across all frameworks",
      icon: BarChart3,
      format: "PDF"
    },
    {
      title: "Control Mapping Report",
      description: "Detailed mapping between framework controls",
      icon: FileText,
      format: "CSV"
    },
    {
      title: "Gap Analysis Report",
      description: "Identified gaps and recommendations",
      icon: Users,
      format: "PDF"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Reports & Export</h1>
        <p className="text-muted-foreground mt-2">
          Generate and export compliance reports and data
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <report.icon className="h-5 w-5 text-primary" />
                {report.title}
              </CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Format: {report.format}</span>
                <Button size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
