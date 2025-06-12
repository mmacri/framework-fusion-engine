
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Control } from "@/data/mockControls";

interface ControlDetailDialogProps {
  control: Control | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ControlDetailDialog({ control, open, onOpenChange }: ControlDetailDialogProps) {
  if (!control) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case "NIST 800-53": return "bg-blue-100 text-blue-800";
      case "PCI-DSS": return "bg-green-100 text-green-800";
      case "HIPAA": return "bg-purple-100 text-purple-800";
      case "SOX": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Badge variant="outline" className={getFrameworkColor(control.framework)}>
              {control.controlId}
            </Badge>
            {control.title}
          </DialogTitle>
          <DialogDescription>
            {control.framework} - {control.family}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="mappings">Mappings</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{control.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Framework</h4>
                <p className="text-sm text-muted-foreground">{control.framework}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Family</h4>
                <p className="text-sm text-muted-foreground">{control.family}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Priority</h4>
                <Badge className={getPriorityColor(control.priority)}>
                  {control.priority}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <Badge variant={control.status === "Active" ? "default" : "secondary"}>
                  {control.status}
                </Badge>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="implementation" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Implementation Guidance</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{control.implementationGuidance}</p>
            </div>
          </TabsContent>
          <TabsContent value="testing" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Testing Procedures</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{control.testingProcedures}</p>
            </div>
          </TabsContent>
          <TabsContent value="mappings" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Mapped Controls</h4>
              <div className="flex flex-wrap gap-2">
                {control.mappedControls.length > 0 ? (
                  control.mappedControls.map(mappedControl => (
                    <Badge key={mappedControl} variant="outline">
                      {mappedControl}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No mapped controls</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
