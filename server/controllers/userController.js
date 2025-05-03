import User from '../models/User.js';

export const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ credits: user.credits, savedPosts: user.savedPosts });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch stats' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch users' });
  }
};

export const editCredits = async (req, res) => {
  try {
    const { userId, credits } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.credits = credits;
    await user.save();

    res.json({ message: 'Credits updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Could not update credits' });
  }
};
