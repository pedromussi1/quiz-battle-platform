import { PlayHistory } from '../models/PlayHistory.js';
import { incrementPlayCount } from './quizController.js';

export const recordPlayHistory = async (userId, quizId, answers, score, totalQuestions) => {
  try {
    const playRecord = new PlayHistory({
      user: userId,
      quiz: quizId,
      score,
      totalQuestions,
      answers,
    });

    await playRecord.save();
    await incrementPlayCount(quizId);
    await playRecord.populate('quiz', 'title');

    return playRecord;
  } catch (error) {
    throw error;
  }
};

export const getUserPlayHistory = async (userId, limit = 20, skip = 0) => {
  try {
    const history = await PlayHistory.find({ user: userId })
      .populate('quiz', 'title category')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const total = await PlayHistory.countDocuments({ user: userId });

    return { history, total };
  } catch (error) {
    throw error;
  }
};

export const getQuizPlayStats = async (quizId) => {
  try {
    const stats = await PlayHistory.aggregate([
      { $match: { quiz: quizId } },
      {
        $group: {
          _id: '$quiz',
          totalPlays: { $sum: 1 },
          averageScore: { $avg: '$score' },
          highestScore: { $max: '$score' },
          lowestScore: { $min: '$score' },
        },
      },
    ]);

    return stats[0] || { totalPlays: 0, averageScore: 0, highestScore: 0, lowestScore: 0 };
  } catch (error) {
    throw error;
  }
};
