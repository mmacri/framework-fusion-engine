
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
  }
];
