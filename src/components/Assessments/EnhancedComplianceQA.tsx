import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertTriangle, XCircle, FileText, Download, BarChart3 } from 'lucide-react';
import { masterListData, tripwireCoreData, alertData } from '../../data/masterFramework';
import { MasterFrameworkRecord } from '../../types/masterFramework';

interface Assessment {
  questionId: string;
  answer: 'yes' | 'no' | 'partial' | 'unknown';
  evidence?: string;
  notes?: string;
  relatedRecords: string[];
}

interface DynamicQuestion {
  id: string;
  question: string;
  category: string;
  relatedRecord: MasterFrameworkRecord;
  weight: number;
}

export function EnhancedComplianceQA() {
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState<{
    answer: string;
    evidence: string;
    notes: string;
  }>({
    answer: '',
    evidence: '',
    notes: ''
  });

  // Combine all framework data
  const allData = useMemo(() => [
    ...masterListData,
    ...tripwireCoreData,
    ...alertData
  ], []);

  // Generate questions dynamically from framework data
  const dynamicQuestions = useMemo(() => {
    let filteredData = allData;
    
    if (selectedFramework !== 'all') {
      filteredData = filteredData.filter(record => record.framework === selectedFramework);
    }
    
    if (selectedDomain !== 'all') {
      filteredData = filteredData.filter(record => record.domain === selectedDomain);
    }

    return filteredData.map((record, index) => ({
      id: `q-${record.id}-${index}`,
      question: record.goalObjective 
        ? `Is the goal "${record.goalObjective}" for "${record.reportName}" being met?`
        : `Is the report "${record.reportName}" being properly generated and reviewed?`,
      category: `${record.framework} - ${record.domain}`,
      relatedRecord: record,
      weight: record.frequency === 'Alert' ? 3 : record.frequency === 'Daily' ? 2 : 1
    })) as DynamicQuestion[];
  }, [allData, selectedFramework, selectedDomain]);

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

  const handleAnswer = () => {
    if (!currentAnswer.answer) return;

    const question = dynamicQuestions[currentQuestion];
    const assessment: Assessment = {
      questionId: question.id,
      answer: currentAnswer.answer as any,
      evidence: currentAnswer.evidence,
      notes: currentAnswer.notes,
      relatedRecords: [question.relatedRecord.id]
    };

    setAssessments(prev => {
      const existing = prev.findIndex(a => a.questionId === question.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = assessment;
        return updated;
      }
      return [...prev, assessment];
    });

    setCurrentAnswer({ answer: '', evidence: '', notes: '' });

    if (currentQuestion < dynamicQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      generateReport();
    }
  };

  const generateReport = () => {
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAssessments([]);
    setShowResults(false);
    setCurrentAnswer({ answer: '', evidence: '', notes: '' });
  };

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      framework: selectedFramework,
      domain: selectedDomain,
      totalQuestions: dynamicQuestions.length,
      completedQuestions: assessments.length,
      assessments: assessments.map(a => {
        const question = dynamicQuestions.find(q => q.id === a.questionId);
        return {
          ...a,
          question: question?.question,
          relatedReport: question?.relatedRecord.reportName,
          category: question?.category
        };
      }),
      summary: {
        yesAnswers: assessments.filter(a => a.answer === 'yes').length,
        noAnswers: assessments.filter(a => a.answer === 'no').length,
        partialAnswers: assessments.filter(a => a.answer === 'partial').length,
        unknownAnswers: assessments.filter(a => a.answer === 'unknown').length
      }
    };

    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compliance-assessment-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const progressPercentage = dynamicQuestions.length > 0 ? (assessments.length / dynamicQuestions.length) * 100 : 0;

  if (dynamicQuestions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Questions Available</h3>
          <p className="text-gray-600 mb-4">
            Please select a framework and domain to generate assessment questions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
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
    const yesCount = assessments.filter(a => a.answer === 'yes').length;
    const totalWeight = assessments.reduce((sum, a) => {
      const question = dynamicQuestions.find(q => q.id === a.questionId);
      return sum + (question?.weight || 1);
    }, 0);
    const yesWeight = assessments.reduce((sum, a) => {
      if (a.answer === 'yes') {
        const question = dynamicQuestions.find(q => q.id === a.questionId);
        return sum + (question?.weight || 1);
      }
      return sum;
    }, 0);
    const scorePercentage = totalWeight > 0 ? Math.round((yesWeight / totalWeight) * 100) : 0;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Assessment Complete
            </CardTitle>
            <CardDescription>
              Framework: {selectedFramework} | Domain: {selectedDomain}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{scorePercentage}%</div>
                <div className="text-sm text-gray-600">Compliance Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{assessments.length}</div>
                <div className="text-sm text-gray-600">Questions Answered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{yesCount}</div>
                <div className="text-sm text-gray-600">Compliant Items</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={exportReport} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
              <Button variant="outline" onClick={resetAssessment}>
                Start New Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Related Report</TableHead>
                  <TableHead>Answer</TableHead>
                  <TableHead>Evidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((assessment) => {
                  const question = dynamicQuestions.find(q => q.id === assessment.questionId);
                  return (
                    <TableRow key={assessment.questionId}>
                      <TableCell className="max-w-xs">{question?.question}</TableCell>
                      <TableCell>{question?.relatedRecord.reportName}</TableCell>
                      <TableCell>
                        <Badge variant={
                          assessment.answer === 'yes' ? 'default' : 
                          assessment.answer === 'no' ? 'destructive' : 
                          'secondary'
                        }>
                          {assessment.answer}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{assessment.evidence || 'N/A'}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestionData = dynamicQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Assessment Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Configuration</CardTitle>
          <CardDescription>
            Configure your assessment scope to generate relevant questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-600">
              {assessments.length} of {dynamicQuestions.length} questions
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </CardContent>
      </Card>

      {/* Current Question */}
      <Card>
        <CardHeader>
          <CardTitle>
            Question {currentQuestion + 1} of {dynamicQuestions.length}
          </CardTitle>
          <CardDescription>
            {currentQuestionData?.category}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">{currentQuestionData?.question}</h3>
            <div className="text-sm text-gray-600">
              <p><strong>Related Report:</strong> {currentQuestionData?.relatedRecord.reportName}</p>
              <p><strong>Framework:</strong> {currentQuestionData?.relatedRecord.framework}</p>
              <p><strong>Frequency:</strong> {currentQuestionData?.relatedRecord.frequency}</p>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">Your Answer</Label>
            <RadioGroup 
              value={currentAnswer.answer} 
              onValueChange={(value) => setCurrentAnswer(prev => ({ ...prev, answer: value }))}
              className="mt-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Yes - Fully Compliant
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="partial" />
                <Label htmlFor="partial" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  Partial - Partially Compliant
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  No - Not Compliant
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="unknown" id="unknown" />
                <Label htmlFor="unknown" className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-600" />
                  Unknown - Need More Information
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="evidence">Evidence (Optional)</Label>
            <Textarea
              id="evidence"
              placeholder="Provide evidence or documentation that supports your answer..."
              value={currentAnswer.evidence}
              onChange={(e) => setCurrentAnswer(prev => ({ ...prev, evidence: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes or context..."
              value={currentAnswer.notes}
              onChange={(e) => setCurrentAnswer(prev => ({ ...prev, notes: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button 
              onClick={handleAnswer}
              disabled={!currentAnswer.answer}
            >
              {currentQuestion === dynamicQuestions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}