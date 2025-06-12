
import { useState, useEffect } from "react";
import { Download, ArrowUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockControls, Control } from "@/data/mockControls";
import { ControlFilters } from "@/components/ControlLibrary/ControlFilters";
import { ControlCard } from "@/components/ControlLibrary/ControlCard";
import { ControlDetailDialog } from "@/components/ControlLibrary/ControlDetailDialog";

interface ControlLibraryProps {
  selectedFramework?: string | null;
}

export function ControlLibrary({ selectedFramework }: ControlLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFrameworkFilter, setSelectedFrameworkFilter] = useState<string>("all");
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("controlId");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Handle framework selection from sidebar
  useEffect(() => {
    if (selectedFramework) {
      setSelectedFrameworkFilter(selectedFramework);
    }
  }, [selectedFramework]);

  const frameworks = Array.from(new Set(mockControls.map(c => c.framework)));
  const families = Array.from(new Set(mockControls.map(c => c.family)));
  const priorities = Array.from(new Set(mockControls.map(c => c.priority)));

  const filteredControls = mockControls
    .filter(control => {
      const matchesSearch = control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           control.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           control.controlId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFramework = selectedFrameworkFilter === "all" || control.framework === selectedFrameworkFilter;
      const matchesFamily = selectedFamily === "all" || control.family === selectedFamily;
      const matchesPriority = selectedPriority === "all" || control.priority === selectedPriority;
      
      return matchesSearch && matchesFramework && matchesFamily && matchesPriority;
    })
    .sort((a, b) => {
      const aVal = a[sortField as keyof Control];
      const bVal = b[sortField as keyof Control];
      const modifier = sortDirection === "asc" ? 1 : -1;
      return aVal < bVal ? -modifier : aVal > bVal ? modifier : 0;
    });

  const clearFrameworkFilter = () => {
    setSelectedFrameworkFilter("all");
  };

  const handleViewDetails = (control: Control) => {
    setSelectedControl(control);
    setDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Control Library</h1>
            <p className="text-muted-foreground mt-2">
              Browse and manage compliance controls across all frameworks
            </p>
          </div>
          {selectedFramework && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm px-3 py-1">
                Filtered by: {selectedFramework}
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFrameworkFilter}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <ControlFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedFrameworkFilter={selectedFrameworkFilter}
        setSelectedFrameworkFilter={setSelectedFrameworkFilter}
        selectedFamily={selectedFamily}
        setSelectedFamily={setSelectedFamily}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        frameworks={frameworks}
        families={families}
        priorities={priorities}
      />

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredControls.length} controls found
          </span>
          {selectedFramework && (
            <span className="text-xs text-muted-foreground">
              • Showing all {selectedFramework} controls
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
          }}>
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort {sortDirection === "asc" ? "↑" : "↓"}
          </Button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid gap-4">
        {filteredControls.map((control) => (
          <ControlCard
            key={control.id}
            control={control}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredControls.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No controls found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => {
              setSearchTerm("");
              setSelectedFrameworkFilter("all");
              setSelectedFamily("all");
              setSelectedPriority("all");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      <ControlDetailDialog
        control={selectedControl}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
