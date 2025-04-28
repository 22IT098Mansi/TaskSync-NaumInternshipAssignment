
import React from 'react';
import { Pencil, Trash2, Check } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'complete' | 'incomplete';
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: 'complete' | 'incomplete') => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const { _id, title, description, priority, status } = task;

  const getPriorityBadgeClass = () => {
    switch (priority) {
      case 'High': return 'badge-priority-high';
      case 'Medium': return 'badge-priority-medium';
      case 'Low': return 'badge-priority-low';
      default: return '';
    }
  };

  return (
    <div className="task-item group">
      <div className="flex items-start space-x-4 w-full">
        <div className="flex-shrink-0 pt-1">
          <button 
            onClick={() => onStatusChange(_id, status === 'complete' ? 'incomplete' : 'complete')}
            className={`w-5 h-5 rounded-full border ${
              status === 'complete' 
                ? 'bg-primary border-primary text-primary-foreground flex items-center justify-center' 
                : 'border-input bg-transparent'
            }`}
            aria-label={status === 'complete' ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {status === 'complete' && <Check size={12} />}
          </button>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-medium ${status === 'complete' ? 'line-through text-muted-foreground' : ''}`}>
            {title}
          </h3>
          {description && (
            <p className={`text-sm mt-1 ${status === 'complete' ? 'text-muted-foreground' : ''}`}>
              {description}
            </p>
          )}
          <div className="mt-2">
            <span className={`badge ${getPriorityBadgeClass()}`}>
              {priority}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)}
            className="btn btn-ghost p-1"
            aria-label="Edit task"
          >
            <Pencil size={16} />
          </button>
          
          <button 
            onClick={() => onDelete(_id)}
            className="btn btn-ghost p-1 text-destructive"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
