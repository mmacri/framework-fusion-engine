
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit3, Save, X } from "lucide-react";

interface Control {
  id: string;
  title: string;
  description: string;
  category: string;
  family: string;
  priority: string;
  status: string;
  implementation?: string;
}

interface EditControlDialogProps {
  control: Control;
  children: React.ReactNode;
}

export function EditControlDialog({ control, children }: EditControlDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedControl, setEditedControl] = useState<Control>({ ...control });
  const [changeReason, setChangeReason] = useState("");

  const handleSave = () => {
    // In real implementation, this would submit to community review
    console.log("Submitting control edit for review:", {
      original: control,
      edited: editedControl,
      reason: changeReason
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditedControl({ ...control });
    setChangeReason("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Edit Control: {control.id}
          </DialogTitle>
          <DialogDescription>
            Propose changes to this control. Your edits will be reviewed by the community.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="control-id">Control ID</Label>
              <Input
                id="control-id"
                value={editedControl.id}
                onChange={(e) => setEditedControl(prev => ({ ...prev, id: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={editedControl.status} 
                onValueChange={(value) => setEditedControl(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Withdrawn">Withdrawn</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editedControl.title}
              onChange={(e) => setEditedControl(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedControl.description}
              onChange={(e) => setEditedControl(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={editedControl.category}
                onChange={(e) => setEditedControl(prev => ({ ...prev, category: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="family">Family</Label>
              <Input
                id="family"
                value={editedControl.family}
                onChange={(e) => setEditedControl(prev => ({ ...prev, family: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={editedControl.priority} 
                onValueChange={(value) => setEditedControl(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="implementation">Implementation Guidance</Label>
            <Textarea
              id="implementation"
              value={editedControl.implementation || ""}
              onChange={(e) => setEditedControl(prev => ({ ...prev, implementation: e.target.value }))}
              placeholder="Provide implementation guidance for this control..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="change-reason">Reason for Change</Label>
            <Textarea
              id="change-reason"
              value={changeReason}
              onChange={(e) => setChangeReason(e.target.value)}
              placeholder="Explain why these changes are needed..."
              rows={2}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!changeReason.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              Submit for Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
