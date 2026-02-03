import { Quiz } from '../models/Quiz.js';
import { Category } from '../models/Category.js';

export const createQuiz = async (userId, quizData) => {
  try {
    const category = await Category.findById(quizData.category);
    if (!category) {
      throw new Error('Category not found');
    }

    const quiz = new Quiz({
      ...quizData,
      creator: userId,
      categoryName: category.name,
    });

    await quiz.save();
    await quiz.populate('creator', 'username displayName profileImage');
    return quiz;
  } catch (error) {
    throw error;
  }
};

export const getQuizzes = async (filters = {}) => {
  try {
    const query = { isPublished: true };

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    const quizzes = await Quiz.find(query)
      .populate('creator', 'username displayName profileImage')
      .populate('category', 'name slug')
      .sort({ [filters.sortBy || 'createdAt']: filters.order === 'asc' ? 1 : -1 })
      .limit(filters.limit || 20)
      .skip(filters.skip || 0);

    const total = await Quiz.countDocuments(query);

    return { quizzes, total };
  } catch (error) {
    throw error;
  }
};

export const getQuizById = async (quizId) => {
  try {
    const quiz = await Quiz.findById(quizId)
      .populate('creator', 'username displayName profileImage')
      .populate('category', 'name slug');

    if (!quiz) {
      throw new Error('Quiz not found');
    }

    return quiz;
  } catch (error) {
    throw error;
  }
};

export const updateQuiz = async (quizId, userId, updateData) => {
  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      throw new Error('Quiz not found');
    }

    if (quiz.creator.toString() !== userId.toString()) {
      throw new Error('Unauthorized to update this quiz');
    }

    Object.assign(quiz, updateData);
    await quiz.save();
    await quiz.populate('creator', 'username displayName profileImage');
    return quiz;
  } catch (error) {
    throw error;
  }
};

export const deleteQuiz = async (quizId, userId) => {
  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      throw new Error('Quiz not found');
    }

    if (quiz.creator.toString() !== userId.toString()) {
      throw new Error('Unauthorized to delete this quiz');
    }

    await Quiz.findByIdAndDelete(quizId);
    return true;
  } catch (error) {
    throw error;
  }
};

export const getUserQuizzes = async (userId) => {
  try {
    const quizzes = await Quiz.find({ creator: userId })
      .populate('creator', 'username displayName profileImage')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    return quizzes;
  } catch (error) {
    throw error;
  }
};

export const incrementPlayCount = async (quizId) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $inc: { playCount: 1 } },
      { new: true }
    );
    return quiz;
  } catch (error) {
    throw error;
  }
};
