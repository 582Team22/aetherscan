import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from "../components/LoginForm";
import { Container, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius * 2,
}));

function Login() {
  return (
    <StyledContainer>
      <StyledPaper elevation={0}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Hi! Welcome back.
        </Typography>
        <Box width="100%" mt={2}>
          <LoginForm />
        </Box>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'inherit', fontWeight: 600 }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
}

export default Login;