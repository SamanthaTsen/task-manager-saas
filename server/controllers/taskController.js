import Task from '../models/Task.js';
import redisClient from '../utils/redisClient.js';

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });

    await redisClient.del('popular_tasks');
    res.status(201).json(task);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);

    await redisClient.del('popular_tasks');

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });

    await redisClient.del('popular_tasks');

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPopularTasks = async (req, res) => {
  const cacheKey = 'popular_tasks';

  try {
    
    const cached = await redisClient.get(cacheKey);

    if (cached !=null ) {
      console.log('Cache hit');
      return res.json({ source: 'cache', data: JSON.parse(cached) });
    }

    console.log('Cache miss or expired');
    const tasks = await Task.find({ completed: true })
      .sort({ updatedAt: -1 })
      .limit(10);

    await redisClient.setEx(cacheKey, 300, JSON.stringify(tasks));

    const confirmed = await redisClient.exists(cacheKey);
    console.log(`[CACHE] Refresh ${confirmed ? 'succeeded' : 'failed'}`);

    return res.json({ source: 'db', data: tasks });
  } catch (err) {
    console.error('Error fetching popular tasks:', err);
    return res.status(500).json({ error: 'Failed to fetch popular tasks' });
  }
};

