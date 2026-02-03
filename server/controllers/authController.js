import { User } from '../models/User.js';
import { generateToken } from '../middleware/auth.js';

export const handleGoogleAuth = async (profile) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = new User({
        googleId: profile.id,
        username: profile.displayName || profile.emails[0].value.split('@')[0],
        email: profile.emails[0].value,
        displayName: profile.displayName,
        profileImage: profile.photos[0]?.value,
      });
      await user.save();
    }

    const token = generateToken(user._id);
    return { user, token };
  } catch (error) {
    throw error;
  }
};

export const handleDiscordAuth = async (profile) => {
  try {
    let user = await User.findOne({ discordId: profile.id });

    if (!user) {
      user = new User({
        discordId: profile.id,
        username: profile.username,
        email: profile.email,
        displayName: profile.username,
        profileImage: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,
      });
      await user.save();
    }

    const token = generateToken(user._id);
    return { user, token };
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select('-googleId -discordId');
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-googleId -discordId');
    return user;
  } catch (error) {
    throw error;
  }
};
