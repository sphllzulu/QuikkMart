import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../slices/authSlice';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinUser(form));
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
        <Typography variant="h4" color="secondary" gutterBottom>Sign In</Typography>
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" />
        {error && <Typography color="error">{error.message}</Typography>}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </Box>
    </Container>
  );
};

export default SignIn;

