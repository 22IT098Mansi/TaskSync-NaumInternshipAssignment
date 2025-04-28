import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Task {
  _id?: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status?: 'complete' | 'incomplete';
}

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Task) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  task, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>(task?.priority || 'Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onSubmit({
        _id: task?._id,
        title,
        description,
        priority,
        status: task?.status || 'incomplete'
      });
      
      // Reset form if not editing
      if (!isEditing) {
        setTitle('');
        setDescription('');
        setPriority('Medium');
      }
    } catch (error) {
      console.error('Task submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title <span className="text-destructive">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input w-full"
          placeholder="Task title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input w-full min-h-[100px]"
          placeholder="Task description"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="priority" className="block text-sm font-medium">
          Priority
        </label>
        <Select
          value={priority}
          onValueChange={(val) => setPriority(val as 'Low' | 'Medium' | 'High')}
        >
          <SelectTrigger id="priority" className="w-full">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline px-4 py-2"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary px-4 py-2"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <span className="mr-2">{isEditing ? 'Saving' : 'Adding'}</span>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            </span>
          ) : (
            isEditing ? 'Save Changes' : 'Add Task'
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
