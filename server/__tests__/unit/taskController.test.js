import request from 'supertest';
import app from '../../app.js';
import Task from '../../models/Task.js';

jest.mock('../../middleware/authMiddleware.js', () => {
  return (req, res, next) => {
    req.user = { id: '507f1f77bcf86cd799439011' };
    next();
  };
});

jest.mock('../../utils/redisClient.js', () => ({
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue('OK'),
  setEx: jest.fn().mockResolvedValue('OK'),
  exists: jest.fn().mockResolvedValue(0),
  del: jest.fn().mockResolvedValue(1)
}));

jest.mock('../../models/Task.js');

describe('Task Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /tasks', () => {
    it('should return all tasks for the user', async () => {
      Task.find.mockResolvedValue([
        { title: 'Task A', user: '507f1f77bcf86cd799439011' },
        { title: 'Task B', user: '507f1f77bcf86cd799439011' }
      ]);

      const res = await request(app)
        .get('/tasks')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });

    it('should handle DB error', async () => {
      Task.find.mockRejectedValue(new Error('DB error'));
      const res = await request(app)
        .get('/tasks')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toMatch(/db error/i);
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      Task.create.mockResolvedValue({ title: 'New Task', user: '507f1f77bcf86cd799439011' });

      const res = await request(app)
        .post('/tasks')
        .send({ title: 'New Task' })
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('New Task');
    });

    it('should handle creation error', async () => {
      Task.create.mockRejectedValue(new Error('Create failed'));

      const res = await request(app)
        .post('/tasks')
        .send({ title: 'Failing Task' })
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/create failed/i);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should update a task successfully', async () => {
      Task.findOneAndUpdate.mockResolvedValue({ _id: '123', title: 'Updated Task', user: '507f1f77bcf86cd799439011' });

      const res = await request(app)
        .put('/tasks/123')
        .send({ title: 'Updated Task' })
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Updated Task');
    });

    it('should return 404 if task not found', async () => {
      Task.findOneAndUpdate.mockResolvedValue(null);

      const res = await request(app)
        .put('/tasks/123')
        .send({ title: 'Updated Task' })
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });

    it('should handle update error', async () => {
      Task.findOneAndUpdate.mockRejectedValue(new Error('Update failed'));

      const res = await request(app)
        .put('/tasks/123')
        .send({ title: 'Updated Task' })
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/update failed/i);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task successfully', async () => {
      Task.findOneAndDelete.mockResolvedValue({ _id: '123', user: '507f1f77bcf86cd799439011' });

      const res = await request(app)
        .delete('/tasks/123')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/deleted/i);
    });

    it('should return 404 if task not found', async () => {
      Task.findOneAndDelete.mockResolvedValue(null);

      const res = await request(app)
        .delete('/tasks/123')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });

    it('should handle deletion error', async () => {
      Task.findOneAndDelete.mockRejectedValue(new Error('Delete failed'));

      const res = await request(app)
        .delete('/tasks/123')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toMatch(/delete failed/i);
    });
  });

  describe('GET /tasks/popular', () => {
    it('should return cached popular tasks from Redis', async () => {
      const redisClient = await import('../../utils/redisClient.js');
      redisClient.get.mockResolvedValue(JSON.stringify([{ title: 'Popular Task' }]));

      const res = await request(app)
        .get('/tasks/popular')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(200);
      expect(res.body.data[0].title).toBe('Popular Task');
    });

    it('should query DB and cache result if Redis is empty', async () => {
      const redisClient = await import('../../utils/redisClient.js');
      redisClient.get.mockResolvedValue(null);
      Task.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([{ title: 'Popular Task' }])
        })
      });

      const res = await request(app)
        .get('/tasks/popular')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(200);
      expect(res.body.data[0].title).toBe('Popular Task');
    });

    it('should handle DB error when fetching popular tasks', async () => {
      const redisClient = await import('../../utils/redisClient.js');
      redisClient.get.mockResolvedValue(null);
      Task.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockRejectedValue(new Error('DB error'))
        })
      });

      const res = await request(app)
        .get('/tasks/popular')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toMatch(/failed to fetch/i);
    });
  });

  describe('GET /tasks/stats', () => {
    it('should query DB and cache stats if Redis is empty', async () => {
      const redisClient = await import('../../utils/redisClient.js');
      redisClient.get.mockResolvedValue(null);
      Task.countDocuments.mockResolvedValueOnce(10).mockResolvedValueOnce(5);
      Task.aggregate
        .mockResolvedValueOnce([{ _id: 'done', count: 5 }])
        .mockResolvedValueOnce([{ _id: '2025-09-08', count: 2 }]);

      const res = await request(app)
        .get('/tasks/stats')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(200);
      expect(res.body.totalTasks).toBe(10);
      expect(res.body.completedTasks).toBe(5);
      expect(res.body.categoryBreakdown['done']).toBe(5);
      expect(res.body.dailyTaskCount['2025-09-08']).toBe(2);
    });

    it('should return cached stats from Redis', async () => {
      const redisClient = await import('../../utils/redisClient.js');
      redisClient.get.mockResolvedValue(JSON.stringify({
        totalTasks: 10,
        completedTasks: 5,
        completionRate: 50,
        categoryBreakdown: { done: 5 },
        dailyTaskCount: { '2025-09-08': 2 }
      }));

      const res = await request(app)
        .get('/tasks/stats')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(200);
      expect(res.body.totalTasks).toBe(10);
    });

    it('should handle aggregation error', async () => {
      const redisClient = await import('../../utils/redisClient.js');
      redisClient.get.mockResolvedValue(null);

      Task.countDocuments.mockResolvedValueOnce(10).mockResolvedValueOnce(5);

      Task.aggregate = jest.fn()
        .mockRejectedValueOnce(new Error('Aggregation error')) 
        .mockResolvedValueOnce([]); 

      const res = await request(app)
        .get('/tasks/stats')
        .set('Authorization', 'Bearer mockToken');

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toMatch(/failed to fetch/i);
    });
  });
});
