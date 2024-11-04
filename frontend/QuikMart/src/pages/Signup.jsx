import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {signupUser} from '../slices/authSlice'
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signupUser(form)); // Wait for the signup action to complete

    // Check for errors; if none, navigate to signin
    if (!error) {
      navigate('/signin'); // Redirect to signin page
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
        <Typography variant="h4" color="secondary" gutterBottom>Sign Up</Typography>
        <TextField name="name" label="Name" value={form.name} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="email" label="Email" value={form.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField name="password" label="Password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" />
        {error && <Typography color="error">{error.message}</Typography>}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;

