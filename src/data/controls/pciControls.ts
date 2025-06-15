import { Control } from '../../types/report';

export const pciControls: Control[] = [
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
  },
  { 
    id: "6.4.3", 
    title: "Authentication credentials are protected", 
    category: "Application Security", 
    family: "Secure Development",
    priority: "Critical",
    status: "Active",
    description: "All payment page scripts are managed and protected",
    implementation: "Implement integrity validation and authorization for all scripts",
    requirements: ["6.4.3.1", "6.4.3.2"],
    relatedRequirements: ["6.5.1", "11.6.1"]
  },
  { 
    id: "11.6.1", 
    title: "Change detection mechanisms", 
    category: "Security Testing", 
    family: "Change Detection",
    priority: "High",
    status: "Active",
    description: "Deploy change detection mechanisms to alert personnel to unauthorized modification",
    implementation: "Automated file integrity monitoring for payment pages",
    requirements: ["11.6.1.1", "11.6.1.2"],
    relatedRequirements: ["6.4.3", "10.2.1"]
  },
  { 
    id: "12.10.7", 
    title: "Incident response plan testing", 
    category: "Information Security Policies", 
    family: "Incident Response",
    priority: "Medium",
    status: "Active",
    description: "Test incident response plan at least annually",
    implementation: "Conduct tabletop exercises and simulated incident scenarios",
    requirements: ["12.10.7.1"],
    relatedRequirements: ["12.10.1", "12.10.4"]
  }
];
