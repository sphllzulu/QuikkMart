import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../slices/authSlice';
import { TextField, Button, Typography, Container, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate, Link} from 'react-router-dom';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(signinUser(form));

    if (signinUser.fulfilled.match(resultAction)) {
      setSnackbarMessage('Signin successful! Redirecting to product list...');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/'), 1500); // Delay navigation to show message
    } else {
      setSnackbarMessage(error ? error.message : 'Signin failed, please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Container maxWidth="xs" sx={{ mt: 5, textAlign: 'center' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: '#fff',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          '& .MuiTextField-root': { mb: 1 },
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#ff4081' }} gutterBottom>
          Sign In
        </Typography>

        <TextField
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          variant="outlined"
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error.message}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#ff4081',
            '&:hover': {
              bgcolor: '#ff6e40',
            },
          }}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
        <Link to={'/signup'}>
        <Typography variant="h6" sx={{  color: '#ff4081' }} gutterBottom>
          SignUp if you don't have an account
        </Typography>
        </Link>
      </Box>

      {/* Snackbar for success/failure messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignIn;
