import express from 'express';
import Task from '../models/Task.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all tasks for user
router.get('/', auth, async (req, res) => {
  try {
    // Log the query and filter for debugging
    console.log('Query:', req.query);
    const filter = { userId: req.userId };
    if (req.query.status === 'complete' || req.query.status === 'incomplete') {
      filter.status = req.query.status;
    }
    console.log('Filter:', filter);

    // Priority order: High (3), Medium (2), Low (1)
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };

    // Fetch and sort tasks by priority (High > Medium > Low), then by creation date (newest first)
    const tasks = await Task.find(filter).lean();
    tasks.sort((a, b) => {
      const pa = priorityOrder[a.priority] || 0;
      const pb = priorityOrder[b.priority] || 0;
      if (pb !== pa) return pb - pa;
      // If priorities are equal, sort by createdAt (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.userId
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
