import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Users, 
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';
import { ComplianceQA } from '../MasterFramework/ComplianceQA';
import { AuditorAssessment } from '../MasterFramework/AuditorAssessment';
import { EnhancedComplianceQA } from './EnhancedComplianceQA';
import { EnhancedAuditorAssessment } from './EnhancedAuditorAssessment';
import { CompactAssessmentCard } from './CompactAssessmentCard';
import { getSavedAssessments } from '../../utils/assessmentStorage';

interface AssessmentsMainProps {
  activeView?: string;
}

export function AssessmentsMain({ activeView }: AssessmentsMainProps) {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [savedAssessments, setSavedAssessments] = useState(getSavedAssessments());

  useEffect(() => {
    if (activeView && ['compliance-qa', 'auditor-assessment', 'project-assessment'].includes(activeView)) {
      setActiveAssessment(activeView);
    }
  }, [activeView]);

  useEffect(() => {
    setSavedAssessments(getSavedAssessments());
  }, [activeAssessment]);

  // If we have an activeView from navigation, use it directly
  if (activeView && ['compliance-qa', 'auditor-assessment', 'project-assessment'].includes(activeView)) {
    if (activeView === 'compliance-qa') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Compliance Q&A Assessment</h1>
              <p className="text-gray-600 mt-2">Interactive questionnaire for compliance verification</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setActiveAssessment(null)}
            >
              Back to Assessments
            </Button>
          </div>
          <EnhancedComplianceQA />
        </div>
      );
    }

    if (activeView === 'auditor-assessment') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Auditor Assessment</h1>
              <p className="text-gray-600 mt-2">Comprehensive auditor review and self-assessment tools</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setActiveAssessment(null)}
            >
              Back to Assessments
            </Button>
          </div>
          <EnhancedAuditorAssessment />
        </div>
      );
    }

    if (activeView === 'project-assessment') {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Assessment</h1>
              <p className="text-gray-600 mt-2">Project-specific compliance assessment and tracking</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setActiveAssessment(null)}
            >
              Back to Assessments
            </Button>
          </div>
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Project Assessment Coming Soon</h3>
              <p className="text-gray-600">
                This assessment type is currently under development and will be available in a future update.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  const assessmentTypes = [
    {
      id: 'compliance-qa',
      title: 'Compliance Q&A Assessment',
      description: 'Interactive questionnaire based on your framework reports and goals',
      icon: FileText,
      estimatedTime: '20-30 minutes',
      difficulty: 'Intermediate',
      status: 'Available'
    },
    {
      id: 'auditor-assessment',
      title: 'Auditor Assessment',
      description: 'Comprehensive auditor review with risk analysis based on framework data',
      icon: Users,
      estimatedTime: '45-60 minutes',
      difficulty: 'Advanced',
      status: 'Available'
    },
    {
      id: 'project-assessment',
      title: 'Project Assessment',
      description: 'Project-specific compliance assessment and tracking',
      icon: BarChart3,
      estimatedTime: '30-45 minutes',
      difficulty: 'Intermediate',
      status: 'Coming Soon'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Coming Soon':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-orange-100 text-orange-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Only show the assessment selection page if no specific activeView is provided
  if (activeAssessment === 'compliance-qa') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Compliance Q&A Assessment</h1>
            <p className="text-gray-600 mt-2">Interactive questionnaire for compliance verification</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setActiveAssessment(null)}
          >
            Back to Assessments
          </Button>
        </div>
        <EnhancedComplianceQA />
      </div>
    );
  }

  if (activeAssessment === 'auditor-assessment') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Auditor Assessment</h1>
            <p className="text-gray-600 mt-2">Comprehensive auditor review and self-assessment tools</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setActiveAssessment(null)}
          >
            Back to Assessments
          </Button>
        </div>
        <EnhancedAuditorAssessment />
      </div>
    );
  }

  if (activeAssessment === 'project-assessment') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Project Assessment</h1>
            <p className="text-gray-600 mt-2">Project-specific compliance assessment and tracking</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setActiveAssessment(null)}
          >
            Back to Assessments
          </Button>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Project Assessment Coming Soon</h3>
            <p className="text-gray-600">
              This assessment type is currently under development and will be available in a future update.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter assessments based on search and status
  const filteredSavedAssessments = savedAssessments.filter(assessment => {
    const matchesSearch = searchTerm === '' || 
      assessment.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.framework.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.domain.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || assessment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const assessmentPreviews = assessmentTypes.map(type => ({
    id: type.id,
    title: type.title,
    description: type.description,
    type: type.id as any,
    estimatedTime: type.estimatedTime,
    difficulty: type.difficulty,
    status: type.status.toLowerCase().replace(' ', '-') as any,
    lastProgress: type.id === 'auditor-assessment' ? 60 : undefined,
    lastActivity: type.id === 'compliance-qa' ? '2 days ago' : undefined
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance Assessments</h1>
        <p className="text-gray-600 mt-2">
          Choose from our comprehensive assessment tools to evaluate compliance posture based on your framework data
        </p>
      </div>

      <Tabs defaultValue="new" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">New Assessment</TabsTrigger>
          <TabsTrigger value="saved">Saved Assessments ({savedAssessments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <div className="space-y-4">
            {assessmentPreviews.map((assessment) => (
              <CompactAssessmentCard
                key={assessment.id}
                assessment={assessment}
                onStart={(id) => setActiveAssessment(id)}
                onContinue={(id) => setActiveAssessment(id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          {/* Search and Filter Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search assessments by project, framework, or domain..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Saved Assessments List */}
          {filteredSavedAssessments.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Saved Assessments</h3>
                <p className="text-gray-600">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'No assessments match your search criteria.' 
                    : 'Start your first assessment to see results here.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredSavedAssessments.map((assessment) => (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{assessment.projectName}</h3>
                          <Badge variant={assessment.status === 'completed' ? 'default' : 'secondary'}>
                            {assessment.status}
                          </Badge>
                          <Badge variant="outline">
                            {assessment.score}% Score
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Type:</span> {assessment.assessmentType.replace('-', ' ')}
                          </div>
                          <div>
                            <span className="font-medium">Framework:</span> {assessment.framework}
                          </div>
                          <div>
                            <span className="font-medium">Domain:</span> {assessment.domain}
                          </div>
                          <div>
                            <span className="font-medium">Completed:</span> {new Date(assessment.completedAt).toLocaleDateString()}
                          </div>
                        </div>
                        {assessment.relatedReports.length > 0 && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span className="font-medium">Related Reports:</span> {assessment.relatedReports.slice(0, 3).join(', ')}
                            {assessment.relatedReports.length > 3 && ` and ${assessment.relatedReports.length - 3} more`}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                        <Button variant="outline" size="sm">
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}