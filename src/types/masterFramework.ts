export interface MasterFrameworkRecord {
  id: string;
  domain: string;
  cipStandards: string;
  cipReq: string;
  reportName: string;
  frequency: 'Alert' | 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly' | 'Annually';
  assetScope: string;
  timeScope: string;
  dataRetention: string;
  goalObjective: string;
  description: string;
  details: string;
  outputFormat: string;
  primaryAudience: string;
  likelySources: string[];
  notes: string;
  isCommon?: boolean;
  isMapped?: boolean;
  status: 'Enabled' | 'Pending Review' | 'Not Implemented' | 'Disabled';
  framework: 'Master List' | 'Tripwire Core' | 'Alert';
  correlatedRecords?: string[]; // IDs of related records in other frameworks
}

export interface FrameworkCorrelation {
  masterId: string;
  tripwireId?: string;
  alertId?: string;
  correlationScore: number;
  correlationType: 'exact' | 'partial' | 'inferred';
  differenceNotes?: string;
}

export interface ComplianceQuestion {
  id: string;
  question: string;
  category: string;
  relatedDomains: string[];
  relatedCipStandards: string[];
  weight: number;
}

export interface ComplianceAssessment {
  questionId: string;
  answer: 'yes' | 'no' | 'partial' | 'unknown';
  evidence?: string;
  notes?: string;
  relatedRecords: string[];
}

export interface FilterCriteria {
  domains?: string[];
  cipStandards?: string[];
  cipReq?: string[];
  frequency?: string[];
  status?: string[];
  framework?: string[];
  searchTerm?: string;
  showMappedOnly?: boolean;
  showGapsOnly?: boolean;
}