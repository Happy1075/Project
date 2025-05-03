import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  credits: { type: Number, default: 0 },
  savedPosts: [{ type: Object }],
  lastLogin: { type: Date, default: null }  // 👈 added this
});

export default mongoose.model('User', userSchema);
