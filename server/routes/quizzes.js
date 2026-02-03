import express from 'express';
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  getUserQuizzes,
} from '../controllers/quizController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all quizzes with filters
router.get('/', async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      search: req.query.search,
      sortBy: req.query.sortBy || 'createdAt',
      order: req.query.order || 'desc',
      limit: parseInt(req.query.limit) || 20,
      skip: parseInt(req.query.skip) || 0,
    };

    const result = await getQuizzes(filters);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's quizzes
router.get('/user/my-quizzes', authenticateToken, async (req, res) => {
  try {
    const quizzes = await getUserQuizzes(req.user.userId);
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await getQuizById(req.params.id);
    res.json(quiz);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create quiz
router.post('/', authenticateToken, async (req, res) => {
  try {
    const quiz = await createQuiz(req.user.userId, req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update quiz
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const quiz = await updateQuiz(req.params.id, req.user.userId, req.body);
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete quiz
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await deleteQuiz(req.params.id, req.user.userId);
    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
