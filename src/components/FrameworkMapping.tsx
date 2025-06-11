
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NetworkVisualization } from "@/components/NetworkVisualization";
import { useState } from "react";

const mappingData = [
  {
    source: "NIST AC-1",
    target: "PCI 7.1.1",
    relationship: "Direct Mapping",
    confidence: 95,
    description: "Both controls address access control policies and procedures"
  },
  {
    source: "NIST IA-2",
    target: "PCI 8.2.1",
    relationship: "Partial Overlap",
    confidence: 78,
    description: "User identification requirements with some differences in implementation"
  },
  {
    source: "HIPAA 164.312(a)(1)",
    target: "SOX CC6.1",
    relationship: "Indirect Support",
    confidence: 65,
    description: "Security responsibility assignment supports access control objectives"
  },
  {
    source: "Adobe CCF-001",
    target: "NIST AC-1",
    relationship: "Direct Mapping",
    confidence: 92,
    description: "Identity and access management controls with direct correlation"
  },
  {
    source: "Adobe CCF-001",
    target: "PCI 7.1.1",
    relationship: "Partial Overlap",
    confidence: 71,
    description: "Access control systems with some implementation differences"
  }
];

const frameworkMatrix = [
  { framework1: "NIST 800-53", framework2: "PCI-DSS", mapped: 187, total: 281, percentage: 67 },
  { framework1: "NIST 800-53", framework2: "HIPAA", mapped: 142, total: 164, percentage: 87 },
  { framework1: "NIST 800-53", framework2: "SOX", mapped: 98, total: 127, percentage: 77 },
  { framework1: "PCI-DSS", framework2: "HIPAA", mapped: 89, total: 164, percentage: 54 },
  { framework1: "PCI-DSS", framework2: "SOX", mapped: 76, total: 127, percentage: 60 },
  { framework1: "HIPAA", framework2: "SOX", mapped: 45, total: 127, percentage: 35 },
  { framework1: "Adobe CCF", framework2: "NIST 800-53", mapped: 234, total: 345, percentage: 68 },
  { framework1: "Adobe CCF", framework2: "PCI-DSS", mapped: 156, total: 281, percentage: 55 }
];

const frameworks = ["NIST 800-53", "PCI-DSS", "HIPAA", "SOX", "Adobe CCF"];

export function FrameworkMapping() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleFrameworkFilter = (framework: string) => {
    setSelectedFrameworks(prev => 
      prev.includes(framework) 
        ? prev.filter(f => f !== framework)
        : [...prev, framework]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Framework Mapping</h1>
        <p className="text-muted-foreground mt-2">
          Explore control relationships and mappings between compliance frameworks
        </p>
      </div>

      <Tabs defaultValue="visualization" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visualization">Visual Network</TabsTrigger>
          <TabsTrigger value="relationships">Control Relationships</TabsTrigger>
          <TabsTrigger value="matrix">Framework Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Relationship Network</CardTitle>
              <CardDescription>
                Visual representation of control relationships across frameworks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-center flex-wrap">
                <div className="flex gap-2 flex-wrap">
                  {frameworks.map(framework => (
                    <Badge
                      key={framework}
                      variant={selectedFrameworks.includes(framework) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleFrameworkFilter(framework)}
                    >
                      {framework}
                    </Badge>
                  ))}
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="access">Access Control</SelectItem>
                    <SelectItem value="audit">Audit & Logging</SelectItem>
                    <SelectItem value="encryption">Encryption</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <NetworkVisualization 
                selectedFrameworks={selectedFrameworks.length ? selectedFrameworks : undefined}
                selectedCategory={selectedCategory || undefined}
              />
              
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-green-500"></div>
                  <span>Direct Mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-yellow-500"></div>
                  <span>Partial Overlap</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  <span>Indirect Support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relationships" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Control Relationship Details</CardTitle>
              <CardDescription>
                Detailed mappings between individual controls across frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mappingData.map((mapping, index) => (
                  <div key={index} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{mapping.source}</Badge>
                        <span className="text-muted-foreground">→</span>
                        <Badge variant="outline">{mapping.target}</Badge>
                      </div>
                      <Badge 
                        className={
                          mapping.relationship === "Direct Mapping" ? "bg-green-100 text-green-800" :
                          mapping.relationship === "Partial Overlap" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }
                      >
                        {mapping.relationship}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{mapping.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Confidence:</span>
                      <Progress value={mapping.confidence} className="flex-1 max-w-32" />
                      <span className="text-sm text-muted-foreground">{mapping.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matrix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Framework Coverage Matrix</CardTitle>
              <CardDescription>
                Cross-framework mapping coverage percentages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {frameworkMatrix.map((item, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.framework1}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="font-medium">{item.framework2}</span>
                      </div>
                      <Badge variant="secondary">
                        {item.mapped}/{item.total} controls
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Progress value={item.percentage} className="flex-1" />
                      <span className="text-sm font-medium w-12">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
