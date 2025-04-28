/*
 * Author: Kyle Spragg
 * File: LoginForm.jsx
 * Purpose: This component renders a login form that allows users to enter 
 *          their email and password to authenticate and log into the application.
 */
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/AuthProvider';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1),
  },
}));

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth(); // Set's up the authenticator function
  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.loginAction({email, password});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" width="100%">
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
          color="primary"
          size="large"
          fullWidth
        >
          Log In
        </Button>
      </Box>
    </form>
  );
}

export default LoginForm;
