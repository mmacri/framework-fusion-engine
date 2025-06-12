
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
];
