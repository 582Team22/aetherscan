/*
 * Author: Kyle Spragg
 * File: SignUp.jsx
 * Purpose: This component renders the sign-up page, allowing new users 
 *          to create an account. It includes a sign-up form and a link 
 *          to the login page for existing users.
 */

import React from 'react'; // Importing React library to create the component
import { Link } from 'react-router-dom'; // Importing Link for navigation to the login page
import SignUpForm from '../components/SignUpForm'; // Importing the SignUpForm component for user registration
import { Container, Paper, Typography, Box } from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling

// Creating a styled Container component with custom styles
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh', // Setting minimum height to 100vh
  display: 'flex', // Using flexbox for layout
  alignItems: 'center', // Aligning items to the center vertically
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

// Defining the SignUp functional component
function SignUp() {
  return (
    <StyledContainer> // Using the styled Container component
      <StyledPaper elevation={0}> // Using the styled Paper component
        <TitleBox> // Title box for the sign-up form
          <Box> // Box for text content
            <Typography variant="h4" component="h1" gutterBottom> // Header for the sign-up form
              Sign up
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom> // Body text for instructions
              Just a few quick things to get started
            </Typography>
          </Box>
        </TitleBox>
        <Box width="100%" mt={2}> // Box for the sign-up form
          <SignUpForm /> // Rendering the SignUpForm component
        </Box>
        <Box mt={3}> // Box for the login link
          <Typography variant="body2" color="text.secondary"> // Body text for login prompt
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'inherit', fontWeight: 600 }}> // Link to the login page
              Log In
            </Link>
          </Typography>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
}

// Exporting the SignUp component for use in other parts of the application
export default SignUp;