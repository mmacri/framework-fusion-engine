
export interface ReportData {
  frameworks: string[];
  controls: Control[];
  relationships: ControlRelationship[];
  overview: {
    totalControls: number;
    frameworkBreakdown: { framework: string; count: number; coverage: number }[];
    mappingStats: {
      directMappings: number;
      partialMappings: number;
      gapMappings: number;
      totalRelationships: number;
    };
  };
  metadata: {
    generatedAt: string;
    title: string;
    description: string;
    includeMetadata: boolean;
    includeRelationships: boolean;
    includeGaps: boolean;
  };
}

export interface ReportConfig {
  title: string;
  description: string;
  frameworks: string[];
  format: 'pdf' | 'excel' | 'csv' | 'json';
  includeMetadata: boolean;
  includeRelationships: boolean;
  includeGaps: boolean;
}

export interface Control {
  id: string;
  title: string;
  category: string;
  family: string;
  priority: string;
  status: string;
  description: string;
  implementation: string;
  controlEnhancements?: string[];
  relatedControls?: string[];
  requirements?: string[];
  relatedRequirements?: string[];
}

export interface ControlRelationship {
  source: string;
  target: string;
  relationship: string;
  confidence: number;
  description: string;
  mappingType: string;
  gapAnalysis?: string;
}
