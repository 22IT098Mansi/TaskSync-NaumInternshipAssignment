import React from 'react';
import { Button } from '@/components/ui/button';

interface TaskFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { value: '', label: 'All' },
    { value: 'incomplete', label: 'Active' },
    { value: 'complete', label: 'Completed' },
  ];
  
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          variant={activeFilter === filter.value ? "default" : "secondary"}
          size="sm"
          className="rounded-full"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

export default TaskFilters;
