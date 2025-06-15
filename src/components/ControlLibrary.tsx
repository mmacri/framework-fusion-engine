
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield, Search, Filter } from "lucide-react";

interface ControlLibraryProps {
  selectedFramework?: string | null;
}

export function ControlLibrary({ selectedFramework }: ControlLibraryProps) {
  const controls = [
    {
      id: "AC-1",
      title: "Access Control Policy and Procedures",
      framework: "NIST 800-53",
      family: "Access Control",
      description: "The organization develops, documents, and disseminates access control policy and procedures."
    },
    {
      id: "PCI-1.1",
      title: "Firewall Configuration Standards",
      framework: "PCI-DSS",
      family: "Network Security",
      description: "Establish and implement firewall and router configuration standards."
    },
    {
      id: "HIPAA-164.312",
      title: "Information System Activity Review",
      framework: "HIPAA Security",
      family: "Administrative Safeguards",
      description: "Implement procedures to regularly review information system activity."
    }
  ];

  const filteredControls = selectedFramework 
    ? controls.filter(control => control.framework.includes(selectedFramework.split(' ')[0]))
    : controls;

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">Control Library</h1>
        <p className="text-muted-foreground mt-2">
          {selectedFramework ? `${selectedFramework} Controls` : "Browse security controls across all frameworks"}
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search controls..." className="pl-10" />
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
                    <Badge variant="secondary">{control.framework}</Badge>
                    <Badge variant="outline">{control.family}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{control.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
