import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Link, ArrowRight, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { masterListData, tripwireCoreData, alertData } from '../../data/masterFramework';
import { MasterFrameworkRecord, FrameworkCorrelation } from '../../types/masterFramework';

export function CorrelationView() {
  const [selectedCorrelation, setSelectedCorrelation] = useState<FrameworkCorrelation | null>(null);

  // Generate correlations based on matching criteria
  const correlations = useMemo(() => {
    const correlationMap: FrameworkCorrelation[] = [];
    
    masterListData.forEach(masterRecord => {
      const correlation: FrameworkCorrelation = {
        masterId: masterRecord.id,
        correlationScore: 0,
        correlationType: 'exact'
      };

      // Find matching Tripwire record
      const tripwireMatch = tripwireCoreData.find(tr => 
        tr.cipStandards === masterRecord.cipStandards && 
        tr.cipReq === masterRecord.cipReq &&
        tr.domain === masterRecord.domain
      );

      if (tripwireMatch) {
        correlation.tripwireId = tripwireMatch.id;
        correlation.correlationScore += 50;
        
        // Check for differences
        const differences = [];
        if (tripwireMatch.frequency !== masterRecord.frequency) {
          differences.push(`Frequency: ${masterRecord.frequency} vs ${tripwireMatch.frequency}`);
        }
        if (tripwireMatch.assetScope !== masterRecord.assetScope) {
          differences.push(`Scope: Different asset scopes`);
        }
        if (differences.length > 0) {
          correlation.differenceNotes = differences.join('; ');
          correlation.correlationType = 'partial';
        }
      }

      // Find matching Alert record
      const alertMatch = alertData.find(al => 
        al.cipStandards === masterRecord.cipStandards && 
        al.cipReq === masterRecord.cipReq &&
        al.domain === masterRecord.domain
      );

      if (alertMatch) {
        correlation.alertId = alertMatch.id;
        correlation.correlationScore += 30;
      }

      // Determine final correlation type and score
      if (correlation.tripwireId && correlation.alertId) {
        correlation.correlationScore = 100;
        if (correlation.correlationType === 'partial') {
          correlation.correlationScore = 85;
        }
      } else if (correlation.tripwireId || correlation.alertId) {
        correlation.correlationScore = Math.max(correlation.correlationScore, 60);
        correlation.correlationType = 'partial';
      } else {
        correlation.correlationScore = 0;
        correlation.correlationType = 'inferred';
      }

      correlationMap.push(correlation);
    });

    return correlationMap;
  }, []);

  const getCorrelationColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getCorrelationIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 40) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangle className="h-4 w-4 text-red-600" />;
  };

  const getMasterRecord = (id: string) => masterListData.find(r => r.id === id);
  const getTripwireRecord = (id: string) => tripwireCoreData.find(r => r.id === id);
  const getAlertRecord = (id: string) => alertData.find(r => r.id === id);

  const stats = useMemo(() => {
    const total = correlations.length;
    const fullyMapped = correlations.filter(c => c.correlationScore >= 90).length;
    const partiallyMapped = correlations.filter(c => c.correlationScore >= 40 && c.correlationScore < 90).length;
    const unmapped = correlations.filter(c => c.correlationScore < 40).length;

    return { total, fullyMapped, partiallyMapped, unmapped };
  }, [correlations]);

  return (
    <div className="space-y-6">
      {/* Correlation Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-600">Fully Mapped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.fullyMapped}</div>
            <div className="text-sm text-gray-600">
              {Math.round((stats.fullyMapped / stats.total) * 100)}% coverage
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-yellow-600">Partially Mapped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.partiallyMapped}</div>
            <div className="text-sm text-gray-600">
              {Math.round((stats.partiallyMapped / stats.total) * 100)}% partial
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-red-600">Gaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.unmapped}</div>
            <div className="text-sm text-gray-600">
              {Math.round((stats.unmapped / stats.total) * 100)}% gaps
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Correlation Table */}
      <Card>
        <CardHeader>
          <CardTitle>Framework Correlation Mapping</CardTitle>
          <CardDescription>
            Cross-reference between Master List, Tripwire Core, and Alert frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Master Record</TableHead>
                  <TableHead>Tripwire Core</TableHead>
                  <TableHead>Alert</TableHead>
                  <TableHead>Correlation Score</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Differences</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {correlations.map((correlation) => {
                  const masterRecord = getMasterRecord(correlation.masterId);
                  const tripwireRecord = correlation.tripwireId ? getTripwireRecord(correlation.tripwireId) : null;
                  const alertRecord = correlation.alertId ? getAlertRecord(correlation.alertId) : null;

                  return (
                    <TableRow key={correlation.masterId}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{masterRecord?.id}</div>
                          <div className="text-sm text-gray-600 max-w-xs truncate">
                            {masterRecord?.reportName}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {masterRecord?.domain}
                          </Badge>
                        </div>
                      </TableCell>

                      <TableCell>
                        {tripwireRecord ? (
                          <div className="flex items-center gap-2">
                            <Link className="h-4 w-4 text-blue-600" />
                            <div>
                              <div className="font-medium">{tripwireRecord.id}</div>
                              <div className="text-sm text-gray-600">Mapped</div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">No mapping</div>
                        )}
                      </TableCell>

                      <TableCell>
                        {alertRecord ? (
                          <div className="flex items-center gap-2">
                            <Link className="h-4 w-4 text-blue-600" />
                            <div>
                              <div className="font-medium">{alertRecord.id}</div>
                              <div className="text-sm text-gray-600">Mapped</div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-sm">No mapping</div>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCorrelationIcon(correlation.correlationScore)}
                          <div>
                            <div className={`font-medium ${getCorrelationColor(correlation.correlationScore)}`}>
                              {correlation.correlationScore}%
                            </div>
                            <Progress 
                              value={correlation.correlationScore} 
                              className="w-16 h-2"
                            />
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge 
                          variant={
                            correlation.correlationType === 'exact' ? 'default' :
                            correlation.correlationType === 'partial' ? 'secondary' : 'outline'
                          }
                        >
                          {correlation.correlationType}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        {correlation.differenceNotes ? (
                          <div className="text-sm text-orange-600 max-w-xs truncate">
                            {correlation.differenceNotes}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">None</div>
                        )}
                      </TableCell>

                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedCorrelation(correlation)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Correlation Details</DialogTitle>
                            </DialogHeader>
                            {selectedCorrelation && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {/* Master Record */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Master List</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      {(() => {
                                        const record = getMasterRecord(selectedCorrelation.masterId);
                                        return record ? (
                                          <div className="space-y-2 text-sm">
                                            <div><strong>ID:</strong> {record.id}</div>
                                            <div><strong>Report:</strong> {record.reportName}</div>
                                            <div><strong>Domain:</strong> {record.domain}</div>
                                            <div><strong>CIP:</strong> {record.cipStandards} {record.cipReq}</div>
                                            <div><strong>Frequency:</strong> {record.frequency}</div>
                                            <div><strong>Status:</strong> {record.status}</div>
                                          </div>
                                        ) : null;
                                      })()}
                                    </CardContent>
                                  </Card>

                                  {/* Tripwire Record */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Tripwire Core</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      {selectedCorrelation.tripwireId ? (() => {
                                        const record = getTripwireRecord(selectedCorrelation.tripwireId);
                                        return record ? (
                                          <div className="space-y-2 text-sm">
                                            <div><strong>ID:</strong> {record.id}</div>
                                            <div><strong>Report:</strong> {record.reportName}</div>
                                            <div><strong>Domain:</strong> {record.domain}</div>
                                            <div><strong>CIP:</strong> {record.cipStandards} {record.cipReq}</div>
                                            <div><strong>Frequency:</strong> {record.frequency}</div>
                                            <div><strong>Status:</strong> {record.status}</div>
                                          </div>
                                        ) : null;
                                      })() : (
                                        <div className="text-gray-400">No mapping found</div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  {/* Alert Record */}
                                  <Card>
                                    <CardHeader>
                                      <CardTitle className="text-lg">Alert</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      {selectedCorrelation.alertId ? (() => {
                                        const record = getAlertRecord(selectedCorrelation.alertId);
                                        return record ? (
                                          <div className="space-y-2 text-sm">
                                            <div><strong>ID:</strong> {record.id}</div>
                                            <div><strong>Report:</strong> {record.reportName}</div>
                                            <div><strong>Domain:</strong> {record.domain}</div>
                                            <div><strong>CIP:</strong> {record.cipStandards} {record.cipReq}</div>
                                            <div><strong>Frequency:</strong> {record.frequency}</div>
                                            <div><strong>Status:</strong> {record.status}</div>
                                          </div>
                                        ) : null;
                                      })() : (
                                        <div className="text-gray-400">No mapping found</div>
                                      )}
                                    </CardContent>
                                  </Card>
                                </div>

                                {/* Correlation Summary */}
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Correlation Summary</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                          {getCorrelationIcon(selectedCorrelation.correlationScore)}
                                          <span className={`font-medium ${getCorrelationColor(selectedCorrelation.correlationScore)}`}>
                                            {selectedCorrelation.correlationScore}% Match
                                          </span>
                                        </div>
                                        <Badge variant="outline">
                                          {selectedCorrelation.correlationType} Correlation
                                        </Badge>
                                      </div>

                                      {selectedCorrelation.differenceNotes && (
                                        <div>
                                          <h4 className="font-medium text-orange-600 mb-2">Differences Noted:</h4>
                                          <p className="text-sm text-orange-600">
                                            {selectedCorrelation.differenceNotes}
                                          </p>
                                        </div>
                                      )}

                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <strong>Tripwire Mapping:</strong> {selectedCorrelation.tripwireId ? 'Yes' : 'No'}
                                        </div>
                                        <div>
                                          <strong>Alert Mapping:</strong> {selectedCorrelation.alertId ? 'Yes' : 'No'}
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}