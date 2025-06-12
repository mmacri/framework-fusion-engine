
interface ReportData {
  frameworks: string[];
  controls: any[];
  relationships: any[];
  overview: {
    totalControls: number;
    frameworkBreakdown: { framework: string; count: number; coverage: number }[];
    mappingStats: {
      directMappings: number;
      partialMappings: number;
      gapMappings: number;
      totalRelationships: number;
    };
  };
  metadata: {
    generatedAt: string;
    title: string;
    description: string;
    includeMetadata: boolean;
    includeRelationships: boolean;
    includeGaps: boolean;
  };
}

interface ReportConfig {
  title: string;
  description: string;
  frameworks: string[];
  format: 'pdf' | 'excel' | 'csv' | 'json';
  includeMetadata: boolean;
  includeRelationships: boolean;
  includeGaps: boolean;
}

// Enhanced mock data with more comprehensive control information
const mockControlsData = {
  "NIST 800-53": [
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
    }
  ],
  "PCI-DSS": [
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
    }
  ],
  "HIPAA": [
    { 
      id: "164.312(a)(1)", 
      title: "Access Control", 
      category: "Administrative Safeguards", 
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
      family: "Security",
      priority: "High",
      status: "Active",
      description: "Assign security responsibilities to an individual with appropriate access and authority",
      implementation: "Designated HIPAA Security Officer with defined responsibilities",
      requirements: ["164.308(a)(2)", "164.308(a)(3)"],
      relatedRequirements: ["164.312(a)(1)", "164.314(a)(1)"]
    }
  ],
  "SOX": [
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
    }
  ]
};

// Enhanced relationship mappings with confidence scores and detailed analysis
const mockRelationships = [
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
    source: "NIST AC-1", 
    target: "HIPAA 164.308(a)(1)", 
    relationship: "Indirect Support", 
    confidence: 65,
    description: "Both require designated security responsibilities and documentation",
    mappingType: "Governance Alignment",
    gapAnalysis: "HIPAA is more specific to healthcare data protection"
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
    source: "PCI 7.1.1", 
    target: "HIPAA 164.312(a)(1)", 
    relationship: "Direct Mapping", 
    confidence: 85,
    description: "Both require role-based access control with unique user identification",
    mappingType: "Access Control Alignment",
    gapAnalysis: "HIPAA includes additional audit trail requirements"
  },
  { 
    source: "NIST AC-2", 
    target: "SOX CC6.1", 
    relationship: "Partial Overlap", 
    confidence: 72,
    description: "Account management supports logical access control objectives",
    mappingType: "Supporting Control",
    gapAnalysis: "SOX focuses more on financial reporting control objectives"
  }
];

class ReportService {
  async generateReport(config: ReportConfig): Promise<string> {
    console.log('Generating enhanced report with config:', config);
    
    const reportData = this.prepareReportData(config);
    
    switch (config.format) {
      case 'json':
        return this.generateJSON(reportData);
      case 'csv':
        return this.generateCSV(reportData);
      case 'excel':
        return this.generateExcel(reportData);
      case 'pdf':
        return this.generatePDF(reportData);
      default:
        throw new Error(`Unsupported format: ${config.format}`);
    }
  }

  private prepareReportData(config: ReportConfig): ReportData {
    const controls = config.frameworks.flatMap(framework => 
      mockControlsData[framework as keyof typeof mockControlsData] || []
    );

    const relationships = config.includeRelationships ? 
      mockRelationships.filter(rel => 
        config.frameworks.some(f => rel.source.includes(f.split(' ')[0]) || rel.target.includes(f.split(' ')[0]))
      ) : [];

    // Calculate overview statistics
    const frameworkBreakdown = config.frameworks.map(framework => {
      const frameworkControls = mockControlsData[framework as keyof typeof mockControlsData] || [];
      const totalPossible = this.getTotalControlsForFramework(framework);
      return {
        framework,
        count: frameworkControls.length,
        coverage: Math.round((frameworkControls.length / totalPossible) * 100)
      };
    });

    const mappingStats = {
      directMappings: relationships.filter(r => r.relationship === "Direct Mapping").length,
      partialMappings: relationships.filter(r => r.relationship === "Partial Overlap").length,
      gapMappings: relationships.filter(r => r.relationship === "Indirect Support").length,
      totalRelationships: relationships.length
    };

    return {
      frameworks: config.frameworks,
      controls,
      relationships,
      overview: {
        totalControls: controls.length,
        frameworkBreakdown,
        mappingStats
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        title: config.title || 'Enhanced Compliance Report',
        description: config.description || 'Comprehensive compliance mapping and analysis report',
        includeMetadata: config.includeMetadata,
        includeRelationships: config.includeRelationships,
        includeGaps: config.includeGaps
      }
    };
  }

