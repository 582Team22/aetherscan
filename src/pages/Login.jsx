/*
 * Author: Kyle Spragg
 * File: Login.jsx
 * Purpose: This component renders the login page, allowing users to enter 
 *          their credentials to access the application. It includes a 
 *          login form and a link to the sign-up page for new users.
 */

import React from 'react'; // Importing React library to create the component
import { Link } from 'react-router-dom'; // Importing Link for navigation
import LoginForm from "../components/LoginForm"; // Importing the LoginForm component
import { Container, Paper, Typography, Box } from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling

// Creating a styled Container component with custom styles
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh', // Setting minimum height to 100vh
  display: 'flex', // Using flexbox for layout
  alignItems: 'center', // Aligning items to the center
  justifyContent: 'center', // Centering content horizontally
  backgroundColor: theme.palette.background.default, // Setting background color
  padding: theme.spacing(3), // Adding padding
}));

// Creating a styled Paper component with custom styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4), // Adding padding to the Paper component
  width: '100%', // Setting width to 100%
  maxWidth: 400, // Setting maximum width
  display: 'flex', // Using flexbox for layout
  flexDirection: 'column', // Arranging children in a column
  alignItems: 'center', // Aligning items to the center
  borderRadius: theme.shape.borderRadius * 2, // Customizing border radius
}));

// Creating a styled Box component for the title
const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Using flexbox for layout
  alignItems: 'center', // Aligning items to the center
  justifyContent: 'center', // Centering content horizontally
  marginBottom: theme.spacing(3), // Adding margin below the title box
  width: '100%', // Setting width to 100%
  textAlign: 'center', // Centering text
}));

// Defining the Login functional component
function Login() {
  return (
    <StyledContainer> // Using the styled Container component
      <StyledPaper elevation={0}> // Using the styled Paper component
        <TitleBox> // Title box for the login form
          <Box> // Box for text content
            <Typography variant="h4" component="h1" gutterBottom> // Header for the login form
              Login
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom> // Body text for welcome message
              Hi! Welcome back.
            </Typography>
          </Box>
        </TitleBox>
        <Box width="100%" mt={2}> // Box for the login form
          <LoginForm /> // Rendering the LoginForm component
        </Box>
        <Box mt={3}> // Box for the sign-up link
          <Typography variant="body2" color="text.secondary"> // Body text for sign-up prompt
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'inherit', fontWeight: 600 }}> // Link to sign-up page
              Sign Up
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
}

// Exporting the Login component for use in other parts of the application
export default Login;