import mongoose from 'mongoose';

const playHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: Number,
    answers: [
      {
        questionIndex: Number,
        selectedAnswerIndex: Number,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export const PlayHistory = mongoose.model('PlayHistory', playHistorySchema);
