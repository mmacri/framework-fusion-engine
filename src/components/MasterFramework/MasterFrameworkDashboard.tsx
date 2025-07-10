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
import { MasterFrameworkFilters } from './MasterFrameworkFilters';
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

  const handleImportRecords = (newRecords: MasterFrameworkRecord[]) => {
    setMasterData(prev => [...prev, ...newRecords]);
    console.log('Imported records:', newRecords.length);
  };

  const handleDeleteRecord = (id: string) => {
    setMasterData(prev => prev.filter(record => record.id !== id));
    console.log('Deleted record:', id);
  };

  const handleDeleteMultiple = (ids: string[]) => {
    setMasterData(prev => prev.filter(record => !ids.includes(record.id)));
    console.log('Deleted records:', ids);
  };

  const handleDeleteAll = () => {
    setMasterData([]);
    console.log('Deleted all records');
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

      <MasterFrameworkFilters
        data={allData[activeTab] || []}
        filters={filters}
        onFiltersChange={setFilters}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

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
              onImportRecords={handleImportRecords}
              onDeleteRecord={handleDeleteRecord}
              onDeleteMultiple={handleDeleteMultiple}
              onDeleteAll={handleDeleteAll}
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
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-muted-foreground">Correlation view will be available soon</p>
              </div>
            </CardContent>
          </Card>
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