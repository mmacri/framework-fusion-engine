import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Filter, Search } from 'lucide-react';
import { MasterFrameworkRecord, FilterCriteria } from '../../types/masterFramework';

interface MasterFrameworkFiltersProps {
  data: MasterFrameworkRecord[];
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function MasterFrameworkFilters({
  data,
  filters,
  onFiltersChange,
  searchTerm,
  onSearchChange
}: MasterFrameworkFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const domains = [...new Set(data.map(record => record.domain))].sort();
    const frequencies = [...new Set(data.map(record => record.frequency))].sort();
    const cipStandards = [...new Set(data.map(record => record.cipStandards).filter(Boolean))].sort();
    const statuses = [...new Set(data.map(record => record.status))].sort();
    const frameworks = [...new Set(data.map(record => record.framework))].sort();

    return { domains, frequencies, cipStandards, statuses, frameworks };
  }, [data]);

  const handleFilterChange = (key: keyof FilterCriteria, value: string | string[] | boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    onSearchChange('');
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof FilterCriteria];
    return Array.isArray(value) ? value.length > 0 : value !== undefined && value !== '';
  }) || searchTerm !== '';

  const activeFilterCount = Object.keys(filters).reduce((count, key) => {
    const value = filters[key as keyof FilterCriteria];
    if (Array.isArray(value)) {
      return count + value.length;
    } else if (value !== undefined && value !== '' && typeof value !== 'boolean') {
      return count + 1;
    } else if (typeof value === 'boolean' && value) {
      return count + 1;
    }
    return count;
  }, 0) + (searchTerm ? 1 : 0);

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary">{activeFilterCount} active</Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Simple' : 'Advanced'} Filters
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Reports</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by report name, description, or details..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Primary Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Domain</Label>
            <Select 
              value={filters.domains?.[0] || 'all'} 
              onValueChange={(value) => handleFilterChange('domains', value === 'all' ? [] : [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Domains" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                {filterOptions.domains.map(domain => (
                  <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Frequency</Label>
            <Select 
              value={filters.frequency?.[0] || 'all'} 
              onValueChange={(value) => handleFilterChange('frequency', value === 'all' ? [] : [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Frequencies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Frequencies</SelectItem>
                {filterOptions.frequencies.map(frequency => (
                  <SelectItem key={frequency} value={frequency}>{frequency}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select 
              value={filters.status?.[0] || 'all'} 
              onValueChange={(value) => handleFilterChange('status', value === 'all' ? [] : [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {filterOptions.statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CIP Standards</Label>
                <Select 
                  value={filters.cipStandards?.[0] || 'all'} 
                  onValueChange={(value) => handleFilterChange('cipStandards', value === 'all' ? [] : [value])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All CIP Standards" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All CIP Standards</SelectItem>
                    {filterOptions.cipStandards.map(standard => (
                      <SelectItem key={standard} value={standard}>{standard}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Framework</Label>
                <Select 
                  value={filters.framework?.[0] || 'all'} 
                  onValueChange={(value) => handleFilterChange('framework', value === 'all' ? [] : [value])}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Frameworks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Frameworks</SelectItem>
                    {filterOptions.frameworks.map(framework => (
                      <SelectItem key={framework} value={framework}>{framework}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>CIP Requirement</Label>
              <Input
                placeholder="Filter by CIP requirement (e.g., R5.7)"
                value={filters.cipReq?.[0] || ''}
                onChange={(e) => handleFilterChange('cipReq', e.target.value ? [e.target.value] : [])}
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.showMappedOnly || false}
                  onChange={(e) => handleFilterChange('showMappedOnly', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Show mapped records only</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.showGapsOnly || false}
                  onChange={(e) => handleFilterChange('showGapsOnly', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Show gaps only</span>
              </label>
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {searchTerm && (
              <Badge variant="outline" className="flex items-center gap-1">
                Search: "{searchTerm}"
                <X className="h-3 w-3 cursor-pointer" onClick={() => onSearchChange('')} />
              </Badge>
            )}
            {filters.domains?.map(domain => (
              <Badge key={domain} variant="outline" className="flex items-center gap-1">
                Domain: {domain}
                <X className="h-3 w-3 cursor-pointer" onClick={() => 
                  handleFilterChange('domains', filters.domains?.filter(d => d !== domain) || [])
                } />
              </Badge>
            ))}
            {filters.frequency?.map(freq => (
              <Badge key={freq} variant="outline" className="flex items-center gap-1">
                Frequency: {freq}
                <X className="h-3 w-3 cursor-pointer" onClick={() => 
                  handleFilterChange('frequency', filters.frequency?.filter(f => f !== freq) || [])
                } />
              </Badge>
            ))}
            {filters.status?.map(status => (
              <Badge key={status} variant="outline" className="flex items-center gap-1">
                Status: {status}
                <X className="h-3 w-3 cursor-pointer" onClick={() => 
                  handleFilterChange('status', filters.status?.filter(s => s !== status) || [])
                } />
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}