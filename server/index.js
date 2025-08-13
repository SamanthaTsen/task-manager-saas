import express from 'express';
import dotenv from 'dotenv';
import testRoutes from './routes/testRoutes.js';
import connectDB from './db/mongoose.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();  
const PORT = process.env.PORT || 3000;
app.use(express.json());  
app.use('/test', testRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

connectDB();

app.listen(PORT, () => {    
  console.log(` Server running on port ${PORT}`);
});
