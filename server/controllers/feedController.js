import axios from 'axios';
import User from '../models/User.js';

export const getRedditPosts = async (req, res) => {
  try {
    const response = await axios.get('https://www.reddit.com/r/all.json', {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });
    
    const posts = response.data.data.children.map((item) => ({
      title: item.data.title,
      url: item.data.url,
      subreddit: item.data.subreddit,
      author: item.data.author,
      score: item.data.score,
      thumbnail: item.data.thumbnail,
    }));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Reddit posts' });
  }
};

export const savePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedPosts.push(req.body.post);
    user.credits += 5;
    await user.save();
    res.json({ message: 'Post saved' });
  } catch (err) {
    res.status(500).json({ message: 'Could not save post' });
  }
};
