
import { ControlRelationship } from '../../types/report';

export const controlRelationships: ControlRelationship[] = [
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
