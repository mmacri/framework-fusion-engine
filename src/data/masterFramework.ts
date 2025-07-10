import { MasterFrameworkRecord, ComplianceQuestion } from '../types/masterFramework';

export const masterListData: MasterFrameworkRecord[] = [
  {
    id: "ML-001",
    domain: "Access - AD",
    cipStandards: "CIP-007-6",
    cipReq: "R5.7",
    reportName: "AD Access Failure",
    frequency: "Alert",
    assetScope: "SCL EMS AD",
    timeScope: "When threshold met",
    dataRetention: "",
    goalObjective: "",
    description: "",
    details: "",
    outputFormat: "",
    primaryAudience: "",
    likelySources: [],
    notes: "",
    status: "Enabled",
    framework: "Master List",
    isCommon: true,
    isMapped: true
  },
  {
    id: "ML-002",
    domain: "Access - AD",
    cipStandards: "N/A",
    cipReq: "N/A",
    reportName: "AD Group Change",
    frequency: "Alert",
    assetScope: "Domain OU, Group, GPO, etc.",
    timeScope: "Upon Change",
    dataRetention: "",
    goalObjective: "Help ensure no unauthorized AD changes",
    description: "",
    details: "",
    outputFormat: "",
    primaryAudience: "",
    likelySources: [],
    notes: "",
    status: "Enabled",
    framework: "Master List",
    isCommon: true,
    isMapped: true
  },
  {
    id: "ML-003",
    domain: "Access - AD",
    cipStandards: "CIP-007-6",
    cipReq: "R5.2",
    reportName: "Domain Account activity history",
    frequency: "Quarterly",
    assetScope: "Domain Users",
    timeScope: "Previous 30 days",
    dataRetention: "",
    goalObjective: "",
    description: "Report on domain level account activity and status. This should be across all account types; user, service, administrative, special / custom",
    details: "• New accounts added\n• Existing accounts locked out or disabled in last 30 days\n• Existing accounts removed or deleted in last 30 days\n• Permission changes\n• Group Membership changes\n• Account attribute changes\n• Existing accounts with administrative PW reset in last 30 days",
    outputFormat: "",
    primaryAudience: "",
    likelySources: [],
    notes: "",
    status: "Enabled",
    framework: "Master List",
    isCommon: true,
    isMapped: true
  },
  {
    id: "ML-004",
    domain: "Access - AD",
    cipStandards: "CIP-007-6",
    cipReq: "R5.4 R5.5 R5.6",
    reportName: "Domain Password Activity history",
    frequency: "Quarterly",
    assetScope: "Domain Accounts",
    timeScope: "Previous 30 days",
    dataRetention: "",
    goalObjective: "",
    description: "Report on domain level password activity and status for all account types",
    details: "• Any password not meeting complexity or length\n• Any account with PW set not to expire\n• Any account with a password that has been changed in the last 30 days\n• Any account with PW set to expire in the next 30 days\n• Any user account with PW older than one year\n• Any PSA, Admin, or other high level account with PW older than 6 months",
    outputFormat: "",
    primaryAudience: "",
    likelySources: [],
    notes: "",
    status: "Enabled",
    framework: "Master List",
    isCommon: true,
    isMapped: true
  },
  {
    id: "ML-046",
    domain: "Change",
    cipStandards: "CIP-013-2",
    cipReq: "",
    reportName: "New Software",
    frequency: "Monthly",
    assetScope: "All Managed Cyber Assets",
    timeScope: "Previous 30 Days",
    dataRetention: "Previous 3 Years or to commissioning date if less than 3 years",
    goalObjective: "To help ensure new software is not introduced into the environment without propper authorization and vendor screening",
    description: "Monthly report listing any changes that involved installation of software. Ideally this would be limited to NEW software (not showing updates to existing software), but that might not be technically possible.",
    details: "• Report should be for all monitored cyber assets that can have software installed.\n• Previous 30 days only\n• Ideally filtering could be based on not finding a previous version of the executable which would indicate new software vs. updated software. This may be too granular.",
    outputFormat: "",
    primaryAudience: "",
    likelySources: [],
    notes: "",
    status: "Enabled",
    framework: "Master List",
    isCommon: true,
    isMapped: true
  }
];

// Export additional sample data for other frameworks
export const tripwireCoreData: MasterFrameworkRecord[] = [
  {
    id: "TC-001",
    domain: "Configuration Management",
    cipStandards: "CIP-010-4",
    cipReq: "R1",
    reportName: "Tripwire Configuration Monitor",
    frequency: "Daily",
    assetScope: "All monitored assets",
    timeScope: "Real-time",
    dataRetention: "3 years",
    goalObjective: "Monitor configuration changes",
    description: "Real-time configuration change monitoring",
    details: "Automated detection of unauthorized changes",
    outputFormat: "Alert/Report",
    primaryAudience: "IT Security",
    likelySources: ["Tripwire Enterprise"],
    notes: "Core monitoring capability",
    status: "Enabled",
    framework: "Tripwire Core",
    correlatedRecords: ["ML-021", "ML-022"]
  }
];

export const alertData: MasterFrameworkRecord[] = [
  {
    id: "AL-001",
    domain: "Security Alerts",
    cipStandards: "CIP-007-6",
    cipReq: "R4",
    reportName: "Security Event Alert",
    frequency: "Alert",
    assetScope: "All monitored systems",
    timeScope: "Real-time",
    dataRetention: "1 year",
    goalObjective: "Immediate threat response",
    description: "Real-time security alert system",
    details: "Automated threat detection and alerting",
    outputFormat: "Email/SMS Alert",
    primaryAudience: "SOC Team",
    likelySources: ["SIEM", "IDS/IPS"],
    notes: "Critical security alerts",
    status: "Enabled",
    framework: "Alert",
    correlatedRecords: ["ML-001", "ML-016"]
  }
];

export const complianceQuestions: ComplianceQuestion[] = [
  {
    id: "CQ-001",
    question: "Does your organization have documented access control policies?",
    category: "Access Control",
    relatedDomains: ["Access - AD", "Access - Local"],
    relatedCipStandards: ["CIP-007-6"],
    weight: 5
  },
  {
    id: "CQ-002", 
    question: "Are user access rights reviewed quarterly?",
    category: "Access Control",
    relatedDomains: ["Access - AD"],
    relatedCipStandards: ["CIP-004-6"],
    weight: 4
  },
  {
    id: "CQ-003",
    question: "Is antivirus software deployed on all systems?",
    category: "Malware Protection",
    relatedDomains: ["AV - Host"],
    relatedCipStandards: ["CIP-007-6"],
    weight: 5
  }
];