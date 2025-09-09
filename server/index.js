import app from './app.js'
import connectDB from './db/mongoose.js';
import { connectRedis } from './utils/redisClient.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  await connectRedis(); 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();