import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  AlertTriangle, 
  Clock, 
  Calendar,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import { masterListData, tripwireCoreData, alertData } from '../../data/masterFramework';
import { MasterFrameworkRecord } from '../../types/masterFramework';

interface QuickReportsDropdownProps {
  onReportGenerate?: (reportName: string, records: MasterFrameworkRecord[]) => void;
}

export function QuickReportsDropdown({ onReportGenerate }: QuickReportsDropdownProps) {
  // Combine all framework data
  const allData = useMemo(() => [
    ...masterListData,
    ...tripwireCoreData,
    ...alertData
  ], []);

  // Group reports by frequency and extract unique report names
  const reportGroups = useMemo(() => {
    const reportMap = new Map<string, MasterFrameworkRecord[]>();
    
    allData.forEach(record => {
      if (!reportMap.has(record.reportName)) {
        reportMap.set(record.reportName, []);
      }
      reportMap.get(record.reportName)!.push(record);
    });

    const groupsByFrequency = {
      'Alert': [] as Array<{ name: string; records: MasterFrameworkRecord[]; count: number; enabled: number }>,
      'Daily': [] as Array<{ name: string; records: MasterFrameworkRecord[]; count: number; enabled: number }>,
      'Weekly': [] as Array<{ name: string; records: MasterFrameworkRecord[]; count: number; enabled: number }>,
      'Monthly': [] as Array<{ name: string; records: MasterFrameworkRecord[]; count: number; enabled: number }>,
      'Quarterly': [] as Array<{ name: string; records: MasterFrameworkRecord[]; count: number; enabled: number }>,
      'Annually': [] as Array<{ name: string; records: MasterFrameworkRecord[]; count: number; enabled: number }>
    };

    Array.from(reportMap.entries()).forEach(([reportName, records]) => {
      const reportSummary = {
        name: reportName,
        records,
        count: records.length,
        enabled: records.filter(r => r.status === 'Enabled').length
      };

      // Get the primary frequency for this report (most common frequency)
      const frequencies = records.map(r => r.frequency);
      const frequencyCount = frequencies.reduce((acc, freq) => {
        acc[freq] = (acc[freq] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const primaryFrequency = Object.entries(frequencyCount)
        .sort(([,a], [,b]) => b - a)[0]?.[0] as keyof typeof groupsByFrequency;

      if (primaryFrequency && groupsByFrequency[primaryFrequency]) {
        groupsByFrequency[primaryFrequency].push(reportSummary);
      }
    });

    // Sort each group alphabetically
    Object.values(groupsByFrequency).forEach(group => {
      group.sort((a, b) => a.name.localeCompare(b.name));
    });

    return groupsByFrequency;
  }, [allData]);

  const handleReportGenerate = (reportName: string, records: MasterFrameworkRecord[]) => {
    if (onReportGenerate) {
      onReportGenerate(reportName, records);
      return;
    }

    // Default behavior: export as CSV
    const csvContent = [
      ['Framework', 'Domain', 'CIP Standards', 'CIP Requirement', 'Frequency', 'Asset Scope', 'Time Scope', 'Data Retention', 'Goal/Objective', 'Description', 'Status'].join(','),
      ...records.map(record => [
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
    link.download = `${reportName.replace(/[^a-zA-Z0-9]/g, '_')}_report.csv`;
    link.click();
  };

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case 'Alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Daily': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Weekly': return <Calendar className="h-4 w-4 text-green-500" />;
      case 'Monthly': return <Calendar className="h-4 w-4 text-yellow-500" />;
      case 'Quarterly': return <Calendar className="h-4 w-4 text-purple-500" />;
      case 'Annually': return <Calendar className="h-4 w-4 text-gray-500" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTotalReports = () => {
    return Object.values(reportGroups).reduce((sum, group) => sum + group.length, 0);
  };

  const getTotalEnabledRecords = () => {
    return Object.values(reportGroups).reduce((sum, group) => 
      sum + group.reduce((groupSum, report) => groupSum + report.enabled, 0), 0
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-white">
          <BarChart3 className="h-4 w-4 mr-2" />
          Quick Reports
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-white border shadow-lg z-50">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Generate Reports</span>
          <div className="flex gap-2">
            <Badge variant="outline">{getTotalReports()} Reports</Badge>
            <Badge variant="default">{getTotalEnabledRecords()} Enabled</Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {Object.entries(reportGroups).map(([frequency, reports]) => {
          if (reports.length === 0) return null;
          
          return (
            <DropdownMenuSub key={frequency}>
              <DropdownMenuSubTrigger className="bg-white">
                <div className="flex items-center gap-2">
                  {getFrequencyIcon(frequency)}
                  <span>{frequency} Reports</span>
                  <Badge variant="outline" className="ml-auto">
                    {reports.length}
                  </Badge>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-96 bg-white border shadow-lg z-50">
                <DropdownMenuLabel>
                  {frequency} Reports ({reports.length})
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {reports.slice(0, 15).map((report) => (
                  <DropdownMenuItem 
                    key={report.name}
                    className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleReportGenerate(report.name, report.records)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{report.name}</p>
                      <p className="text-xs text-gray-500">
                        {report.count} records, {report.enabled} enabled
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Badge variant={report.enabled > 0 ? "default" : "secondary"} className="text-xs">
                        {report.enabled}/{report.count}
                      </Badge>
                      <Download className="h-3 w-3 text-gray-400" />
                    </div>
                  </DropdownMenuItem>
                ))}
                {reports.length > 15 && (
                  <DropdownMenuItem disabled className="text-center text-xs text-gray-500">
                    +{reports.length - 15} more reports available
                  </DropdownMenuItem>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          );
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-xs text-gray-500">
          Click any report to generate and download CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}