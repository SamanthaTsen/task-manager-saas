import express from 'express';
import dotenv from 'dotenv';
import redisClient from './utils/redisClient.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/ping-redis', async (req, res) => {
  try {
    await redisClient.set('ping', 'pong');
    const value = await redisClient.get('ping');
    res.send(`Redis says: ${value}`);
  } catch (err) {
    res.status(500).send('Redis error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
