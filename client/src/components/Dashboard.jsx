import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/stats`, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const isValidImage = (url) => {
    return url && url.startsWith('http') && !url.includes('default') && !url.includes('self');
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
      {/* Credits Section */}
      {stats && (
        <>
          <Box
            sx={{
              marginBottom: '30px',
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: '#1976d2',
              color: '#fff',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Your Credits
            </Typography>
            <Typography variant="h3" fontWeight="bold" sx={{ marginTop: '12px' }}>
              {stats.credits} Points
            </Typography>
          </Box>

          {/* Saved Posts Section */}
          <Typography variant="h5" fontWeight="bold" color="primary" sx={{ marginBottom: '20px' }}>
            Saved Posts
          </Typography>

          <Box>
            {stats.savedPosts.length > 0 ? (
              stats.savedPosts.map((p, i) => (
                <Box
                  key={i}
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    marginBottom: '30px',
                  }}
                >
                  {p.thumbnail && isValidImage(p.thumbnail) && (
                    <Box
                      component="img"
                      src={p.thumbnail}
                      alt="Post Thumbnail"
                      sx={{
                        width: '100%',
                        height: '280px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        marginBottom: '16px',
                      }}
                    />
                  )}

                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {p.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    By <b>{p.author}</b> | r/{p.subreddit}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    href={p.url}
                    target="_blank"
                    sx={{ textTransform: 'none' }}
                  >
                    View Post
                  </Button>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">No saved posts</Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
