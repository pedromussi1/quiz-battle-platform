import mongoose from 'mongoose';

const multipleChoiceQuestionSchema = new mongoose.Schema({
  question: String,
  imageUrl: String,
  videoUrl: String,
  options: [String],
  correctAnswerIndex: Number,
});

const bracketBattleSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  rounds: [
    {
      name: String,
      matches: [
        {
          competitor1: String,
          competitor2: String,
          winner: String,
        },
      ],
    },
  ],
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    creatorUsername: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    categoryName: String,
    type: {
      type: String,
      enum: ['multiple-choice', 'bracket-battle'],
      required: true,
    },
    questions: [multipleChoiceQuestionSchema],
    bracketData: bracketBattleSchema,
    playCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create text index for full-text search
quizSchema.index({ title: 'text', description: 'text' });

export const Quiz = mongoose.model('Quiz', quizSchema);
