
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface ProposeEditDialogProps {
  children: React.ReactNode;
  onSubmitEdit: (editData: any) => void;
}

export function ProposeEditDialog({ children, onSubmitEdit }: ProposeEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [editType, setEditType] = useState<string>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rationale, setRationale] = useState("");
  const [framework, setFramework] = useState("");
  const [controlId, setControlId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const editData = {
        id: `edit-${Date.now()}`,
        type: editType as 'control_update' | 'new_control' | 'mapping_update' | 'new_mapping',
        title,
        description,
        proposedBy: "current_user", // In real app, would get from auth
        proposedAt: new Date().toISOString(),
        status: 'pending' as const,
        votes: { approve: 0, reject: 0, userVotes: {} },
        proposedData: {
          title: editType === 'new_control' ? title : `Updated ${controlId}`,
          description,
          framework,
          controlId: editType.includes('control') ? controlId : undefined,
          rationale
        },
        comments: [],
        reviewers: []
      };

      onSubmitEdit(editData);
      
      // Reset form
      setEditType("");
      setTitle("");
      setDescription("");
      setRationale("");
      setFramework("");
      setControlId("");
      setOpen(false);
      
      toast({
        title: "Edit proposal submitted!",
        description: "Your proposal has been submitted for community review.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const editTypes = [
    { value: "control_update", label: "Update Existing Control" },
    { value: "new_control", label: "Propose New Control" },
    { value: "mapping_update", label: "Update Control Mapping" },
    { value: "new_mapping", label: "Propose New Mapping" }
  ];

  const frameworks = [
    { value: "nist", label: "NIST Cybersecurity Framework" },
    { value: "iso27001", label: "ISO 27001" },
    { value: "pci", label: "PCI DSS" },
    { value: "sox", label: "SOX" },
    { value: "hipaa", label: "HIPAA" }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Propose an Edit</DialogTitle>
          <DialogDescription>
            Submit your proposal to improve controls, mappings, or add new content to the community library.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="edit-type">Edit Type</Label>
            <Select value={editType} onValueChange={setEditType} required>
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
          </div>

          {editType && (
            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select value={framework} onValueChange={setFramework} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map((fw) => (
                    <SelectItem key={fw.value} value={fw.value}>
                      {fw.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {editType === 'control_update' && (
            <div className="space-y-2">
              <Label htmlFor="control-id">Control ID</Label>
              <Input
                id="control-id"
                value={controlId}
                onChange={(e) => setControlId(e.target.value)}
                placeholder="e.g., AC-2, PR.AC-1"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief, descriptive title for your edit"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of your proposed changes"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rationale">Rationale</Label>
            <Textarea
              id="rationale"
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Explain why this change is beneficial and provide supporting evidence"
              rows={3}
              required
            />
          </div>

          {editType && (
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Submission Guidelines</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  {editType === 'control_update' && (
                    <>
                      <p>• Specify the control ID you want to update</p>
                      <p>• Provide clear rationale for the change</p>
                      <p>• Include references to authoritative sources</p>
                    </>
                  )}
                  {editType === 'new_control' && (
                    <>
                      <p>• Ensure the control doesn't already exist</p>
                      <p>• Follow naming conventions for the framework</p>
                      <p>• Include implementation guidance</p>
                    </>
                  )}
                  {editType === 'mapping_update' && (
                    <>
                      <p>• Specify the mapping relationship to update</p>
                      <p>• Provide evidence for the confidence level</p>
                      <p>• Explain any gap analysis findings</p>
                    </>
                  )}
                  {editType === 'new_mapping' && (
                    <>
                      <p>• Verify the mapping doesn't already exist</p>
                      <p>• Provide confidence assessment</p>
                      <p>• Include supporting documentation</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!editType || !title || !description || !rationale || !framework || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
