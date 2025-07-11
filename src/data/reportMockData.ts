
export interface Control {
  id: string;
  title: string;
  description: string;
  category: string;
  family: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Draft' | 'Deprecated';
  implementation: string;
  mappings?: string[];
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

export const mockControlsData: Record<string, Control[]> = {
  "CIS Controls v8": [
    {
      id: "CIS-1.1",
      title: "Establish and Maintain Detailed Asset Inventory",
      description: "Establish and maintain an accurate, detailed, and up-to-date inventory of all enterprise assets with the potential to store or process data.",
      category: "Inventory and Control of Enterprise Assets",
      family: "IG1",
      priority: "Critical",
      status: "Active",
      implementation: "Automated asset discovery tools with manual verification processes.",
      mappings: ["NIST AC-2", "PCI-DSS 2.4", "ISO 27001 A.8.1"]
    },
    {
      id: "CIS-5.1",
      title: "Establish and Maintain an Inventory of Accounts",
      description: "Establish and maintain an inventory of all accounts managed in the enterprise.",
      category: "Account Management",
      family: "IG1",
      priority: "Critical",
      status: "Active",
      implementation: "Identity governance tools with automated account lifecycle management.",
      mappings: ["NIST AC-2", "PCI-DSS 8.1", "HIPAA 164.312(a)(1)"]
    },
    {
      id: "CIS-7.1",
      title: "Establish and Maintain a Vulnerability Management Process",
      description: "Establish and maintain a vulnerability management process to identify and address vulnerabilities.",
      category: "Continuous Vulnerability Management",
      family: "IG1",
      priority: "Critical",
      status: "Active",
      implementation: "Integrated vulnerability scanning with risk-based remediation.",
      mappings: ["NIST RA-5", "PCI-DSS 11.2", "ISO 27001 A.12.6"]
    }
  ],
  "NIST 800-53": [
    {
      id: "AC-1",
      title: "Policy and Procedures",
      description: "Develop, document, and disseminate access control policy and procedures.",
      category: "Access Control",
      family: "Policy",
      priority: "High",
      status: "Active",
      implementation: "Establish formal access control policies and review annually.",
      mappings: ["PCI-DSS 7.1", "ISO 27001 A.9.1"]
    },
    {
      id: "AC-2",
      title: "Account Management",
      description: "Manage information system accounts including establishment, activation, modification, review, and removal.",
      category: "Access Control",
      family: "Account Management",
      priority: "Critical",
      status: "Active",
      implementation: "Implement automated account management processes with regular reviews.",
      mappings: ["PCI-DSS 8.1", "SOX ITGC-01"]
    },
    {
      id: "SC-1",
      title: "System and Communications Protection Policy",
      description: "Develop and maintain system and communications protection policies.",
      category: "System Protection",
      family: "Policy",
      priority: "High",
      status: "Active",
      implementation: "Document security architecture and review quarterly.",
      mappings: ["ISO 27001 A.13.1"]
    }
  ],
  "PCI-DSS": [
    {
      id: "REQ-1",
      title: "Install and maintain network security controls",
      description: "Network security controls (NSCs) are in place to protect the cardholder data environment.",
      category: "Network Security",
      family: "Firewalls",
      priority: "Critical",
      status: "Active",
      implementation: "Deploy firewalls and configure according to PCI standards.",
      mappings: ["NIST SC-7", "ISO 27001 A.13.1"]
    },
    {
      id: "REQ-7",
      title: "Restrict access to system components and cardholder data",
      description: "Access to system components and cardholder data is restricted based on business need-to-know.",
      category: "Access Control",
      family: "Authorization",
      priority: "Critical",
      status: "Active",
      implementation: "Implement role-based access controls with least privilege principle.",
      mappings: ["NIST AC-2", "SOX ITGC-02"]
    }
  ],
  "HIPAA Security": [
    {
      id: "164.308(a)(1)",
      title: "Security Management Process",
      description: "Implement policies and procedures to prevent, detect, contain, and correct security violations.",
      category: "Administrative",
      family: "Security Management",
      priority: "Critical",
      status: "Active",
      implementation: "Establish comprehensive security management program.",
      mappings: ["NIST AC-1", "ISO 27001 A.5.1"]
    },
    {
      id: "164.312(a)(1)",
      title: "Access Control",
      description: "Implement technical policies and procedures for electronic information systems.",
      category: "Technical",
      family: "Access Control",
      priority: "High",
      status: "Active",
      implementation: "Deploy technical access controls including unique user identification.",
      mappings: ["NIST AC-2", "PCI-DSS 7.1"]
    }
  ],
  "SOX ITGC": [
    {
      id: "ITGC-01",
      title: "User Access Management",
      description: "Controls over user access provisioning, modification, and termination.",
      category: "Access Control",
      family: "User Management",
      priority: "Critical",
      status: "Active",
      implementation: "Implement formal user access management processes.",
      mappings: ["NIST AC-2", "PCI-DSS 8.1"]
    },
    {
      id: "ITGC-02",
      title: "Change Management",
      description: "Controls over changes to applications and infrastructure.",
      category: "Change Management",
      family: "Configuration",
      priority: "High",
      status: "Active",
      implementation: "Establish formal change management procedures.",
      mappings: ["NIST CM-3", "ISO 27001 A.12.1"]
    }
  ],
  "Adobe CCF": [
    {
      id: "CCF-AC-01",
      title: "Identity and Access Management",
      description: "Comprehensive identity and access management controls.",
      category: "Access Control",
      family: "Identity Management",
      priority: "Critical",
      status: "Active",
      implementation: "Deploy enterprise identity management solution.",
      mappings: ["NIST AC-2", "PCI-DSS 8.1"]
    },
    {
      id: "CCF-SC-01",
      title: "Security Monitoring",
      description: "Continuous security monitoring and incident response capabilities.",
      category: "Security Operations",
      family: "Monitoring",
      priority: "High",
      status: "Active",
      implementation: "Implement SIEM and 24/7 monitoring.",
      mappings: ["NIST SI-4", "ISO 27001 A.12.6"]
    }
  ]
};

export const mockRelationships: ControlRelationship[] = [
  {
    source: "CIS-5.1",
    target: "NIST AC-2",
    relationship: "Direct Mapping",
    confidence: 98,
    description: "Both controls establish account inventory and management processes with similar implementation approaches.",
    mappingType: "Equivalent",
    gapAnalysis: "CIS focuses on inventory while NIST emphasizes lifecycle management. Complementary controls."
  },
  {
    source: "CIS-5.1",
    target: "PCI-DSS 8.1",
    relationship: "Direct Mapping",
    confidence: 92,
    description: "Account management requirements align between CIS and PCI-DSS with focus on user access controls.",
    mappingType: "Equivalent",
    gapAnalysis: "PCI adds payment-specific requirements not covered by CIS baseline."
  },
  {
    source: "CIS-1.1",
    target: "NIST AC-2",
    relationship: "Partial Overlap",
    confidence: 75,
    description: "Asset inventory supports account management but addresses different aspects of enterprise security.",
    mappingType: "Supporting",
    gapAnalysis: "Asset inventory is foundational to account management but doesn't fully address user lifecycle."
  },
  {
    source: "CIS-7.1",
    target: "NIST RA-5",
    relationship: "Direct Mapping",
    confidence: 96,
    description: "Both controls establish comprehensive vulnerability management processes with similar objectives.",
    mappingType: "Equivalent",
    gapAnalysis: "NIST provides more detailed procedural guidance while CIS offers practical implementation steps."
  },
  {
    source: "NIST AC-2",
    target: "PCI-DSS 8.1",
    relationship: "Direct Mapping",
    confidence: 95,
    description: "Both controls address user account management with similar requirements for provisioning, modification, and termination.",
    mappingType: "Equivalent",
    gapAnalysis: "No significant gaps identified. Both frameworks require formal account management processes."
  },
  {
    source: "NIST AC-1",
    target: "HIPAA 164.308(a)(1)",
    relationship: "Partial Overlap",
    confidence: 80,
    description: "Both address policy and procedure requirements but HIPAA has specific healthcare focus.",
    mappingType: "Supplemental",
    gapAnalysis: "HIPAA requires additional healthcare-specific considerations not covered by NIST."
  },
  {
    source: "PCI-DSS REQ-7",
    target: "SOX ITGC-01",
    relationship: "Indirect Support",
    confidence: 70,
    description: "Both address access control but with different compliance objectives.",
    mappingType: "Supporting",
    gapAnalysis: "SOX focuses on financial controls while PCI focuses on payment card security."
  },
  {
    source: "NIST SC-7",
    target: "PCI-DSS REQ-1",
    relationship: "Direct Mapping",
    confidence: 90,
    description: "Both controls address boundary protection and network security controls.",
    mappingType: "Equivalent",
    gapAnalysis: "PCI has more specific requirements for cardholder data environment protection."
  }
];
