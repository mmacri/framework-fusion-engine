
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, User, Clock, MessageSquare, Eye } from "lucide-react";

interface VersionHistoryProps {
  controlId: string;
}

export function VersionHistory({ controlId }: VersionHistoryProps) {
  const versions = [
    {
      id: "v1.3",
      timestamp: "2024-12-15 14:30",
      editor: "security_expert_123",
      summary: "Updated implementation guidance based on NIST 800-53 Rev 6 draft",
      status: "current",
      changes: [
        "Enhanced multi-factor authentication requirements",
        "Added cloud-specific implementation notes",
        "Updated related controls mapping"
      ]
    },
    {
      id: "v1.2",
      timestamp: "2024-11-28 09:15",
      editor: "compliance_pro",
      summary: "Clarified testing procedures and added examples",
      status: "approved",
      changes: [
        "Added practical testing scenarios",
        "Clarified audit evidence requirements",
        "Fixed typos in description"
      ]
    },
    {
      id: "v1.1",
      timestamp: "2024-10-12 16:45",
      editor: "admin",
      summary: "Initial quarterly review update",
      status: "approved",
      changes: [
        "Updated to reflect current industry practices",
        "Added references to recent guidance documents"
      ]
    }
  ];

  const discussions = [
    {
      id: 1,
      author: "security_architect",
      timestamp: "2024-12-14 11:20",
      content: "Should we consider adding guidance for zero-trust implementations?",
      replies: 3
    },
    {
      id: 2,
      author: "audit_specialist",
      timestamp: "2024-12-13 15:30",
      content: "The testing procedures could benefit from more specific audit steps.",
      replies: 1
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Version History - {controlId}
          </CardTitle>
          <CardDescription>
            Track changes and improvements made by the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="versions" className="w-full">
            <TabsList>
              <TabsTrigger value="versions">Version History</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="versions" className="space-y-4">
              {versions.map((version) => (
                <Card key={version.id} className={version.status === 'current' ? 'border-primary' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant={version.status === 'current' ? 'default' : 'secondary'}>
                          {version.id}
                        </Badge>
                        <Badge variant="outline">
                          {version.status === 'current' ? 'Current' : 'Previous'}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{version.summary}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {version.editor}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {version.timestamp}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">Changes made:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {version.changes.map((change, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="discussions" className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{discussion.author}</span>
                        <span className="text-sm text-muted-foreground">{discussion.timestamp}</span>
                      </div>
                      <Badge variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {discussion.replies} replies
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{discussion.content}</p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Join Discussion
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
