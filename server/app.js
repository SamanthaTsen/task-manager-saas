import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


dotenv.config();

const app = express();  

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', 
  credentials: true 
}));

app.use(express.json()); 
 
app.use('/test', testRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

export default app;
