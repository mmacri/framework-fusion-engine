
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
}

export function CommunityDashboard({ onNavigateToEdits }: CommunityDashboardProps) {
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
    <div className="space-y-6 min-h-screen bg-white">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Community Hub
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Collaborate on security frameworks, controls, and mappings. Manage frameworks and participate in discussions.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="frameworks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Frameworks</TabsTrigger>
          <TabsTrigger value="discussions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Discussions</TabsTrigger>
          <TabsTrigger value="edits" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Proposals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Community Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Edit3 className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.totalEdits}</div>
                    <div className="text-sm text-gray-600">Total Proposals</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.discussions}</div>
                    <div className="text-sm text-gray-600">Active Discussions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.frameworks}</div>
                    <div className="text-sm text-gray-600">Frameworks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stats.pendingEdits}</div>
                    <div className="text-sm text-gray-600">Pending Review</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-blue-600 bg-white border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Edit3 className="h-12 w-12 text-blue-600 mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-900">Submit Proposal</h3>
                  <p className="text-sm text-gray-600">
                    Propose changes to controls, mappings, or frameworks
                  </p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleStartContributing}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-gray-600 bg-white border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <BookOpen className="h-12 w-12 text-gray-600 mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-900">Manage Frameworks</h3>
                  <p className="text-sm text-gray-600">
                    Add, update, or manage security frameworks
                  </p>
                  <Button 
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                    onClick={() => setActiveTab("frameworks")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-black bg-white border-gray-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <MessageSquare className="h-12 w-12 text-black mx-auto" />
                  <h3 className="text-lg font-semibold text-gray-900">Join Discussions</h3>
                  <p className="text-sm text-gray-600">
                    Participate in community discussions and Q&A
                  </p>
                  <Button 
                    className="bg-black hover:bg-gray-800 text-white"
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
          <DiscussionBoard />
        </TabsContent>

        <TabsContent value="edits">
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Edit Proposals</h3>
            <p className="text-gray-600 mb-6">
              View and manage all community proposals for frameworks, controls, and mappings.
            </p>
            <Button onClick={handleStartContributing} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Edit3 className="h-4 w-4 mr-2" />
              Go to Proposals
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
