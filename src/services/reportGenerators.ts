import { ReportData } from '../types/report';

export class ReportGenerators {
  generateJSON(data: ReportData): string {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.json`);
    return url;
  }

  generateCSV(data: ReportData): string {
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

  generateExcel(data: ReportData): string {
    const htmlTable = this.generateHTMLTable(data);
    const blob = new Blob([htmlTable], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, `compliance-report-${Date.now()}.xls`);
    return url;
  }

  generatePDF(data: ReportData): string {
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
