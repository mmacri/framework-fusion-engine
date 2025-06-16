
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Settings, Trash2, BookOpen, Users } from "lucide-react";
import { Framework } from "@/types/community";
import { toast } from "@/hooks/use-toast";

export function FrameworkManagement() {
  const [frameworks, setFrameworks] = useState<Framework[]>([
    {
      id: "nist-800-53",
      name: "NIST 800-53",
      version: "Rev 5",
      description: "Security and Privacy Controls for Information Systems and Organizations",
      type: "standard",
      addedBy: "System",
      addedAt: "2024-01-01T00:00:00Z",
      status: "active",
      controlCount: 325
    },
    {
      id: "pci-dss",
      name: "PCI DSS",
      version: "4.0",
      description: "Payment Card Industry Data Security Standard",
      type: "standard",
      addedBy: "System",
      addedAt: "2024-01-01T00:00:00Z",
      status: "active",
      controlCount: 12
    },
    {
      id: "iso-27001",
      name: "ISO 27001",
      version: "2022",
      description: "Information Security Management Systems Requirements",
      type: "standard",
      addedBy: "System",
      addedAt: "2024-01-01T00:00:00Z",
      status: "active",
      controlCount: 114
    },
    {
      id: "hipaa",
      name: "HIPAA Security Rule",
      version: "Current",
      description: "Health Insurance Portability and Accountability Act Security Standards",
      type: "standard",
      addedBy: "System",
      addedAt: "2024-01-01T00:00:00Z",
      status: "active",
      controlCount: 18
    },
    {
      id: "sox",
      name: "SOX ITGC",
      version: "Current",
      description: "Sarbanes-Oxley IT General Controls",
      type: "standard",
      addedBy: "System",
      addedAt: "2024-01-01T00:00:00Z",
      status: "active",
      controlCount: 25
    }
  ]);

  const [newFramework, setNewFramework] = useState({
    name: "",
    version: "",
    description: "",
    type: "custom" as const
  });

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [userNameForAdd, setUserNameForAdd] = useState("");

  const handleAddFramework = () => {
    if (!newFramework.name || !newFramework.description || !userNameForAdd) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields including your name.",
        variant: "destructive",
      });
      return;
    }

    const framework: Framework = {
      id: `custom-${Date.now()}`,
      name: newFramework.name,
      version: newFramework.version || "1.0",
      description: newFramework.description,
      type: newFramework.type,
      addedBy: userNameForAdd,
      addedAt: new Date().toISOString(),
      status: "active",
      controlCount: 0
    };

    setFrameworks(prev => [...prev, framework]);
    setNewFramework({ name: "", version: "", description: "", type: "custom" });
    setUserNameForAdd("");
    setShowAddDialog(false);

    toast({
      title: "Framework added",
      description: `${framework.name} has been added to the community library.`,
    });
  };

  const handleRemoveFramework = (frameworkId: string) => {
    const framework = frameworks.find(f => f.id === frameworkId);
    if (framework?.type === "standard") {
      toast({
        title: "Cannot remove",
        description: "Standard frameworks cannot be removed.",
        variant: "destructive",
      });
      return;
    }

    setFrameworks(prev => prev.filter(f => f.id !== frameworkId));
    toast({
      title: "Framework removed",
      description: "The custom framework has been removed.",
    });
  };

  const getFrameworkTypeColor = (type: string) => {
    return type === "standard" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Framework Management</h2>
          <p className="text-muted-foreground">Manage security and compliance frameworks</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Framework
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Framework</DialogTitle>
              <DialogDescription>
                Add a custom framework to the community library
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">Your Name</Label>
                <Input
                  id="user-name"
                  value={userNameForAdd}
                  onChange={(e) => setUserNameForAdd(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="framework-name">Framework Name</Label>
                <Input
                  id="framework-name"
                  value={newFramework.name}
                  onChange={(e) => setNewFramework(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Custom Security Framework"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="framework-version">Version</Label>
                <Input
                  id="framework-version"
                  value={newFramework.version}
                  onChange={(e) => setNewFramework(prev => ({ ...prev, version: e.target.value }))}
                  placeholder="e.g., 1.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="framework-description">Description</Label>
                <Textarea
                  id="framework-description"
                  value={newFramework.description}
                  onChange={(e) => setNewFramework(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the framework's purpose and scope"
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFramework}>
                  Add Framework
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{framework.name}</CardTitle>
                  <CardDescription>{framework.description}</CardDescription>
                </div>
                {framework.type === "custom" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFramework(framework.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={getFrameworkTypeColor(framework.type)}>
                    {framework.type}
                  </Badge>
                  <Badge variant="outline">v{framework.version}</Badge>
                </div>
                
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{framework.controlCount} controls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Added by {framework.addedBy}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Framework Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Standard Frameworks:</strong> These are well-established industry frameworks that are maintained by the community.
            </div>
            <div>
              <strong>Custom Frameworks:</strong> User-contributed frameworks that can be added, modified, or removed by the community.
            </div>
            <div>
              <strong>Adding Controls:</strong> Once a framework is added, you can propose new controls or modifications through the proposals system.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
