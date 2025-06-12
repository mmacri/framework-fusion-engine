
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ControlFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFrameworkFilter: string;
  setSelectedFrameworkFilter: (framework: string) => void;
  selectedFamily: string;
  setSelectedFamily: (family: string) => void;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  frameworks: string[];
  families: string[];
  priorities: string[];
}

export function ControlFilters({
  searchTerm,
  setSearchTerm,
  selectedFrameworkFilter,
  setSelectedFrameworkFilter,
  selectedFamily,
  setSelectedFamily,
  selectedPriority,
  setSelectedPriority,
  frameworks,
  families,
  priorities
}: ControlFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
      <div className="lg:col-span-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search controls, descriptions, or IDs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <Select value={selectedFrameworkFilter} onValueChange={setSelectedFrameworkFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Frameworks</SelectItem>
          {frameworks.map(framework => (
            <SelectItem key={framework} value={framework}>{framework}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedFamily} onValueChange={setSelectedFamily}>
        <SelectTrigger>
          <SelectValue placeholder="Family" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Families</SelectItem>
          {families.map(family => (
            <SelectItem key={family} value={family}>{family}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedPriority} onValueChange={setSelectedPriority}>
        <SelectTrigger>
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          {priorities.map(priority => (
            <SelectItem key={priority} value={priority}>{priority}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
