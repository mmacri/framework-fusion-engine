
import { Control, ControlRelationship } from '../types/report';

export const mockControlsData: Record<string, Control[]> = {
  "NIST 800-53": [
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
      relatedControls: ["PM-9", "PM-10", "PS-8"]
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
      relatedControls: ["IA-2", "IA-4", "IA-5"]
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
      relatedControls: ["AC-2", "AC-14", "IA-4"]
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
      relatedControls: ["AC-4", "SC-5", "SC-6"]
    }
  ],
  "PCI-DSS": [
    { 
      id: "7.1.1", 
      title: "Limit access to system components", 
      category: "Access Control", 
      family: "Restrict Access",
      priority: "Critical",
      status: "Active",
      description: "Limit access to system components and cardholder data to only those individuals whose job requires such access",
      implementation: "Role-based access control with principle of least privilege",
      requirements: ["7.1.2", "7.1.3", "7.1.4"],
      relatedRequirements: ["8.2.1", "8.2.3"]
    },
    { 
      id: "8.2.1", 
      title: "Assign unique ID to each user", 
      category: "Authentication", 
      family: "Strong Authentication",
      priority: "Critical",
      status: "Active",
      description: "Assign a unique ID to each person with access before allowing them to access system components or cardholder data",
      implementation: "Centralized identity management system with unique user identifiers",
      requirements: ["8.2.2", "8.2.3", "8.2.4"],
      relatedRequirements: ["7.1.1", "7.1.2"]
    },
    { 
      id: "1.1.1", 
      title: "Firewall configuration standards", 
      category: "Network Security", 
      family: "Network Controls",
      priority: "High",
      status: "Active",
      description: "Establish and implement firewall and router configuration standards",
      implementation: "Documented firewall rules with regular review and approval process",
      requirements: ["1.1.2", "1.1.3", "1.1.4"],
      relatedRequirements: ["1.2.1", "1.3.1"]
    }
  ],
  "HIPAA": [
    { 
      id: "164.312(a)(1)", 
      title: "Access Control", 
      category: "Administrative Safeguards", 
      family: "Security",
      priority: "Critical",
      status: "Active",
      description: "Assign a unique name and/or number for identifying and tracking user identity",
      implementation: "Unique user identification system with audit trails",
      requirements: ["164.312(a)(2)(i)", "164.312(a)(2)(ii)"],
      relatedRequirements: ["164.308(a)(3)", "164.308(a)(4)"]
    },
    { 
      id: "164.308(a)(1)", 
      title: "Security Officer", 
      category: "Administrative Safeguards", 
      family: "Security",
      priority: "High",
      status: "Active",
      description: "Assign security responsibilities to an individual with appropriate access and authority",
      implementation: "Designated HIPAA Security Officer with defined responsibilities",
      requirements: ["164.308(a)(2)", "164.308(a)(3)"],
      relatedRequirements: ["164.312(a)(1)", "164.314(a)(1)"]
    }
  ],
  "SOX": [
    { 
      id: "CC6.1", 
      title: "Logical and Physical Access Controls", 
      category: "Control Activities", 
      family: "Common Criteria",
      priority: "High",
      status: "Active",
      description: "The entity implements logical and physical access controls to protect against threats from sources outside its system boundaries",
      implementation: "Comprehensive access control framework with regular reviews",
      requirements: ["CC6.2", "CC6.3", "CC6.7"],
      relatedRequirements: ["CC6.8", "CC7.1"]
    },
    { 
      id: "CC7.1", 
      title: "System Boundaries and Data Classification", 
      category: "Control Activities", 
      family: "Common Criteria",
      priority: "Medium",
      status: "Active",
      description: "The entity identifies and maintains the boundaries of its systems and data classification procedures",
      implementation: "Data classification policy with system boundary documentation",
      requirements: ["CC7.2", "CC7.3"],
      relatedRequirements: ["CC6.1", "CC6.6"]
    }
  ]
};

export const mockRelationships: ControlRelationship[] = [
  { 
    source: "NIST AC-1", 
    target: "PCI 7.1.1", 
    relationship: "Direct Mapping", 
    confidence: 95,
    description: "Both require formal access control policies and procedures",
    mappingType: "Policy Alignment",
    gapAnalysis: "PCI requires more specific cardholder data protection measures"
  },
  { 
    source: "NIST AC-2", 
    target: "PCI 8.2.1", 
    relationship: "Direct Mapping", 
    confidence: 92,
    description: "Both mandate unique user identification and account management",
    mappingType: "Control Equivalence",
    gapAnalysis: "NIST provides more comprehensive account lifecycle management"
  },
  { 
    source: "NIST IA-2", 
    target: "PCI 8.2.1", 
    relationship: "Partial Overlap", 
    confidence: 78,
    description: "Authentication requirements overlap but NIST is more comprehensive",
    mappingType: "Functional Overlap",
    gapAnalysis: "PCI focuses on access to cardholder data, NIST covers all organizational users"
  },
  { 
    source: "NIST AC-1", 
    target: "HIPAA 164.308(a)(1)", 
    relationship: "Indirect Support", 
    confidence: 65,
    description: "Both require designated security responsibilities and documentation",
    mappingType: "Governance Alignment",
    gapAnalysis: "HIPAA is more specific to healthcare data protection"
  },
  { 
    source: "NIST SC-7", 
    target: "PCI 1.1.1", 
    relationship: "Direct Mapping", 
    confidence: 88,
    description: "Both require network boundary protection and firewall controls",
    mappingType: "Technical Control Equivalence",
    gapAnalysis: "PCI provides more specific requirements for cardholder data environments"
  },
  { 
    source: "PCI 7.1.1", 
    target: "HIPAA 164.312(a)(1)", 
    relationship: "Direct Mapping", 
    confidence: 85,
    description: "Both require role-based access control with unique user identification",
    mappingType: "Access Control Alignment",
    gapAnalysis: "HIPAA includes additional audit trail requirements"
  },
  { 
    source: "NIST AC-2", 
    target: "SOX CC6.1", 
    relationship: "Partial Overlap", 
    confidence: 72,
    description: "Account management supports logical access control objectives",
    mappingType: "Supporting Control",
    gapAnalysis: "SOX focuses more on financial reporting control objectives"
  }
];
