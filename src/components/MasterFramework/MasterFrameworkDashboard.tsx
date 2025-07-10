import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Download, MessageSquare, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';
import { MasterFrameworkRecord, FilterCriteria } from '../../types/masterFramework';
import { masterListData, tripwireCoreData, alertData } from '../../data/masterFramework';
import { MasterFrameworkTable } from './MasterFrameworkTable';
import { CorrelationView } from './CorrelationView';
import { ComplianceQA } from './ComplianceQA';
import { AuditorAssessment } from './AuditorAssessment';
import { FrameworkStats } from './FrameworkStats';

export function MasterFrameworkDashboard() {
  const [activeTab, setActiveTab] = useState('master');
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [masterData, setMasterData] = useState(masterListData);

  const handleAddRecord = (newRecord: MasterFrameworkRecord) => {
    setMasterData(prev => [...prev, newRecord]);
    console.log('Added new record:', newRecord);
  };

  const allData = useMemo(() => ({
    'master': masterData,
    'tripwire': tripwireCoreData,
    'alert': alertData
  }), [masterData]);

  const allDomains = useMemo(() => {
    const domains = new Set<string>();
    Object.values(allData).flat().forEach(record => domains.add(record.domain));
    return Array.from(domains).sort();
  }, [allData]);

  const allCipStandards = useMemo(() => {
    const standards = new Set<string>();
    Object.values(allData).flat().forEach(record => standards.add(record.cipStandards));
    return Array.from(standards).sort();
  }, [allData]);

  const allFrequencies = useMemo(() => {
    const frequencies = new Set<string>();
    Object.values(allData).flat().forEach(record => frequencies.add(record.frequency));
    return Array.from(frequencies).sort();
  }, [allData]);

  const filteredData = useMemo(() => {
    const currentData = allData[activeTab as keyof typeof allData];
    if (!currentData || !Array.isArray(currentData)) {
      return [];
    }
    return currentData.filter(record => {
      // Search term filter
      if (searchTerm && !Object.values(record).some(value => 
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )) {
        return false;
      }

      // Domain filter
      if (filters.domains?.length && !filters.domains.includes(record.domain)) {
        return false;
      }

      // CIP Standards filter
      if (filters.cipStandards?.length && !filters.cipStandards.includes(record.cipStandards)) {
        return false;
      }

      // Frequency filter
      if (filters.frequency?.length && !filters.frequency.includes(record.frequency)) {
        return false;
      }

      // Status filter
      if (filters.status?.length && !filters.status.includes(record.status)) {
        return false;
      }

      // Mapped only filter
      if (filters.showMappedOnly && !record.isMapped) {
        return false;
      }

      // Gaps only filter
      if (filters.showGapsOnly && record.isMapped) {
        return false;
      }

      return true;
    });
  }, [allData, activeTab, searchTerm, filters]);

  const handleFilterChange = (key: keyof FilterCriteria, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleMultiSelectFilter = (key: keyof FilterCriteria, value: string) => {
    setFilters(prev => {
      const currentValues = prev[key] as string[] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [key]: newValues };
    });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(filteredData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeTab}-framework-export.json`;
    link.click();
  };

  const getTabStats = (tabKey: string) => {
    const data = allData[tabKey as keyof typeof allData];
    if (!data || !Array.isArray(data)) {
      return { total: 0, mapped: 0, alerts: 0, enabled: 0 };
    }
    return {
      total: data.length,
      mapped: data.filter(r => r.isMapped).length,
      alerts: data.filter(r => r.frequency === 'Alert').length,
      enabled: data.filter(r => r.status === 'Enabled').length
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Centralized Compliance Framework Library</h1>
          <p className="text-gray-600 mt-2">
            Master framework serving as the authoritative source with complete correlation mapping to all sub-frameworks
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search across all fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mapped-only"
                  checked={filters.showMappedOnly || false}
                  onCheckedChange={(checked) => handleFilterChange('showMappedOnly', checked)}
                />
                <label htmlFor="mapped-only" className="text-sm">Mapped Only</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="gaps-only"
                  checked={filters.showGapsOnly || false}
                  onCheckedChange={(checked) => handleFilterChange('showGapsOnly', checked)}
                />
                <label htmlFor="gaps-only" className="text-sm">Gaps Only</label>
              </div>
              {Object.keys(filters).length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Domains</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {allDomains.map(domain => (
                      <div key={domain} className="flex items-center space-x-2">
                        <Checkbox
                          id={`domain-${domain}`}
                          checked={filters.domains?.includes(domain) || false}
                          onCheckedChange={() => handleMultiSelectFilter('domains', domain)}
                        />
                        <label htmlFor={`domain-${domain}`} className="text-sm">{domain}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">CIP Standards</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {allCipStandards.map(standard => (
                      <div key={standard} className="flex items-center space-x-2">
                        <Checkbox
                          id={`standard-${standard}`}
                          checked={filters.cipStandards?.includes(standard) || false}
                          onCheckedChange={() => handleMultiSelectFilter('cipStandards', standard)}
                        />
                        <label htmlFor={`standard-${standard}`} className="text-sm">{standard}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Frequency</label>
                  <div className="space-y-2">
                    {allFrequencies.map(freq => (
                      <div key={freq} className="flex items-center space-x-2">
                        <Checkbox
                          id={`freq-${freq}`}
                          checked={filters.frequency?.includes(freq) || false}
                          onCheckedChange={() => handleMultiSelectFilter('frequency', freq)}
                        />
                        <label htmlFor={`freq-${freq}`} className="text-sm">{freq}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <div className="space-y-2">
                    {['Enabled', 'Pending Review', 'Not Implemented', 'Disabled'].map(status => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={filters.status?.includes(status) || false}
                          onCheckedChange={() => handleMultiSelectFilter('status', status)}
                        />
                        <label htmlFor={`status-${status}`} className="text-sm">{status}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Framework Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="master" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Master List
            <Badge variant="secondary">{getTabStats('master').total}</Badge>
          </TabsTrigger>
          <TabsTrigger value="tripwire" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Tripwire Core
            <Badge variant="secondary">{getTabStats('tripwire').total}</Badge>
          </TabsTrigger>
          <TabsTrigger value="alert" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alert
            <Badge variant="secondary">{getTabStats('alert').total}</Badge>
          </TabsTrigger>
          <TabsTrigger value="correlation">
            Correlation View
          </TabsTrigger>
          <TabsTrigger value="qa" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Q&A Assessment
          </TabsTrigger>
          <TabsTrigger value="auditor">
            Auditor Assessment
          </TabsTrigger>
          <TabsTrigger value="stats">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="master" className="mt-6">
            <MasterFrameworkTable 
              data={filteredData} 
              framework="Master List"
              showCorrelations={true}
              onAddRecord={handleAddRecord}
            />
        </TabsContent>

        <TabsContent value="tripwire" className="mt-6">
          <MasterFrameworkTable
            data={filteredData}
            framework="Tripwire Core"
            showCorrelations={true}
          />
        </TabsContent>

        <TabsContent value="alert" className="mt-6">
          <MasterFrameworkTable
            data={filteredData}
            framework="Alert"
            showCorrelations={true}
          />
        </TabsContent>

        <TabsContent value="correlation" className="mt-6">
          <CorrelationView />
        </TabsContent>

        <TabsContent value="qa" className="mt-6">
          <ComplianceQA />
        </TabsContent>

        <TabsContent value="auditor" className="mt-6">
          <AuditorAssessment />
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <FrameworkStats allData={allData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}