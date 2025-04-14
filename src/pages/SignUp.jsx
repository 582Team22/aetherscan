import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
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

const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  width: '100%',
  textAlign: 'center',
}));

function SignUp() {
  return (
    <StyledContainer>
      <StyledPaper elevation={0}>
        <TitleBox>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign up
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Just a few quick things to get started
            </Typography>
          </Box>
        </TitleBox>
        <Box width="100%" mt={2}>
          <SignUpForm />
        </Box>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'inherit', fontWeight: 600 }}>
              Log In
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
}

export default SignUp;