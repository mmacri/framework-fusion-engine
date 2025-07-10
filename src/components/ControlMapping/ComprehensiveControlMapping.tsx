import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Filter, 
  GitBranch, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  Download,
  RefreshCw,
  Shield,
  Link,
  Target
} from 'lucide-react';

// Import all framework data
import { masterListData, tripwireCoreData, alertData } from '../../data/masterFramework';
import { nistControls } from '../../data/controls/nistControls';
import { cisControls } from '../../data/controls/cisControls';
import { pciControls } from '../../data/controls/pciControls';
import { hipaaControls } from '../../data/controls/hipaaControls';
import { soxControls } from '../../data/controls/soxControls';
import { controlRelationships } from '../../data/relationships/controlRelationships';
import { MasterFrameworkRecord } from '../../types/masterFramework';
import { Control } from '../../types/report';

interface ControlMapping {
  id: string;
  framework: string;
  title: string;
  category: string;
  priority: string;
  mappedControls: {
    framework: string;
    controlId: string;
    title: string;
    correlationType: 'exact' | 'partial' | 'related' | 'none';
    correlationScore: number;
    notes?: string;
  }[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  gapAnalysis: string[];
}

export function ComprehensiveControlMapping() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('mappings');
  const [showOnlyMapped, setShowOnlyMapped] = useState(false);

  // Combine all framework data
  const allControls = useMemo(() => {
    const controls: ControlMapping[] = [];

    // Master Framework Records
    masterListData.forEach(record => {
      controls.push({
        id: record.id,
        framework: 'Master List',
        title: record.reportName,
        category: record.domain,
        priority: record.frequency === 'Alert' ? 'Critical' : record.frequency === 'Daily' ? 'High' : 'Medium',
        mappedControls: [],
        riskLevel: record.frequency === 'Alert' ? 'critical' : 'medium',
        gapAnalysis: []
      });
    });

    // Tripwire Core Data
    tripwireCoreData.forEach(record => {
      controls.push({
        id: record.id,
        framework: 'Tripwire Core',
        title: record.reportName,
        category: record.domain,
        priority: record.frequency === 'Alert' ? 'Critical' : 'High',
        mappedControls: [],
        riskLevel: 'high',
        gapAnalysis: []
      });
    });

    // Alert Data
    alertData.forEach(record => {
      controls.push({
        id: record.id,
        framework: 'Alert',
        title: record.reportName,
        category: record.domain,
        priority: 'Critical',
        mappedControls: [],
        riskLevel: 'critical',
        gapAnalysis: []
      });
    });

    // NIST Controls
    nistControls.forEach(control => {
      controls.push({
        id: control.id,
        framework: 'NIST 800-53',
        title: control.title,
        category: control.category,
        priority: control.priority,
        mappedControls: [],
        riskLevel: control.priority === 'Critical' ? 'critical' : 'medium',
        gapAnalysis: []
      });
    });

    // CIS Controls
    cisControls.forEach(control => {
      controls.push({
        id: control.id,
        framework: 'CIS Controls',
        title: control.title,
        category: control.category,
        priority: control.priority,
        mappedControls: [],
        riskLevel: control.priority === 'Critical' ? 'critical' : 'medium',
        gapAnalysis: []
      });
    });

    // PCI Controls
    pciControls.forEach(control => {
      controls.push({
        id: control.id,
        framework: 'PCI DSS',
        title: control.title,
        category: control.category,
        priority: control.priority,
        mappedControls: [],
        riskLevel: control.priority === 'Critical' ? 'critical' : 'medium',
        gapAnalysis: []
      });
    });

    // HIPAA Controls
    hipaaControls.forEach(control => {
      controls.push({
        id: control.id,
        framework: 'HIPAA',
        title: control.title,
        category: control.category,
        priority: control.priority,
        mappedControls: [],
        riskLevel: control.priority === 'Critical' ? 'critical' : 'medium',
        gapAnalysis: []
      });
    });

    // SOX Controls
    soxControls.forEach(control => {
      controls.push({
        id: control.id,
        framework: 'SOX',
        title: control.title,
        category: control.category,
        priority: control.priority,
        mappedControls: [],
        riskLevel: control.priority === 'Critical' ? 'critical' : 'medium',
        gapAnalysis: []
      });
    });

    return controls;
  }, []);

