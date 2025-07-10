import { Control } from '../../types/report';

export const cisControls: Control[] = [
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
    id: "CIS-2.1", 
    title: "Establish and Maintain a Software Inventory", 
    category: "Inventory and Control of Enterprise Software", 
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
    id: "CIS-4.1", 
    title: "Establish and Maintain a Secure Configuration Process", 
    category: "Secure Configuration of Enterprise Assets and Software", 
    family: "IG1",
    priority: "Critical",
    status: "Active",
    description: "Establish and maintain a secure configuration process for enterprise assets and software",
    implementation: "Configuration baselines with automated compliance scanning",
    controlEnhancements: ["Hardening standards", "Configuration drift detection", "Remediation workflows"],
    relatedControls: ["CIS-4.2", "CIS-4.7", "CIS-18.3"]
  },
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
    id: "CIS-6.1", 
    title: "Establish an Access Granting Process", 
    category: "Access Control Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and follow a process for granting access to enterprise assets",
    implementation: "Workflow-based access request and approval system",
    controlEnhancements: ["Risk-based access", "Just-in-time access", "Automated provisioning"],
    relatedControls: ["CIS-6.2", "CIS-6.8", "CIS-5.1"]
  },
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
    relatedControls: ["CIS-7.2", "CIS-7.3", "CIS-18.5"]
  },
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
    relatedControls: ["CIS-8.2", "CIS-8.11", "CIS-17.1"]
  },
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
    id: "CIS-10.1", 
    title: "Deploy and Maintain Anti-Malware Software", 
    category: "Malware Defenses", 
    family: "IG1",
    priority: "Critical",
    status: "Active",
    description: "Deploy and maintain anti-malware software on all enterprise assets",
    implementation: "Enterprise endpoint protection with centralized management",
    controlEnhancements: ["Behavioral analysis", "Cloud-based scanning", "Sandboxing"],
    relatedControls: ["CIS-10.2", "CIS-10.7", "CIS-7.1"]
  },
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
    id: "CIS-12.1", 
    title: "Ensure Network Infrastructure is Up-to-Date", 
    category: "Network Infrastructure Management", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Ensure network infrastructure is kept up-to-date with security patches and configurations",
    implementation: "Network device management with automated patching",
    controlEnhancements: ["Firmware management", "Configuration backup", "Change control"],
    relatedControls: ["CIS-12.2", "CIS-12.8", "CIS-4.1"]
  },
  { 
    id: "CIS-13.1", 
    title: "Establish and Maintain a Network Monitoring Process", 
    category: "Network Monitoring and Defense", 
    family: "IG1",
    priority: "High",
    status: "Active",
    description: "Establish and maintain a network monitoring process to detect and respond to security events",
    implementation: "Network monitoring tools with intrusion detection",
    controlEnhancements: ["Traffic analysis", "Anomaly detection", "Incident response"],
    relatedControls: ["CIS-13.2", "CIS-13.3", "CIS-17.1"]
  },
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
    id: "CIS-15.1", 
    title: "Establish and Maintain a Service Provider Management Process", 
    category: "Service Provider Management", 
    family: "IG1",
    priority: "Medium",
    status: "Active",
    description: "Establish and maintain a process to evaluate service providers who hold sensitive data or are responsible for an enterprise's critical IT platforms",
    implementation: "Vendor risk assessment with continuous monitoring",
    controlEnhancements: ["Third-party assessments", "Contract requirements", "Performance monitoring"],
    relatedControls: ["CIS-15.2", "CIS-15.7", "CIS-3.1"]
  },
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
    id: "CIS-17.1", 
    title: "Perform a Threat Modeling Process", 
    category: "Incident Response Management", 
    family: "IG2",
    priority: "High",
    status: "Active",
    description: "Establish and maintain an incident response process that addresses roles, responsibilities, and procedures",
    implementation: "Formal incident response plan with tabletop exercises",
    controlEnhancements: ["Threat hunting", "Forensic capabilities", "Communication plans"],
    relatedControls: ["CIS-17.2", "CIS-17.9", "CIS-8.1"]
  },
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
  }
];