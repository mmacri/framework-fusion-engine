import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { complianceQuestions } from '../../data/masterFramework';
import { ComplianceAssessment } from '../../types/masterFramework';

export function AuditorAssessment() {
  const [assessmentType, setAssessmentType] = useState<'auditor' | 'self' | 'project' | 'quarterly'>('auditor');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessments, setAssessments] = useState<Record<string, ComplianceAssessment>>({});
  const [selectedProject, setSelectedProject] = useState<string>('');
  
  const filteredQuestions = complianceQuestions.filter(q => {
    switch (assessmentType) {
      case 'auditor':
        return q.category.includes('Auditor Review');
      case 'self':
        return q.category.includes('Self Assessment');
      case 'project':
        return q.category.includes('Project');
      case 'quarterly':
        return q.category.includes('Quarterly');
      default:
        return true;
    }
  });

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const completedCount = Object.keys(assessments).length;
  const progressPercentage = (completedCount / filteredQuestions.length) * 100;

  const handleAnswerChange = (questionId: string, field: keyof ComplianceAssessment, value: any) => {
    setAssessments(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        [field]: value,
        relatedRecords: prev[questionId]?.relatedRecords || []
      }
    }));
  };

  const generateReport = () => {
    const reportData = {
      assessmentType,
      project: selectedProject,
      timestamp: new Date().toISOString(),
      totalQuestions: filteredQuestions.length,
      completedQuestions: completedCount,
      completionRate: progressPercentage,
      assessments: Object.values(assessments),
      summary: {
        yesAnswers: Object.values(assessments).filter(a => a.answer === 'yes').length,
        noAnswers: Object.values(assessments).filter(a => a.answer === 'no').length,
        partialAnswers: Object.values(assessments).filter(a => a.answer === 'partial').length,
        unknownAnswers: Object.values(assessments).filter(a => a.answer === 'unknown').length,
      }
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${assessmentType}-assessment-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getAssessmentTypeConfig = () => {
    switch (assessmentType) {
      case 'auditor':
        return {
          title: 'Auditor Review Assessment',
          description: 'Comprehensive compliance assessment for auditor validation',
          icon: <Users className="h-5 w-5" />,
          color: 'bg-red-500'
        };
      case 'self':
        return {
          title: 'Self-Assessment',
          description: 'Organizational self-evaluation for quarterly reporting',
          icon: <Target className="h-5 w-5" />,
          color: 'bg-blue-500'
        };
      case 'project':
        return {
          title: 'Project Assessment',
          description: 'Project-specific compliance evaluation',
          icon: <FileText className="h-5 w-5" />,
          color: 'bg-green-500'
        };
      case 'quarterly':
        return {
          title: 'Quarterly Reporting',
          description: 'Quarterly metrics and performance assessment',
          icon: <Calendar className="h-5 w-5" />,
          color: 'bg-purple-500'
        };
      default:
        return {
          title: 'Assessment',
          description: 'Compliance assessment',
          icon: <CheckCircle className="h-5 w-5" />,
          color: 'bg-gray-500'
        };
    }
  };

  const config = getAssessmentTypeConfig();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.color} text-white`}>
            {config.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
            <p className="text-gray-600">{config.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateReport} disabled={completedCount === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>

      {/* Assessment Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Configuration</CardTitle>
          <CardDescription>Select the type of assessment to conduct</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assessment-type">Assessment Type</Label>
              <Select value={assessmentType} onValueChange={(value: any) => setAssessmentType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assessment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auditor">Auditor Review</SelectItem>
                  <SelectItem value="self">Self-Assessment</SelectItem>
                  <SelectItem value="project">Project Assessment</SelectItem>
                  <SelectItem value="quarterly">Quarterly Reporting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {assessmentType === 'project' && (
              <div>
                <Label htmlFor="project">Project Name</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project-alpha">Project Alpha</SelectItem>
                    <SelectItem value="project-beta">Project Beta</SelectItem>
                    <SelectItem value="project-gamma">Project Gamma</SelectItem>
                    <SelectItem value="infrastructure-upgrade">Infrastructure Upgrade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Assessment Progress</h3>
              <p className="text-gray-600">
                {completedCount} of {filteredQuestions.length} questions completed
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(assessments).filter(a => a.answer === 'yes').length}
                </div>
                <div className="text-sm text-gray-600">Yes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {Object.values(assessments).filter(a => a.answer === 'partial').length}
                </div>
                <div className="text-sm text-gray-600">Partial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {Object.values(assessments).filter(a => a.answer === 'no').length}
                </div>
                <div className="text-sm text-gray-600">No</div>
              </div>
            </div>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </CardContent>
      </Card>

      {/* Assessment Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Question List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>Navigate through assessment questions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {filteredQuestions.map((question, index) => {
                const isCompleted = assessments[question.id];
                const isCurrent = index === currentQuestionIndex;
                
                return (
                  <div
                    key={question.id}
                    className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                      isCurrent ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium">Q{index + 1}</div>
                        <div className="text-xs text-gray-600 truncate">
                          {question.question}
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {question.category.split(' - ')[0]}
                        </Badge>
                      </div>
                      {isCompleted && (
                        <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Question {currentQuestionIndex + 1} of {filteredQuestions.length}</CardTitle>
                <CardDescription>{currentQuestion?.category}</CardDescription>
              </div>
              <Badge variant="outline">
                Weight: {currentQuestion?.weight}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion && (
              <>
                {/* Question Text */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">{currentQuestion.question}</h3>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      {currentQuestion.relatedCipStandards.join(', ')}
                    </Badge>
                    <Badge variant="outline">
                      {currentQuestion.relatedDomains.join(', ')}
                    </Badge>
                  </div>
                </div>

                {/* Answer Options */}
                <div>
                  <Label className="text-base font-medium">Response</Label>
                  <RadioGroup
                    value={assessments[currentQuestion.id]?.answer || ''}
                    onValueChange={(value: any) => 
                      handleAnswerChange(currentQuestion.id, 'answer', value)
                    }
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="text-green-700">Yes - Fully Implemented</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="partial" id="partial" />
                      <Label htmlFor="partial" className="text-yellow-700">Partial - Partially Implemented</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="text-red-700">No - Not Implemented</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unknown" id="unknown" />
                      <Label htmlFor="unknown" className="text-gray-700">Unknown - Requires Investigation</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Evidence */}
                <div>
                  <Label htmlFor="evidence" className="text-base font-medium">Supporting Evidence</Label>
                  <Textarea
                    id="evidence"
                    placeholder="Provide evidence, documentation references, or implementation details..."
                    value={assessments[currentQuestion.id]?.evidence || ''}
                    onChange={(e) => 
                      handleAnswerChange(currentQuestion.id, 'evidence', e.target.value)
                    }
                    className="mt-2"
                    rows={3}
                  />
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes" className="text-base font-medium">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional observations, remediation plans, or comments..."
                    value={assessments[currentQuestion.id]?.notes || ''}
                    onChange={(e) => 
                      handleAnswerChange(currentQuestion.id, 'notes', e.target.value)
                    }
                    className="mt-2"
                    rows={2}
                  />
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentQuestionIndex(Math.min(filteredQuestions.length - 1, currentQuestionIndex + 1))}
                    disabled={currentQuestionIndex === filteredQuestions.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      {completedCount > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Assessment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(assessments).filter(a => a.answer === 'yes').length}
                </div>
                <div className="text-sm text-green-700">Fully Compliant</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {Object.values(assessments).filter(a => a.answer === 'partial').length}
                </div>
                <div className="text-sm text-yellow-700">Partial Compliance</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {Object.values(assessments).filter(a => a.answer === 'no').length}
                </div>
                <div className="text-sm text-red-700">Non-Compliant</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">
                  {Object.values(assessments).filter(a => a.answer === 'unknown').length}
                </div>
                <div className="text-sm text-gray-700">Requires Review</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}