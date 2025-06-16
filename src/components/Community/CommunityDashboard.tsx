
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Edit3, Settings, Plus, GitBranch, BookOpen } from "lucide-react";
import { FrameworkManagement } from "./FrameworkManagement";
import { DiscussionBoard } from "./DiscussionBoard";

interface CommunityDashboardProps {
  onNavigateToEdits?: () => void;
  onDiscussionsUpdate?: (discussions: Array<{
    id: string;
    title: string;
    author: string;
    replies: number;
    lastActivity: string;
    category: string;
  }>) => void;
}

export function CommunityDashboard({ onNavigateToEdits, onDiscussionsUpdate }: CommunityDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Real stats that will be updated based on actual data
  const [stats, setStats] = useState({
    totalEdits: 0,
    pendingEdits: 0,
    discussions: 0,
    frameworks: 5 // Starting with built-in frameworks
  });

  const handleStartContributing = () => {
    if (onNavigateToEdits) {
      onNavigateToEdits();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Community Hub
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Collaborate on security frameworks, controls, and mappings. Manage frameworks and participate in discussions.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="edits">Proposals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Edit3 className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">{stats.totalEdits}</div>
                    <div className="text-sm text-muted-foreground">Total Proposals</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">{stats.discussions}</div>
                    <div className="text-sm text-muted-foreground">Active Discussions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">{stats.frameworks}</div>
                    <div className="text-sm text-muted-foreground">Frameworks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-8 w-8 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold">{stats.pendingEdits}</div>
                    <div className="text-sm text-muted-foreground">Pending Review</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Edit3 className="h-12 w-12 text-blue-600 mx-auto" />
                  <h3 className="text-lg font-semibold">Submit Proposal</h3>
                  <p className="text-sm text-muted-foreground">
                    Propose changes to controls, mappings, or frameworks
                  </p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleStartContributing}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <BookOpen className="h-12 w-12 text-green-600 mx-auto" />
                  <h3 className="text-lg font-semibold">Manage Frameworks</h3>
                  <p className="text-sm text-muted-foreground">
                    Add, update, or manage security frameworks
                  </p>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setActiveTab("frameworks")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <MessageSquare className="h-12 w-12 text-purple-600 mx-auto" />
                  <h3 className="text-lg font-semibold">Join Discussions</h3>
                  <p className="text-sm text-muted-foreground">
                    Participate in community discussions and Q&A
                  </p>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => setActiveTab("discussions")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="frameworks">
          <FrameworkManagement />
        </TabsContent>

        <TabsContent value="discussions">
          <DiscussionBoard onDiscussionsUpdate={onDiscussionsUpdate} />
        </TabsContent>

        <TabsContent value="edits">
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-4">Edit Proposals</h3>
            <p className="text-muted-foreground mb-6">
              View and manage all community proposals for frameworks, controls, and mappings.
            </p>
            <Button onClick={handleStartContributing} size="lg">
              <Edit3 className="h-4 w-4 mr-2" />
              Go to Proposals
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
