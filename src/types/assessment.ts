
export interface Assessment {
  id: string;
  title: string;
  framework: string;
  status: "draft" | "in_progress" | "completed" | "archived";
  createdBy: string;
  assignedTo: string[];
  dueDate: string;
  progress: number;
  controls: AssessmentControl[];
  findings: Finding[];
}

export interface AssessmentControl {
  controlId: string;
  status: "not_started" | "in_progress" | "compliant" | "non_compliant" | "not_applicable";
  evidence: Evidence[];
  testingNotes: string;
  lastTested: string;
  nextTestDate: string;
}

export interface Evidence {
  id: string;
  name: string;
  type: "document" | "screenshot" | "log" | "report" | "other";
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  description: string;
}

export interface Finding {
  id: string;
  controlId: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  recommendation: string;
  status: "open" | "in_remediation" | "resolved" | "accepted_risk";
  assignedTo: string;
  dueDate: string;
}
