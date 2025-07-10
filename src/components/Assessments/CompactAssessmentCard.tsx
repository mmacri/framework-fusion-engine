import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface AssessmentPreview {
  id: string;
  title: string;
  description: string;
  type: 'compliance-qa' | 'auditor-assessment' | 'project-assessment';
  estimatedTime: string;
  difficulty: string;
  status: 'available' | 'in-progress' | 'completed' | 'coming-soon';
  lastProgress?: number;
  lastActivity?: string;
  framework?: string;
  domain?: string;
}

interface CompactAssessmentCardProps {
  assessment: AssessmentPreview;
  onStart: (id: string) => void;
  onContinue?: (id: string) => void;
}

export function CompactAssessmentCard({ 
  assessment, 
  onStart, 
  onContinue 
}: CompactAssessmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'coming-soon':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (assessment.status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <AlertTriangle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleAction = () => {
    if (assessment.status === 'in-progress' && onContinue) {
      onContinue(assessment.id);
    } else if (assessment.status === 'available') {
      onStart(assessment.id);
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer">
      <CardHeader 
        className="pb-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{assessment.title}</CardTitle>
              <Badge className={getStatusColor(assessment.status)}>
                {assessment.status.replace('-', ' ')}
              </Badge>
            </div>
            <CardDescription className="mt-1">
              {assessment.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {getStatusIcon()}
            <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </div>
        </div>

        {assessment.status === 'in-progress' && assessment.lastProgress && (
          <div className="mt-3">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{assessment.lastProgress}% complete</span>
            </div>
            <Progress value={assessment.lastProgress} className="h-2" />
          </div>
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Duration:</span>
                <div className="font-medium">{assessment.estimatedTime}</div>
              </div>
              <div>
                <span className="text-gray-600">Difficulty:</span>
                <div className="font-medium">{assessment.difficulty}</div>
              </div>
              {assessment.framework && (
                <div>
                  <span className="text-gray-600">Framework:</span>
                  <div className="font-medium">{assessment.framework}</div>
                </div>
              )}
              {assessment.domain && (
                <div>
                  <span className="text-gray-600">Domain:</span>
                  <div className="font-medium">{assessment.domain}</div>
                </div>
              )}
            </div>

            {assessment.lastActivity && (
              <div className="text-sm text-gray-600">
                Last activity: {assessment.lastActivity}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button 
                onClick={handleAction}
                disabled={assessment.status === 'coming-soon' || assessment.status === 'completed'}
                size="sm"
                className="flex-1"
              >
                {assessment.status === 'in-progress' ? 'Continue' : 
                 assessment.status === 'completed' ? 'Completed' :
                 assessment.status === 'available' ? 'Start Assessment' : 
                 'Coming Soon'}
              </Button>
              
              {assessment.status === 'completed' && (
                <Button variant="outline" size="sm">
                  View Results
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}