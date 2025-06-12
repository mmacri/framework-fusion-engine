
import { Control } from '../../types/report';

export const hipaaControls: Control[] = [
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
];
