import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import TaskFilters from '../components/tasks/TaskFilters';
import { taskService } from '../services/api';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'complete' | 'incomplete';
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('');
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await taskService.getTasks(activeFilter);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, [activeFilter]);
  
  const handleAddTask = async (task: any) => {
    try {
      await taskService.createTask(task);
      setIsAddTaskOpen(false);
      fetchTasks();
      toast.success('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task');
    }
  };
  
  const handleEditTask = async (task: any) => {
    try {
      if (!task._id) return;
      
      const { _id, title, description, priority } = task;
      await taskService.updateTask(_id, { title, description, priority });
      
      setEditingTask(null);
      fetchTasks();
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-muted-foreground mt-2">Manage and organize your tasks efficiently</p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <TaskFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          
          <Button
            onClick={() => setIsAddTaskOpen(true)}
            variant="default"
            size="default"
            className="gap-2"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="py-12 flex justify-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onTaskEdit={setEditingTask} 
            onTasksUpdated={fetchTasks} 
          />
        )}
      </main>
      
      <Footer />
      
      {/* Add Task Dialog */}
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Create a new task to add to your list.</DialogDescription>
          <TaskForm 
            onSubmit={handleAddTask} 
            onCancel={() => setIsAddTaskOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Modify the details of your task.</DialogDescription>
          {editingTask && (
            <TaskForm 
              task={editingTask} 
              onSubmit={handleEditTask} 
              onCancel={() => setEditingTask(null)} 
              isEditing 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
