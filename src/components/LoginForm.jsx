/*
 * Author: Kyle Spragg
 * File: LoginForm.jsx
 * Purpose: This component renders a login form that allows users to enter 
 *          their email and password to authenticate and log into the application.
 */

import React, { useState } from 'react'; // Importing React and useState hook for managing state
import { TextField, Button, Box } from '@mui/material'; // Importing Material-UI components
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material'; // Importing icons for email and password fields
import { useAuth } from '../hooks/AuthProvider'; // Importing custom hook for authentication
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI

// Creating a styled TextField component with custom styles
const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2), // Adding margin below the text field
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1), // Adding margin to the right of the adornment
  },
}));

// Defining the LoginForm functional component
function LoginForm() {
  const [email, setEmail] = useState(''); // State for storing email input
  const [password, setPassword] = useState(''); // State for storing password input

  const auth = useAuth(); // Setting up the authenticator function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    await auth.loginAction({ email, password }); // Calling the login action with email and password
  };

  // Rendering the login form
  return (
    <form onSubmit={handleSubmit}> {/* Handling form submission */}
      <Box display="flex" flexDirection="column" width="100%"> {/* Using Box for layout */}
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
          color="primary" // Button color
          size="large" // Button size
          fullWidth // Making the button take full width
        >
          Log In {/* Button text */}
        </Button>
      </Box>
    </form>
  );
}

// Exporting the LoginForm component for use in other parts of the application
export default LoginForm;
