import { Control } from '../../types/report';

export const cisControls: Control[] = [
  // CIS Control 1: Inventory and Control of Enterprise Assets
  { 
    id: "CIS-1.1", 
    title: "Establish and Maintain Detailed Asset Inventory", 
    category: "Inventory and Control of Enterprise Assets", 
    family: "IG1",
    priority: "Critical",
    status: "Active",
    description: "Establish and maintain an accurate, detailed, and up-to-date inventory of all enterprise assets with the potential to store or process data",
    implementation: "Automated asset discovery tools with manual verification processes",
    controlEnhancements: ["Asset tagging", "Real-time discovery", "Integration with CMDB"],
    relatedControls: ["CIS-1.2", "CIS-1.3", "CIS-2.1"],
    masterFrameworkMapping: {
      masterId: "ML-020",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to System Inventory Master Framework record"
    }
  },
  { 
    id: "CIS-1.2", 
    title: "Address Unauthorized Assets", 
    category: "Inventory and Control of Enterprise Assets", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Ensure that only authorized assets are connected to the enterprise network",
    implementation: "Network access control (NAC) solutions with automated quarantine",
    controlEnhancements: ["Device certification", "Network segmentation", "Automated remediation"],
    relatedControls: ["CIS-1.1", "CIS-4.1", "CIS-12.1"],
    masterFrameworkMapping: {
      masterId: "ML-012",
      correlationType: "partial",
      correlationScore: 0.85,
      notes: "Relates to Network Traffic Analysis for unauthorized device detection"
    }
  },
  { 
    id: "CIS-1.3", 
    title: "Utilize an Active Discovery Tool", 
    category: "Inventory and Control of Enterprise Assets", 
    family: "IG2",
    priority: "Medium",
    status: "Active",
    description: "Utilize an active discovery tool to identify assets connected to the enterprise network",
    implementation: "Network scanning tools with scheduled discovery",
    controlEnhancements: ["Credential-based scanning", "Agent-based discovery", "API integration"],
    relatedControls: ["CIS-1.1", "CIS-1.2"],
    masterFrameworkMapping: {
      masterId: "ML-020",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Supports System Inventory through active discovery"
    }
  },

  // CIS Control 2: Inventory and Control of Software Assets
  { 
    id: "CIS-2.1", 
    title: "Establish and Maintain a Software Inventory", 
    category: "Inventory and Control of Software Assets", 
    family: "IG1",
    priority: "Critical",
    status: "Active",
    description: "Establish and maintain a detailed inventory of all licensed software installed on enterprise assets",
    implementation: "Software asset management tools with license compliance tracking",
    controlEnhancements: ["License optimization", "Usage monitoring", "Compliance reporting"],
    relatedControls: ["CIS-2.2", "CIS-2.3", "CIS-16.1"],
    masterFrameworkMapping: {
      masterId: "ML-020",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Software inventory component of System Inventory"
    }
  },
  { 
    id: "CIS-2.2", 
    title: "Ensure Authorized Software is Currently Supported", 
    category: "Inventory and Control of Software Assets", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Ensure that only currently supported software is designated as authorized",
    implementation: "Lifecycle management with end-of-life tracking",
    controlEnhancements: ["Vendor support validation", "Migration planning", "Risk assessment"],
    relatedControls: ["CIS-2.1", "CIS-7.1"],
    masterFrameworkMapping: {
      masterId: "ML-014",
      correlationType: "partial",
      correlationScore: 0.75,
      notes: "Relates to Security Patch Status for software lifecycle management"
    }
  },
  { 
    id: "CIS-2.3", 
    title: "Address Unauthorized Software", 
    category: "Inventory and Control of Software Assets", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Ensure that unauthorized software is either removed from use or approved for use",
    implementation: "Application control with whitelist enforcement",
    controlEnhancements: ["Automated blocking", "Exception management", "Risk-based approval"],
    relatedControls: ["CIS-2.1", "CIS-2.2"],
    masterFrameworkMapping: {
      masterId: "ML-019",
      correlationType: "exact",
      correlationScore: 0.85,
      notes: "Maps to Unauthorized Service Alert for software control"
    }
  },

  // CIS Control 3: Data Protection
  { 
    id: "CIS-3.1", 
    title: "Establish and Maintain a Data Management Process", 
    category: "Data Protection", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and maintain a data management process that addresses data sensitivity, data retention requirements, and data disposal requirements",
    implementation: "Data classification policies with automated data lifecycle management",
    controlEnhancements: ["Data loss prevention", "Encryption at rest", "Retention policies"],
    relatedControls: ["CIS-3.2", "CIS-3.3", "CIS-13.1"]
  },
  { 
    id: "CIS-3.2", 
    title: "Establish and Maintain a Data Inventory", 
    category: "Data Protection", 
    family: "IG2",
    priority: "Medium",
    status: "Active",
    description: "Establish and maintain a data inventory of sensitive data repositories",
    implementation: "Data discovery tools with classification tagging",
    controlEnhancements: ["Automated discovery", "Sensitivity labeling", "Access tracking"],
    relatedControls: ["CIS-3.1", "CIS-3.3"]
  },

  // CIS Control 4: Secure Configuration of Enterprise Assets and Software
  { 
    id: "CIS-4.1", 
    title: "Establish and Maintain a Secure Configuration Process", 
    category: "Secure Configuration of Enterprise Assets and Software", 
    family: "IG1",
    priority: "Critical",
    status: "Active",
    description: "Establish and maintain a secure configuration process for enterprise assets and software",
    implementation: "Configuration baselines with automated compliance scanning",
    controlEnhancements: ["Hardening standards", "Configuration drift detection", "Remediation workflows"],
    relatedControls: ["CIS-4.2", "CIS-4.7", "CIS-18.3"],
    masterFrameworkMapping: {
      masterId: "ML-008",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Configuration Change Monitor"
    }
  },
  { 
    id: "CIS-4.2", 
    title: "Establish and Maintain a Secure Configuration Process for Network Infrastructure", 
    category: "Secure Configuration of Enterprise Assets and Software", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and maintain a secure configuration process for network infrastructure",
    implementation: "Network device hardening with configuration templates",
    controlEnhancements: ["Template-based deployment", "Change tracking", "Compliance validation"],
    relatedControls: ["CIS-4.1", "CIS-12.1"],
    masterFrameworkMapping: {
      masterId: "ML-013",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Maps to Firewall Rule Changes for network configuration control"
    }
  },

  // CIS Control 5: Account Management
  { 
    id: "CIS-5.1", 
    title: "Establish and Maintain an Inventory of Accounts", 
    category: "Account Management", 
    family: "IG1",
    priority: "Critical",
    status: "Active",
    description: "Establish and maintain an inventory of all accounts managed in the enterprise",
    implementation: "Identity governance tools with automated account lifecycle management",
    controlEnhancements: ["Privileged account management", "Account certification", "Role-based access"],
    relatedControls: ["CIS-5.2", "CIS-5.3", "CIS-6.1"],
    masterFrameworkMapping: {
      masterId: "ML-001",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct correlation to AD Access Failure monitoring"
    }
  },
  { 
    id: "CIS-5.2", 
    title: "Use Unique Passwords", 
    category: "Account Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Use unique passwords for all enterprise assets",
    implementation: "Password policy enforcement with complexity requirements",
    controlEnhancements: ["Password managers", "Complexity validation", "History enforcement"],
    relatedControls: ["CIS-5.1", "CIS-5.3"]
  },
  { 
    id: "CIS-5.3", 
    title: "Disable Dormant Accounts", 
    category: "Account Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Delete or disable any dormant accounts after a defined period of inactivity",
    implementation: "Automated account review with dormancy detection",
    controlEnhancements: ["Lifecycle automation", "Exception handling", "Review workflows"],
    relatedControls: ["CIS-5.1", "CIS-5.2"],
    masterFrameworkMapping: {
      masterId: "ML-003",
      correlationType: "exact",
      correlationScore: 0.85,
      notes: "Relates to AD Account Change Alert for account lifecycle"
    }
  },

  // CIS Control 6: Access Control Management
  { 
    id: "CIS-6.1", 
    title: "Establish an Access Granting Process", 
    category: "Access Control Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and follow a process for granting access to enterprise assets",
    implementation: "Workflow-based access request and approval system",
    controlEnhancements: ["Risk-based access", "Just-in-time access", "Automated provisioning"],
    relatedControls: ["CIS-6.2", "CIS-6.8", "CIS-5.1"],
    masterFrameworkMapping: {
      masterId: "ML-002",
      correlationType: "partial",
      correlationScore: 0.80,
      notes: "Relates to AD Group Change Alert for access management"
    }
  },
  { 
    id: "CIS-6.2", 
    title: "Establish an Access Revoking Process", 
    category: "Access Control Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and follow a process for revoking access to enterprise assets",
    implementation: "Automated deprovisioning with approval workflows",
    controlEnhancements: ["Emergency revocation", "Bulk operations", "Audit trails"],
    relatedControls: ["CIS-6.1", "CIS-5.3"]
  },

  // CIS Control 7: Continuous Vulnerability Management
  { 
    id: "CIS-7.1", 
    title: "Establish and Maintain a Vulnerability Management Process", 
    category: "Continuous Vulnerability Management", 
    family: "IG1",
    priority: "Critical",
    status: "Active",
    description: "Establish and maintain a vulnerability management process to identify and address vulnerabilities",
    implementation: "Integrated vulnerability scanning with risk-based remediation",
    controlEnhancements: ["Threat intelligence integration", "Automated patching", "Risk scoring"],
    relatedControls: ["CIS-7.2", "CIS-7.3", "CIS-18.5"],
    masterFrameworkMapping: {
      masterId: "ML-014",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Security Patch Status"
    }
  },
  { 
    id: "CIS-7.2", 
    title: "Establish and Maintain a Remediation Process", 
    category: "Continuous Vulnerability Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and maintain a remediation process that addresses discovered vulnerabilities",
    implementation: "Prioritized remediation with SLA tracking",
    controlEnhancements: ["Risk-based prioritization", "Compensating controls", "Tracking dashboards"],
    relatedControls: ["CIS-7.1", "CIS-7.3"],
    masterFrameworkMapping: {
      masterId: "ML-015",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Maps to Critical Patch Alert for urgent remediation"
    }
  },

  // CIS Control 8: Audit Log Management
  { 
    id: "CIS-8.1", 
    title: "Establish and Maintain an Audit Log Management Process", 
    category: "Audit Log Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and maintain an audit log management process that defines the enterprise's logging requirements",
    implementation: "Centralized log management with SIEM integration",
    controlEnhancements: ["Real-time monitoring", "Log correlation", "Threat detection"],
    relatedControls: ["CIS-8.2", "CIS-8.11", "CIS-17.1"],
    masterFrameworkMapping: {
      masterId: "ML-006",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Windows Event Log Report"
    }
  },
  { 
    id: "CIS-8.2", 
    title: "Collect Audit Logs", 
    category: "Audit Log Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Collect audit logs from enterprise assets and software",
    implementation: "Automated log collection with secure transport",
    controlEnhancements: ["Encrypted transmission", "Log integrity", "Backup processes"],
    relatedControls: ["CIS-8.1", "CIS-8.3"],
    masterFrameworkMapping: {
      masterId: "ML-007",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Maps to Linux Audit Log Report"
    }
  },

  // CIS Control 9: Email and Web Browser Protections
  { 
    id: "CIS-9.1", 
    title: "Ensure Use of Only Fully Supported Browsers and Email Clients", 
    category: "Email and Web Browser Protections", 
    family: "IG1",
    priority: "Medium",
    status: "Active",
    description: "Ensure only fully supported browsers and email clients are allowed to execute in the enterprise",
    implementation: "Application control policies with automated enforcement",
    controlEnhancements: ["Browser hardening", "Email security gateways", "URL filtering"],
    relatedControls: ["CIS-9.2", "CIS-9.7", "CIS-2.1"]
  },
  { 
    id: "CIS-9.2", 
    title: "Use DNS Filtering Services", 
    category: "Email and Web Browser Protections", 
    family: "IG1",
    priority: "Medium",
    status: "Active",
    description: "Use DNS filtering services on all enterprise assets to block access to known malicious domains",
    implementation: "DNS-based security with real-time threat intelligence",
    controlEnhancements: ["Category blocking", "Reputation-based filtering", "Policy enforcement"],
    relatedControls: ["CIS-9.1", "CIS-9.3"]
  },

  // CIS Control 10: Malware Defenses
  { 
    id: "CIS-10.1", 
    title: "Deploy and Maintain Anti-Malware Software", 
    category: "Malware Defenses", 
    family: "IG1",
    priority: "Critical",
    status: "Active",
    description: "Deploy and maintain anti-malware software on all enterprise assets",
    implementation: "Enterprise endpoint protection with centralized management",
    controlEnhancements: ["Behavioral analysis", "Cloud-based scanning", "Sandboxing"],
    relatedControls: ["CIS-10.2", "CIS-10.7", "CIS-7.1"],
    masterFrameworkMapping: {
      masterId: "ML-010",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Antivirus Status Report"
    }
  },
  { 
    id: "CIS-10.2", 
    title: "Configure Automatic Anti-Malware Signature Updates", 
    category: "Malware Defenses", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Configure automatic anti-malware signature updates on all enterprise assets",
    implementation: "Automated signature distribution with validation",
    controlEnhancements: ["Update scheduling", "Bandwidth management", "Rollback capabilities"],
    relatedControls: ["CIS-10.1", "CIS-10.3"],
    masterFrameworkMapping: {
      masterId: "ML-011",
      correlationType: "exact",
      correlationScore: 0.90,
      notes: "Maps to Malware Detection Alert for real-time protection"
    }
  },

  // CIS Control 11: Data Recovery
  { 
    id: "CIS-11.1", 
    title: "Establish and Maintain a Data Recovery Process", 
    category: "Data Recovery", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and maintain a data recovery process for enterprise data and systems",
    implementation: "Comprehensive backup and disaster recovery procedures",
    controlEnhancements: ["Automated backups", "Recovery testing", "Offsite storage"],
    relatedControls: ["CIS-11.2", "CIS-11.3", "CIS-3.1"]
  },
  { 
    id: "CIS-11.2", 
    title: "Perform Automated Backups", 
    category: "Data Recovery", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Perform automated backups of in-scope enterprise assets",
    implementation: "Scheduled backup processes with verification",
    controlEnhancements: ["Incremental backups", "Compression", "Encryption"],
    relatedControls: ["CIS-11.1", "CIS-11.3"]
  },

  // CIS Control 12: Network Infrastructure Management
  { 
    id: "CIS-12.1", 
    title: "Ensure Network Infrastructure is Up-to-Date", 
    category: "Network Infrastructure Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Ensure network infrastructure is kept up-to-date with security patches and configurations",
    implementation: "Network device management with automated patching",
    controlEnhancements: ["Firmware management", "Configuration backup", "Change control"],
    relatedControls: ["CIS-12.2", "CIS-12.8", "CIS-4.1"],
    masterFrameworkMapping: {
      masterId: "ML-013",
      correlationType: "partial",
      correlationScore: 0.85,
      notes: "Relates to Firewall Rule Changes for network infrastructure management"
    }
  },
  { 
    id: "CIS-12.2", 
    title: "Establish and Maintain a Secure Network Architecture", 
    category: "Network Infrastructure Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and maintain a secure network architecture",
    implementation: "Network segmentation with micro-segmentation",
    controlEnhancements: ["Zero trust architecture", "VLAN segmentation", "Access control"],
    relatedControls: ["CIS-12.1", "CIS-12.3"]
  },

  // CIS Control 13: Network Monitoring and Defense
  { 
    id: "CIS-13.1", 
    title: "Centralize Security Event Alerting", 
    category: "Network Monitoring and Defense", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Centralize security event alerting across enterprise assets",
    implementation: "SIEM with centralized event correlation",
    controlEnhancements: ["Real-time alerting", "Event correlation", "Automated response"],
    relatedControls: ["CIS-13.2", "CIS-13.3", "CIS-17.1"],
    masterFrameworkMapping: {
      masterId: "ML-012",
      correlationType: "exact",
      correlationScore: 0.95,
      notes: "Direct mapping to Network Traffic Analysis"
    }
  },
  { 
    id: "CIS-13.2", 
    title: "Deploy a Host-Based Intrusion Detection System", 
    category: "Network Monitoring and Defense", 
    family: "IG2",
    priority: "Medium",
    status: "Active",
    description: "Deploy a Host-Based Intrusion Detection System (HIDS) on enterprise assets",
    implementation: "HIDS deployment with behavioral monitoring",
    controlEnhancements: ["Machine learning detection", "File integrity monitoring", "Process monitoring"],
    relatedControls: ["CIS-13.1", "CIS-13.3"]
  },

  // CIS Control 14: Security Awareness and Skills Training
  { 
    id: "CIS-14.1", 
    title: "Establish and Maintain a Security Awareness Program", 
    category: "Security Awareness and Skills Training", 
    family: "IG1",
    priority: "Medium",
    status: "Active",
    description: "Establish and maintain a security awareness program to influence behavior among the workforce",
    implementation: "Comprehensive security training with phishing simulations",
    controlEnhancements: ["Role-based training", "Metrics tracking", "Continuous education"],
    relatedControls: ["CIS-14.2", "CIS-14.9", "CIS-5.1"]
  },
  { 
    id: "CIS-14.2", 
    title: "Train Workforce Members to Recognize Social Engineering Attacks", 
    category: "Security Awareness and Skills Training", 
    family: "IG1",
    priority: "Medium",
    status: "Active",
    description: "Train workforce members to recognize social engineering attacks",
    implementation: "Phishing simulation and training programs",
    controlEnhancements: ["Simulated attacks", "Just-in-time training", "Reporting mechanisms"],
    relatedControls: ["CIS-14.1", "CIS-14.3"]
  },

  // CIS Control 15: Service Provider Management
  { 
    id: "CIS-15.1", 
    title: "Establish and Maintain an Inventory of Service Providers", 
    category: "Service Provider Management", 
    family: "IG1",
    priority: "Medium",
    status: "Active",
    description: "Establish and maintain an inventory of service providers",
    implementation: "Vendor management system with risk assessment",
    controlEnhancements: ["Risk scoring", "Contract management", "Performance monitoring"],
    relatedControls: ["CIS-15.2", "CIS-15.7", "CIS-3.1"]
  },
  { 
    id: "CIS-15.2", 
    title: "Establish and Maintain a Service Provider Management Process", 
    category: "Service Provider Management", 
    family: "IG1",
    priority: "Medium",
    status: "Active",
    description: "Establish and maintain a process to evaluate service providers",
    implementation: "Vendor risk assessment with continuous monitoring",
    controlEnhancements: ["Third-party assessments", "Contract requirements", "Performance monitoring"],
    relatedControls: ["CIS-15.1", "CIS-15.3"]
  },

  // CIS Control 16: Application Software Security
  { 
    id: "CIS-16.1", 
    title: "Establish and Maintain a Secure Application Development Process", 
    category: "Application Software Security", 
    family: "IG2",
    priority: "High",
    status: "Active",
    description: "Establish and maintain a secure application development process",
    implementation: "Secure SDLC with automated security testing",
    controlEnhancements: ["Static analysis", "Dynamic testing", "Dependency scanning"],
    relatedControls: ["CIS-16.2", "CIS-16.11", "CIS-2.1"]
  },
  { 
    id: "CIS-16.2", 
    title: "Establish and Maintain a Process to Accept and Address Software Vulnerabilities", 
    category: "Application Software Security", 
    family: "IG2",
    priority: "High",
    status: "Active",
    description: "Establish and maintain a process to accept and address software vulnerabilities",
    implementation: "Vulnerability disclosure program with remediation tracking",
    controlEnhancements: ["Bug bounty programs", "Coordinated disclosure", "Patch management"],
    relatedControls: ["CIS-16.1", "CIS-16.3"]
  },

  // CIS Control 17: Incident Response Management
  { 
    id: "CIS-17.1", 
    title: "Designate Personnel to Manage Incident Handling", 
    category: "Incident Response Management", 
    family: "IG2",
    priority: "High",
    status: "Active",
    description: "Designate one key person, and at least one backup, who will manage the enterprise's incident handling process",
    implementation: "Incident response team with defined roles and responsibilities",
    controlEnhancements: ["24/7 coverage", "Escalation procedures", "Communication plans"],
    relatedControls: ["CIS-17.2", "CIS-17.9", "CIS-8.1"]
  },
  { 
    id: "CIS-17.2", 
    title: "Establish and Maintain Contact Information for Reporting Security Incidents", 
    category: "Incident Response Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and maintain contact information for parties that need to be informed of security incidents",
    implementation: "Contact directory with automated notification systems",
    controlEnhancements: ["Multiple communication channels", "Verification procedures", "Update processes"],
    relatedControls: ["CIS-17.1", "CIS-17.3"]
  },

  // CIS Control 18: Penetration Testing
  { 
    id: "CIS-18.1", 
    title: "Establish and Maintain a Penetration Testing Program", 
    category: "Penetration Testing", 
    family: "IG2",
    priority: "Medium",
    status: "Active",
    description: "Establish and maintain a penetration testing program appropriate to the size, complexity, and maturity of the enterprise",
    implementation: "Regular penetration testing with remediation tracking",
    controlEnhancements: ["Red team exercises", "Purple team collaboration", "Continuous testing"],
    relatedControls: ["CIS-18.2", "CIS-18.5", "CIS-7.1"]
  },
  { 
    id: "CIS-18.2", 
    title: "Perform Periodic External Penetration Tests", 
    category: "Penetration Testing", 
    family: "IG2",
    priority: "Medium",
    status: "Active",
    description: "Perform periodic external penetration tests based on program requirements",
    implementation: "Third-party penetration testing with comprehensive reporting",
    controlEnhancements: ["Scope definition", "Methodology standards", "Finding validation"],
    relatedControls: ["CIS-18.1", "CIS-18.3"]
  }
];