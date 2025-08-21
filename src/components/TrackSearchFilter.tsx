import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface TrackSearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  regionFilter: string;
  onRegionChange: (region: string) => void;
  typeFilter: string;
  onTypeChange: (type: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const TrackSearchFilter: React.FC<TrackSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  regionFilter,
  onRegionChange,
  typeFilter,
  onTypeChange,
  onClearFilters,
  hasActiveFilters
}) => {
  return (
    <div className="space-y-3 p-3 bg-slate-50 rounded-lg border">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search tracks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1"
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Select value={regionFilter} onValueChange={onRegionChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="east">East Coast</SelectItem>
            <SelectItem value="west">West Coast</SelectItem>
            <SelectItem value="midwest">Midwest</SelectItem>
            <SelectItem value="south">South</SelectItem>
            <SelectItem value="international">International</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="road">Road Course</SelectItem>
            <SelectItem value="oval">Oval</SelectItem>
            <SelectItem value="street">Street Circuit</SelectItem>
            <SelectItem value="karting">Karting</SelectItem>
          </SelectContent>
        </Select>
        
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      {hasActiveFilters && (
        <div className="flex gap-1 flex-wrap">
          {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
          {regionFilter !== 'all' && <Badge variant="secondary">Region: {regionFilter}</Badge>}
          {typeFilter !== 'all' && <Badge variant="secondary">Type: {typeFilter}</Badge>}
        </div>
      )}
    </div>
  );
};

export default TrackSearchFilter;