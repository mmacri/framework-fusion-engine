import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Users, 
  BarChart3,
  Download,
  Calendar,
  Target
} from 'lucide-react';
import { masterListData, tripwireCoreData, alertData } from '../../data/masterFramework';
import { MasterFrameworkRecord } from '../../types/masterFramework';

interface AuditorAssessmentData {
  questionId: string;
  answer: 'compliant' | 'non-compliant' | 'not-applicable' | 'needs-review';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  evidence?: string;
  remediationPlan?: string;
  dueDate?: string;
  assignee?: string;
  relatedRecords: string[];
}

interface AuditorQuestion {
  id: string;
  question: string;
  auditArea: string;
  relatedRecord: MasterFrameworkRecord;
  riskWeight: number;
  auditorFocus: string;
}

export function EnhancedAuditorAssessment() {
  const [assessmentType, setAssessmentType] = useState<'auditor' | 'self' | 'quarterly'>('auditor');
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessments, setAssessments] = useState<Record<string, AuditorAssessmentData>>({});
  const [projectName, setProjectName] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Combine all framework data
  const allData = useMemo(() => [
    ...masterListData,
    ...tripwireCoreData,
    ...alertData
  ], []);

  // Generate auditor questions based on framework data
  const auditorQuestions = useMemo(() => {
    let filteredData = allData;
    
    if (selectedFramework !== 'all') {
      filteredData = filteredData.filter(record => record.framework === selectedFramework);
    }
    
    if (selectedDomain !== 'all') {
      filteredData = filteredData.filter(record => record.domain === selectedDomain);
    }

    return filteredData.map((record, index) => {
      let question = '';
      let auditArea = '';
      let auditorFocus = '';
      let riskWeight = 1;

      // Generate appropriate questions based on assessment type
      switch (assessmentType) {
        case 'auditor':
          question = `Has the organization implemented effective controls for "${record.reportName}"?`;
          auditArea = 'Compliance Verification';
          auditorFocus = 'Evidence review and testing of controls';
          riskWeight = record.frequency === 'Alert' ? 5 : record.frequency === 'Daily' ? 3 : 2;
          break;
        case 'self':
          question = `Are we confident that "${record.reportName}" meets all requirements and is being executed properly?`;
          auditArea = 'Self Assessment';
          auditorFocus = 'Internal review and validation';
          riskWeight = record.frequency === 'Alert' ? 4 : record.frequency === 'Daily' ? 2 : 1;
          break;
        case 'quarterly':
          question = `During this quarter, has "${record.reportName}" been consistently maintained and reviewed?`;
          auditArea = 'Quarterly Review';
          auditorFocus = 'Trend analysis and periodic validation';
          riskWeight = record.frequency === 'Alert' ? 3 : 2;
          break;
      }

      return {
        id: `audit-${record.id}-${index}`,
        question,
        auditArea,
        relatedRecord: record,
        riskWeight,
        auditorFocus
      };
    }) as AuditorQuestion[];
  }, [allData, selectedFramework, selectedDomain, assessmentType]);

  const availableFrameworks = useMemo(() => {
    return [...new Set(allData.map(record => record.framework))];
  }, [allData]);

  const availableDomains = useMemo(() => {
    let filteredData = allData;
    if (selectedFramework !== 'all') {
      filteredData = filteredData.filter(record => record.framework === selectedFramework);
    }
    return [...new Set(filteredData.map(record => record.domain))];
  }, [allData, selectedFramework]);

  const currentQuestion = auditorQuestions[currentQuestionIndex];
  const completedCount = Object.keys(assessments).length;
  const progressPercentage = auditorQuestions.length > 0 ? (completedCount / auditorQuestions.length) * 100 : 0;

  const handleAnswerChange = (questionId: string, field: keyof AuditorAssessmentData, value: any) => {
    setAssessments(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value,
        questionId,
        relatedRecords: [currentQuestion?.relatedRecord.id || '']
      } as AuditorAssessmentData
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < auditorQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      generateReport();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const generateReport = () => {
    setShowResults(true);
  };

  const exportReport = () => {
    const riskAnalysis = Object.values(assessments).reduce((acc, assessment) => {
      const question = auditorQuestions.find(q => q.id === assessment.questionId);
      const riskScore = question?.riskWeight || 1;
      
      if (assessment.answer === 'non-compliant') {
        acc.highRisk += riskScore;
      } else if (assessment.answer === 'needs-review') {
        acc.mediumRisk += riskScore;
      } else {
        acc.lowRisk += riskScore;
      }
      
      return acc;
    }, { highRisk: 0, mediumRisk: 0, lowRisk: 0 });

    const report = {
      generatedAt: new Date().toISOString(),
      projectName,
      assessmentType,
      framework: selectedFramework,
      domain: selectedDomain,
      totalQuestions: auditorQuestions.length,
      completedQuestions: completedCount,
      riskAnalysis,
      assessments: Object.values(assessments).map(assessment => {
        const question = auditorQuestions.find(q => q.id === assessment.questionId);
        return {
          ...assessment,
          question: question?.question,
          relatedReport: question?.relatedRecord.reportName,
          auditArea: question?.auditArea,
          riskWeight: question?.riskWeight
        };
      })
    };

    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `auditor-assessment-${projectName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setAssessments({});
    setShowResults(false);
    setProjectName('');
  };

  if (auditorQuestions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Configure Assessment</h3>
          <p className="text-gray-600 mb-4">
            Select assessment parameters to generate audit questions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Select value={assessmentType} onValueChange={(value: any) => setAssessmentType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auditor">External Auditor Review</SelectItem>
                <SelectItem value="self">Self Assessment</SelectItem>
                <SelectItem value="quarterly">Quarterly Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger>
                <SelectValue placeholder="Select Framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frameworks</SelectItem>
                {availableFrameworks.map(framework => (
                  <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger>
                <SelectValue placeholder="Select Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                {availableDomains.map(domain => (
                  <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const riskDistribution = Object.values(assessments).reduce((acc, assessment) => {
      acc[assessment.riskLevel || 'low']++;
      return acc;
    }, { low: 0, medium: 0, high: 0, critical: 0 } as Record<string, number>);

    const complianceScore = Math.round((Object.values(assessments).filter(a => a.answer === 'compliant').length / completedCount) * 100);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Assessment Complete: {projectName || 'Unnamed Project'}
            </CardTitle>
            <CardDescription>
              {assessmentType.charAt(0).toUpperCase() + assessmentType.slice(1)} Assessment | 
              Framework: {selectedFramework} | Domain: {selectedDomain}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{complianceScore}%</div>
                <div className="text-sm text-gray-600">Compliance Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{riskDistribution.critical + riskDistribution.high}</div>
                <div className="text-sm text-gray-600">High Risk Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{riskDistribution.medium}</div>
                <div className="text-sm text-gray-600">Medium Risk Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Items Assessed</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={exportReport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Assessment Report
              </Button>
              <Button variant="outline" onClick={resetAssessment}>
                Start New Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.values(assessments)
                .filter(a => a.answer === 'non-compliant' || a.riskLevel === 'high' || a.riskLevel === 'critical')
                .map((assessment) => {
                  const question = auditorQuestions.find(q => q.id === assessment.questionId);
                  return (
                    <div key={assessment.questionId} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{question?.relatedRecord.reportName}</h4>
                        <Badge variant="destructive">{assessment.riskLevel} Risk</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{question?.question}</p>
                      {assessment.remediationPlan && (
                        <div className="text-sm">
                          <strong>Remediation Plan:</strong> {assessment.remediationPlan}
                        </div>
                      )}
                      {assessment.dueDate && (
                        <div className="text-sm">
                          <strong>Due Date:</strong> {assessment.dueDate}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentAssessment = assessments[currentQuestion?.id] || {
    answer: '',
    riskLevel: 'low',
    evidence: '',
    remediationPlan: '',
    dueDate: '',
    assignee: ''
  } as any;

  return (
    <div className="space-y-6">
      {/* Project Setup */}
      {!projectName && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Setup</CardTitle>
            <CardDescription>Configure your assessment parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Project Name</Label>
              <Input
                placeholder="Enter project or assessment name..."
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Assessment Type</Label>
                <Select value={assessmentType} onValueChange={(value: any) => setAssessmentType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auditor">External Auditor Review</SelectItem>
                    <SelectItem value="self">Self Assessment</SelectItem>
                    <SelectItem value="quarterly">Quarterly Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Framework</Label>
                <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frameworks</SelectItem>
                    {availableFrameworks.map(framework => (
                      <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Domain</Label>
                <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Domains</SelectItem>
                    {availableDomains.map(domain => (
                      <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {projectName && (
        <>
          {/* Progress */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Assessment Progress</span>
                <span className="text-sm text-gray-600">
                  {completedCount} of {auditorQuestions.length} items assessed
                </span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </CardContent>
          </Card>

          {/* Current Question */}
          <Card>
            <CardHeader>
              <CardTitle>
                Item {currentQuestionIndex + 1} of {auditorQuestions.length}
              </CardTitle>
              <CardDescription>
                {currentQuestion?.auditArea} | {currentQuestion?.relatedRecord.framework}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">{currentQuestion?.question}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Related Report:</strong> {currentQuestion?.relatedRecord.reportName}</p>
                  <p><strong>Domain:</strong> {currentQuestion?.relatedRecord.domain}</p>
                  <p><strong>Frequency:</strong> {currentQuestion?.relatedRecord.frequency}</p>
                  <p><strong>Auditor Focus:</strong> {currentQuestion?.auditorFocus}</p>
                </div>
              </div>

              {/* Assessment Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-medium">Compliance Status</Label>
                  <RadioGroup 
                    value={currentAssessment.answer} 
                    onValueChange={(value) => handleAnswerChange(currentQuestion?.id, 'answer', value)}
                    className="mt-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compliant" id="compliant" />
                      <Label htmlFor="compliant" className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Compliant
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-compliant" id="non-compliant" />
                      <Label htmlFor="non-compliant" className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        Non-Compliant
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not-applicable" id="not-applicable" />
                      <Label htmlFor="not-applicable" className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        Not Applicable
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="needs-review" id="needs-review" />
                      <Label htmlFor="needs-review" className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-yellow-600" />
                        Needs Review
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium">Risk Level</Label>
                  <Select 
                    value={currentAssessment.riskLevel} 
                    onValueChange={(value) => handleAnswerChange(currentQuestion?.id, 'riskLevel', value)}
                  >
                    <SelectTrigger className="mt-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="critical">Critical Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="evidence">Evidence & Documentation</Label>
                <Textarea
                  id="evidence"
                  placeholder="Provide evidence, test results, or documentation references..."
                  value={currentAssessment.evidence}
                  onChange={(e) => handleAnswerChange(currentQuestion?.id, 'evidence', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="remediation">Remediation Plan (if needed)</Label>
                <Textarea
                  id="remediation"
                  placeholder="Describe remediation steps for non-compliant items..."
                  value={currentAssessment.remediationPlan}
                  onChange={(e) => handleAnswerChange(currentQuestion?.id, 'remediationPlan', e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dueDate">Due Date (if applicable)</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={currentAssessment.dueDate}
                    onChange={(e) => handleAnswerChange(currentQuestion?.id, 'dueDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="assignee">Assigned To</Label>
                  <Input
                    id="assignee"
                    placeholder="Person responsible for remediation..."
                    value={currentAssessment.assignee}
                    onChange={(e) => handleAnswerChange(currentQuestion?.id, 'assignee', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextQuestion}
                  disabled={!currentAssessment.answer}
                >
                  {currentQuestionIndex === auditorQuestions.length - 1 ? 'Complete Assessment' : 'Next Item'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}