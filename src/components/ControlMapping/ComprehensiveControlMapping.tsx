import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  Download,
  Shield,
  Link,
  Target,
  ChevronDown,
  ChevronRight,
  GitBranch,
  Users,
  BarChart3
} from 'lucide-react';

// Import all framework data
import { masterListData, tripwireCoreData, alertData } from '../../data/masterFramework';
import { nistControls } from '../../data/controls/nistControls';
import { cisControls } from '../../data/controls/cisControls';
import { pciControls } from '../../data/controls/pciControls';
import { hipaaControls } from '../../data/controls/hipaaControls';
import { soxControls } from '../../data/controls/soxControls';
import { controlRelationships } from '../../data/relationships/controlRelationships';

interface ControlCorrelation {
  masterId: string;
  masterTitle: string;
  masterDomain: string;
  frequency: string;
  correlations: {
    framework: string;
    controlId: string;
    title: string;
    mappingType: 'Full' | 'Partial' | 'Related' | 'None';
    confidence: number;
    description: string;
    gaps?: string[];
  }[];
}

interface DomainGroup {
  domain: string;
  masterControls: number;
  correlations: {
    framework: string;
    mapped: number;
    total: number;
    coverage: number;
  }[];
}

export function ComprehensiveControlMapping() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('by-domain');

  // Get unique domains from master list
  const domains = useMemo(() => {
    const uniqueDomains = [...new Set(masterListData.map(item => item.domain))];
    return uniqueDomains.sort();
  }, []);

  // Create correlation mapping based on master list groupings
  const correlationData = useMemo(() => {
    const correlations: ControlCorrelation[] = [];

    masterListData.forEach(masterControl => {
      const correlation: ControlCorrelation = {
        masterId: masterControl.id,
        masterTitle: masterControl.reportName,
        masterDomain: masterControl.domain,
        frequency: masterControl.frequency,
        correlations: []
      };

      // Check Tripwire Core correlations using master list correlatedRecords
      if (masterControl.correlatedRecords) {
        const tripwireMatches = tripwireCoreData.filter(tc => 
          masterControl.correlatedRecords?.includes(tc.id) ||
          tc.cipStandards === masterControl.cipStandards ||
          tc.domain.toLowerCase().includes(masterControl.domain.toLowerCase())
        );

        tripwireMatches.forEach(match => {
          const isExactMatch = masterControl.correlatedRecords?.includes(match.id);
          correlation.correlations.push({
            framework: 'Tripwire Core',
            controlId: match.id,
            title: match.reportName,
            mappingType: isExactMatch ? 'Full' : 'Partial',
            confidence: isExactMatch ? 95 : 75,
            description: `Domain: ${match.domain}, CIP: ${match.cipStandards}`,
            gaps: match.cipStandards !== masterControl.cipStandards ? ['Different CIP standards'] : []
          });
        });
      }

      // Check Alert correlations using master list correlatedRecords
      if (masterControl.correlatedRecords) {
        const alertMatches = alertData.filter(al => 
          masterControl.correlatedRecords?.includes(al.id) ||
          al.cipStandards === masterControl.cipStandards ||
          al.domain.toLowerCase().includes(masterControl.domain.toLowerCase())
        );

        alertMatches.forEach(match => {
          const isExactMatch = masterControl.correlatedRecords?.includes(match.id);
          correlation.correlations.push({
            framework: 'Alert',
            controlId: match.id,
            title: match.reportName,
            mappingType: isExactMatch ? 'Full' : 'Partial',
            confidence: isExactMatch ? 95 : 80,
            description: `Domain: ${match.domain}, CIP: ${match.cipStandards}`,
            gaps: match.frequency !== masterControl.frequency ? ['Different frequency requirements'] : []
          });
        });
      }

      // Check NIST correlations using master list correlatedRecords
      if (masterControl.correlatedRecords) {
        const nistMatches = nistControls.filter(nist => 
          masterControl.correlatedRecords?.includes(nist.id) ||
          (masterControl.domain.includes('Access') && nist.category === 'Access Control') ||
          (masterControl.domain.includes('AV') && nist.category === 'System and Information Integrity') ||
          (masterControl.domain.includes('Config') && nist.category === 'Configuration Management') ||
          (masterControl.domain.includes('Network') && nist.category === 'System and Communications Protection')
        );

        nistMatches.forEach(match => {
          const isExactMatch = masterControl.correlatedRecords?.includes(match.id);
          correlation.correlations.push({
            framework: 'NIST 800-53',
            controlId: match.id,
            title: match.title,
            mappingType: isExactMatch ? 'Full' : 'Partial',
            confidence: isExactMatch ? 90 : 65,
            description: `Category: ${match.category}, Priority: ${match.priority}`,
            gaps: !isExactMatch ? ['Requires manual validation'] : []
          });
        });
      }

      // Check CIS correlations
      const cisMatches = cisControls.filter(cis => {
        const domainMatch = 
          (masterControl.domain.includes('Access') && cis.category.includes('Access')) ||
          (masterControl.domain.includes('AV') && cis.category.includes('Malware')) ||
          (masterControl.domain.includes('Config') && cis.category.includes('Configuration')) ||
          (masterControl.domain.includes('Network') && cis.category.includes('Network'));
        
        return domainMatch || cis.masterFrameworkMapping?.masterId === masterControl.id;
      });

      cisMatches.forEach(match => {
        const isExactMapping = match.masterFrameworkMapping?.masterId === masterControl.id;
        correlation.correlations.push({
          framework: 'CIS Controls',
          controlId: match.id,
          title: match.title,
          mappingType: isExactMapping ? 'Full' : 'Related',
          confidence: isExactMapping ? 88 : 60,
          description: `Category: ${match.category}, Family: ${match.family}`,
          gaps: !isExactMapping ? ['Category-based mapping only'] : []
        });
      });

      // Check PCI correlations  
      const pciMatches = pciControls.filter(pci => {
        const domainMatch = 
          (masterControl.domain.includes('Access') && pci.category === 'Access Control') ||
          (masterControl.domain.includes('Network') && pci.category === 'Network Security');
        
        return domainMatch;
      });

      pciMatches.forEach(match => {
        correlation.correlations.push({
          framework: 'PCI DSS',
          controlId: match.id,
          title: match.title,
          mappingType: 'Related',
          confidence: 70,
          description: `Category: ${match.category}, Family: ${match.family}`,
          gaps: ['Payment focus vs general security', 'Manual review recommended']
        });
      });

      // Check HIPAA correlations
      const hipaaMatches = hipaaControls.filter(hipaa => {
        const domainMatch = 
          (masterControl.domain.includes('Access') && hipaa.category.includes('Technical')) ||
          (masterControl.domain.includes('AV') && hipaa.category.includes('Technical'));
        
        return domainMatch;
      });

      hipaaMatches.forEach(match => {
        correlation.correlations.push({
          framework: 'HIPAA',
          controlId: match.id,
          title: match.title,
          mappingType: 'Related',
          confidence: 65,
          description: `Category: ${match.category}, Family: ${match.family}`,
          gaps: ['Healthcare focus vs general security', 'ePHI specific requirements']
        });
      });

      // Check SOX correlations
      const soxMatches = soxControls.filter(sox => {
        const domainMatch = 
          (masterControl.domain.includes('Access') && sox.id.includes('CC6')) ||
          (masterControl.domain.includes('Config') && sox.id.includes('CC8'));
        
        return domainMatch;
      });

      soxMatches.forEach(match => {
        correlation.correlations.push({
          framework: 'SOX',
          controlId: match.id,
          title: match.title,
          mappingType: 'Related',
          confidence: 60,
          description: `Category: ${match.category}, Family: ${match.family}`,
          gaps: ['Financial focus vs operational security', 'ITGC perspective needed']
        });
      });

      correlations.push(correlation);
    });

    return correlations;
  }, []);

  // Group by domain for domain view
  const domainGroups = useMemo(() => {
    const groups: DomainGroup[] = [];
    
    domains.forEach(domain => {
      const masterControls = masterListData.filter(m => m.domain === domain);
      const domainCorrelations = correlationData.filter(c => c.masterDomain === domain);
      
      const frameworks = ['Tripwire Core', 'Alert', 'NIST 800-53', 'CIS Controls', 'PCI DSS', 'HIPAA', 'SOX'];
      const correlations = frameworks.map(framework => {
        const mapped = domainCorrelations.reduce((sum, dc) => 
          sum + dc.correlations.filter(corr => corr.framework === framework).length, 0);
        const total = masterControls.length;
        
        return {
          framework,
          mapped,
          total,
          coverage: total > 0 ? Math.round((mapped / total) * 100) : 0
        };
      });

      groups.push({
        domain,
        masterControls: masterControls.length,
        correlations
      });
    });

    return groups;
  }, [domains, correlationData]);

  // Filter data
  const filteredData = useMemo(() => {
    return correlationData.filter(item => {
      const matchesSearch = item.masterTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.masterId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDomain = selectedDomain === 'all' || item.masterDomain === selectedDomain;
      const matchesFramework = selectedFramework === 'all' || 
                              item.correlations.some(c => c.framework === selectedFramework);
      
      return matchesSearch && matchesDomain && matchesFramework;
    });
  }, [correlationData, searchTerm, selectedDomain, selectedFramework]);

  const toggleExpanded = (domain: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(domain)) {
      newExpanded.delete(domain);
    } else {
      newExpanded.add(domain);
    }
    setExpandedGroups(newExpanded);
  };

  const getMappingIcon = (type: string) => {
    switch (type) {
      case 'Full': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Partial': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'Related': return <Link className="h-4 w-4 text-blue-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMappingColor = (type: string) => {
    switch (type) {
      case 'Full': return 'bg-green-100 text-green-800 border-green-200';
      case 'Partial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Related': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const frameworks = ['Tripwire Core', 'Alert', 'NIST 800-53', 'CIS Controls', 'PCI DSS', 'HIPAA', 'SOX'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Control Mapping & Correlation</h1>
          <p className="text-muted-foreground">
            See how Master Framework controls correlate across all compliance standards
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{masterListData.length}</div>
            <p className="text-xs text-muted-foreground">Master Controls</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {correlationData.filter(c => c.correlations.some(corr => corr.mappingType === 'Full')).length}
            </div>
            <p className="text-xs text-muted-foreground">Fully Mapped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {correlationData.filter(c => c.correlations.some(corr => corr.mappingType === 'Partial')).length}
            </div>
            <p className="text-xs text-muted-foreground">Partially Mapped</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {correlationData.filter(c => c.correlations.length === 0).length}
            </div>
            <p className="text-xs text-muted-foreground">Unmapped</p>
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
                  placeholder="Search master controls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                {domains.map(domain => (
                  <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="by-domain">By Domain</TabsTrigger>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          <TabsTrigger value="coverage">Coverage Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="by-domain">
          <div className="space-y-4">
            {domainGroups
              .filter(group => selectedDomain === 'all' || group.domain === selectedDomain)
              .map((group) => (
                <Card key={group.domain}>
                  <CardHeader 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleExpanded(group.domain)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {expandedGroups.has(group.domain) ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                        <CardTitle className="text-lg">{group.domain}</CardTitle>
                        <Badge variant="outline">{group.masterControls} controls</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {group.correlations.map(corr => (
                          <div key={corr.framework} className="text-center">
                            <div className="text-sm font-medium">{corr.mapped}/{corr.total}</div>
                            <div className="text-xs text-muted-foreground">{corr.framework.split(' ')[0]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {group.correlations.map(corr => (
                        <div key={corr.framework} className="flex items-center space-x-2">
                          <span className="text-sm font-medium w-24">{corr.framework.split(' ')[0]}:</span>
                          <Progress value={corr.coverage} className="flex-1 h-2" />
                          <span className="text-sm text-muted-foreground">{corr.coverage}%</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  
                  {expandedGroups.has(group.domain) && (
                    <CardContent>
                      <div className="space-y-3">
                        {filteredData
                          .filter(item => item.masterDomain === group.domain)
                          .map((item) => (
                            <div key={item.masterId} className="border rounded-lg p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{item.masterId}: {item.masterTitle}</h4>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge variant="outline" className="text-xs">{item.frequency}</Badge>
                                    <span className="text-sm text-muted-foreground">
                                      {item.correlations.length} correlations found
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              {item.correlations.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {item.correlations.map((corr, idx) => (
                                    <div key={idx} className="border rounded p-3 space-y-2">
                                      <div className="flex items-center justify-between">
                                        <Badge variant="outline" className="text-xs">{corr.framework}</Badge>
                                        <div className="flex items-center space-x-1">
                                          {getMappingIcon(corr.mappingType)}
                                          <Badge className={getMappingColor(corr.mappingType)}>
                                            {corr.mappingType}
                                          </Badge>
                                        </div>
                                      </div>
                                      <div>
                                        <a 
                                          href={`/controls/${corr.framework.toLowerCase().replace(/\s+/g, '-')}/${corr.controlId}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="font-medium text-sm text-primary hover:underline"
                                        >
                                          {corr.controlId}
                                        </a>
                                        <div className="text-xs text-muted-foreground">{corr.title}</div>
                                      </div>
                                      <div className="text-xs text-muted-foreground">{corr.description}</div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs">Confidence: {corr.confidence}%</span>
                                        {corr.gaps && corr.gaps.length > 0 && (
                                          <div title={corr.gaps.join(', ')}>
                                            <AlertTriangle className="h-3 w-3 text-yellow-600" />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <Alert>
                                  <AlertTriangle className="h-4 w-4" />
                                  <AlertDescription>
                                    No correlations found for this control - manual review recommended
                                  </AlertDescription>
                                </Alert>
                              )}
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Control Correlations</CardTitle>
              <CardDescription>
                Complete list of correlations with mapping details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Master Control</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Correlated Frameworks</TableHead>
                    <TableHead>Best Match</TableHead>
                    <TableHead>Coverage Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => {
                    const bestMatch = item.correlations.reduce((best, current) => 
                      current.confidence > (best?.confidence || 0) ? current : best, null);
                    
                    const avgCoverage = item.correlations.length > 0 ? 
                      Math.round(item.correlations.reduce((sum, c) => sum + c.confidence, 0) / item.correlations.length) : 0;

                    return (
                      <TableRow key={item.masterId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.masterId}</div>
                            <div className="text-sm text-muted-foreground">{item.masterTitle}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.masterDomain}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {frameworks.map(framework => {
                              const hasMapping = item.correlations.some(c => c.framework === framework);
                              return (
                                <Badge 
                                  key={framework} 
                                  variant={hasMapping ? "default" : "outline"}
                                  className={hasMapping ? "bg-green-100 text-green-800" : ""}
                                >
                                  {framework.split(' ')[0]}
                                </Badge>
                              );
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          {bestMatch ? (
                            <div className="flex items-center space-x-2">
                              {getMappingIcon(bestMatch.mappingType)}
                              <a 
                                href={`/controls/${bestMatch.framework.toLowerCase().replace(/\s+/g, '-')}/${bestMatch.controlId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                {bestMatch.controlId}
                              </a>
                              <Badge className={getMappingColor(bestMatch.mappingType)}>
                                {bestMatch.confidence}%
                              </Badge>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">No matches</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={avgCoverage} className="w-16 h-2" />
                            <span className="text-sm">{avgCoverage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage">
          <Card>
            <CardHeader>
              <CardTitle>Framework Coverage Matrix</CardTitle>
              <CardDescription>
                Coverage percentage by domain and framework
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Controls</TableHead>
                    {frameworks.map(framework => (
                      <TableHead key={framework} className="text-center">
                        {framework.split(' ')[0]}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domainGroups.map((group) => (
                    <TableRow key={group.domain}>
                      <TableCell className="font-medium">{group.domain}</TableCell>
                      <TableCell>{group.masterControls}</TableCell>
                      {group.correlations.map((corr) => (
                        <TableCell key={corr.framework} className="text-center">
                          <div className="flex flex-col items-center space-y-1">
                            <Progress value={corr.coverage} className="w-12 h-2" />
                            <span className="text-xs">{corr.coverage}%</span>
                            <span className="text-xs text-muted-foreground">
                              {corr.mapped}/{corr.total}
                            </span>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}