  // Enhanced mapping logic with control relationships
  const controlMappings = useMemo(() => {
    const mappings = [...allControls];

    // Apply existing control relationships
    controlRelationships.forEach(relationship => {
      const sourceControl = mappings.find(c => c.id === relationship.source);
      const targetControl = mappings.find(c => c.id === relationship.target);

      if (sourceControl && targetControl) {
        sourceControl.mappedControls.push({
          framework: targetControl.framework,
          controlId: targetControl.id,
          title: targetControl.title,
          correlationType: relationship.relationship === 'Direct Mapping' ? 'exact' : 'partial',
          correlationScore: relationship.confidence,
          notes: relationship.description
        });

        targetControl.mappedControls.push({
          framework: sourceControl.framework,
          controlId: sourceControl.id,
          title: sourceControl.title,
          correlationType: relationship.relationship === 'Direct Mapping' ? 'exact' : 'partial',
          correlationScore: relationship.confidence,
          notes: relationship.description
        });
      }
    });

    // Add Master Framework mappings from control data
    mappings.forEach(control => {
      if (control.framework !== 'Master List') {
        // Find potential master framework mappings
        const potentialMappings = masterListData.filter(master => {
          const domainMatch = master.domain.toLowerCase().includes(control.category.toLowerCase()) ||
                             control.category.toLowerCase().includes(master.domain.toLowerCase());
          const cipMatch = control.id.includes('CIP') && master.cipStandards.includes(control.id.split('-')[0]);
          return domainMatch || cipMatch;
        });

        potentialMappings.forEach(master => {
          if (!control.mappedControls.find(m => m.controlId === master.id)) {
            control.mappedControls.push({
              framework: 'Master List',
              controlId: master.id,
              title: master.reportName,
              correlationType: 'related',
              correlationScore: 70,
              notes: `Mapped based on domain similarity: ${control.category} -> ${master.domain}`
            });
          }
        });
      }
    });

    // Add gap analysis
    mappings.forEach(control => {
      const gaps: string[] = [];
      
      const frameworksCovered = new Set(control.mappedControls.map(m => m.framework));
      const allFrameworks = ['Master List', 'NIST 800-53', 'CIS Controls', 'PCI DSS', 'HIPAA', 'SOX'];
      
      allFrameworks.forEach(framework => {
        if (!frameworksCovered.has(framework) && control.framework !== framework) {
          gaps.push(`No mapping to ${framework}`);
        }
      });

      if (control.mappedControls.length === 0) {
        gaps.push('Isolated control - no correlations found');
      }

      if (control.mappedControls.filter(m => m.correlationType === 'exact').length === 0) {
        gaps.push('No exact mappings - review required');
      }

      control.gapAnalysis = gaps;
    });

    return mappings;
  }, [allControls]);

  // Filter controls
  const filteredControls = useMemo(() => {
    return controlMappings.filter(control => {
      const matchesSearch = control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          control.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFramework = selectedFramework === 'all' || control.framework === selectedFramework;
      const matchesCategory = selectedCategory === 'all' || control.category === selectedCategory;
      const matchesMapped = !showOnlyMapped || control.mappedControls.length > 0;

      return matchesSearch && matchesFramework && matchesCategory && matchesMapped;
    });
  }, [controlMappings, searchTerm, selectedFramework, selectedCategory, showOnlyMapped]);

