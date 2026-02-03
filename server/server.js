import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from './passport.js';
import { config } from './config.js';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quizzes.js';
import playHistoryRoutes from './routes/playHistory.js';
import categoryRoutes from './routes/categories.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.frontend.url,
    credentials: true,
  })
);

// Passport initialization
app.use(passport.initialize());

// Connect to MongoDB
mongoose
  .connect(config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/play-history', playHistoryRoutes);
app.use('/api/categories', categoryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
