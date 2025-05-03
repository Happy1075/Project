import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import feedRoutes from './routes/feedRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();
const corsOptions = {
    // origin: 'http://localhost:3000', // React frontend
    // origin:'https://blog3-inky.vercel.app',
    origin:'https://project-zeta-rouge.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
  
  app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/feeds', feedRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
