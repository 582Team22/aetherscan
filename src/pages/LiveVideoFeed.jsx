/*
 * Author: Kyle Spragg
 * File: LiveVideoFeed.jsx
 * Purpose: This component displays a live video feed from the drone's camera, 
 *          allowing users to view real-time footage. It integrates with the 
 *          Supabase authentication context to manage user sessions.
 */

import React, { useState, useEffect } from 'react'; // Importing React and hooks for state and effect management
import { Box, Typography, Paper, Grid } from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling
import { Videocam as VideocamIcon } from '@mui/icons-material'; // Importing video camera icon
import { useAuth } from '../hooks/AuthProvider'; // Importing authentication context
import supabase from '../utils/supabase'; // Importing the Supabase client for authentication

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

// Creating a styled Box component for the video feed
const VideoBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Using flexbox for layout
  alignItems: 'flex-start', // Aligning items to the start
  marginBottom: theme.spacing(2), // Adding margin below the video box
  '& .MuiSvgIcon-root': { // Targeting the icon within the video box
    marginRight: theme.spacing(2), // Adding margin to the right of the icon
    color: theme.palette.primary.main, // Setting icon color to primary theme color
    fontSize: '2rem', // Setting icon size
    marginTop: '4px', // Adding margin to the top of the icon
  },
}));

// Defining the LiveVideoFeed functional component
const LiveVideoFeed = () => {
  // State to hold the OBS server address
  const [obsServer, setObsServer] = useState('');

  // Get the user from the AuthProvider
  const curUser = useAuth().curUser; // Accessing the current user from authentication context

  // Fetch the current OBS server from the database when the component mounts
  useEffect(() => {
    // Try to lookup the row using the user ID
    console.log('Current User:', curUser);
    const fetchSettings = async () => {
      console.log("Fetching settings for user ID:", curUser.id);
      const { data, error } = await supabase
        .from('settings') // Querying the settings table
        .select() // Selecting all fields
        .eq('uid', curUser.id); // Filtering by user ID

      // Check for errors in fetching settings
      if (error) {
        console.error('Error fetching settings:', error);
        setObsServer('http://localhost:5001/video_feed'); // Default server address if error occurs
      } else {
        console.log('Settings data:', data);
        if (data.length > 0) {
          setObsServer(data[0].obs_server); // Setting the OBS server address from fetched data
        }
      }
    };
    fetchSettings(); // Calling the fetchSettings function
  }, [curUser.id]); // Dependency array to run effect when user ID changes

  // Rendering the LiveVideoFeed component
  return (
    <Box> // Main container for the component
      <Typography variant="h4" gutterBottom> // Header for the live video feed
        Live Video Feed
      </Typography>
      <Grid container spacing={3}> // Grid container for layout
        <Grid item xs={12}> // Grid item taking full width
          <StyledPaper elevation={1}> // Using the styled Paper component
            <TitleBox> // Title box for the video feed
              <Typography variant="h6"> // Subheader for the video feed
                Drone Camera Feed
              </Typography>
            </TitleBox>
            <Typography variant="body2" color="text.secondary" align="center" gutterBottom> // Body text for additional information
              Real-time video stream from the drone's camera.
            </Typography>
            <VideoBox> // Box for the video feed
              <img 
                src={obsServer ? ("http://" + obsServer + ":5001/video_feed") 
                               : 'http://localhost:5001/video_feed'} // Setting the source for the video feed
                alt="Live Drone Feed" // Alt text for the image
              />
            </VideoBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Exporting the LiveVideoFeed component for use in other parts of the application
export default LiveVideoFeed;