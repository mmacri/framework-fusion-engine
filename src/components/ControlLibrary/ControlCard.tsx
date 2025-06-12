
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Control } from "@/data/mockControls";

interface ControlCardProps {
  control: Control;
  onViewDetails: (control: Control) => void;
}

export function ControlCard({ control, onViewDetails }: ControlCardProps) {
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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={getFrameworkColor(control.framework)}>
              {control.controlId}
            </Badge>
            <Badge className={getPriorityColor(control.priority)}>
              {control.priority}
            </Badge>
            <Badge variant="secondary">{control.family}</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onViewDetails(control)}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-lg">{control.title}</CardTitle>
        <CardDescription className="text-sm">
          {control.framework}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          {control.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Family:</span>
            <Badge variant="outline" className="text-xs">
              {control.family}
            </Badge>
          </div>
          <Badge variant={control.status === "Active" ? "default" : "secondary"}>
            {control.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
