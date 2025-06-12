
import { ReportData, ReportConfig } from '../types/report';
import { mockControlsData, mockRelationships } from '../data/reportMockData';
import { ReportGenerators } from './reportGenerators';

class ReportService {
  private generators = new ReportGenerators();

  async generateReport(config: ReportConfig): Promise<string> {
    console.log('Generating enhanced report with config:', config);
    
    const reportData = this.prepareReportData(config);
    
    switch (config.format) {
      case 'json':
        return this.generators.generateJSON(reportData);
      case 'csv':
        return this.generators.generateCSV(reportData);
      case 'excel':
        return this.generators.generateExcel(reportData);
      case 'pdf':
        return this.generators.generatePDF(reportData);
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
}

export const reportService = new ReportService();
