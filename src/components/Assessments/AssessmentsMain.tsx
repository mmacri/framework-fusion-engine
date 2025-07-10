import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Users, 
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { ComplianceQA } from '../MasterFramework/ComplianceQA';
import { AuditorAssessment } from '../MasterFramework/AuditorAssessment';

interface AssessmentsMainProps {
  activeView?: string;
}

export function AssessmentsMain({ activeView }: AssessmentsMainProps) {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);

  useEffect(() => {
    if (activeView && ['compliance-qa', 'auditor-assessment', 'project-assessment'].includes(activeView)) {
      setActiveAssessment(activeView);
    }
  }, [activeView]);

  const assessmentTypes = [
    {
      id: 'compliance-qa',
      title: 'Compliance Q&A Assessment',
      description: 'Interactive questionnaire for compliance verification',
      icon: FileText,
      estimatedTime: '20-30 minutes',
      difficulty: 'Intermediate',
      status: 'Available'
    },
    {
      id: 'auditor-assessment',
      title: 'Auditor Assessment',
      description: 'Comprehensive auditor review and self-assessment tools',
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
        <ComplianceQA />
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
        <AuditorAssessment />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance Assessments</h1>
        <p className="text-gray-600 mt-2">
          Choose from our comprehensive assessment tools to evaluate compliance posture and identify gaps
        </p>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessmentTypes.map((assessment) => {
          const IconComponent = assessment.icon;
          const isAvailable = assessment.status === 'Available';
          
          return (
            <Card key={assessment.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                    </div>
                  </div>
                  <Badge className={getStatusColor(assessment.status)}>
                    {assessment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600">
                  {assessment.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Estimated Time:</span>
                    <span className="font-medium">{assessment.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Difficulty:</span>
                    <Badge variant="outline" className={getDifficultyColor(assessment.difficulty)}>
                      {assessment.difficulty}
                    </Badge>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  disabled={!isAvailable}
                  onClick={() => isAvailable && setActiveAssessment(assessment.id)}
                >
                  {isAvailable ? 'Start Assessment' : 'Coming Soon'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Assessments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Assessment Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Compliance Q&A Assessment</p>
                  <p className="text-sm text-gray-600">Completed 2 days ago</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                85% Score
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Auditor Assessment</p>
                  <p className="text-sm text-gray-600">In Progress - 60% complete</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Continue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}