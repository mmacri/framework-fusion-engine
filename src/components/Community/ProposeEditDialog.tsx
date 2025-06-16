
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit3, Plus, FileText } from "lucide-react";

interface ProposeEditDialogProps {
  children: React.ReactNode;
}

export function ProposeEditDialog({ children }: ProposeEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editType, setEditType] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [justification, setJustification] = useState("");

  const handleSubmit = () => {
    // In real implementation, this would submit to your backend
    console.log("Submitting edit proposal:", {
      type: editType,
      title,
      description,
      justification
    });
    setIsOpen(false);
    // Reset form
    setEditType("");
    setTitle("");
    setDescription("");
    setJustification("");
  };

  const editTypes = [
    { value: "control_update", label: "Update Existing Control", description: "Improve or modify an existing security control" },
    { value: "new_control", label: "Add New Control", description: "Propose a completely new security control" },
    { value: "mapping_update", label: "Update Framework Mapping", description: "Improve mappings between frameworks" },
    { value: "new_mapping", label: "Add New Mapping", description: "Create new framework relationships" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Propose Community Edit
          </DialogTitle>
          <DialogDescription>
            Suggest improvements to our control library. Your proposal will be reviewed by the community.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="edit-type">Edit Type</Label>
            <Select value={editType} onValueChange={setEditType}>
              <SelectTrigger>
                <SelectValue placeholder="Select the type of edit" />
              </SelectTrigger>
              <SelectContent>
                {editTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {editType && (
              <p className="text-sm text-muted-foreground">
                {editTypes.find(t => t.value === editType)?.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief, descriptive title for your edit"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the proposed changes"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="justification">Justification</Label>
            <Textarea
              id="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Why is this change needed? Include references, sources, or rationale."
              rows={3}
            />
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Review Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Step 1</Badge>
                <span className="text-sm">Community voting (7 days)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Step 2</Badge>
                <span className="text-sm">Expert reviewer validation</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Step 3</Badge>
                <span className="text-sm">Implementation and publication</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!editType || !title || !description}
            >
              <FileText className="h-4 w-4 mr-2" />
              Submit Proposal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
