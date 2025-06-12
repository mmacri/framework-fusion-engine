
import { Control } from '../../types/report';

export const soxControls: Control[] = [
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
];
