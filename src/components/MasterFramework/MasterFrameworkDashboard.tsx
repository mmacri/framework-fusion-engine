import { useState, useMemo, useEffect } from 'react';
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
import { 
  saveMasterFrameworkData, 
  loadMasterFrameworkData, 
  addRecord, 
  deleteRecord, 
  deleteMultipleRecords, 
  deleteAllRecords,
  exportFrameworkData
} from '../../utils/masterFrameworkStorage';
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
  const [masterData, setMasterData] = useState<MasterFrameworkRecord[]>([]);
  const [tripwireData, setTripwireData] = useState<MasterFrameworkRecord[]>([]);
  const [alertsData, setAlertsData] = useState<MasterFrameworkRecord[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedMasterData = loadMasterFrameworkData('Master List');
    const savedTripwireData = loadMasterFrameworkData('Tripwire Core');
    const savedAlertData = loadMasterFrameworkData('Alert');

    // If no saved data exists, use default data and save it
    if (savedMasterData.length === 0) {
      setMasterData(masterListData);
      saveMasterFrameworkData('Master List', masterListData);
    } else {
      setMasterData(savedMasterData);
    }

    if (savedTripwireData.length === 0) {
      setTripwireData(tripwireCoreData);
      saveMasterFrameworkData('Tripwire Core', tripwireCoreData);
    } else {
      setTripwireData(savedTripwireData);
    }

    if (savedAlertData.length === 0) {
      setAlertsData(alertData);
      saveMasterFrameworkData('Alert', alertData);
    } else {
      setAlertsData(savedAlertData);
    }
  }, []);

  const handleAddRecord = (newRecord: MasterFrameworkRecord) => {
    const updatedData = [...masterData, newRecord];
    setMasterData(updatedData);
    saveMasterFrameworkData('Master List', updatedData);
    console.log('Added new record:', newRecord);
  };

  const handleImportRecords = (newRecords: MasterFrameworkRecord[]) => {
    const updatedData = [...masterData, ...newRecords];
    setMasterData(updatedData);
    saveMasterFrameworkData('Master List', updatedData);
    console.log('Imported records:', newRecords.length);
  };

  const handleDeleteRecord = (id: string) => {
    const updatedData = masterData.filter(record => record.id !== id);
    setMasterData(updatedData);
    saveMasterFrameworkData('Master List', updatedData);
    console.log('Deleted record:', id);
  };

  const handleDeleteMultiple = (ids: string[]) => {
    const updatedData = masterData.filter(record => !ids.includes(record.id));
    setMasterData(updatedData);
    saveMasterFrameworkData('Master List', updatedData);
    console.log('Deleted records:', ids);
  };

  const handleDeleteAll = () => {
    setMasterData([]);
    saveMasterFrameworkData('Master List', []);
    console.log('Deleted all records');
  };

  const allData = useMemo(() => ({
    'master': masterData,
    'tripwire': tripwireData,
    'alert': alertsData
  }), [masterData, tripwireData, alertsData]);

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

      // Report Names filter
      if (filters.reportNames?.length && !filters.reportNames.includes(record.reportName)) {
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

      // Asset Scopes filter
      if (filters.assetScopes?.length && !filters.assetScopes.includes(record.assetScope)) {
        return false;
      }

      // Primary Audiences filter
      if (filters.primaryAudiences?.length && !filters.primaryAudiences.includes(record.primaryAudience)) {
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
    const framework = activeTab === 'master' ? 'Master List' : 
                     activeTab === 'tripwire' ? 'Tripwire Core' : 'Alert';
    exportFrameworkData(framework);
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
        data={Object.values(allData).flat()}
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
            onAddRecord={(record) => {
              const newRecord = { ...record, framework: 'Tripwire Core' as const };
              const updatedData = [...tripwireData, newRecord];
              setTripwireData(updatedData);
              saveMasterFrameworkData('Tripwire Core', updatedData);
            }}
            onImportRecords={(records) => {
              const updatedRecords = records.map(r => ({ ...r, framework: 'Tripwire Core' as const }));
              const updatedData = [...tripwireData, ...updatedRecords];
              setTripwireData(updatedData);
              saveMasterFrameworkData('Tripwire Core', updatedData);
            }}
            onDeleteRecord={(id) => {
              const updatedData = tripwireData.filter(record => record.id !== id);
              setTripwireData(updatedData);
              saveMasterFrameworkData('Tripwire Core', updatedData);
            }}
            onDeleteMultiple={(ids) => {
              const updatedData = tripwireData.filter(record => !ids.includes(record.id));
              setTripwireData(updatedData);
              saveMasterFrameworkData('Tripwire Core', updatedData);
            }}
            onDeleteAll={() => {
              setTripwireData([]);
              saveMasterFrameworkData('Tripwire Core', []);
            }}
          />
        </TabsContent>

        <TabsContent value="alert" className="mt-6">
          <MasterFrameworkTable
            data={filteredData}
            framework="Alert"
            showCorrelations={true}
            onAddRecord={(record) => {
              const newRecord = { ...record, framework: 'Alert' as const };
              const updatedData = [...alertsData, newRecord];
              setAlertsData(updatedData);
              saveMasterFrameworkData('Alert', updatedData);
            }}
            onImportRecords={(records) => {
              const updatedRecords = records.map(r => ({ ...r, framework: 'Alert' as const }));
              const updatedData = [...alertsData, ...updatedRecords];
              setAlertsData(updatedData);
              saveMasterFrameworkData('Alert', updatedData);
            }}
            onDeleteRecord={(id) => {
              const updatedData = alertsData.filter(record => record.id !== id);
              setAlertsData(updatedData);
              saveMasterFrameworkData('Alert', updatedData);
            }}
            onDeleteMultiple={(ids) => {
              const updatedData = alertsData.filter(record => !ids.includes(record.id));
              setAlertsData(updatedData);
              saveMasterFrameworkData('Alert', updatedData);
            }}
            onDeleteAll={() => {
              setAlertsData([]);
              saveMasterFrameworkData('Alert', []);
            }}
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
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Compliance Q&A Assessment has been moved to the Assessments section
            </p>
            <Button 
              onClick={() => window.location.hash = '#assessments'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go to Assessments
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="auditor" className="mt-6">
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Auditor Assessment has been moved to the Assessments section
            </p>
            <Button 
              onClick={() => window.location.hash = '#assessments'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go to Assessments
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <FrameworkStats allData={allData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}