import { Control } from '../../types/report';

export const nistControls: Control[] = [
  // Access Control (AC) Family - 25 controls
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
    id: "AC-3", 
    title: "Access Enforcement", 
    category: "Access Control", 
    family: "AC",
    priority: "Critical",
    status: "Active",
    description: "Enforce approved authorizations for logical access to information and system resources",
    implementation: "Role-based access control with real-time enforcement",
    controlEnhancements: ["AC-3(2)", "AC-3(4)", "AC-3(7)"],
    relatedControls: ["AC-2", "AC-6", "IA-2"],
    masterFrameworkMapping: {
      masterId: "ML-001",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Access enforcement directly relates to AD Access Failure monitoring"
    }
  },
  { 
    id: "AC-4", 
    title: "Information Flow Enforcement", 
    category: "Access Control", 
    family: "AC",
    priority: "High",
    status: "Active",
    description: "Control information flows within the system and between interconnected systems",
    implementation: "Network segmentation and data loss prevention controls",
    controlEnhancements: ["AC-4(2)", "AC-4(8)", "AC-4(21)"],
    relatedControls: ["SC-7", "SC-8", "CA-3"],
    masterFrameworkMapping: {
      masterId: "ML-012",
      correlationType: "partial",
      correlationScore: 0.85,
      notes: "Information flow control supports network traffic analysis"
    }
  },
  { 
    id: "AC-5", 
    title: "Separation of Duties", 
    category: "Access Control", 
    family: "AC",
    priority: "Medium",
    status: "Active",
    description: "Separate duties and areas of responsibility to reduce the risk of malevolent activity",
    implementation: "Role separation matrix with approval workflows",
    controlEnhancements: ["AC-5(1)"],
    relatedControls: ["AC-2", "AC-6"],
    masterFrameworkMapping: {
      masterId: "ML-002",
      correlationType: "partial",
      correlationScore: 0.75,
      notes: "Duty separation relates to AD Group Change Alert monitoring"
    }
  },
  { 
    id: "AC-6", 
    title: "Least Privilege", 
    category: "Access Control", 
    family: "AC",
    priority: "High",
    status: "Active",
    description: "Employ the principle of least privilege for specific security functions and privileged accounts",
    implementation: "Privileged access management with just-in-time elevation",
    controlEnhancements: ["AC-6(1)", "AC-6(2)", "AC-6(5)"],
    relatedControls: ["AC-2", "AC-3", "IA-2"],
    masterFrameworkMapping: {
      masterId: "ML-001",
      correlationType: "exact",
      correlationScore: 0.88,
      notes: "Least privilege enforcement monitored through AD Access Failure events"
    }
  },
  { 
    id: "AC-7", 
    title: "Unsuccessful Logon Attempts", 
    category: "Access Control", 
    family: "AC",
    priority: "Medium",
    status: "Active",
    description: "Enforce a limit on consecutive invalid logon attempts by a user",
    implementation: "Account lockout policies with automated monitoring",
    controlEnhancements: ["AC-7(1)", "AC-7(2)"],
    relatedControls: ["AC-2", "IA-5"],
    masterFrameworkMapping: {
      masterId: "ML-001",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping - tracks failed login attempts"
    }
  },

  // Audit and Accountability (AU) Family - 16 controls
  { 
    id: "AU-1", 
    title: "Audit and Accountability Policy and Procedures", 
    category: "Audit and Accountability", 
    family: "AU",
    priority: "High",
    status: "Active",
    description: "Develop, document, and disseminate audit and accountability policy and procedures",
    implementation: "Comprehensive audit policy with regular review cycles",
    controlEnhancements: ["AU-1(1)"],
    relatedControls: ["PM-9", "PS-8"],
    masterFrameworkMapping: {
      masterId: "ML-006",
      correlationType: "partial",
      correlationScore: 0.80,
      notes: "Audit policy supports Windows Event Log Report requirements"
    }
  },
  { 
    id: "AU-2", 
    title: "Event Logging", 
    category: "Audit and Accountability", 
    family: "AU",
    priority: "Critical",
    status: "Active",
    description: "Identify the types of events that the system is capable of logging",
    implementation: "Comprehensive event logging configuration",
    controlEnhancements: ["AU-2(1)", "AU-2(3)"],
    relatedControls: ["AU-3", "AU-6", "AU-12"],
    masterFrameworkMapping: {
      masterId: "ML-006",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Windows Event Log Report"
    }
  },
  { 
    id: "AU-3", 
    title: "Content of Audit Records", 
    category: "Audit and Accountability", 
    family: "AU",
    priority: "High",
    status: "Active",
    description: "Ensure audit records contain information that establishes what type of event occurred",
    implementation: "Standardized audit record format with required fields",
    controlEnhancements: ["AU-3(1)", "AU-3(2)"],
    relatedControls: ["AU-2", "AU-8", "AU-12"],
    masterFrameworkMapping: {
      masterId: "ML-007",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Maps to Linux Audit Log Report for comprehensive audit content"
    }
  },
  { 
    id: "AU-6", 
    title: "Audit Review, Analysis, and Reporting", 
    category: "Audit and Accountability", 
    family: "AU",
    priority: "High",
    status: "Active",
    description: "Review and analyze system audit records for indications of inappropriate activity",
    implementation: "SIEM-based log analysis with automated alerting",
    controlEnhancements: ["AU-6(1)", "AU-6(3)", "AU-6(5)"],
    relatedControls: ["AU-2", "AU-3", "IR-4"],
    masterFrameworkMapping: {
      masterId: "ML-012",
      correlationType: "partial",
      correlationScore: 0.85,
      notes: "Audit analysis supports network traffic analysis capabilities"
    }
  },
  { 
    id: "AU-12", 
    title: "Audit Generation", 
    category: "Audit and Accountability", 
    family: "AU",
    priority: "Critical",
    status: "Active",
    description: "Provide audit record generation capability for the events identified in AU-2",
    implementation: "Automated audit log generation and collection",
    controlEnhancements: ["AU-12(1)", "AU-12(3)"],
    relatedControls: ["AU-2", "AU-3", "AU-6"],
    masterFrameworkMapping: {
      masterId: "ML-006",
      correlationType: "exact",
      correlationScore: 0.92,
      notes: "Audit generation directly supports event log reporting"
    }
  },

  // Configuration Management (CM) Family - 14 controls
  { 
    id: "CM-1", 
    title: "Configuration Management Policy and Procedures", 
    category: "Configuration Management", 
    family: "CM",
    priority: "High",
    status: "Active",
    description: "Develop, document, and disseminate configuration management policy and procedures",
    implementation: "Configuration management framework with change control",
    controlEnhancements: ["CM-1(1)"],
    relatedControls: ["PM-9", "PS-8"],
    masterFrameworkMapping: {
      masterId: "ML-008",
      correlationType: "partial",
      correlationScore: 0.80,
      notes: "CM policy supports configuration change monitoring"
    }
  },
  { 
    id: "CM-2", 
    title: "Baseline Configuration", 
    category: "Configuration Management", 
    family: "CM",
    priority: "Critical",
    status: "Active",
    description: "Develop, document, and maintain a current baseline configuration",
    implementation: "Automated baseline creation and maintenance",
    controlEnhancements: ["CM-2(1)", "CM-2(2)", "CM-2(3)"],
    relatedControls: ["CM-3", "CM-6", "CM-8"],
    masterFrameworkMapping: {
      masterId: "ML-008",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Configuration Change Monitor"
    }
  },
  { 
    id: "CM-3", 
    title: "Configuration Change Control", 
    category: "Configuration Management", 
    family: "CM",
    priority: "High",
    status: "Active",
    description: "Determine the types of changes to the system that are configuration-controlled",
    implementation: "Change advisory board with automated workflow",
    controlEnhancements: ["CM-3(1)", "CM-3(2)", "CM-3(4)"],
    relatedControls: ["CM-2", "CM-5", "CM-9"],
    masterFrameworkMapping: {
      masterId: "ML-008",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Change control process supports configuration monitoring"
    }
  },
  { 
    id: "CM-6", 
    title: "Configuration Settings", 
    category: "Configuration Management", 
    family: "CM",
    priority: "High",
    status: "Active",
    description: "Establish and document configuration settings for information technology products",
    implementation: "Security configuration baselines with compliance monitoring",
    controlEnhancements: ["CM-6(1)", "CM-6(2)"],
    relatedControls: ["CM-2", "CM-3", "RA-5"],
    masterFrameworkMapping: {
      masterId: "ML-014",
      correlationType: "exact",
      correlationScore: 0.88,
      notes: "Configuration settings support security patch status monitoring"
    }
  },
  { 
    id: "AC-4", 
    title: "Information Flow Enforcement", 
    category: "Access Control", 
    family: "AC",
    priority: "High",
    status: "Active",
    description: "Control information flows within the system and between interconnected systems",
    implementation: "Network segmentation with data flow controls",
    controlEnhancements: ["AC-4(2)", "AC-4(8)", "AC-4(17)"],
    relatedControls: ["AC-3", "SC-7", "SC-31"]
  },
  { 
    id: "AC-6", 
    title: "Least Privilege", 
    category: "Access Control", 
    family: "AC",
    priority: "High",
    status: "Active",
    description: "Employ the principle of least privilege, allowing only authorized accesses",
    implementation: "Privilege escalation controls with justification requirements",
    controlEnhancements: ["AC-6(1)", "AC-6(2)", "AC-6(9)"],
    relatedControls: ["AC-2", "AC-3", "AC-5"],
    masterFrameworkMapping: {
      masterId: "ML-004",
      correlationType: "exact",
      correlationScore: 0.85,
      notes: "Relates to Local Admin Changes for privilege monitoring"
    }
  },

  // Awareness and Training (AT) Family
  { 
    id: "AT-2", 
    title: "Literacy Training and Awareness", 
    category: "Awareness and Training", 
    family: "AT",
    priority: "Medium",
    status: "Active",
    description: "Provide literacy training and awareness to system users",
    implementation: "Mandatory security awareness training with annual updates",
    controlEnhancements: ["AT-2(2)", "AT-2(3)"],
    relatedControls: ["AT-3", "AT-4", "PL-4"]
  },
  { 
    id: "AT-3", 
    title: "Role-Based Training", 
    category: "Awareness and Training", 
    family: "AT",
    priority: "Medium",
    status: "Active",
    description: "Provide role-based security and privacy training",
    implementation: "Customized training programs based on job functions",
    controlEnhancements: ["AT-3(3)", "AT-3(4)"],
    relatedControls: ["AT-2", "AT-4", "PS-7"]
  },

  // Audit and Accountability (AU) Family
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
    id: "AU-3", 
    title: "Content of Audit Records", 
    category: "Audit and Accountability", 
    family: "AU",
    priority: "High",
    status: "Active",
    description: "Ensure that audit records contain information to establish the identity of users",
    implementation: "Structured logging with required data elements",
    controlEnhancements: ["AU-3(1)", "AU-3(2)"],
    relatedControls: ["AU-2", "AU-8", "AU-12"],
    masterFrameworkMapping: {
      masterId: "ML-007",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Correlates with Linux Audit Log Report"
    }
  },
  { 
    id: "AU-6", 
    title: "Audit Record Review, Analysis, and Reporting", 
    category: "Audit and Accountability", 
    family: "AU",
    priority: "High",
    status: "Active",
    description: "Review and analyze system audit records for indications of inappropriate or unusual activity",
    implementation: "SIEM-based analysis with automated alerting",
    controlEnhancements: ["AU-6(1)", "AU-6(3)", "AU-6(5)"],
    relatedControls: ["AU-2", "AU-3", "SI-4"]
  },
  { 
    id: "AU-12", 
    title: "Audit Record Generation", 
    category: "Audit and Accountability", 
    family: "AU",
    priority: "High",
    status: "Active",
    description: "Provide audit record generation capability for the events identified in AU-2",
    implementation: "Native and third-party audit generation tools",
    controlEnhancements: ["AU-12(1)", "AU-12(3)"],
    relatedControls: ["AU-2", "AU-3", "AU-6"]
  },

  // Security Assessment and Authorization (CA) Family
  { 
    id: "CA-2", 
    title: "Control Assessments", 
    category: "Security Assessment and Authorization", 
    family: "CA",
    priority: "High",
    status: "Active",
    description: "Develop a control assessment plan and assess the controls in the system",
    implementation: "Regular control assessments with documented findings",
    controlEnhancements: ["CA-2(1)", "CA-2(2)", "CA-2(3)"],
    relatedControls: ["CA-5", "CA-6", "CA-7"]
  },
  { 
    id: "CA-7", 
    title: "Continuous Monitoring", 
    category: "Security Assessment and Authorization", 
    family: "CA",
    priority: "High",
    status: "Active",
    description: "Develop a system-level continuous monitoring strategy",
    implementation: "Automated continuous monitoring with real-time dashboards",
    controlEnhancements: ["CA-7(1)", "CA-7(3)", "CA-7(4)"],
    relatedControls: ["CA-2", "PM-31", "SI-4"]
  },

  // Configuration Management (CM) Family
  { 
    id: "CM-2", 
    title: "Baseline Configuration", 
    category: "Configuration Management", 
    family: "CM",
    priority: "High",
    status: "Active",
    description: "Develop, document, and maintain a current baseline configuration",
    implementation: "Configuration baselines with version control",
    controlEnhancements: ["CM-2(1)", "CM-2(2)", "CM-2(3)"],
    relatedControls: ["CM-3", "CM-6", "CM-8"],
    masterFrameworkMapping: {
      masterId: "ML-008",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Configuration Change Monitor"
    }
  },
  { 
    id: "CM-3", 
    title: "Configuration Change Control", 
    category: "Configuration Management", 
    family: "CM",
    priority: "High",
    status: "Active",
    description: "Determine and document the types of changes that are configuration-controlled",
    implementation: "Change control board with approval workflows",
    controlEnhancements: ["CM-3(1)", "CM-3(2)", "CM-3(4)"],
    relatedControls: ["CM-2", "CM-4", "CM-9"],
    masterFrameworkMapping: {
      masterId: "ML-009",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Maps to Change Management Report"
    }
  },
  { 
    id: "CM-6", 
    title: "Configuration Settings", 
    category: "Configuration Management", 
    family: "CM",
    priority: "High",
    status: "Active",
    description: "Establish and document configuration settings for system components",
    implementation: "Security configuration guides with compliance validation",
    controlEnhancements: ["CM-6(1)", "CM-6(2)"],
    relatedControls: ["CM-2", "CM-3", "CM-7"]
  },
  { 
    id: "CM-8", 
    title: "System Component Inventory", 
    category: "Configuration Management", 
    family: "CM",
    priority: "High",
    status: "Active",
    description: "Develop and document an inventory of system components",
    implementation: "Automated asset discovery with inventory management",
    controlEnhancements: ["CM-8(1)", "CM-8(3)", "CM-8(5)"],
    relatedControls: ["CM-2", "PM-5", "SA-4"],
    masterFrameworkMapping: {
      masterId: "ML-020",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct correlation to System Inventory"
    }
  },

  // Contingency Planning (CP) Family
  { 
    id: "CP-2", 
    title: "Contingency Plan", 
    category: "Contingency Planning", 
    family: "CP",
    priority: "High",
    status: "Active",
    description: "Develop a contingency plan for the system that addresses contingencies",
    implementation: "Comprehensive business continuity and disaster recovery plans",
    controlEnhancements: ["CP-2(1)", "CP-2(3)", "CP-2(8)"],
    relatedControls: ["CP-3", "CP-4", "CP-10"]
  },
  { 
    id: "CP-9", 
    title: "System Backup", 
    category: "Contingency Planning", 
    family: "CP",
    priority: "High",
    status: "Active",
    description: "Conduct backups of user-level information and system-level information",
    implementation: "Automated backup systems with offsite storage",
    controlEnhancements: ["CP-9(1)", "CP-9(3)", "CP-9(5)"],
    relatedControls: ["CP-2", "CP-10", "MP-4"]
  },

  // Identification and Authentication (IA) Family
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
    id: "IA-4", 
    title: "Identifier Management", 
    category: "Identification and Authentication", 
    family: "IA",
    priority: "High",
    status: "Active",
    description: "Manage system identifiers by receiving authorization from designated organizational officials",
    implementation: "Identity governance with automated provisioning",
    controlEnhancements: ["IA-4(4)", "IA-4(6)"],
    relatedControls: ["AC-2", "IA-2", "IA-5"]
  },
  { 
    id: "IA-5", 
    title: "Authenticator Management", 
    category: "Identification and Authentication", 
    family: "IA",
    priority: "High",
    status: "Active",
    description: "Manage system authenticators by verifying the identity of the individual",
    implementation: "Credential lifecycle management with security policies",
    controlEnhancements: ["IA-5(1)", "IA-5(2)", "IA-5(11)"],
    relatedControls: ["AC-2", "IA-2", "IA-4"]
  },

  // Incident Response (IR) Family
  { 
    id: "IR-1", 
    title: "Incident Response Policy and Procedures", 
    category: "Incident Response", 
    family: "IR",
    priority: "High",
    status: "Active",
    description: "Develop, document, and disseminate incident response policy and procedures",
    implementation: "Formal incident response policy with regular updates",
    controlEnhancements: ["IR-1(1)"],
    relatedControls: ["IR-2", "IR-8", "PM-9"]
  },
  { 
    id: "IR-4", 
    title: "Incident Handling", 
    category: "Incident Response", 
    family: "IR",
    priority: "High",
    status: "Active",
    description: "Implement an incident handling capability for incidents",
    implementation: "24/7 incident response team with defined procedures",
    controlEnhancements: ["IR-4(1)", "IR-4(4)", "IR-4(13)"],
    relatedControls: ["IR-2", "IR-3", "IR-8"]
  },
  { 
    id: "IR-6", 
    title: "Incident Reporting", 
    category: "Incident Response", 
    family: "IR",
    priority: "High",
    status: "Active",
    description: "Require personnel to report suspected incidents to the organizational incident response capability",
    implementation: "Incident reporting portal with automated workflows",
    controlEnhancements: ["IR-6(1)", "IR-6(3)"],
    relatedControls: ["IR-4", "IR-8", "AU-6"]
  },

  // Maintenance (MA) Family
  { 
    id: "MA-2", 
    title: "Controlled Maintenance", 
    category: "Maintenance", 
    family: "MA",
    priority: "Medium",
    status: "Active",
    description: "Schedule, document, and review records of maintenance, repair, and replacement",
    implementation: "Maintenance scheduling with security oversight",
    controlEnhancements: ["MA-2(2)"],
    relatedControls: ["CM-3", "CM-4", "SA-12"]
  },
  { 
    id: "MA-4", 
    title: "Nonlocal Maintenance", 
    category: "Maintenance", 
    family: "MA",
    priority: "Medium",
    status: "Active",
    description: "Approve and monitor nonlocal maintenance and diagnostic activities",
    implementation: "Remote access controls for maintenance activities",
    controlEnhancements: ["MA-4(2)", "MA-4(3)"],
    relatedControls: ["AC-2", "AC-3", "AC-17"],
    masterFrameworkMapping: {
      masterId: "ML-005",
      correlationType: "partial",
      correlationScore: 0.75,
      notes: "Relates to VPN Access Report for remote maintenance monitoring"
    }
  },

  // Media Protection (MP) Family
  { 
    id: "MP-2", 
    title: "Media Access", 
    category: "Media Protection", 
    family: "MP",
    priority: "Medium",
    status: "Active",
    description: "Restrict access to digital and non-digital media to authorized individuals",
    implementation: "Media access controls with logging",
    controlEnhancements: ["MP-2(2)"],
    relatedControls: ["AC-3", "AU-9", "MP-4"]
  },
  { 
    id: "MP-6", 
    title: "Media Sanitization", 
    category: "Media Protection", 
    family: "MP",
    priority: "High",
    status: "Active",
    description: "Sanitize digital and non-digital media prior to disposal, release, or reuse",
    implementation: "Certified media sanitization procedures",
    controlEnhancements: ["MP-6(1)", "MP-6(2)", "MP-6(3)"],
    relatedControls: ["AU-11", "MA-2", "MA-4"]
  },

  // Physical and Environmental Protection (PE) Family
  { 
    id: "PE-2", 
    title: "Physical Access Authorizations", 
    category: "Physical and Environmental Protection", 
    family: "PE",
    priority: "High",
    status: "Active",
    description: "Develop, approve, and maintain a list of individuals with authorized access to the facility",
    implementation: "Badge-based access control with visitor management",
    controlEnhancements: ["PE-2(1)", "PE-2(2)"],
    relatedControls: ["AC-2", "PE-3", "PE-4"],
    masterFrameworkMapping: {
      masterId: "ML-016",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Physical Access Report"
    }
  },
  { 
    id: "PE-3", 
    title: "Physical Access Control", 
    category: "Physical and Environmental Protection", 
    family: "PE",
    priority: "High",
    status: "Active",
    description: "Enforce physical access authorizations at entry and exit points",
    implementation: "Multi-factor physical access controls",
    controlEnhancements: ["PE-3(1)", "PE-3(2)", "PE-3(6)"],
    relatedControls: ["PE-2", "PE-4", "PE-5"],
    masterFrameworkMapping: {
      masterId: "ML-017",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Maps to Physical Access Violation Alert"
    }
  },
  { 
    id: "PE-6", 
    title: "Monitoring Physical Access", 
    category: "Physical and Environmental Protection", 
    family: "PE",
    priority: "Medium",
    status: "Active",
    description: "Monitor physical access to the facility where the system resides",
    implementation: "CCTV monitoring with recording capabilities",
    controlEnhancements: ["PE-6(1)", "PE-6(4)"],
    relatedControls: ["AU-2", "AU-6", "PE-2"]
  },

  // Planning (PL) Family
  { 
    id: "PL-2", 
    title: "System Security and Privacy Plans", 
    category: "Planning", 
    family: "PL",
    priority: "High",
    status: "Active",
    description: "Develop security and privacy plans for the system",
    implementation: "Comprehensive system security plans with regular updates",
    controlEnhancements: ["PL-2(3)"],
    relatedControls: ["PL-8", "PM-7", "SA-5"]
  },
  { 
    id: "PL-8", 
    title: "Security and Privacy Architectures", 
    category: "Planning", 
    family: "PL",
    priority: "High",
    status: "Active",
    description: "Develop security and privacy architectures for the system",
    implementation: "Enterprise architecture with security integration",
    controlEnhancements: ["PL-8(1)", "PL-8(2)"],
    relatedControls: ["PL-2", "SA-3", "SA-8"]
  },

  // Program Management (PM) Family
  { 
    id: "PM-9", 
    title: "Risk Management Strategy", 
    category: "Program Management", 
    family: "PM",
    priority: "High",
    status: "Active",
    description: "Develop, document, and implement an organization-wide risk management strategy",
    implementation: "Enterprise risk management framework",
    controlEnhancements: [],
    relatedControls: ["PM-28", "RA-3", "RA-7"]
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
  },

  // Personnel Security (PS) Family
  { 
    id: "PS-3", 
    title: "Personnel Screening", 
    category: "Personnel Security", 
    family: "PS",
    priority: "Medium",
    status: "Active",
    description: "Screen individuals prior to authorizing access to the system",
    implementation: "Background investigation requirements",
    controlEnhancements: ["PS-3(1)", "PS-3(3)"],
    relatedControls: ["AC-2", "IA-4", "PS-2"]
  },
  { 
    id: "PS-4", 
    title: "Personnel Termination", 
    category: "Personnel Security", 
    family: "PS",
    priority: "High",
    status: "Active",
    description: "Terminate system access and recover system-related property upon personnel termination",
    implementation: "Automated deprovisioning workflows",
    controlEnhancements: ["PS-4(1)", "PS-4(2)"],
    relatedControls: ["AC-2", "IA-4", "MP-6"]
  },

  // Risk Assessment (RA) Family
  { 
    id: "RA-3", 
    title: "Risk Assessment", 
    category: "Risk Assessment", 
    family: "RA",
    priority: "High",
    status: "Active",
    description: "Conduct risk assessments at defined intervals",
    implementation: "Regular risk assessments with quantitative analysis",
    controlEnhancements: ["RA-3(1)", "RA-3(2)"],
    relatedControls: ["PM-9", "RA-2", "RA-7"]
  },
  { 
    id: "RA-5", 
    title: "Vulnerability Monitoring and Scanning", 
    category: "Risk Assessment", 
    family: "RA",
    priority: "High",
    status: "Active",
    description: "Monitor and scan for vulnerabilities in the system",
    implementation: "Continuous vulnerability scanning with automated reporting",
    controlEnhancements: ["RA-5(1)", "RA-5(2)", "RA-5(5)"],
    relatedControls: ["CA-2", "CM-6", "SI-2"],
    masterFrameworkMapping: {
      masterId: "ML-014",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Direct correlation to Security Patch Status monitoring"
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

  // System and Services Acquisition (SA) Family
  { 
    id: "SA-4", 
    title: "Acquisition Process", 
    category: "System and Services Acquisition", 
    family: "SA",
    priority: "High",
    status: "Active",
    description: "Include security and privacy requirements in the acquisition process",
    implementation: "Security requirements in procurement contracts",
    controlEnhancements: ["SA-4(1)", "SA-4(9)", "SA-4(10)"],
    relatedControls: ["PS-7", "SA-5", "SA-8"]
  },
  { 
    id: "SA-11", 
    title: "Developer Testing and Evaluation", 
    category: "System and Services Acquisition", 
    family: "SA",
    priority: "Medium",
    status: "Active",
    description: "Require the developer of the system to create a security and privacy assessment plan",
    implementation: "Security testing requirements for developers",
    controlEnhancements: ["SA-11(1)", "SA-11(2)"],
    relatedControls: ["CA-2", "SA-15", "SI-2"]
  },

  // System and Communications Protection (SC) Family
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
    id: "SC-8", 
    title: "Transmission Confidentiality and Integrity", 
    category: "System and Communications Protection", 
    family: "SC",
    priority: "High",
    status: "Active",
    description: "Protect the confidentiality and integrity of transmitted information",
    implementation: "Encryption in transit for all sensitive communications",
    controlEnhancements: ["SC-8(1)", "SC-8(2)"],
    relatedControls: ["AC-17", "SC-13", "SC-23"]
  },
  { 
    id: "SC-13", 
    title: "Cryptographic Protection", 
    category: "System and Communications Protection", 
    family: "SC",
    priority: "High",
    status: "Active",
    description: "Implement cryptographic mechanisms to prevent unauthorized disclosure",
    implementation: "FIPS 140-2 validated cryptographic modules",
    controlEnhancements: ["SC-13(1)", "SC-13(2)"],
    relatedControls: ["AC-3", "MP-5", "SC-12"]
  },

  // System and Information Integrity (SI) Family
  { 
    id: "SI-2", 
    title: "Flaw Remediation", 
    category: "System and Information Integrity", 
    family: "SI",
    priority: "Critical",
    status: "Active",
    description: "Identify, report, and correct system flaws",
    implementation: "Patch management process with risk-based prioritization",
    controlEnhancements: ["SI-2(1)", "SI-2(2)", "SI-2(6)"],
    relatedControls: ["CA-2", "CM-3", "SI-11"],
    masterFrameworkMapping: {
      masterId: "ML-015",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Critical Patch Alert"
    }
  },
  { 
    id: "SI-3", 
    title: "Malicious Code Protection", 
    category: "System and Information Integrity", 
    family: "SI",
    priority: "Critical",
    status: "Active",
    description: "Implement malicious code protection mechanisms",
    implementation: "Enterprise anti-malware with real-time protection",
    controlEnhancements: ["SI-3(1)", "SI-3(2)", "SI-3(8)"],
    relatedControls: ["CM-3", "SI-2", "SI-7"],
    masterFrameworkMapping: {
      masterId: "ML-010",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Antivirus Status Report"
    }
  },
  { 
    id: "SI-4", 
    title: "System Monitoring", 
    category: "System and Information Integrity", 
    family: "SI",
    priority: "High",
    status: "Active",
    description: "Monitor the system to detect attacks and indicators of potential attacks",
    implementation: "SIEM with 24/7 monitoring and alerting",
    controlEnhancements: ["SI-4(1)", "SI-4(2)", "SI-4(4)"],
    relatedControls: ["AU-2", "AU-6", "CA-7"],
    masterFrameworkMapping: {
      masterId: "ML-011",
      correlationType: "exact",
      correlationScore: 0.85,
      notes: "Relates to Malware Detection Alert for system monitoring"
    }
  },
  { 
    id: "SI-7", 
    title: "Software, Firmware, and Information Integrity", 
    category: "System and Information Integrity", 
    family: "SI",
    priority: "High",
    status: "Active",
    description: "Employ integrity verification tools to detect unauthorized changes",
    implementation: "File integrity monitoring with alerting",
    controlEnhancements: ["SI-7(1)", "SI-7(6)", "SI-7(7)"],
    relatedControls: ["CM-3", "SI-3", "SC-8"]
  },

  // Supply Chain Risk Management (SR) Family
  { 
    id: "SR-3", 
    title: "Supply Chain Controls and Processes", 
    category: "Supply Chain Risk Management", 
    family: "SR",
    priority: "High",
    status: "Active",
    description: "Establish a process or processes to identify and address weaknesses or deficiencies",
    implementation: "Supply chain risk assessment with vendor validation",
    controlEnhancements: ["SR-3(1)", "SR-3(2)"],
    relatedControls: ["SA-4", "SA-9", "SR-5"]
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
  }
];