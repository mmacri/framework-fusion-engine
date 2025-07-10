import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Download, 
  Search,
  BarChart3,
  Eye,
  Filter,
  Calendar,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { masterListData, tripwireCoreData, alertData } from '../../data/masterFramework';
import { MasterFrameworkRecord } from '../../types/masterFramework';

interface CorrelatedReportsProps {
  selectedReportName?: string;
}

export function CorrelatedReports({ selectedReportName }: CorrelatedReportsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [frameworkFilter, setFrameworkFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<string | null>(selectedReportName || null);

  // Combine all framework data
  const allData = useMemo(() => [
    ...masterListData,
    ...tripwireCoreData,
    ...alertData
  ], []);

  // Extract unique report names and their correlations
  const reportCorrelations = useMemo(() => {
    const reportMap = new Map<string, MasterFrameworkRecord[]>();
    
    allData.forEach(record => {
      if (!reportMap.has(record.reportName)) {
        reportMap.set(record.reportName, []);
      }
      reportMap.get(record.reportName)!.push(record);
    });

    return Array.from(reportMap.entries()).map(([reportName, records]) => ({
      reportName,
      records,
      count: records.length,
      frameworks: [...new Set(records.map(r => r.framework))],
      domains: [...new Set(records.map(r => r.domain))],
      frequencies: [...new Set(records.map(r => r.frequency))],
      statuses: [...new Set(records.map(r => r.status))],
      enabledCount: records.filter(r => r.status === 'Enabled').length,
      alertCount: records.filter(r => r.frequency === 'Alert').length,
      criticalCount: records.filter(r => r.frequency === 'Alert' && r.status === 'Enabled').length
    }));
  }, [allData]);

  // Filter report correlations
  const filteredReports = useMemo(() => {
    return reportCorrelations.filter(report => {
      // Search filter
      if (searchTerm && !report.reportName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Frequency filter
      if (frequencyFilter !== 'all' && !report.frequencies.includes(frequencyFilter as any)) {
        return false;
      }

      // Framework filter
      if (frameworkFilter !== 'all' && !report.frameworks.includes(frameworkFilter as any)) {
        return false;
      }

      return true;
    });
  }, [reportCorrelations, searchTerm, frequencyFilter, frameworkFilter]);

  // Get selected report details
  const selectedReportDetails = useMemo(() => {
    if (!selectedReport) return null;
    return reportCorrelations.find(r => r.reportName === selectedReport);
  }, [selectedReport, reportCorrelations]);

  const exportReportData = (reportName: string) => {
    const reportData = allData.filter(record => record.reportName === reportName);
    
    const csvContent = [
      ['Framework', 'Domain', 'CIP Standards', 'CIP Requirement', 'Frequency', 'Asset Scope', 'Time Scope', 'Data Retention', 'Goal/Objective', 'Description', 'Status'].join(','),
      ...reportData.map(record => [
        record.framework,
        record.domain,
        record.cipStandards,
        record.cipReq,
        record.frequency,
        record.assetScope,
        record.timeScope,
        record.dataRetention,
        record.goalObjective,
        record.description,
        record.status
      ].map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportName.replace(/[^a-zA-Z0-9]/g, '_')}_correlated_report.csv`;
    link.click();
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'Alert': return 'bg-red-100 text-red-800';
      case 'Daily': return 'bg-blue-100 text-blue-800';
      case 'Weekly': return 'bg-green-100 text-green-800';
      case 'Monthly': return 'bg-yellow-100 text-yellow-800';
      case 'Quarterly': return 'bg-purple-100 text-purple-800';
      case 'Annually': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Enabled': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Not Implemented': return 'bg-red-100 text-red-800';
      case 'Disabled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Correlated Reports</h1>
        <p className="text-gray-600 mt-2">
          View and generate reports grouped by report name across all frameworks
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Search Reports</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search report names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Frequency</label>
              <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Frequencies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frequencies</SelectItem>
                  <SelectItem value="Alert">Alert</SelectItem>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Framework</label>
              <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Frameworks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frameworks</SelectItem>
                  <SelectItem value="Master List">Master List</SelectItem>
                  <SelectItem value="Tripwire Core">Tripwire Core</SelectItem>
                  <SelectItem value="Alert">Alert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{filteredReports.length}</p>
                <p className="text-sm text-gray-600">Unique Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{filteredReports.reduce((sum, r) => sum + r.count, 0)}</p>
                <p className="text-sm text-gray-600">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{filteredReports.reduce((sum, r) => sum + r.alertCount, 0)}</p>
                <p className="text-sm text-gray-600">Alert Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{filteredReports.reduce((sum, r) => sum + r.enabledCount, 0)}</p>
                <p className="text-sm text-gray-600">Enabled Records</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Correlated Report Groups</CardTitle>
          <CardDescription>
            {filteredReports.length} unique report names found with correlated records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead>Frameworks</TableHead>
                  <TableHead>Frequencies</TableHead>
                  <TableHead>Enabled/Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.reportName}>
                    <TableCell className="max-w-xs">
                      <div>
                        <p className="font-medium truncate">{report.reportName}</p>
                        <p className="text-sm text-gray-500">{report.domains.length} domains</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.count}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {report.frameworks.map((framework, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {framework}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {report.frequencies.map((frequency, idx) => (
                          <Badge key={idx} className={`text-xs ${getFrequencyColor(frequency)}`}>
                            {frequency}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        <span className="text-green-600 font-medium">{report.enabledCount}</span>
                        <span className="text-gray-400">/{report.count}</span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedReport(report.reportName)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{report.reportName}</DialogTitle>
                              <DialogDescription>
                                Detailed view of all records for this report
                              </DialogDescription>
                            </DialogHeader>
                            {selectedReportDetails && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Total Records</p>
                                    <p className="text-2xl font-bold">{selectedReportDetails.count}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Frameworks</p>
                                    <p className="text-2xl font-bold">{selectedReportDetails.frameworks.length}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Enabled</p>
                                    <p className="text-2xl font-bold text-green-600">{selectedReportDetails.enabledCount}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Critical Alerts</p>
                                    <p className="text-2xl font-bold text-red-600">{selectedReportDetails.criticalCount}</p>
                                  </div>
                                </div>
                                
                                <div className="overflow-x-auto max-h-96">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Framework</TableHead>
                                        <TableHead>Domain</TableHead>
                                        <TableHead>CIP Standards</TableHead>
                                        <TableHead>Frequency</TableHead>
                                        <TableHead>Status</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedReportDetails.records.map((record) => (
                                        <TableRow key={record.id}>
                                          <TableCell>
                                            <Badge variant="outline">{record.framework}</Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge variant="secondary">{record.domain}</Badge>
                                          </TableCell>
                                          <TableCell>{record.cipStandards}</TableCell>
                                          <TableCell>
                                            <Badge className={getFrequencyColor(record.frequency)}>
                                              {record.frequency}
                                            </Badge>
                                          </TableCell>
                                          <TableCell>
                                            <Badge className={getStatusColor(record.status)}>
                                              {record.status}
                                            </Badge>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => exportReportData(report.reportName)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}