import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/feeds/reddit`);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/stats`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setSavedPosts(res.data.savedPosts); // Assuming savedPosts is an array of post IDs or full post objects
    } catch (err) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const savePost = async (post) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/feeds/save`,
        { post },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      setSavedPosts((prev) => [...prev, post]); // Add post to savedPosts state
      setSnackbar({ open: true, message: 'Post saved!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to save post.', severity: 'error' });
    }
  };

  const sharePost = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setSnackbar({ open: true, message: 'Post link copied to clipboard!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to copy link.', severity: 'error' });
    }
  };

  const isValidImage = (url) => {
    return url && url.startsWith('http') && !url.includes('default') && !url.includes('self');
  };

  const isPostSaved = (post) => {
    return savedPosts.some((saved) => saved.url === post.url);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      {posts.map((p, i) => (
        <Box
          key={i}
          sx={{
            border: '1px solid #ccc',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            marginBottom: '40px',
          }}
        >
          {p.thumbnail && isValidImage(p.thumbnail) && (
            <Box
              component="img"
              src={p.thumbnail}
              alt="Post Thumbnail"
              sx={{
                width: '100%',
                height: '300px',
                objectFit: 'contain',
                borderRadius: '8px',
                mb: 3,
              }}
            />
          )}

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {p.title}
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            By <b>{p.author}</b> | r/{p.subreddit}
          </Typography>

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              href={p.url}
              target="_blank"
              sx={{ textTransform: 'none' }}
            >
              View Post
            </Button>

            {/* Show Save button only if post not already saved */}
            {!isPostSaved(p) && (
              <Button
                variant="contained"
                color="success"
                onClick={() => savePost(p)}
                sx={{ textTransform: 'none' }}
              >
                Save Post
              </Button>
            )}

            <Button
              variant="contained"
              color="secondary"
              onClick={() => sharePost(p.url)}
              sx={{ textTransform: 'none' }}
            >
              Share Post
            </Button>
          </Box>
        </Box>
      ))}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
