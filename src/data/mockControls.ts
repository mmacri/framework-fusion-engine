
interface Control {
  id: string;
  controlId: string;
  framework: string;
  title: string;
  description: string;
  family: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Active" | "Draft" | "Deprecated";
  implementationGuidance: string;
  testingProcedures: string;
  mappedControls: string[];
}

const generateNISTControls = (): Control[] => {
  const nistFamilies = [
    "Access Control", "Audit and Accountability", "Assessment, Authorization, and Monitoring",
    "Configuration Management", "Contingency Planning", "Identification and Authentication",
    "Incident Response", "Maintenance", "Media Protection", "Physical and Environmental Protection",
    "Planning", "Personnel Security", "Risk Assessment", "System and Services Acquisition",
    "System and Communications Protection", "System and Information Integrity"
  ];
  
  const controls: Control[] = [];
  
  nistFamilies.forEach((family, familyIndex) => {
    const familyCode = family.split(' ')[0].substring(0, 2).toUpperCase();
    const controlsPerFamily = Math.floor(945 / nistFamilies.length) + (familyIndex < 945 % nistFamilies.length ? 1 : 0);
    
    for (let i = 1; i <= controlsPerFamily; i++) {
      const controlId = `${familyCode}-${i}`;
      const priorities = ["Critical", "High", "Medium", "Low"] as const;
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      
      controls.push({
        id: `nist-${familyIndex}-${i}`,
        controlId,
        framework: "NIST 800-53",
        title: `${family} Control ${i}`,
        description: `This control addresses ${family.toLowerCase()} requirements and establishes necessary procedures for maintaining security compliance.`,
        family,
        priority,
        status: "Active",
        implementationGuidance: `Implement comprehensive ${family.toLowerCase()} measures including policy development, technical controls, and regular monitoring procedures.`,
        testingProcedures: `Verify ${family.toLowerCase()} implementation through documentation review, technical testing, and compliance validation.`,
        mappedControls: []
      });
    }
  });
  
  return controls;
};

const generatePCIControls = (): Control[] => {
  const pciRequirements = [
    "Install and maintain a firewall configuration",
    "Do not use vendor-supplied defaults",
    "Protect stored cardholder data",
    "Encrypt transmission of cardholder data",
    "Protect all systems against malware",
    "Develop and maintain secure systems",
    "Restrict access to cardholder data",
    "Identify and authenticate access",
    "Restrict physical access to cardholder data",
    "Track and monitor all access",
    "Regularly test security systems",
    "Maintain a policy that addresses information security"
  ];
  
  const controls: Control[] = [];
  
  pciRequirements.forEach((requirement, reqIndex) => {
    const controlsPerReq = Math.floor(281 / pciRequirements.length) + (reqIndex < 281 % pciRequirements.length ? 1 : 0);
    
    for (let i = 1; i <= controlsPerReq; i++) {
      const controlId = `${reqIndex + 1}.${i}`;
      const priorities = ["Critical", "High", "Medium"] as const;
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      
      controls.push({
        id: `pci-${reqIndex}-${i}`,
        controlId,
        framework: "PCI-DSS",
        title: `Requirement ${reqIndex + 1}.${i}`,
        description: `${requirement} - detailed implementation requirement for PCI DSS compliance.`,
        family: "Payment Card Security",
        priority,
        status: "Active",
        implementationGuidance: `Implement ${requirement.toLowerCase()} through proper technical and administrative controls.`,
        testingProcedures: `Test compliance with requirement through validation of implementation and effectiveness.`,
        mappedControls: []
      });
    }
  });
  
  return controls;
};

const generateHIPAAControls = (): Control[] => {
  const hipaaCategories = [
    "Administrative Safeguards", "Physical Safeguards", "Technical Safeguards"
  ];
  
  const controls: Control[] = [];
  
  hipaaCategories.forEach((category, catIndex) => {
    const controlsPerCategory = Math.floor(164 / hipaaCategories.length) + (catIndex < 164 % hipaaCategories.length ? 1 : 0);
    
    for (let i = 1; i <= controlsPerCategory; i++) {
      const controlId = `164.${300 + catIndex * 10 + Math.floor(i / 10)}.${String.fromCharCode(97 + (i % 10))}(${i})`;
      const priorities = ["High", "Medium", "Low"] as const;
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      
      controls.push({
        id: `hipaa-${catIndex}-${i}`,
        controlId,
        framework: "HIPAA",
        title: `${category} ${i}`,
        description: `HIPAA ${category.toLowerCase()} requirement for protecting electronic protected health information.`,
        family: category,
        priority,
        status: "Active",
        implementationGuidance: `Implement ${category.toLowerCase()} to ensure proper protection of ePHI in accordance with HIPAA requirements.`,
        testingProcedures: `Verify implementation of ${category.toLowerCase()} through audit procedures and compliance testing.`,
        mappedControls: []
      });
    }
  });
  
  return controls;
};

const generateSOXControls = (): Control[] => {
  const soxCategories = [
    "Control Environment", "Risk Assessment", "Control Activities", "Information & Communication", "Monitoring"
  ];
  
  const controls: Control[] = [];
  
  soxCategories.forEach((category, catIndex) => {
    const controlsPerCategory = Math.floor(127 / soxCategories.length) + (catIndex < 127 % soxCategories.length ? 1 : 0);
    
    for (let i = 1; i <= controlsPerCategory; i++) {
      const controlId = `CC${catIndex + 1}.${i}`;
      const priorities = ["High", "Medium", "Low"] as const;
      const priority = priorities[Math.floor(Math.random() * priorities.length)];
      
      controls.push({
        id: `sox-${catIndex}-${i}`,
        controlId,
        framework: "SOX",
        title: `${category} Control ${i}`,
        description: `SOX-compliant ${category.toLowerCase()} control for financial reporting and internal controls.`,
        family: category,
        priority,
        status: "Active",
        implementationGuidance: `Establish ${category.toLowerCase()} controls to ensure accurate financial reporting and compliance with SOX requirements.`,
        testingProcedures: `Test ${category.toLowerCase()} effectiveness through control testing and validation procedures.`,
        mappedControls: []
      });
    }
  });
  
  return controls;
};

export const mockControls: Control[] = [
  ...generateNISTControls(),
  ...generatePCIControls(),
  ...generateHIPAAControls(),
  ...generateSOXControls()
];

export type { Control };
