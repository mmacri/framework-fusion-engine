
interface ReportData {
  frameworks: string[];
  controls: any[];
  relationships: any[];
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

// Mock data that would normally come from a database
const mockControlsData = {
  "NIST 800-53": [
    { id: "AC-1", title: "Access Control Policy", category: "Access Control", description: "Develop, document, and disseminate access control policy" },
    { id: "AC-2", title: "Account Management", category: "Access Control", description: "Manage information system accounts" },
    { id: "IA-2", title: "User Identification", category: "Identification", description: "Uniquely identify and authenticate users" }
  ],
  "PCI-DSS": [
    { id: "7.1.1", title: "Access Control Systems", category: "Access Control", description: "Limit access to system components" },
    { id: "8.2.1", title: "User Identification", category: "Authentication", description: "Assign unique ID to each user" }
  ],
  "HIPAA": [
    { id: "164.312(a)(1)", title: "Access Control", category: "Security", description: "Assign unique user identification" }
  ]
};

const mockRelationships = [
  { source: "NIST AC-1", target: "PCI 7.1.1", relationship: "Direct Mapping", confidence: 95 },
  { source: "NIST IA-2", target: "PCI 8.2.1", relationship: "Partial Overlap", confidence: 78 },
  { source: "NIST AC-1", target: "HIPAA 164.312(a)(1)", relationship: "Indirect Support", confidence: 65 }
];

class ReportService {
  async generateReport(config: ReportConfig): Promise<string> {
    console.log('Generating report with config:', config);
    
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

    const relationships = config.includeRelationships ? mockRelationships : [];

    return {
      frameworks: config.frameworks,
      controls,
      relationships,
      metadata: {
        generatedAt: new Date().toISOString(),
        title: config.title || 'Compliance Report',
        description: config.description || 'Generated compliance report',
        includeMetadata: config.includeMetadata,
        includeRelationships: config.includeRelationships,
        includeGaps: config.includeGaps
      }
    };
  }

  private generateJSON(data: ReportData): string {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.json`);
    return url;
  }

  private generateCSV(data: ReportData): string {
    const headers = ['Framework', 'Control ID', 'Title', 'Category', 'Description'];
    const rows = data.controls.map(control => [
      this.getFrameworkForControl(control.id, data.frameworks),
      control.id,
      control.title,
      control.category,
      control.description
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.csv`);
    return url;
  }

  private generateExcel(data: ReportData): string {
    // Simplified Excel generation - in production, you'd use a library like SheetJS
    const htmlTable = this.generateHTMLTable(data);
    const blob = new Blob([htmlTable], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.xls`);
    return url;
  }

  private generatePDF(data: ReportData): string {
    // Simplified PDF generation - in production, you'd use a library like jsPDF
    const htmlContent = this.generateHTMLReport(data);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.html`);
    return url;
  }

  private generateHTMLTable(data: ReportData): string {
    const controlsTable = data.controls.map(control => `
      <tr>
        <td>${this.getFrameworkForControl(control.id, data.frameworks)}</td>
        <td>${control.id}</td>
        <td>${control.title}</td>
        <td>${control.category}</td>
        <td>${control.description}</td>
      </tr>
    `).join('');

    return `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${data.metadata.title}</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${data.metadata.title}</h1>
          <p>${data.metadata.description}</p>
          <p>Generated: ${new Date(data.metadata.generatedAt).toLocaleString()}</p>
          <h2>Controls</h2>
          <table>
            <thead>
              <tr>
                <th>Framework</th>
                <th>Control ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${controlsTable}
            </tbody>
          </table>
        </body>
      </html>
    `;
  }

  private generateHTMLReport(data: ReportData): string {
    const controlsSection = data.controls.map(control => `
      <div style="margin-bottom: 16px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h4>${control.id}: ${control.title}</h4>
        <p><strong>Category:</strong> ${control.category}</p>
        <p><strong>Description:</strong> ${control.description}</p>
      </div>
    `).join('');

    const relationshipsSection = data.metadata.includeRelationships ? `
      <h2>Control Relationships</h2>
      ${data.relationships.map(rel => `
        <div style="margin-bottom: 12px; padding: 8px; background: #f8fafc; border-radius: 4px;">
          <strong>${rel.source}</strong> → <strong>${rel.target}</strong>
          <br><small>${rel.relationship} (${rel.confidence}% confidence)</small>
        </div>
      `).join('')}
    ` : '';

    return `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${data.metadata.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1, h2 { color: #2d3748; }
            .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${data.metadata.title}</h1>
            <p>${data.metadata.description}</p>
            <p><strong>Generated:</strong> ${new Date(data.metadata.generatedAt).toLocaleString()}</p>
            <p><strong>Frameworks:</strong> ${data.frameworks.join(', ')}</p>
          </div>
          
          <h2>Controls Summary</h2>
          ${controlsSection}
          
          ${relationshipsSection}
        </body>
      </html>
    `;
  }

  private getFrameworkForControl(controlId: string, frameworks: string[]): string {
    if (controlId.startsWith('AC-') || controlId.startsWith('IA-')) return 'NIST 800-53';
    if (controlId.includes('.')) return 'PCI-DSS';
    if (controlId.includes('164.')) return 'HIPAA';
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