  private getTotalControlsForFramework(framework: string): number {
    // Mock total control counts for coverage calculation
    const totals: { [key: string]: number } = {
      "NIST 800-53": 1000,
      "PCI-DSS": 200,
      "HIPAA": 100,
      "SOX": 50
    };
    return totals[framework] || 100;
  }

  private generateJSON(data: ReportData): string {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.json`);
    return url;
  }

  private generateCSV(data: ReportData): string {
    const headers = ['Framework', 'Control ID', 'Title', 'Category', 'Family', 'Priority', 'Status', 'Description'];
    const rows = data.controls.map(control => [
      this.getFrameworkForControl(control.id, data.frameworks),
      control.id,
      control.title,
      control.category,
      control.family,
      control.priority,
      control.status,
      control.description
    ]);

    let csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    if (data.metadata.includeRelationships && data.relationships.length > 0) {
      csvContent += '\n\n"Control Relationships"\n';
      csvContent += '"Source","Target","Relationship Type","Confidence","Description"\n';
      data.relationships.forEach(rel => {
        csvContent += `"${rel.source}","${rel.target}","${rel.relationship}","${rel.confidence}%","${rel.description}"\n`;
      });
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.csv`);
    return url;
  }

  private generateExcel(data: ReportData): string {
    const htmlTable = this.generateHTMLTable(data);
    const blob = new Blob([htmlTable], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.xls`);
    return url;
  }

  private generatePDF(data: ReportData): string {
    const htmlContent = this.generateHTMLReport(data);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.html`);
    return url;
  }

  private generateHTMLTable(data: ReportData): string {
    const overviewSection = `
      <div style="margin-bottom: 30px;">
        <h2>Executive Summary</h2>
        <table style="margin-bottom: 20px;">
          <tr><td><strong>Total Controls:</strong></td><td>${data.overview.totalControls}</td></tr>
          <tr><td><strong>Frameworks Analyzed:</strong></td><td>${data.frameworks.join(', ')}</td></tr>
          <tr><td><strong>Total Relationships:</strong></td><td>${data.overview.mappingStats.totalRelationships}</td></tr>
          <tr><td><strong>Direct Mappings:</strong></td><td>${data.overview.mappingStats.directMappings}</td></tr>
        </table>
        
        <h3>Framework Coverage</h3>
        <table>
          <thead>
            <tr><th>Framework</th><th>Controls Analyzed</th><th>Coverage %</th></tr>
          </thead>
          <tbody>
            ${data.overview.frameworkBreakdown.map(fb => `
              <tr>
                <td>${fb.framework}</td>
                <td>${fb.count}</td>
                <td>${fb.coverage}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    const controlsTable = data.controls.map(control => `
      <tr>
        <td>${this.getFrameworkForControl(control.id, data.frameworks)}</td>
        <td>${control.id}</td>
        <td>${control.title}</td>
        <td>${control.category}</td>
        <td>${control.family}</td>
        <td>${control.priority}</td>
        <td>${control.status}</td>
        <td>${control.description}</td>
      </tr>
    `).join('');

    const relationshipsTable = data.metadata.includeRelationships ? `
      <h2>Control Relationships & Mappings</h2>
      <table>
        <thead>
          <tr>
            <th>Source Control</th>
            <th>Target Control</th>
            <th>Relationship</th>
            <th>Confidence</th>
            <th>Description</th>
            <th>Gap Analysis</th>
          </tr>
        </thead>
        <tbody>
          ${data.relationships.map(rel => `
            <tr>
              <td>${rel.source}</td>
              <td>${rel.target}</td>
              <td>${rel.relationship}</td>
              <td>${rel.confidence}%</td>
              <td>${rel.description}</td>
              <td>${rel.gapAnalysis || 'N/A'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    ` : '';

    return `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${data.metadata.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1, h2, h3 { color: #2d3748; }
          </style>
        </head>
        <body>
          <h1>${data.metadata.title}</h1>
          <p><strong>Generated:</strong> ${new Date(data.metadata.generatedAt).toLocaleString()}</p>
          
          ${overviewSection}
          
          <h2>Detailed Controls</h2>
          <table>
            <thead>
              <tr>
                <th>Framework</th>
                <th>Control ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Family</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${controlsTable}
            </tbody>
          </table>
          
          ${relationshipsTable}
        </body>
      </html>
    `;
  }

  private generateHTMLReport(data: ReportData): string {
    const overviewSection = `
      <div class="overview">
        <h2>Executive Summary</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <h3>${data.overview.totalControls}</h3>
            <p>Total Controls Analyzed</p>
          </div>
          <div class="stat-card">
            <h3>${data.frameworks.length}</h3>
            <p>Frameworks Covered</p>
          </div>
          <div class="stat-card">
            <h3>${data.overview.mappingStats.totalRelationships}</h3>
            <p>Control Relationships</p>
          </div>
          <div class="stat-card">
            <h3>${data.overview.mappingStats.directMappings}</h3>
            <p>Direct Mappings</p>
          </div>
        </div>
        
        <h3>Framework Analysis</h3>
        <div class="framework-breakdown">
          ${data.overview.frameworkBreakdown.map(fb => `
            <div class="framework-item">
              <h4>${fb.framework}</h4>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${fb.coverage}%"></div>
              </div>
              <p>${fb.count} controls (${fb.coverage}% coverage)</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const controlsSection = `
      <h2>Control Details</h2>
      <div class="controls-section">
        ${data.controls.map(control => `
          <div class="control-card">
            <div class="control-header">
              <h4>${control.id}: ${control.title}</h4>
              <div class="control-badges">
                <span class="badge framework">${this.getFrameworkForControl(control.id, data.frameworks)}</span>
                <span class="badge priority priority-${control.priority?.toLowerCase()}">${control.priority}</span>
                <span class="badge status">${control.status}</span>
              </div>
            </div>
            <p><strong>Category:</strong> ${control.category}</p>
            <p><strong>Family:</strong> ${control.family}</p>
            <p><strong>Description:</strong> ${control.description}</p>
            ${control.implementation ? `<p><strong>Implementation:</strong> ${control.implementation}</p>` : ''}
          </div>
        `).join('')}
      </div>
    `;

    const relationshipsSection = data.metadata.includeRelationships ? `
      <h2>Control Mappings & Relationships</h2>
      <div class="mapping-overview">
        <div class="mapping-stats">
          <div class="mapping-type">
            <h4>Direct Mappings: ${data.overview.mappingStats.directMappings}</h4>
            <p>Controls with equivalent functionality</p>
          </div>
          <div class="mapping-type">
            <h4>Partial Overlaps: ${data.overview.mappingStats.partialMappings}</h4>
            <p>Controls with some shared requirements</p>
          </div>
          <div class="mapping-type">
            <h4>Indirect Support: ${data.overview.mappingStats.gapMappings}</h4>
            <p>Controls that support compliance objectives</p>
          </div>
        </div>
      </div>
      
      <div class="relationships-section">
        ${data.relationships.map(rel => `
          <div class="relationship-card">
            <div class="relationship-header">
              <div class="control-mapping">
                <span class="source-control">${rel.source}</span>
                <span class="mapping-arrow">→</span>
                <span class="target-control">${rel.target}</span>
              </div>
              <div class="relationship-meta">
                <span class="relationship-type type-${rel.relationship.toLowerCase().replace(/\s+/g, '-')}">${rel.relationship}</span>
                <span class="confidence">${rel.confidence}% confidence</span>
              </div>
            </div>
            <p><strong>Description:</strong> ${rel.description}</p>
            ${rel.gapAnalysis ? `<p><strong>Gap Analysis:</strong> ${rel.gapAnalysis}</p>` : ''}
          </div>
        `).join('')}
      </div>
    ` : '';

    return `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${data.metadata.title}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              margin: 40px; 
              line-height: 1.6; 
              color: #2d3748;
            }
            .header { 
              border-bottom: 3px solid #e2e8f0; 
              padding-bottom: 20px; 
              margin-bottom: 40px; 
            }
            h1 { color: #1a202c; margin-bottom: 10px; }
            h2 { color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
            .overview { margin-bottom: 40px; }
            .stats-grid { 
              display: grid; 
              grid-template-columns: repeat(4, 1fr); 
              gap: 20px; 
              margin: 20px 0; 
            }
            .stat-card { 
              background: #f7fafc; 
              padding: 20px; 
              border-radius: 8px; 
              text-align: center; 
              border: 1px solid #e2e8f0;
            }
            .stat-card h3 { 
              font-size: 2em; 
              margin: 0; 
              color: #2b6cb0; 
            }
            .framework-breakdown { margin: 20px 0; }
            .framework-item { 
              margin: 15px 0; 
              padding: 15px; 
              background: #f7fafc; 
              border-radius: 8px; 
            }
            .progress-bar { 
              width: 100%; 
              height: 8px; 
              background: #e2e8f0; 
              border-radius: 4px; 
              overflow: hidden; 
              margin: 8px 0; 
            }
            .progress-fill { 
              height: 100%; 
              background: #48bb78; 
              border-radius: 4px; 
            }
            .control-card { 
              margin: 20px 0; 
              padding: 20px; 
              border: 1px solid #e2e8f0; 
              border-radius: 8px; 
              background: #ffffff;
            }
            .control-header { 
              display: flex; 
              justify-content: space-between; 
              align-items: flex-start; 
              margin-bottom: 15px; 
            }
            .control-badges { display: flex; gap: 8px; flex-wrap: wrap; }
            .badge { 
              padding: 4px 8px; 
              border-radius: 4px; 
              font-size: 0.8em; 
              font-weight: 600; 
            }
            .badge.framework { background: #bee3f8; color: #2b6cb0; }
            .badge.priority-critical { background: #fed7d7; color: #c53030; }
            .badge.priority-high { background: #feebc8; color: #dd6b20; }
            .badge.priority-medium { background: #faf089; color: #b7791f; }
            .badge.priority-low { background: #c6f6d5; color: #276749; }
            .badge.status { background: #c6f6d5; color: #276749; }
            .relationship-card { 
              margin: 20px 0; 
              padding: 20px; 
              border: 1px solid #e2e8f0; 
              border-radius: 8px; 
              background: #f7fafc;
            }
            .relationship-header { margin-bottom: 15px; }
            .control-mapping { 
              font-weight: 600; 
              font-size: 1.1em; 
              margin-bottom: 8px; 
            }
            .source-control, .target-control { 
              background: #edf2f7; 
              padding: 4px 8px; 
              border-radius: 4px; 
            }
            .mapping-arrow { 
              margin: 0 10px; 
              font-weight: bold; 
              color: #4a5568; 
            }
            .relationship-meta { display: flex; gap: 15px; }
            .relationship-type { 
              padding: 4px 8px; 
              border-radius: 4px; 
              font-size: 0.9em; 
              font-weight: 600; 
            }
            .relationship-type.type-direct-mapping { background: #c6f6d5; color: #276749; }
            .relationship-type.type-partial-overlap { background: #feebc8; color: #dd6b20; }
            .relationship-type.type-indirect-support { background: #bee3f8; color: #2b6cb0; }
            .confidence { 
              background: #edf2f7; 
              padding: 4px 8px; 
              border-radius: 4px; 
              font-size: 0.9em; 
            }
            .mapping-overview { margin: 20px 0; }
            .mapping-stats { 
              display: grid; 
              grid-template-columns: repeat(3, 1fr); 
              gap: 20px; 
            }
            .mapping-type { 
              background: #f7fafc; 
              padding: 20px; 
              border-radius: 8px; 
              border: 1px solid #e2e8f0; 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${data.metadata.title}</h1>
            <p>${data.metadata.description}</p>
            <p><strong>Generated:</strong> ${new Date(data.metadata.generatedAt).toLocaleString()}</p>
            <p><strong>Frameworks:</strong> ${data.frameworks.join(', ')}</p>
          </div>
          
          ${overviewSection}
          ${controlsSection}
          ${relationshipsSection}
        </body>
      </html>
    `;
  }

  private getFrameworkForControl(controlId: string, frameworks: string[]): string {
    if (controlId.startsWith('AC-') || controlId.startsWith('IA-') || controlId.startsWith('SC-')) return 'NIST 800-53';
    if (controlId.includes('.') && !controlId.includes('164.')) return 'PCI-DSS';
    if (controlId.includes('164.')) return 'HIPAA';
    if (controlId.startsWith('CC')) return 'SOX';
    return frameworks[0] || 'Unknown';
  }

  private downloadFile(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const reportService = new ReportService();
