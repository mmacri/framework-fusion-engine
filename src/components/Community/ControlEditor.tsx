
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit3, Save, X, MessageSquare } from "lucide-react";
import { Control } from "@/types/report";

interface ControlEditorProps {
  control: Control;
  onSave: (updatedControl: Control) => void;
  onCancel: () => void;
}

export function ControlEditor({ control, onSave, onCancel }: ControlEditorProps) {
  const [editedControl, setEditedControl] = useState<Control>(control);
  const [editSummary, setEditSummary] = useState("");

  const handleSave = () => {
    // In a real implementation, this would submit to a review queue
    onSave(editedControl);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit3 className="h-5 w-5" />
          Editing Control: {control.id}
        </CardTitle>
        <CardDescription>
          Make improvements to this control. Your changes will be reviewed by the community before approval.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="control-id">Control ID</Label>
            <Input
              id="control-id"
              value={editedControl.id}
              onChange={(e) => setEditedControl({...editedControl, id: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={editedControl.priority}
              onValueChange={(value) => setEditedControl({...editedControl, priority: value})}
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
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={editedControl.title}
            onChange={(e) => setEditedControl({...editedControl, title: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={editedControl.description}
            onChange={(e) => setEditedControl({...editedControl, description: e.target.value})}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="implementation">Implementation Guidance</Label>
          <Textarea
            id="implementation"
            value={editedControl.implementation || ""}
            onChange={(e) => setEditedControl({...editedControl, implementation: e.target.value})}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-summary">Edit Summary</Label>
          <Input
            id="edit-summary"
            value={editSummary}
            onChange={(e) => setEditSummary(e.target.value)}
            placeholder="Briefly describe your changes..."
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <MessageSquare className="h-3 w-3 mr-1" />
              Community Review Required
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Submit for Review
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EditControlDialog({ control, children }: { control: Control; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = (updatedControl: Control) => {
    console.log("Submitting control update for review:", updatedControl);
    setIsOpen(false);
    // Here you would submit to your backend/review system
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Control</DialogTitle>
          <DialogDescription>
            Propose changes to this control. Your edits will be reviewed by the community.
          </DialogDescription>
        </DialogHeader>
        <ControlEditor
          control={control}
          onSave={handleSave}
          onCancel={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
