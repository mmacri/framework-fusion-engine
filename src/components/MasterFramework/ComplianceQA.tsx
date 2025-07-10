import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, AlertTriangle, XCircle, FileText, Download } from 'lucide-react';
import { complianceQuestions } from '../../data/masterFramework';
import { ComplianceAssessment } from '../../types/masterFramework';

export function ComplianceQA() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessments, setAssessments] = useState<ComplianceAssessment[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: 'yes' | 'no' | 'partial' | 'unknown', evidence?: string, notes?: string) => {
    const question = complianceQuestions[currentQuestion];
    const assessment: ComplianceAssessment = {
      questionId: question.id,
      answer,
      evidence,
      notes,
      relatedRecords: [] // In a real app, this would be populated based on the question
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

    if (currentQuestion < complianceQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const generateReport = () => {
    setShowResults(true);
  };

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      assessments,
      summary: assessmentSummary,
      recommendations
    };

    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compliance-assessment-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const assessmentSummary = useMemo(() => {
    const total = assessments.length;
    const answered = assessments.filter(a => a.answer !== 'unknown').length;
    const compliant = assessments.filter(a => a.answer === 'yes').length;
    const partial = assessments.filter(a => a.answer === 'partial').length;
    const nonCompliant = assessments.filter(a => a.answer === 'no').length;
    const unknown = assessments.filter(a => a.answer === 'unknown').length;

    const weightedScore = assessments.reduce((score, assessment) => {
      const question = complianceQuestions.find(q => q.id === assessment.questionId);
      if (!question) return score;

      let points = 0;
      switch (assessment.answer) {
        case 'yes': points = question.weight; break;
        case 'partial': points = question.weight * 0.5; break;
        case 'no': points = 0; break;
        case 'unknown': points = 0; break;
      }
      return score + points;
    }, 0);

    const maxPossibleScore = complianceQuestions.reduce((sum, q) => sum + q.weight, 0);
    const compliancePercentage = Math.round((weightedScore / maxPossibleScore) * 100);

    return {
      total,
      answered,
      compliant,
      partial,
      nonCompliant,
      unknown,
      compliancePercentage,
      weightedScore,
      maxPossibleScore
    };
  }, [assessments]);

  const recommendations = useMemo(() => {
    const recs = [];

    // High-priority gaps
    const highPriorityGaps = assessments.filter(a => {
      const question = complianceQuestions.find(q => q.id === a.questionId);
      return question && question.weight >= 10 && (a.answer === 'no' || a.answer === 'unknown');
    });

    if (highPriorityGaps.length > 0) {
      recs.push({
        priority: 'High',
        title: 'Address Critical Compliance Gaps',
        description: `${highPriorityGaps.length} high-weight controls are not compliant or unknown.`,
        actions: highPriorityGaps.map(gap => {
          const question = complianceQuestions.find(q => q.id === gap.questionId);
          return question?.question || gap.questionId;
        })
      });
    }

    // Partial compliance items
    const partialItems = assessments.filter(a => a.answer === 'partial');
    if (partialItems.length > 0) {
      recs.push({
        priority: 'Medium',
        title: 'Strengthen Partial Compliance',
        description: `${partialItems.length} controls have partial compliance that could be improved.`,
        actions: partialItems.map(item => {
          const question = complianceQuestions.find(q => q.id === item.questionId);
          return question?.question || item.questionId;
        })
      });
    }

    // Missing evidence
    const missingEvidence = assessments.filter(a => a.answer === 'yes' && !a.evidence);
    if (missingEvidence.length > 0) {
      recs.push({
        priority: 'Low',
        title: 'Document Evidence',
        description: `${missingEvidence.length} compliant controls lack documented evidence.`,
        actions: ['Collect and document evidence for all compliant controls']
      });
    }

    return recs;
  }, [assessments]);

  const currentQuestionData = complianceQuestions[currentQuestion];
  const isComplete = assessments.length === complianceQuestions.length;

  if (showResults && isComplete) {
    return (
      <div className="space-y-6">
        {/* Assessment Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Compliance Assessment Results
            </CardTitle>
            <CardDescription>
              Generated on {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{assessmentSummary.compliant}</div>
                <div className="text-sm text-gray-600">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{assessmentSummary.partial}</div>
                <div className="text-sm text-gray-600">Partial</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{assessmentSummary.nonCompliant}</div>
                <div className="text-sm text-gray-600">Non-Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600">{assessmentSummary.unknown}</div>
                <div className="text-sm text-gray-600">Unknown</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Compliance Score</span>
                  <span className="text-sm font-medium">{assessmentSummary.compliancePercentage}%</span>
                </div>
                <Progress value={assessmentSummary.compliancePercentage} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Weighted Score:</strong> {assessmentSummary.weightedScore} / {assessmentSummary.maxPossibleScore}
                </div>
                <div>
                  <strong>Questions Answered:</strong> {assessmentSummary.answered} / {assessmentSummary.total}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-l-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={
                      rec.priority === 'High' ? 'destructive' : 
                      rec.priority === 'Medium' ? 'default' : 'secondary'
                    }>
                      {rec.priority} Priority
                    </Badge>
                    <h3 className="font-semibold">{rec.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <ul className="text-sm space-y-1">
                    {rec.actions.slice(0, 3).map((action, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                    {rec.actions.length > 3 && (
                      <li className="text-gray-500 text-xs">
                        ... and {rec.actions.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Assessment Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Answer</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((assessment) => {
                  const question = complianceQuestions.find(q => q.id === assessment.questionId);
                  if (!question) return null;

                  const getAnswerIcon = (answer: string) => {
                    switch (answer) {
                      case 'yes': return <CheckCircle className="h-4 w-4 text-green-600" />;
                      case 'partial': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
                      case 'no': return <XCircle className="h-4 w-4 text-red-600" />;
                      case 'unknown': return <AlertTriangle className="h-4 w-4 text-gray-600" />;
                      default: return null;
                    }
                  };

                  return (
                    <TableRow key={assessment.questionId}>
                      <TableCell className="max-w-xs">
                        <div className="text-sm">{question.question}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{question.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getAnswerIcon(assessment.answer)}
                          <span className="capitalize">{assessment.answer}</span>
                        </div>
                      </TableCell>
                      <TableCell>{question.weight}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm truncate">
                          {assessment.evidence || '-'}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="text-sm truncate">
                          {assessment.notes || '-'}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button onClick={() => setShowResults(false)}>
            Back to Assessment
          </Button>
          <Button onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Assessment Q&A</CardTitle>
          <CardDescription>
            Answer questions to generate a dynamic compliance status report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Progress</span>
              <span className="text-sm">{assessments.length} / {complianceQuestions.length}</span>
            </div>
            <Progress 
              value={(assessments.length / complianceQuestions.length) * 100} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      {!isComplete && currentQuestionData && (
        <Card>
          <CardHeader>
            <CardTitle>
              Question {currentQuestion + 1} of {complianceQuestions.length}
            </CardTitle>
            <CardDescription>
              Category: {currentQuestionData.category} | Weight: {currentQuestionData.weight}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-lg font-medium">
                {currentQuestionData.question}
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Related Domains:</Label>
                  <div className="flex gap-2 mt-1">
                    {currentQuestionData.relatedDomains.map(domain => (
                      <Badge key={domain} variant="outline">{domain}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Related CIP Standards:</Label>
                  <div className="flex gap-2 mt-1">
                    {currentQuestionData.relatedCipStandards.map(standard => (
                      <Badge key={standard} variant="outline">{standard}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <QuestionForm 
                onSubmit={handleAnswer}
                existingAssessment={assessments.find(a => a.questionId === currentQuestionData.id)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assessment Complete */}
      {isComplete && !showResults && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Complete!</CardTitle>
            <CardDescription>
              You've answered all {complianceQuestions.length} questions. Generate your compliance report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={generateReport} className="w-full">
              Generate Compliance Report
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Previous Answers */}
      {assessments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Previous Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessments.map((assessment, index) => {
                const question = complianceQuestions.find(q => q.id === assessment.questionId);
                if (!question) return null;

                return (
                  <div key={assessment.questionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{question.question}</div>
                      <div className="text-xs text-gray-600">{question.category}</div>
                    </div>
                    <Badge variant={
                      assessment.answer === 'yes' ? 'default' :
                      assessment.answer === 'partial' ? 'secondary' :
                      assessment.answer === 'no' ? 'destructive' : 'outline'
                    }>
                      {assessment.answer}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface QuestionFormProps {
  onSubmit: (answer: 'yes' | 'no' | 'partial' | 'unknown', evidence?: string, notes?: string) => void;
  existingAssessment?: ComplianceAssessment;
}

function QuestionForm({ onSubmit, existingAssessment }: QuestionFormProps) {
  const [answer, setAnswer] = useState<'yes' | 'no' | 'partial' | 'unknown'>(existingAssessment?.answer || 'unknown');
  const [evidence, setEvidence] = useState(existingAssessment?.evidence || '');
  const [notes, setNotes] = useState(existingAssessment?.notes || '');

  const handleSubmit = () => {
    onSubmit(answer, evidence || undefined, notes || undefined);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium mb-3 block">Your Answer:</Label>
        <RadioGroup value={answer} onValueChange={(value) => setAnswer(value as any)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Yes - Fully compliant
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="partial" id="partial" />
            <Label htmlFor="partial" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              Partial - Some compliance measures in place
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no" className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600" />
              No - Not compliant
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="unknown" id="unknown" />
            <Label htmlFor="unknown" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-gray-600" />
              Unknown - Need to investigate
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="text-sm font-medium">Evidence/Documentation (optional):</Label>
        <Textarea 
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          placeholder="Describe evidence, documentation, or systems that support your answer..."
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Additional Notes (optional):</Label>
        <Textarea 
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional context, concerns, or action items..."
          className="mt-1"
          rows={2}
        />
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Submit Answer
      </Button>
    </div>
  );
}