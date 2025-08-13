import express from 'express';
import redisClient from '../utils/redisClient.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/ping-redis', async (req, res) => {
  try {
    await redisClient.set('ping', 'pong');
    const value = await redisClient.get('ping');
    res.send(`Redis says: ${value}`);
  } catch (err) {
    res.status(500).send('Redis error');
  }
});

router.get('/ping-db', (req, res) => {
  const status = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  res.send(`MongoDB status: ${statusMap[status]}`);
});

export default router;





