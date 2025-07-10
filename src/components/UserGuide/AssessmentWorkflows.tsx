import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

const assessmentWorkflows = [
  {
    type: "Compliance Q&A",
    purpose: "Interactive questionnaire for compliance readiness assessment",
    process: "Answer targeted questions about your organization's security posture",
    output: "Compliance score with recommendations for improvement"
  },
  {
    type: "Auditor Assessment",
    purpose: "Comprehensive evaluation tool for audit preparation",
    process: "Detailed review of controls implementation and evidence collection",
    output: "Audit-ready documentation and gap analysis"
  },
  {
    type: "Project Assessment",
    purpose: "Track compliance requirements for specific projects or initiatives",
    process: "Project-specific control mapping and progress tracking",
    output: "Project compliance status and milestone tracking"
  }
];

export function AssessmentWorkflows() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Assessment Workflows
        </CardTitle>
        <CardDescription>
          Comprehensive assessment tools for different compliance scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {assessmentWorkflows.map((workflow, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{workflow.type}</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-primary">Purpose:</span>
                  <p className="mt-1">{workflow.purpose}</p>
                </div>
                <div>
                  <span className="font-medium text-primary">Process:</span>
                  <p className="mt-1">{workflow.process}</p>
                </div>
                <div>
                  <span className="font-medium text-primary">Output:</span>
                  <p className="mt-1">{workflow.output}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}