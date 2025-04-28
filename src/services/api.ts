
import axios from 'axios';
import { toast } from 'sonner';

// Create axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    // Don't show auth-related errors here as they're handled in the auth context
    if (!error.config.url.includes('/api/users/')) {
      toast.error(message);
    }
    
    // If token is expired or invalid, logout
    if (error.response?.status === 401 && !error.config.url.includes('/api/users/login')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    }
    
    return Promise.reject(error);
  }
);

// Task service
export const taskService = {
  getTasks: async (filter: string = '') => {
    const params = filter ? { status: filter } : {};
    return api.get('/api/tasks', { params });
  },
  
  createTask: async (taskData: { title: string; description: string; priority: string }) => {
    return api.post('/api/tasks', taskData);
  },
  
  updateTask: async (id: string, taskData: Partial<{ title: string; description: string; priority: string; status: string }>) => {
    return api.put(`/api/tasks/${id}`, taskData);
  },
  
  deleteTask: async (id: string) => {
    return api.delete(`/api/tasks/${id}`);
  },
};

// MongoDB connection information
export const MONGODB_INFO = {
  setupInstructions: `
  1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas/register
  2. Create a new cluster (the free tier is sufficient)
  3. Under "Database Access", create a new database user with password
  4. Under "Network Access", add your IP address or allow access from anywhere for development
  5. Click "Connect" on your cluster, then "Connect your application"
  6. Copy the connection string and replace <password> with your database user's password
  7. Use this connection string in your backend .env file as MONGODB_URI
  `,
  connectionExample: `
  // In your backend server.js or index.js file:
  const mongoose = require('mongoose');
  
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  
  // Example User Schema
  const UserSchema = new mongoose.Schema({
    email: { 
      type: String, 
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Example Task Schema
  const TaskSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    status: {
      type: String,
      enum: ['complete', 'incomplete'],
      default: 'incomplete'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const User = mongoose.model('User', UserSchema);
  const Task = mongoose.model('Task', TaskSchema);
  `
};

