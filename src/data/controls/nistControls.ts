import { Control } from '../../types/report';

export const nistControls: Control[] = [
  { 
    id: "AC-1", 
    title: "Access Control Policy and Procedures", 
    category: "Access Control", 
    family: "AC",
    priority: "High",
    status: "Active",
    description: "Develop, document, and disseminate organization-wide access control policy and procedures",
    implementation: "Policy document must be reviewed annually and updated as needed",
    controlEnhancements: ["AC-1(1)", "AC-1(2)"],
    relatedControls: ["PM-9", "PM-10", "PS-8"],
    masterFrameworkMapping: {
      masterId: "ML-006",
      correlationType: "partial",
      correlationScore: 0.80,
      notes: "Relates to Windows Event Log Report for policy enforcement monitoring"
    }
  },
  { 
    id: "AC-2", 
    title: "Account Management", 
    category: "Access Control", 
    family: "AC",
    priority: "Critical",
    status: "Active",
    description: "Manage information system accounts including establishment, activation, modification, review, and removal",
    implementation: "Automated account management system with approval workflows",
    controlEnhancements: ["AC-2(1)", "AC-2(2)", "AC-2(3)", "AC-2(4)"],
    relatedControls: ["IA-2", "IA-4", "IA-5"],
    masterFrameworkMapping: {
      masterId: "ML-001",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to AD Access Failure and account management"
    }
  },
  { 
    id: "IA-2", 
    title: "Identification and Authentication (Organizational Users)", 
    category: "Identification and Authentication", 
    family: "IA",
    priority: "Critical",
    status: "Active",
    description: "Uniquely identify and authenticate organizational users and associate that identity with processes",
    implementation: "Multi-factor authentication required for all users",
    controlEnhancements: ["IA-2(1)", "IA-2(2)", "IA-2(8)", "IA-2(12)"],
    relatedControls: ["AC-2", "AC-14", "IA-4"],
    masterFrameworkMapping: {
      masterId: "ML-002",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Maps to AD Group Change Alert for authentication monitoring"
    }
  },
  { 
    id: "SC-7", 
    title: "Boundary Protection", 
    category: "System and Communications Protection", 
    family: "SC",
    priority: "High",
    status: "Active",
    description: "Monitor and control communications at the external boundary and key internal boundaries",
    implementation: "Firewall rules with intrusion detection and prevention systems",
    controlEnhancements: ["SC-7(3)", "SC-7(4)", "SC-7(5)"],
    relatedControls: ["AC-4", "SC-5", "SC-6"],
    masterFrameworkMapping: {
      masterId: "ML-012",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Direct correlation to Network Traffic Analysis"
    }
  },
  { 
    id: "AU-2", 
    title: "Event Logging", 
    category: "Audit and Accountability", 
    family: "AU",
    priority: "High",
    status: "Active",
    description: "Identify the types of events that the system is capable of logging",
    implementation: "Comprehensive audit logging with centralized collection",
    controlEnhancements: ["AU-2(3)", "AU-2(4)"],
    relatedControls: ["AU-3", "AU-6", "AU-12"],
    masterFrameworkMapping: {
      masterId: "ML-006",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Maps directly to Windows Event Log Report"
    }
  },
  { 
    id: "RA-9", 
    title: "Criticality Analysis", 
    category: "Risk Assessment", 
    family: "RA",
    priority: "Medium",
    status: "Active",
    description: "Identify critical system components and functions by performing a criticality analysis",
    implementation: "Conduct formal criticality analysis for all system components",
    controlEnhancements: ["RA-9(1)"],
    relatedControls: ["RA-2", "RA-3", "CP-2"]
  },
  { 
    id: "SR-11", 
    title: "Component Authenticity", 
    category: "Supply Chain Risk Management", 
    family: "SR",
    priority: "High",
    status: "Active",
    description: "Develop and implement anti-counterfeit policy and procedures",
    implementation: "Verify authenticity of system components through trusted suppliers",
    controlEnhancements: ["SR-11(1)", "SR-11(2)"],
    relatedControls: ["SA-12", "SR-3", "SR-5"]
  },
  { 
    id: "PM-31", 
    title: "Continuous Monitoring Strategy", 
    category: "Program Management", 
    family: "PM",
    priority: "High",
    status: "Active",
    description: "Develop and implement a continuous monitoring strategy",
    implementation: "Automated monitoring with risk-based assessment frequencies",
    controlEnhancements: [],
    relatedControls: ["CA-7", "PM-9", "RA-5"]
  }
];
