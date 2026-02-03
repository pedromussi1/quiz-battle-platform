import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    googleId: String,
    discordId: String,
    displayName: String,
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
