import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  FileText, 
  Download, 
  Filter, 
  Search,
  BarChart3,
  Target,
  Calendar,
  Users
} from 'lucide-react';
import { masterListData, tripwireCoreData, alertData } from '../../data/masterFramework';
import { MasterFrameworkRecord } from '../../types/masterFramework';
import { getSavedAssessments, getAssessmentsByProject, getAssessmentsByReport, getAssessmentsByGoalObjective } from '../../utils/assessmentStorage';

interface ReportFilters {
  framework: string;
  reportName: string;
  domain: string;
  goalObjective: string;
  searchTerm: string;
}

interface ReportsMainProps {
  activeView?: string;
}

export function ReportsMain({ activeView }: ReportsMainProps) {
  const [filters, setFilters] = useState<ReportFilters>({
    framework: 'all',
    reportName: '',
    domain: 'all',
    goalObjective: '',
    searchTerm: ''
  });
  const [activeReportType, setActiveReportType] = useState('framework-reports');

  useEffect(() => {
    if (activeView && ['framework-reports', 'assessment-reports', 'compliance-dashboard'].includes(activeView)) {
      setActiveReportType(activeView);
    }
  }, [activeView]);

  // Combine all framework data
  const allData = useMemo(() => [
    ...masterListData,
    ...tripwireCoreData,
    ...alertData
  ], []);

  // Extract unique values for filters
  const filterOptions = useMemo(() => {
    const frameworks = [...new Set(allData.map(record => record.framework))];
    const domains = [...new Set(allData.map(record => record.domain))];
    const reportNames = [...new Set(allData.map(record => record.reportName))];
    
    return { frameworks, domains, reportNames };
  }, [allData]);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return allData.filter(record => {
      // Framework filter
      if (filters.framework !== 'all' && record.framework !== filters.framework) {
        return false;
      }

      // Domain filter
      if (filters.domain !== 'all' && record.domain !== filters.domain) {
        return false;
      }

      // Report name filter
      if (filters.reportName && !record.reportName.toLowerCase().includes(filters.reportName.toLowerCase())) {
        return false;
      }

      // Goal/Objective filter
      if (filters.goalObjective && !record.goalObjective.toLowerCase().includes(filters.goalObjective.toLowerCase())) {
        return false;
      }

      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          record.reportName.toLowerCase().includes(searchLower) ||
          record.description.toLowerCase().includes(searchLower) ||
          record.domain.toLowerCase().includes(searchLower) ||
          record.goalObjective.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [allData, filters]);

  const handleFilterChange = (key: keyof ReportFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      framework: 'all',
      reportName: '',
      domain: 'all',
      goalObjective: '',
      searchTerm: ''
    });
  };

  const exportReport = (format: 'csv' | 'excel' | 'pdf') => {
    // Create report data
    const reportData = filteredData.map(record => ({
      Framework: record.framework,
      Domain: record.domain,
      'Report Name': record.reportName,
      'CIP Standards': record.cipStandards,
      'CIP Requirement': record.cipReq,
      Frequency: record.frequency,
      'Asset Scope': record.assetScope,
      'Time Scope': record.timeScope,
      'Data Retention': record.dataRetention,
      'Goal/Objective': record.goalObjective,
      Description: record.description,
      Details: record.details,
      'Output Format': record.outputFormat,
      'Primary Audience': record.primaryAudience,
      'Likely Sources': record.likelySources.join(', '),
      Notes: record.notes,
      Status: record.status
    }));

    if (format === 'csv') {
      const csvContent = [
        Object.keys(reportData[0] || {}).join(','),
        ...reportData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `compliance-report-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    }
  };

  const mockAssessmentResults = getSavedAssessments();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance Reports</h1>
        <p className="text-gray-600 mt-2">
          Generate comprehensive reports from framework data and assessment results
        </p>
      </div>

      {/* Report Type Tabs */}
      <Tabs value={activeReportType} onValueChange={setActiveReportType}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="framework-reports">Framework Reports</TabsTrigger>
          <TabsTrigger value="assessment-results">Assessment Results</TabsTrigger>
          <TabsTrigger value="compliance-dashboard">Compliance Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="framework-reports" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Report Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium">Framework</label>
                  <Select value={filters.framework} onValueChange={(value) => handleFilterChange('framework', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Frameworks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Frameworks</SelectItem>
                      {filterOptions.frameworks.map(framework => (
                        <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Domain</label>
                  <Select value={filters.domain} onValueChange={(value) => handleFilterChange('domain', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Domains" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Domains</SelectItem>
                      {filterOptions.domains.map(domain => (
                        <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Report Name</label>
                  <Input
                    placeholder="Filter by report name..."
                    value={filters.reportName}
                    onChange={(e) => handleFilterChange('reportName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Goal/Objective</label>
                  <Input
                    placeholder="Filter by goal/objective..."
                    value={filters.goalObjective}
                    onChange={(e) => handleFilterChange('goalObjective', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search across all fields..."
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    className="w-64"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Button onClick={() => exportReport('csv')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{filteredData.length}</p>
                    <p className="text-sm text-gray-600">Total Records</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{filterOptions.frameworks.length}</p>
                    <p className="text-sm text-gray-600">Frameworks</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{filterOptions.domains.length}</p>
                    <p className="text-sm text-gray-600">Domains</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{filteredData.filter(r => r.status === 'Enabled').length}</p>
                    <p className="text-sm text-gray-600">Enabled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle>Report Results</CardTitle>
              <CardDescription>
                {filteredData.length} records found matching your criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Framework</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Goal/Objective</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.slice(0, 20).map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Badge variant="outline">{record.framework}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{record.domain}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{record.reportName}</TableCell>
                        <TableCell>
                          <Badge variant={record.frequency === 'Alert' ? 'destructive' : 'default'}>
                            {record.frequency}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{record.goalObjective}</TableCell>
                        <TableCell>
                          <Badge variant={record.status === 'Enabled' ? 'default' : 'secondary'}>
                            {record.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {filteredData.length > 20 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Showing first 20 of {filteredData.length} results. Export for full data.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment-results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Assessment Results
              </CardTitle>
              <CardDescription>
                View and analyze results from completed compliance assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssessmentResults.length === 0 ? (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Assessment Results</h3>
                    <p className="text-gray-600">Complete assessments to see results here.</p>
                  </div>
                ) : (
                  mockAssessmentResults.map((result, index) => (
                    <div key={result.id || index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{result.projectName}</h3>
                          <p className="text-sm text-gray-600">{result.assessmentType}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={result.score >= 85 ? 'default' : 'secondary'}>
                            {result.score}% Score
                          </Badge>
                          <p className="text-sm text-gray-600">{new Date(result.completedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Related Reports:</p>
                        <div className="flex flex-wrap gap-2">
                          {result.relatedReports.slice(0, 3).map((report, idx) => (
                            <Badge key={idx} variant="outline">{report}</Badge>
                          ))}
                          {result.relatedReports.length > 3 && (
                            <Badge variant="outline">+{result.relatedReports.length - 3} more</Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                
                {/* Generate New Assessment Report Section */}
                <Card className="border-dashed">
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Search Assessment Results</h3>
                    <p className="text-gray-600 mb-4">
                      Find assessment results by project name, report name, or goal/objective
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input 
                        placeholder="Search by project name..." 
                        onChange={(e) => {
                          // This would filter the assessment results
                          console.log('Searching for:', e.target.value);
                        }}
                      />
                      <Input 
                        placeholder="Search by report name or goal..." 
                        onChange={(e) => {
                          // This would filter by report name or goal/objective
                          console.log('Searching for:', e.target.value);
                        }}
                      />
                    </div>
                    <Button onClick={() => {
                      // Refresh assessment results
                      const freshResults = getSavedAssessments();
                      console.log('Found assessments:', freshResults);
                    }}>
                      <Search className="h-4 w-4 mr-2" />
                      Search Assessments
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance-dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Framework Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Master List Records</span>
                    <Badge>{masterListData.filter(r => r.status === 'Enabled').length} Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tripwire Core Records</span>
                    <Badge>{tripwireCoreData.filter(r => r.status === 'Enabled').length} Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Alert Records</span>
                    <Badge>{alertData.filter(r => r.status === 'Enabled').length} Enabled</Badge>
                  </div>
                  <div className="flex justify-between items-center border-t pt-4">
                    <span className="font-semibold">Total Active</span>
                    <Badge variant="default">{allData.filter(r => r.status === 'Enabled').length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Domain Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filterOptions.domains.slice(0, 6).map(domain => {
                    const domainCount = allData.filter(r => r.domain === domain).length;
                    return (
                      <div key={domain} className="flex justify-between items-center text-sm">
                        <span className="truncate">{domain}</span>
                        <Badge variant="outline">{domainCount}</Badge>
                      </div>
                    );
                  })}
                  {filterOptions.domains.length > 6 && (
                    <p className="text-xs text-gray-500 pt-2">
                      +{filterOptions.domains.length - 6} more domains
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Assessment completed: Q1 2024 Review</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span>Report generated: Access Control Summary</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-orange-600" />
                    <span>{allData.length} total framework records available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>Ready for new assessment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Generate reports or start assessments based on your framework data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                  <FileText className="h-6 w-6" />
                  <span>Domain Report</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Goal Analysis</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Target className="h-6 w-6" />
                  <span>Risk Assessment</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Review</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}