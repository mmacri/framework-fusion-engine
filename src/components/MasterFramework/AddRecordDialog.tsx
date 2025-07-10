import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { MasterFrameworkRecord } from '../../types/masterFramework';

interface AddRecordDialogProps {
  onAdd: (record: MasterFrameworkRecord) => void;
  framework?: string;
}

export function AddRecordDialog({ onAdd, framework = "Master List" }: AddRecordDialogProps) {
  const [open, setOpen] = useState(false);
  const [newRecord, setNewRecord] = useState<Partial<MasterFrameworkRecord>>({
    id: '',
    domain: '',
    cipStandards: '',
    cipReq: '',
    reportName: '',
    frequency: 'Monthly',
    assetScope: '',
    timeScope: '',
    dataRetention: '',
    goalObjective: '',
    description: '',
    details: '',
    outputFormat: '',
    primaryAudience: '',
    likelySources: [],
    notes: '',
    status: 'Enabled',
    framework: framework as any,
    correlatedRecords: []
  });
  const [newSource, setNewSource] = useState('');

  const handleSubmit = () => {
    if (!newRecord.id || !newRecord.reportName || !newRecord.domain) {
      alert('Please fill in required fields: ID, Report Name, and Domain');
      return;
    }

    const record: MasterFrameworkRecord = {
      ...newRecord,
      likelySources: newRecord.likelySources || [],
      correlatedRecords: newRecord.correlatedRecords || []
    } as MasterFrameworkRecord;

    onAdd(record);
    setOpen(false);
    setNewRecord({
      id: '',
      domain: '',
      cipStandards: '',
      cipReq: '',
      reportName: '',
      frequency: 'Monthly',
      assetScope: '',
      timeScope: '',
      dataRetention: '',
      goalObjective: '',
      description: '',
      details: '',
      outputFormat: '',
      primaryAudience: '',
      likelySources: [],
      notes: '',
      status: 'Enabled',
      framework: framework as any,
      correlatedRecords: []
    });
  };

  const addSource = () => {
    if (newSource.trim()) {
      setNewRecord({
        ...newRecord,
        likelySources: [...(newRecord.likelySources || []), newSource.trim()]
      });
      setNewSource('');
    }
  };

  const removeSource = (index: number) => {
    const sources = [...(newRecord.likelySources || [])];
    sources.splice(index, 1);
    setNewRecord({ ...newRecord, likelySources: sources });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Record
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Master Framework Record</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-red-600">ID *</label>
              <Input 
                value={newRecord.id || ''}
                onChange={(e) => setNewRecord({...newRecord, id: e.target.value})}
                placeholder="ML-XXX"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-red-600">Domain *</label>
              <Input 
                value={newRecord.domain || ''}
                onChange={(e) => setNewRecord({...newRecord, domain: e.target.value})}
                placeholder="e.g., Operations, Physical Security"
              />
            </div>
            <div>
              <label className="text-sm font-medium">CIP Standards</label>
              <Input 
                value={newRecord.cipStandards || ''}
                onChange={(e) => setNewRecord({...newRecord, cipStandards: e.target.value})}
                placeholder="e.g., CIP-007-6"
              />
            </div>
            <div>
              <label className="text-sm font-medium">CIP Requirement</label>
              <Input 
                value={newRecord.cipReq || ''}
                onChange={(e) => setNewRecord({...newRecord, cipReq: e.target.value})}
                placeholder="e.g., R4"
              />
            </div>
          </div>

          {/* Report Details */}
          <div>
            <label className="text-sm font-medium text-red-600">Report Name *</label>
            <Input 
              value={newRecord.reportName || ''}
              onChange={(e) => setNewRecord({...newRecord, reportName: e.target.value})}
              placeholder="Descriptive name for the report"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Frequency</label>
              <Select 
                value={newRecord.frequency}
                onValueChange={(value) => setNewRecord({...newRecord, frequency: value as any})}
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
                value={newRecord.status}
                onValueChange={(value) => setNewRecord({...newRecord, status: value as any})}
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

          {/* Scope Information */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Asset Scope</label>
              <Input 
                value={newRecord.assetScope || ''}
                onChange={(e) => setNewRecord({...newRecord, assetScope: e.target.value})}
                placeholder="e.g., All BES Cyber Systems"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Time Scope</label>
              <Input 
                value={newRecord.timeScope || ''}
                onChange={(e) => setNewRecord({...newRecord, timeScope: e.target.value})}
                placeholder="e.g., Last 30 days"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Data Retention</label>
              <Input 
                value={newRecord.dataRetention || ''}
                onChange={(e) => setNewRecord({...newRecord, dataRetention: e.target.value})}
                placeholder="e.g., 3 years"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Primary Audience</label>
              <Input 
                value={newRecord.primaryAudience || ''}
                onChange={(e) => setNewRecord({...newRecord, primaryAudience: e.target.value})}
                placeholder="e.g., NERC Auditors"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Output Format</label>
              <Input 
                value={newRecord.outputFormat || ''}
                onChange={(e) => setNewRecord({...newRecord, outputFormat: e.target.value})}
                placeholder="e.g., Excel, PDF"
              />
            </div>
          </div>

          {/* Description and Goals */}
          <div>
            <label className="text-sm font-medium">Goal/Objective</label>
            <Textarea 
              value={newRecord.goalObjective || ''}
              onChange={(e) => setNewRecord({...newRecord, goalObjective: e.target.value})}
              placeholder="What this record aims to achieve"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              value={newRecord.description || ''}
              onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
              placeholder="Detailed description of the record"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Implementation Details</label>
            <Textarea 
              value={newRecord.details || ''}
              onChange={(e) => setNewRecord({...newRecord, details: e.target.value})}
              placeholder="Technical implementation details"
              rows={3}
            />
          </div>

          {/* Likely Sources */}
          <div>
            <label className="text-sm font-medium">Likely Sources</label>
            <div className="flex gap-2 mb-2">
              <Input 
                value={newSource}
                onChange={(e) => setNewSource(e.target.value)}
                placeholder="Add a data source"
                onKeyPress={(e) => e.key === 'Enter' && addSource()}
              />
              <Button type="button" onClick={addSource} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newRecord.likelySources?.map((source, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {source}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-600" 
                    onClick={() => removeSource(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea 
              value={newRecord.notes || ''}
              onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
              placeholder="Additional notes or comments"
              rows={2}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Add Record
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}