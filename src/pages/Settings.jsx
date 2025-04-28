/*
 * Author: Kyle Spragg
 * File: Settings.jsx
 * Purpose: This component allows users to configure their system settings, 
 *          including the OBS server address. It fetches current settings 
 *          from the database and provides functionality to update them.
 */

import React, { useState, useEffect } from 'react'; // Importing React and hooks for state and effect management
import { Box, Typography, Paper, Grid, TextField, Button, Alert } from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling
import { Settings as SettingsIcon, Save as SaveIcon } from '@mui/icons-material'; // Importing icons for settings and save actions
import supabase from '../utils/supabase'; // Importing the Supabase client for authentication
import { useAuth } from '../hooks/AuthProvider'; // Importing authentication context

// Creating a styled Paper component with custom styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Adding padding to the Paper component
  height: '100%', // Setting height to 100%
  display: 'flex', // Using flexbox for layout
  flexDirection: 'column', // Arranging children in a column
  borderRadius: theme.shape.borderRadius * 2, // Customizing border radius
}));

// Creating a styled Box component for the title
const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Using flexbox for layout
  alignItems: 'center', // Aligning items to the center
  justifyContent: 'center', // Centering content horizontally
  marginBottom: theme.spacing(3), // Adding margin below the title box
}));

// Creating a styled Box component for the form
const FormBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3), // Adding margin to the top of the form
}));

// Defining the Settings functional component
const Settings = () => {
  const [obsServer, setObsServer] = useState(''); // State for storing the OBS server address
  const [success, setSuccess] = useState(''); // State for storing success messages
  const [error, setError] = useState(''); // State for storing error messages
  const curUser = useAuth().curUser; // Accessing the current user from authentication context

  // Effect to fetch settings when the component mounts
  useEffect(() => {
    const fetchSettings = async () => {
      console.log("Fetching settings for user ID:", curUser.id); // Logging the current user ID
      const { data, error } = await supabase
        .from('settings') // Querying the settings table
        .select() // Selecting all fields
        .eq('uid', curUser.id); // Filtering by user ID

      // Check for errors in fetching settings
      if (error) {
        console.error('Error fetching settings:', error); // Logging any errors
        const { data: insertData, error: insertError } = await supabase
          .from('settings') // Inserting default settings if none exist
          .insert({ uid: curUser.id, obs_server: '98.84.14.247' }); // Default OBS server address
        if (insertError) {
          console.error('Error inserting default settings:', insertError); // Logging any errors during insertion
          return; // Exiting the function if there's an error
        }
        console.log('Default settings inserted:', insertData); // Logging successful insertion of default settings
      } else {
        console.log('Settings data:', data); // Logging fetched settings data
        if (data.length > 0) {
          setObsServer(data[0].obs_server); // Setting the OBS server address from fetched data
        }
      }
    };
    fetchSettings(); // Calling the fetchSettings function
  }, [curUser.id]); // Dependency array to run effect when user ID changes

  // Function to handle changes to the OBS server address
  const handleObsServerChange = async (obsServerValue) => {
    if (!obsServerValue) {
      return "Please enter a valid OBS server address."; // Validating input
    }

    const { error } = await supabase
      .from('settings') // Updating the settings table
      .update({ obs_server: obsServerValue }) // Setting the new OBS server address
      .eq('uid', curUser.id); // Filtering by user ID

    if (error) {
      console.error('Error updating OBS server:', error); // Logging any errors during update
      return "Failed to update OBS server: " + error.message; // Returning error message
    }
    return null; // Returning null if no errors
  };

  // Function to handle form submission for settings
  const handleSettingsChange = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    setError(''); // Resetting error state
    setSuccess(''); // Resetting success state
    
    const err = await handleObsServerChange(obsServer); // Handling OBS server change
    if (err) {
      setError(err); // Setting error message if there's an error
    } else {
      setSuccess('Settings updated successfully!'); // Setting success message
    }
  };

  // Rendering the Settings component
  return (
    <Box> // Main container for the component
      <Typography variant="h4" gutterBottom> // Header for the settings page
        Settings
      </Typography>
      <Grid container spacing={3}> // Grid container for layout
        <Grid item xs={12}> // Grid item taking full width
          <StyledPaper elevation={1}> // Using the styled Paper component
            <TitleBox> // Title box for system settings
              <Typography variant="h6"> // Subheader for system settings
                System Settings
              </Typography>
            </TitleBox>
            <Typography variant="body2" color="text.secondary" align="center" gutterBottom> // Body text for instructions
              Configure your drone monitoring system settings.
            </Typography>

            {success && ( // Conditionally rendering success alert if there's a success message
              <Alert severity="success" sx={{ mb: 2 }}>
                {success} // Displaying success message
              </Alert>
            )}
            {error && ( // Conditionally rendering error alert if there's an error message
              <Alert severity="error" sx={{ mb: 2 }}>
                {error} // Displaying error message
              </Alert>
            )}

            <FormBox component="form" onSubmit={handleSettingsChange}> // Form for settings
              <TextField
                fullWidth // Making the field take full width
                label="AWS Server IP" // Label for the input field
                value={obsServer} // Controlled value for the OBS server input
                onChange={(e) => setObsServer(e.target.value)} // Updating OBS server state on change
                placeholder="http://localhost:5001/video_feed" // Placeholder text
                helperText="Enter the AWS Public IP address" // Helper text for the input field
                sx={{ mb: 3 }} // Adding margin below the input field
              />
              <Box display="flex" justifyContent="center"> // Centering the save button
                <Button
                  type="submit" // Button type for form submission
                  variant="contained" // Button variant
                  color="primary" // Button color
                  startIcon={<SaveIcon />} // Adding save icon to the button
                >
                  Save Settings // Button text
                </Button>
              </Box>
            </FormBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Exporting the Settings component for use in other parts of the application
export default Settings;