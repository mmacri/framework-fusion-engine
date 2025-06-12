
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
      relatedControls: ["AU-3", "AU-6", "AU-12"]
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
    },
    { 
      id: "10.2.1", 
      title: "Audit trails for access to cardholder data", 
      category: "Logging and Monitoring", 
      family: "Audit Controls",
      priority: "High",
      status: "Active",
      description: "Implement audit trails to link all access to system components to each individual user",
      implementation: "Comprehensive logging system with user attribution",
      requirements: ["10.2.2", "10.2.3"],
      relatedRequirements: ["10.3.1", "10.5.1"]
    }
  ],
  "HIPAA": [
    { 
      id: "164.312(a)(1)", 
      title: "Access Control", 
      category: "Technical Safeguards", 
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
      family: "Security Management",
      priority: "High",
      status: "Active",
      description: "Assign security responsibilities to an individual with appropriate access and authority",
      implementation: "Designated HIPAA Security Officer with defined responsibilities",
      requirements: ["164.308(a)(2)", "164.308(a)(3)"],
      relatedRequirements: ["164.312(a)(1)", "164.314(a)(1)"]
    },
    { 
      id: "164.308(a)(3)", 
      title: "Workforce Training", 
      category: "Administrative Safeguards", 
      family: "Workforce Security",
      priority: "High",
      status: "Active",
      description: "Implement procedures to authorize access to electronic protected health information",
      implementation: "Comprehensive workforce training program with regular updates",
      requirements: ["164.308(a)(3)(i)", "164.308(a)(3)(ii)"],
      relatedRequirements: ["164.308(a)(4)", "164.308(a)(5)"]
    },
    { 
      id: "164.308(a)(4)", 
      title: "Information Access Management", 
      category: "Administrative Safeguards", 
      family: "Access Management",
      priority: "Critical",
      status: "Active",
      description: "Implement procedures for authorizing access to electronic protected health information",
      implementation: "Role-based access control with regular access reviews",
      requirements: ["164.308(a)(4)(i)", "164.308(a)(4)(ii)"],
      relatedRequirements: ["164.312(a)(1)", "164.312(d)"]
    },
    { 
      id: "164.312(b)", 
      title: "Audit Controls", 
      category: "Technical Safeguards", 
      family: "Audit and Monitoring",
      priority: "High",
      status: "Active",
      description: "Implement hardware, software, and procedural mechanisms that record and examine access",
      implementation: "Comprehensive audit system for all ePHI access and modifications",
      requirements: ["164.312(b)(1)", "164.312(b)(2)"],
      relatedRequirements: ["164.308(a)(1)", "164.312(a)(1)"]
    },
    { 
      id: "164.312(c)(1)", 
      title: "Integrity", 
      category: "Technical Safeguards", 
      family: "Data Integrity",
      priority: "Medium",
      status: "Active",
      description: "Protect electronic protected health information from improper alteration or destruction",
      implementation: "Data integrity controls including checksums and version control",
      requirements: ["164.312(c)(2)"],
      relatedRequirements: ["164.312(e)(1)", "164.312(e)(2)"]
    },
    { 
      id: "164.312(e)(1)", 
      title: "Transmission Security", 
      category: "Technical Safeguards", 
      family: "Data Protection",
      priority: "Critical",
      status: "Active",
      description: "Implement technical safeguards to guard against unauthorized access to ePHI during transmission",
      implementation: "End-to-end encryption for all ePHI transmissions",
      requirements: ["164.312(e)(2)"],
      relatedRequirements: ["164.312(a)(2)", "164.312(c)(1)"]
    },
    { 
      id: "164.310(a)(1)", 
      title: "Facility Access Controls", 
      category: "Physical Safeguards", 
      family: "Physical Security",
      priority: "Medium",
      status: "Active",
      description: "Implement policies and procedures to limit physical access to electronic information systems",
      implementation: "Physical access controls including badges, locks, and surveillance",
      requirements: ["164.310(a)(2)"],
      relatedRequirements: ["164.310(b)", "164.310(c)"]
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
    },
    { 
      id: "CC5.1", 
      title: "Control Environment", 
      category: "Control Environment", 
      family: "COSO Framework",
      priority: "High",
      status: "Active",
      description: "The entity establishes structures, reporting lines, and appropriate authorities and responsibilities",
      implementation: "Documented organizational structure with clear roles and responsibilities",
      requirements: ["CC5.2", "CC5.3"],
      relatedRequirements: ["CC1.1", "CC2.1"]
    },
    { 
      id: "CC8.1", 
      title: "Change Management", 
      category: "Control Activities", 
      family: "Change Control",
      priority: "High",
      status: "Active",
      description: "The entity implements controls to ensure that changes are authorized, tested, and implemented appropriately",
      implementation: "Formal change management process with approval workflows",
      requirements: ["CC8.2", "CC8.3"],
      relatedRequirements: ["CC6.1", "CC7.1"]
    },
    { 
      id: "CC9.1", 
      title: "Risk Assessment Process", 
      category: "Risk Assessment", 
      family: "Risk Management",
      priority: "Medium",
      status: "Active",
      description: "The entity identifies, analyzes, and responds to risks that could affect the achievement of its objectives",
      implementation: "Comprehensive risk assessment methodology with regular updates",
      requirements: ["CC9.2", "CC9.3"],
      relatedRequirements: ["CC5.1", "CC8.1"]
    },
    { 
      id: "CC10.1", 
      title: "Monitoring Activities", 
      category: "Monitoring", 
      family: "Oversight",
      priority: "Medium",
      status: "Active",
      description: "The entity implements monitoring activities to evaluate the design and operating effectiveness of controls",
      implementation: "Regular monitoring and testing of internal controls",
      requirements: ["CC10.2", "CC10.3"],
      relatedRequirements: ["CC5.1", "CC9.1"]
    },
    { 
      id: "CC11.1", 
      title: "Information and Communication", 
      category: "Information & Communication", 
      family: "Information Systems",
      priority: "Medium",
      status: "Active",
      description: "The entity obtains or generates and uses relevant, quality information to support the functioning of internal control",
      implementation: "Comprehensive information management and communication framework",
      requirements: ["CC11.2", "CC11.3"],
      relatedRequirements: ["CC5.1", "CC10.1"]
    }
  ]
};

