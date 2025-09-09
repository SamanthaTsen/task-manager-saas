import request from 'supertest';
import app from '../../app.js';

describe('GET /tasks', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(401);
  });
});
