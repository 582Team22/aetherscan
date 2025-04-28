/*
 * Author: Kyle Spragg
 * File: SignUpForm.jsx
 * Purpose: This component renders a sign-up form that allows users to create 
 *          a new account by entering their email, username, and password.
 */

import React, { useState } from 'react'; // Importing React and the useState hook for managing component state
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for programmatic navigation after sign-up
import { TextField, Button, Box, Alert } from '@mui/material'; // Importing Material-UI components for UI elements
import { Email as EmailIcon, Person as PersonIcon, Lock as LockIcon } from '@mui/icons-material'; // Importing icons for email, username, and password fields
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling
import supabase from '../utils/supabase'; // Importing the Supabase client for authentication

// Creating a styled TextField component with custom styles
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2), // Adding margin below the text field
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1), // Adding margin to the right of the adornment
  },
}));

// Defining the SignUpForm functional component
function SignUpForm() {
  const [email, setEmail] = useState(''); // State for storing email input
  const [username, setUsername] = useState(''); // State for storing username input
  const [password, setPassword] = useState(''); // State for storing password input
  const [error, setError] = useState(''); // State for storing error messages
  const [success, setSuccess] = useState(''); // State for storing success messages
  const navigate = useNavigate(); // Hook for navigation after successful sign-up

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    setError(''); // Resetting error state before submission
    setSuccess(''); // Resetting success state before submission
    
    try {
      // Attempting to sign up the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email, // Email input from state
        password: password, // Password input from state
      });
      
      if (!error) { // If no error occurred during sign-up
        setSuccess('Account created successfully!'); // Setting success message
        setTimeout(() => {
          navigate('/login'); // Navigating to the login page after 2 seconds
        }, 2000);
      } else {
        setError(error.message); // Setting error message if sign-up failed
      }
    } catch(err) {
      setError(err.response ? err.response.data.message : 'Signup failed'); // Handling any unexpected errors
    }
  };

  // Rendering the sign-up form
  return (
    <form onSubmit={handleSubmit}> // Handling form submission
      <Box display="flex" flexDirection="column" width="100%"> // Using Box for layout
        {error && ( // Conditionally rendering error alert if there's an error
          <Alert severity="error" sx={{ mb: 2 }}>
            {error} // Displaying error message
          </Alert>
        )}
        {success && ( // Conditionally rendering success alert if sign-up is successful
          <Alert severity="success" sx={{ mb: 2 }}>
            {success} // Displaying success message
          </Alert>
        )}
        <StyledTextField
          type="email" // Input type for email
          label="Email" // Label for the email field
          value={email} // Controlled value for the email input
          onChange={(e) => setEmail(e.target.value)} // Updating email state on change
          required // Making the field required
          fullWidth // Making the field take full width
          InputProps={{
            startAdornment: <EmailIcon color="action" />, // Adding email icon as adornment
          }}
        />
        <StyledTextField
          type="text" // Input type for username
          label="Username" // Label for the username field
          value={username} // Controlled value for the username input
          onChange={(e) => setUsername(e.target.value)} // Updating username state on change
          required // Making the field required
          fullWidth // Making the field take full width
          InputProps={{
            startAdornment: <PersonIcon color="action" />, // Adding person icon as adornment
          }}
        />
        <StyledTextField
          type="password" // Input type for password
          label="Password" // Label for the password field
          value={password} // Controlled value for the password input
          onChange={(e) => setPassword(e.target.value)} // Updating password state on change
          required // Making the field required
          fullWidth // Making the field take full width
          InputProps={{
            startAdornment: <LockIcon color="action" />, // Adding lock icon as adornment
          }}
        />
        <Button
          type="submit" // Button type for form submission
          variant="contained" // Button variant
          color="secondary" // Button color
          size="large" // Button size
          fullWidth // Making the button take full width
        >
          Sign Up // Button text
        </Button>
      </Box>
    </form>
  );
}

// Exporting the SignUpForm component for use in other parts of the application
export default SignUpForm;