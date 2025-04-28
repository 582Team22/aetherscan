/*
 * Author: Kyle Spragg
 * File: SignUpForm.jsx
 * Purpose: This component renders a sign-up form that allows users to create 
 *          a new account by entering their email, username, and password.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Alert } from '@mui/material';
import { Email as EmailIcon, Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import supabase from '../utils/supabase';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1),
  },
}));

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      
      if (!error) {
        setSuccess('Account created successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(error.message);
      }
    } catch(err) {
      setError(err.response ? err.response.data.message : 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" width="100%">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        <StyledTextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: <EmailIcon color="action" />,
          }}
        />
        <StyledTextField
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: <PersonIcon color="action" />,
          }}
        />
        <StyledTextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          InputProps={{
            startAdornment: <LockIcon color="action" />,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
        >
          Sign Up
        </Button>
      </Box>
    </form>
  );
}

export default SignUpForm;