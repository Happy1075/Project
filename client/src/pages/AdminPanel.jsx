import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Button, Grid, Snackbar, Alert } from '@mui/material';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/all`, {
      headers: { Authorization: localStorage.getItem('token') },
    });
    setUsers(res.data);
  };

  const handleEditCredits = async (userId) => {
    const newCredits = prompt('Enter new credits value:');
    if (newCredits === null) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/edit-credits`,
        { userId, credits: Number(newCredits) },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      fetchUsers();
      setSnackbar({ open: true, message: 'Credits updated successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to update credits.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', p: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" mb={4}>
        Admin Panel
      </Typography>

      <Grid container spacing={3}>
        {users.map((u, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ borderRadius: '16px', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {u.name || 'No Name'}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {u.email}
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  <strong>Credits:</strong> {u.credits}
                </Typography>
                <Typography>
                  <strong>Posts Saved:</strong> {u.savedPosts.length}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: '8px', textTransform: 'none' }}
                  onClick={() => handleEditCredits(u._id)}
                >
                  Edit Credits
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
