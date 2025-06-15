
export interface AnalyticsData {
  id: string;
  timestamp: string;
  metric: string;
  value: number;
  category: "compliance" | "risk" | "coverage" | "maturity";
  framework?: string;
}

export interface AIRecommendation {
  id: string;
  type: "mapping" | "gap" | "optimization" | "risk";
  title: string;
  description: string;
  confidence: number;
  impact: "low" | "medium" | "high" | "critical";
  suggestedAction: string;
  estimatedEffort: string;
  relatedControls: string[];
}

export interface ComplianceMetrics {
  overall: number;
  byFramework: Record<string, number>;
  trendData: AnalyticsData[];
  riskScore: number;
  maturityLevel: number;
}