export const mockRelationships: ControlRelationship[] = [
  // NIST to PCI Relationships
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
    source: "NIST SC-7", 
    target: "PCI 1.1.1", 
    relationship: "Direct Mapping", 
    confidence: 88,
    description: "Both require network boundary protection and firewall controls",
    mappingType: "Technical Control Equivalence",
    gapAnalysis: "PCI provides more specific requirements for cardholder data environments"
  },
  { 
    source: "NIST AU-2", 
    target: "PCI 10.2.1", 
    relationship: "Direct Mapping", 
    confidence: 85,
    description: "Both require comprehensive audit logging and event tracking",
    mappingType: "Audit Control Alignment",
    gapAnalysis: "PCI focuses specifically on cardholder data access while NIST covers all system events"
  },
  
  // NIST to HIPAA Relationships
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
    source: "NIST AC-2", 
    target: "HIPAA 164.312(a)(1)", 
    relationship: "Direct Mapping", 
    confidence: 88,
    description: "Both require unique user identification and access control",
    mappingType: "Access Control Equivalence",
    gapAnalysis: "HIPAA includes specific ePHI protection requirements"
  },
  { 
    source: "NIST IA-2", 
    target: "HIPAA 164.312(a)(1)", 
    relationship: "Partial Overlap", 
    confidence: 75,
    description: "Authentication requirements support ePHI access controls",
    mappingType: "Technical Support",
    gapAnalysis: "HIPAA requires specific authentication for ePHI access"
  },
  { 
    source: "NIST AU-2", 
    target: "HIPAA 164.312(b)", 
    relationship: "Direct Mapping", 
    confidence: 90,
    description: "Both require comprehensive audit controls and logging",
    mappingType: "Audit Equivalence",
    gapAnalysis: "HIPAA focuses specifically on ePHI access while NIST covers all system activities"
  },
  { 
    source: "NIST AC-2", 
    target: "HIPAA 164.308(a)(4)", 
    relationship: "Direct Mapping", 
    confidence: 87,
    description: "Both require information access management procedures",
    mappingType: "Access Management Alignment",
    gapAnalysis: "HIPAA is specific to healthcare workforce and ePHI access"
  },
  
  // NIST to SOX Relationships
  { 
    source: "NIST AC-2", 
    target: "SOX CC6.1", 
    relationship: "Partial Overlap", 
    confidence: 72,
    description: "Account management supports logical access control objectives",
    mappingType: "Supporting Control",
    gapAnalysis: "SOX focuses more on financial reporting control objectives"
  },
  { 
    source: "NIST AC-1", 
    target: "SOX CC5.1", 
    relationship: "Indirect Support", 
    confidence: 68,
    description: "Access control policies support overall control environment",
    mappingType: "Environmental Support",
    gapAnalysis: "SOX requires broader organizational governance beyond access controls"
  },
  { 
    source: "NIST AU-2", 
    target: "SOX CC10.1", 
    relationship: "Partial Overlap", 
    confidence: 70,
    description: "Audit logging supports monitoring activities for financial controls",
    mappingType: "Monitoring Support",
    gapAnalysis: "SOX monitoring focuses on financial reporting accuracy"
  },
  
  // PCI to HIPAA Relationships
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
    source: "PCI 8.2.1", 
    target: "HIPAA 164.312(a)(1)", 
    relationship: "Direct Mapping", 
    confidence: 83,
    description: "Both require unique user identification for access control",
    mappingType: "Identity Management Equivalence",
    gapAnalysis: "HIPAA includes specific ePHI access requirements"
  },
  { 
    source: "PCI 10.2.1", 
    target: "HIPAA 164.312(b)", 
    relationship: "Direct Mapping", 
    confidence: 88,
    description: "Both require comprehensive audit trails for data access",
    mappingType: "Audit Control Equivalence",
    gapAnalysis: "PCI focuses on cardholder data while HIPAA focuses on ePHI"
  },
  { 
    source: "PCI 7.1.1", 
    target: "HIPAA 164.308(a)(4)", 
    relationship: "Partial Overlap", 
    confidence: 78,
    description: "Access limitation principles apply to both cardholder data and ePHI",
    mappingType: "Access Limitation Alignment",
    gapAnalysis: "HIPAA requires specific workforce authorization procedures"
  },
  
  // PCI to SOX Relationships
  { 
    source: "PCI 7.1.1", 
    target: "SOX CC6.1", 
    relationship: "Direct Mapping", 
    confidence: 82,
    description: "Both implement logical access controls to protect sensitive data",
    mappingType: "Access Control Equivalence",
    gapAnalysis: "SOX focuses on financial data while PCI focuses on payment card data"
  },
  { 
    source: "PCI 1.1.1", 
    target: "SOX CC6.1", 
    relationship: "Partial Overlap", 
    confidence: 75,
    description: "Firewall controls support logical access control objectives",
    mappingType: "Technical Control Support",
    gapAnalysis: "SOX requires broader logical access controls beyond network security"
  },
  { 
    source: "PCI 10.2.1", 
    target: "SOX CC10.1", 
    relationship: "Partial Overlap", 
    confidence: 73,
    description: "Audit trails support monitoring activities for compliance",
    mappingType: "Monitoring Support",
    gapAnalysis: "SOX monitoring focuses specifically on financial reporting controls"
  },
  
  // HIPAA to SOX Relationships
  { 
    source: "HIPAA 164.312(a)(1)", 
    target: "SOX CC6.1", 
    relationship: "Partial Overlap", 
    confidence: 70,
    description: "Access controls protect sensitive data in both healthcare and financial contexts",
    mappingType: "Data Protection Alignment",
    gapAnalysis: "Different data types and regulatory requirements"
  },
  { 
    source: "HIPAA 164.308(a)(1)", 
    target: "SOX CC5.1", 
    relationship: "Direct Mapping", 
    confidence: 85,
    description: "Both require designated security officer and control environment leadership",
    mappingType: "Governance Equivalence",
    gapAnalysis: "SOX has broader organizational governance requirements"
  },
  { 
    source: "HIPAA 164.312(b)", 
    target: "SOX CC10.1", 
    relationship: "Partial Overlap", 
    confidence: 72,
    description: "Audit controls support monitoring activities in both frameworks",
    mappingType: "Monitoring Alignment",
    gapAnalysis: "HIPAA focuses on ePHI access while SOX focuses on financial controls"
  },
  { 
    source: "HIPAA 164.308(a)(4)", 
    target: "SOX CC6.1", 
    relationship: "Partial Overlap", 
    confidence: 68,
    description: "Information access management supports logical access control objectives",
    mappingType: "Access Management Support",
    gapAnalysis: "Different focus areas - healthcare vs financial data"
  },
  
  // Additional SOX Internal Relationships
  { 
    source: "SOX CC5.1", 
    target: "SOX CC8.1", 
    relationship: "Direct Mapping", 
    confidence: 90,
    description: "Control environment establishes foundation for change management",
    mappingType: "Environmental Foundation",
    gapAnalysis: "No gaps - complementary controls within same framework"
  },
  { 
    source: "SOX CC5.1", 
    target: "SOX CC9.1", 
    relationship: "Direct Mapping", 
    confidence: 88,
    description: "Control environment enables effective risk assessment processes",
    mappingType: "Environmental Support",
    gapAnalysis: "No gaps - integrated approach within SOX framework"
  },
  { 
    source: "SOX CC9.1", 
    target: "SOX CC10.1", 
    relationship: "Direct Mapping", 
    confidence: 92,
    description: "Risk assessment informs monitoring activities and control testing",
    mappingType: "Process Integration",
    gapAnalysis: "No gaps - sequential process controls within SOX"
  }
];