  // Get unique frameworks and categories
  const frameworks = [...new Set(allControls.map(c => c.framework))];
  const categories = [...new Set(allControls.map(c => c.category))];

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCorrelationIcon = (type: string) => {
    switch (type) {
      case 'exact': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'partial': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'related': return <Link className="h-4 w-4 text-blue-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const stats = useMemo(() => {
    const totalControls = controlMappings.length;
    const mappedControls = controlMappings.filter(c => c.mappedControls.length > 0).length;
    const exactMappings = controlMappings.reduce((sum, c) => 
      sum + c.mappedControls.filter(m => m.correlationType === 'exact').length, 0);
    const criticalControls = controlMappings.filter(c => c.riskLevel === 'critical').length;

    return {
      totalControls,
      mappedControls,
      exactMappings,
      criticalControls,
      mappingCoverage: totalControls > 0 ? Math.round((mappedControls / totalControls) * 100) : 0
    };
  }, [controlMappings]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Comprehensive Control Mapping</h1>
          <p className="text-muted-foreground">
            Cross-reference all control frameworks: Master List, Tripwire Core, Alert Lists, and compliance standards
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Mappings
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{stats.totalControls}</div>
            <p className="text-xs text-muted-foreground">Total Controls</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.mappedControls}</div>
            <p className="text-xs text-muted-foreground">Mapped Controls</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.exactMappings}</div>
            <p className="text-xs text-muted-foreground">Exact Mappings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.criticalControls}</div>
            <p className="text-xs text-muted-foreground">Critical Controls</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{stats.mappingCoverage}%</div>
            <p className="text-xs text-muted-foreground">Mapping Coverage</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search controls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                {frameworks.map(framework => (
                  <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant={showOnlyMapped ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOnlyMapped(!showOnlyMapped)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Mapped Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="mappings">Control Mappings</TabsTrigger>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="matrix">Correlation Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="mappings">
          <Card>
            <CardHeader>
              <CardTitle>Control Mappings ({filteredControls.length} controls)</CardTitle>
              <CardDescription>
                Comprehensive view of control correlations across all frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Control ID</TableHead>
                    <TableHead>Framework</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Mappings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredControls.map((control) => (
                    <TableRow key={`${control.framework}-${control.id}`}>
                      <TableCell className="font-medium">{control.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{control.framework}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{control.title}</TableCell>
                      <TableCell>{control.category}</TableCell>
                      <TableCell>
                        <Badge className={getRiskBadgeColor(control.riskLevel)}>
                          {control.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {control.mappedControls.slice(0, 3).map((mapping, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              {getCorrelationIcon(mapping.correlationType)}
                              <Badge variant="outline" className="text-xs">
                                {mapping.controlId}
                              </Badge>
                            </div>
                          ))}
                          {control.mappedControls.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{control.mappedControls.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps">
          <Card>
            <CardHeader>
              <CardTitle>Gap Analysis</CardTitle>
              <CardDescription>
                Identify controls with missing mappings and coverage gaps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredControls
                  .filter(control => control.gapAnalysis.length > 0)
                  .map((control) => (
                    <Alert key={`${control.framework}-${control.id}`}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{control.id}</span> - {control.title}
                            <div className="text-sm text-muted-foreground mt-1">
                              {control.gapAnalysis.join(', ')}
                            </div>
                          </div>
                          <Badge variant="outline">{control.framework}</Badge>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matrix">
          <Card>
            <CardHeader>
              <CardTitle>Correlation Matrix</CardTitle>
              <CardDescription>
                Framework-to-framework mapping overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {frameworks.map(sourceFramework => (
                  <Card key={sourceFramework}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">{sourceFramework}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {frameworks
                          .filter(f => f !== sourceFramework)
                          .map(targetFramework => {
                            const mappingCount = controlMappings
                              .filter(c => c.framework === sourceFramework)
                              .reduce((sum, control) => 
                                sum + control.mappedControls.filter(m => m.framework === targetFramework).length, 0);
                            
                            return (
                              <div key={targetFramework} className="flex items-center justify-between text-sm">
                                <span className="truncate">{targetFramework}</span>
                                <Badge variant="outline">{mappingCount}</Badge>
                              </div>
                            );
                          })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}