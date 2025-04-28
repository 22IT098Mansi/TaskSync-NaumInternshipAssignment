
import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { toast } from 'sonner';
import { taskService } from '../../services/api';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'complete' | 'incomplete';
  createdAt: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskEdit: (task: Task) => void;
  onTasksUpdated: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskEdit, onTasksUpdated }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleStatusChange = async (id: string, newStatus: 'complete' | 'incomplete') => {
    try {
      await taskService.updateTask(id, { status: newStatus });
      onTasksUpdated();
      toast.success(`Task marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (isDeleting) return;
    
    try {
      setIsDeleting(true);
      await taskService.deleteTask(id);
      onTasksUpdated();
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  
  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">No tasks found</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y divide-border rounded-md border">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onTaskEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
