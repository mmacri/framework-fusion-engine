
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Search, Filter, Edit3, History, MessageSquare } from "lucide-react";
import { mockControlsData } from "@/data/reportMockData";
import { EditControlDialog } from "./Community/ControlEditor";
import { VersionHistory } from "./Community/VersionHistory";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ControlLibraryProps {
  selectedFramework?: string | null;
}

export function ControlLibrary({ selectedFramework }: ControlLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get controls from the selected framework or all frameworks
  const allControls = selectedFramework 
    ? mockControlsData[selectedFramework] || []
    : Object.values(mockControlsData).flat();

  const filteredControls = allControls.filter(control =>
    control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    control.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Control Library</h1>
        <p className="text-muted-foreground mt-2">
          {selectedFramework ? `${selectedFramework} Controls` : "Browse security controls across all frameworks"}
          <span className="ml-2 text-sm">
            • Community-maintained • Wikipedia-style editing
          </span>
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search controls..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredControls.map((control) => (
          <Card key={control.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {control.id} - {control.title}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{control.category}</Badge>
                    <Badge variant="outline">{control.family}</Badge>
                    <Badge className={
                      control.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                      control.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                      control.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {control.priority}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <EditControlDialog control={control}>
                    <Button variant="outline" size="sm">
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </EditControlDialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <History className="h-4 w-4 mr-1" />
                        History
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <VersionHistory controlId={control.id} />
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Discuss
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">{control.description}</CardDescription>
              {control.implementation && (
                <div className="mt-3 p-3 bg-muted rounded-md">
                  <h4 className="font-medium text-sm mb-1">Implementation:</h4>
                  <p className="text-sm text-muted-foreground">{control.implementation}</p>
                </div>
              )}
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-muted-foreground">
                  Last updated by community • 2 days ago
                </div>
                <Badge variant={control.status === "Active" ? "default" : "secondary"}>
                  {control.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
