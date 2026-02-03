import express from 'express';
import { recordPlayHistory, getUserPlayHistory, getQuizPlayStats } from '../controllers/playHistoryController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Record a quiz play
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { quizId, answers, score, totalQuestions } = req.body;
    const playRecord = await recordPlayHistory(
      req.user.userId,
      quizId,
      answers,
      score,
      totalQuestions
    );
    res.status(201).json(playRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's play history
router.get('/user/history', authenticateToken, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;
    const result = await getUserPlayHistory(req.user.userId, limit, skip);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get quiz play statistics
router.get('/:quizId/stats', async (req, res) => {
  try {
    const stats = await getQuizPlayStats(req.params.quizId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
