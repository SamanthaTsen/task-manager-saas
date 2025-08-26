import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getPopularTasks,
  getTaskStats
} from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); 

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/popular', getPopularTasks);
router.get('/stats', getTaskStats);

export default router;
