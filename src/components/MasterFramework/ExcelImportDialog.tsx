import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';
import { MasterFrameworkRecord } from '../../types/masterFramework';
import * as XLSX from 'xlsx';

interface ExcelImportDialogProps {
  onImport: (records: MasterFrameworkRecord[]) => void;
}

export function ExcelImportDialog({ onImport }: ExcelImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const expectedColumns = [
    'ID', 'Domain', 'CIP Standards', 'CIP Req', 'Report Name', 'Frequency',
    'Asset Scope', 'Time Scope', 'Data Retention', 'Goal / Objective',
    'Description', 'Details', 'Output Format', 'Primary Audience',
    'Likely Source(s)', 'Notes'
  ];

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);
    setImporting(true);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length === 0) {
        throw new Error('Excel file appears to be empty');
      }

      const headers = jsonData[0] as string[];
      const rows = jsonData.slice(1);

      // Validate headers
      const missingColumns = expectedColumns.filter(col => !headers.includes(col));
      if (missingColumns.length > 0) {
        throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
      }

      // Preview first 5 rows
      setPreviewData(rows.slice(0, 5).map(row => {
        const record: any = {};
        headers.forEach((header, index) => {
          record[header] = (row as any[])[index] || '';
        });
        return record;
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read Excel file');
    } finally {
      setImporting(false);
    }
  };

  const handleImport = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setImporting(true);
    setError(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const headers = jsonData[0] as string[];
      const rows = jsonData.slice(1);

      const records: MasterFrameworkRecord[] = rows.map((row: any, index) => {
        const record: any = {};
        headers.forEach((header, headerIndex) => {
          record[header] = (row as any[])[headerIndex] || '';
        });

        // Map Excel columns to our data structure
        const likelySourcesStr = record['Likely Source(s)'] || '';
        const likelySources = likelySourcesStr ? likelySourcesStr.split(',').map((s: string) => s.trim()) : [];

        return {
          id: record['ID'] || `ML-${String(index + 1).padStart(3, '0')}`,
          domain: record['Domain'] || '',
          cipStandards: record['CIP Standards'] || '',
          cipReq: record['CIP Req'] || '',
          reportName: record['Report Name'] || '',
          frequency: record['Frequency'] || 'Monthly',
          assetScope: record['Asset Scope'] || '',
          timeScope: record['Time Scope'] || '',
          dataRetention: record['Data Retention'] || '',
          goalObjective: record['Goal / Objective'] || '',
          description: record['Description'] || '',
          details: record['Details'] || '',
          outputFormat: record['Output Format'] || '',
          primaryAudience: record['Primary Audience'] || '',
          likelySources: likelySources,
          notes: record['Notes'] || '',
          status: 'Enabled',
          framework: 'Master List',
          isCommon: true,
          isMapped: false
        } as MasterFrameworkRecord;
      }).filter(record => record.id && record.reportName); // Filter out empty rows

      onImport(records);
      setSuccess(`Successfully imported ${records.length} records`);
      setPreviewData([]);
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Close dialog after a short delay
      setTimeout(() => {
        setOpen(false);
        setSuccess(null);
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import data');
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      expectedColumns,
      [
        'ML-001', 'Access - AD', 'CIP-007-6', 'R5.7', 'AD Access Failure', 'Alert',
        'SCL EMS AD', 'When threshold met', '', '',
        'Sample description', 'Sample details', '', '',
        'Sample source', 'Sample notes'
      ]
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Master Framework Template');
    XLSX.writeFile(wb, 'master_framework_template.xlsx');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-50 hover:bg-green-100 border-green-200">
          <Upload className="h-4 w-4 mr-2" />
          Import from Excel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Import Master Framework from Excel
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Download */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">Need a template?</h3>
            <p className="text-sm text-blue-700 mb-3">
              Download our Excel template with the correct column headers to get started.
            </p>
            <Button variant="outline" size="sm" onClick={downloadTemplate}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </div>

          {/* Expected Columns */}
          <div>
            <h3 className="font-medium mb-2">Required Columns</h3>
            <div className="grid grid-cols-2 gap-2 text-sm bg-gray-50 p-3 rounded">
              {expectedColumns.map(col => (
                <div key={col} className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  {col}
                </div>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="excel-file">Select Excel File</Label>
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="mt-1"
              />
            </div>

            {/* Preview */}
            {previewData.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Preview (First 5 rows)</h3>
                <div className="overflow-x-auto border rounded">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {expectedColumns.slice(0, 6).map(col => (
                          <th key={col} className="px-2 py-1 text-left border-r">{col}</th>
                        ))}
                        <th className="px-2 py-1 text-left">...</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, index) => (
                        <tr key={index} className="border-t">
                          {expectedColumns.slice(0, 6).map(col => (
                            <td key={col} className="px-2 py-1 border-r truncate max-w-32">
                              {row[col]}
                            </td>
                          ))}
                          <td className="px-2 py-1">...</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Status Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleImport} 
                disabled={importing || previewData.length === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                {importing ? 'Importing...' : `Import ${previewData.length > 0 ? 'Data' : ''}`}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}