import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getPopularTasks
} from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); 

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/popular', authMiddleware, getPopularTasks);

export default router;
