
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, User, GitBranch, Eye } from "lucide-react";

interface VersionHistoryProps {
  controlId: string;
}

export function VersionHistory({ controlId }: VersionHistoryProps) {
  // Mock version history data
  const versions = [
    {
      id: "v3.1",
      timestamp: "2024-12-15T10:30:00Z",
      author: "security_expert_123",
      changes: "Updated implementation guidance for cloud environments",
      status: "current",
      changeType: "minor"
    },
    {
      id: "v3.0",
      timestamp: "2024-11-20T14:22:00Z",
      author: "compliance_admin",
      changes: "Major revision: Added zero trust requirements",
      status: "archived",
      changeType: "major"
    },
    {
      id: "v2.5",
      timestamp: "2024-10-10T09:15:00Z",
      author: "community_reviewer",
      changes: "Fixed typos and clarified language",
      status: "archived",
      changeType: "patch"
    },
    {
      id: "v2.4",
      timestamp: "2024-09-05T16:45:00Z",
      author: "framework_specialist",
      changes: "Updated mappings to align with latest NIST guidance",
      status: "archived",
      changeType: "minor"
    }
  ];

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'major': return 'bg-red-100 text-red-800';
      case 'minor': return 'bg-yellow-100 text-yellow-800';
      case 'patch': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Version History</h2>
        <p className="text-muted-foreground">Control ID: {controlId}</p>
      </div>

      <div className="space-y-4">
        {versions.map((version) => (
          <Card key={version.id} className={version.status === 'current' ? 'border-primary' : ''}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{version.id}</CardTitle>
                    {version.status === 'current' && (
                      <Badge variant="default">Current</Badge>
                    )}
                    <Badge className={getChangeTypeColor(version.changeType)} variant="secondary">
                      {version.changeType}
                    </Badge>
                  </div>
                  <CardDescription>{version.changes}</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{version.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(version.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {version.author.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {version.status !== 'current' && (
                    <Button variant="outline" size="sm">
                      <GitBranch className="h-4 w-4 mr-1" />
                      Restore
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
