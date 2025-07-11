import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, Edit, Link, AlertTriangle, CheckCircle, Clock, XCircle, Plus, Trash2, Trash } from 'lucide-react';
import { AddRecordDialog } from './AddRecordDialog';
import { ExcelImportDialog } from './ExcelImportDialog';
import { MasterFrameworkRecord } from '../../types/masterFramework';

interface MasterFrameworkTableProps {
  data: MasterFrameworkRecord[];
  framework: string;
  showCorrelations?: boolean;
  onAddRecord?: (record: MasterFrameworkRecord) => void;
  onImportRecords?: (records: MasterFrameworkRecord[]) => void;
  onDeleteRecord?: (id: string) => void;
  onDeleteMultiple?: (ids: string[]) => void;
  onDeleteAll?: () => void;
}

export function MasterFrameworkTable({ data, framework, showCorrelations = false, onAddRecord, onImportRecords, onDeleteRecord, onDeleteMultiple, onDeleteAll }: MasterFrameworkTableProps) {
  const [selectedRecord, setSelectedRecord] = useState<MasterFrameworkRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<MasterFrameworkRecord | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Enabled':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pending Review':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Not Implemented':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'Disabled':
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'Alert':
        return 'destructive';
      case 'Daily':
        return 'default';
      case 'Weekly':
        return 'secondary';
      case 'Monthly':
        return 'outline';
      case 'Quarterly':
        return 'outline';
      case 'Annually':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleEdit = (record: MasterFrameworkRecord) => {
    setEditingRecord({ ...record });
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving record:', editingRecord);
    setEditingRecord(null);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(data.map(record => record.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRecord = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (onDeleteMultiple && selectedIds.length > 0) {
      onDeleteMultiple(selectedIds);
      setSelectedIds([]);
    }
  };

  return (
    <Card>
      <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {framework} Framework
              <Badge variant="outline">{data.length} Records</Badge>
            </CardTitle>
            <div className="flex gap-2">
              {selectedIds.length > 0 && (
                <>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected ({selectedIds.length})
                  </Button>
                </>
              )}
              {onDeleteAll && data.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={onDeleteAll}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete All
                </Button>
              )}
              {onImportRecords && (
                <ExcelImportDialog onImport={onImportRecords} />
              )}
              {onAddRecord && (
                <AddRecordDialog onAdd={onAddRecord} framework={framework} />
              )}
            </div>
          </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="min-w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === data.length && data.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-20">ID</TableHead>
                <TableHead className="w-32">Domain</TableHead>
                <TableHead className="w-24">CIP Standards</TableHead>
                <TableHead className="w-20">CIP Req</TableHead>
                <TableHead className="w-60">Report Name</TableHead>
                <TableHead className="w-24">Frequency</TableHead>
                <TableHead className="w-40">Asset Scope</TableHead>
                <TableHead className="w-32">Time Scope</TableHead>
                <TableHead className="w-32">Data Retention</TableHead>
                <TableHead className="w-72">Goal / Objective</TableHead>
                <TableHead className="w-80">Description</TableHead>
                <TableHead className="w-80">Details</TableHead>
                <TableHead className="w-32">Output Format</TableHead>
                <TableHead className="w-32">Primary Audience</TableHead>
                <TableHead className="w-40">Likely Source(s)</TableHead>
                <TableHead className="w-40">Notes</TableHead>
                {showCorrelations && <TableHead className="w-32">Correlations</TableHead>}
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((record) => (
                <TableRow 
                  key={record.id} 
                  className={record.isMapped ? 'bg-green-50 hover:bg-green-100' : 'hover:bg-gray-50'}
                >
                  <TableCell className="w-12">
                    <Checkbox
                      checked={selectedIds.includes(record.id)}
                      onCheckedChange={(checked) => handleSelectRecord(record.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="w-20 font-medium text-xs">{record.id}</TableCell>
                  <TableCell className="w-32">
                    <Badge variant="outline" className="text-xs">{record.domain}</Badge>
                  </TableCell>
                  <TableCell className="w-24 text-xs">{record.cipStandards}</TableCell>
                  <TableCell className="w-20 text-xs">{record.cipReq}</TableCell>
                  <TableCell className="w-60 whitespace-normal break-words text-sm p-2">
                    <div className="max-h-20 overflow-y-auto">{record.reportName}</div>
                  </TableCell>
                  <TableCell className="w-24">
                    <Badge variant={getFrequencyColor(record.frequency)} className="text-xs">
                      {record.frequency}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-40 whitespace-normal break-words text-xs p-2">
                    <div className="max-h-16 overflow-y-auto">{record.assetScope}</div>
                  </TableCell>
                  <TableCell className="w-32 whitespace-normal break-words text-xs p-2">
                    <div className="max-h-16 overflow-y-auto">{record.timeScope}</div>
                  </TableCell>
                  <TableCell className="w-32 whitespace-normal break-words text-xs p-2">
                    <div className="max-h-16 overflow-y-auto">{record.dataRetention}</div>
                  </TableCell>
                  <TableCell className="w-72 whitespace-normal break-words text-sm p-2">
                    <div className="max-h-24 overflow-y-auto">{record.goalObjective}</div>
                  </TableCell>
                  <TableCell className="w-80 whitespace-normal break-words text-sm p-2">
                    <div className="max-h-24 overflow-y-auto">{record.description}</div>
                  </TableCell>
                  <TableCell className="w-80 whitespace-normal break-words text-sm p-2">
                    <div className="max-h-24 overflow-y-auto">{record.details}</div>
                  </TableCell>
                  <TableCell className="w-32 whitespace-normal break-words text-xs p-2">
                    <div className="max-h-16 overflow-y-auto">{record.outputFormat}</div>
                  </TableCell>
                  <TableCell className="w-32 whitespace-normal break-words text-xs p-2">
                    <div className="max-h-16 overflow-y-auto">{record.primaryAudience}</div>
                  </TableCell>
                  <TableCell className="w-40 whitespace-normal break-words text-xs p-2">
                    <div className="max-h-16 overflow-y-auto">{record.likelySources.join(', ')}</div>
                  </TableCell>
                  <TableCell className="w-40 whitespace-normal break-words text-xs p-2">
                    <div className="max-h-16 overflow-y-auto">{record.notes}</div>
                  </TableCell>
                  {showCorrelations && (
                    <TableCell className="w-32">
                      {record.correlatedRecords?.length ? (
                        <div className="flex gap-1">
                          <Link className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-600">
                            {record.correlatedRecords.length} linked
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No links</span>
                      )}
                    </TableCell>
                  )}
                  <TableCell className="w-32">
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedRecord(record)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedRecord?.reportName}</DialogTitle>
                          </DialogHeader>
                          {selectedRecord && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-700">Basic Information</h4>
                                  <div className="space-y-2 mt-2">
                                    <div><strong>ID:</strong> {selectedRecord.id}</div>
                                    <div><strong>Domain:</strong> {selectedRecord.domain}</div>
                                    <div><strong>CIP Standard:</strong> {selectedRecord.cipStandards}</div>
                                    <div><strong>CIP Req:</strong> {selectedRecord.cipReq}</div>
                                    <div><strong>Frequency:</strong> {selectedRecord.frequency}</div>
                                    <div><strong>Status:</strong> {selectedRecord.status}</div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-700">Scope & Audience</h4>
                                  <div className="space-y-2 mt-2">
                                    <div><strong>Asset Scope:</strong> {selectedRecord.assetScope}</div>
                                    <div><strong>Time Scope:</strong> {selectedRecord.timeScope}</div>
                                    <div><strong>Data Retention:</strong> {selectedRecord.dataRetention}</div>
                                    <div><strong>Primary Audience:</strong> {selectedRecord.primaryAudience}</div>
                                    <div><strong>Output Format:</strong> {selectedRecord.outputFormat}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-sm text-gray-700">Description & Goals</h4>
                                <div className="space-y-2 mt-2">
                                  <div><strong>Goal/Objective:</strong> {selectedRecord.goalObjective}</div>
                                  <div><strong>Description:</strong> {selectedRecord.description}</div>
                                  <div><strong>Details:</strong> {selectedRecord.details}</div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-sm text-gray-700">Sources & Notes</h4>
                                <div className="space-y-2 mt-2">
                                  <div><strong>Likely Sources:</strong> {selectedRecord.likelySources.join(', ')}</div>
                                  {selectedRecord.notes && <div><strong>Notes:</strong> {selectedRecord.notes}</div>}
                                </div>
                              </div>

                              {selectedRecord.correlatedRecords?.length && (
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-700">Correlated Records</h4>
                                  <div className="flex gap-2 mt-2">
                                    {selectedRecord.correlatedRecords.map(id => (
                                      <Badge key={id} variant="outline">{id}</Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEdit(record)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      {onDeleteRecord && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onDeleteRecord(record.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Edit Dialog */}
        {editingRecord && (
          <Dialog open={!!editingRecord} onOpenChange={() => setEditingRecord(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Record: {editingRecord.id}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Report Name</label>
                    <Input 
                      value={editingRecord.reportName}
                      onChange={(e) => setEditingRecord({...editingRecord, reportName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Domain</label>
                    <Input 
                      value={editingRecord.domain}
                      onChange={(e) => setEditingRecord({...editingRecord, domain: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CIP Standards</label>
                    <Input 
                      value={editingRecord.cipStandards}
                      onChange={(e) => setEditingRecord({...editingRecord, cipStandards: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CIP Req</label>
                    <Input 
                      value={editingRecord.cipReq}
                      onChange={(e) => setEditingRecord({...editingRecord, cipReq: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Frequency</label>
                    <Select 
                      value={editingRecord.frequency}
                      onValueChange={(value) => setEditingRecord({...editingRecord, frequency: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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
                    <label className="text-sm font-medium">Status</label>
                    <Select 
                      value={editingRecord.status}
                      onValueChange={(value) => setEditingRecord({...editingRecord, status: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Enabled">Enabled</SelectItem>
                        <SelectItem value="Pending Review">Pending Review</SelectItem>
                        <SelectItem value="Not Implemented">Not Implemented</SelectItem>
                        <SelectItem value="Disabled">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={editingRecord.description}
                    onChange={(e) => setEditingRecord({...editingRecord, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Goal/Objective</label>
                  <Textarea 
                    value={editingRecord.goalObjective}
                    onChange={(e) => setEditingRecord({...editingRecord, goalObjective: e.target.value})}
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingRecord(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}