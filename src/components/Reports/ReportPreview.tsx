
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ReportPreviewProps {
  title: string;
  description: string;
  frameworks: string[];
  includeMetadata: boolean;
  includeRelationships: boolean;
  includeGaps: boolean;
  format: string;
}

const formatLabels: { [key: string]: string } = {
  'pdf': 'PDF Report',
  'excel': 'Excel Spreadsheet', 
  'csv': 'CSV Data',
  'json': 'JSON Data'
};

const mockStats = {
  totalControls: 156,
  directMappings: 23,
  partialMappings: 15,
  frameworks: {
    'NIST 800-53': { controls: 4, coverage: 75 },
    'PCI-DSS': { controls: 3, coverage: 85 },
    'HIPAA': { controls: 2, coverage: 90 },
    'SOX': { controls: 2, coverage: 60 }
  }
};

export function ReportPreview({ 
  title, 
  description, 
  frameworks, 
  includeMetadata, 
  includeRelationships, 
  includeGaps, 
  format 
}: ReportPreviewProps) {
  const selectedFrameworkStats = frameworks.map(framework => ({
    name: framework,
    ...mockStats.frameworks[framework as keyof typeof mockStats.frameworks]
  }));

  const totalSelectedControls = selectedFrameworkStats.reduce((sum, fw) => sum + (fw.controls || 0), 0);
  const avgCoverage = selectedFrameworkStats.length > 0 
    ? Math.round(selectedFrameworkStats.reduce((sum, fw) => sum + (fw.coverage || 0), 0) / selectedFrameworkStats.length)
    : 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Report Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-1">Title</h4>
            <p className="text-sm text-muted-foreground">
              {title || "Custom Compliance Report"}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-1">Description</h4>
            <p className="text-sm text-muted-foreground">
              {description || "No description provided"}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-1">Export Format</h4>
            <Badge variant="secondary">
              {formatLabels[format] || format}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{totalSelectedControls}</div>
              <div className="text-xs text-muted-foreground">Controls</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{avgCoverage}%</div>
              <div className="text-xs text-muted-foreground">Avg Coverage</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Framework Coverage</h4>
            <div className="space-y-2">
              {selectedFrameworkStats.map(framework => (
                <div key={framework.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{framework.name}</span>
                    <span>{framework.coverage}%</span>
                  </div>
                  <Progress value={framework.coverage} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Report Sections</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Executive Summary
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Framework Analysis
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Control Details
              </div>
              {includeMetadata && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Control Metadata
                </div>
              )}
              {includeRelationships && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Relationship Mappings ({mockStats.directMappings} direct, {mockStats.partialMappings} partial)
                </div>
              )}
              {includeGaps && (
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  Gap Analysis
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {includeRelationships && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mapping Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-700">{mockStats.directMappings}</div>
                <div className="text-xs text-green-600">Direct Mappings</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-700">{mockStats.partialMappings}</div>
                <div className="text-xs text-orange-600">Partial Overlaps</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-700">8</div>
                <div className="text-xs text-blue-600">Indirect Support</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
