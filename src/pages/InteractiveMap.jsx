/*
 * Author: Kyle Spragg
 * File: InteractiveMap.jsx
 * Purpose: This component displays an interactive map that shows the real-time 
 *          location of the drone and its flight path. It provides users with 
 *          a visual representation of the drone's movements and status.
 */

import React from 'react'; // Importing React library to create the component
import { Box, Typography, Paper, Grid } from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling
import { Map as MapIcon } from '@mui/icons-material'; // Importing map icon

// Creating a styled Paper component with custom styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Adding padding to the Paper component
  height: '100%', // Setting height to 100%
  display: 'flex', // Using flexbox for layout
  flexDirection: 'column', // Arranging children in a column
  borderRadius: theme.shape.borderRadius * 2, // Customizing border radius
}));

// Creating a styled Box component for the map title
const MapBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Using flexbox for layout
  alignItems: 'flex-start', // Aligning items to the start
  marginBottom: theme.spacing(2), // Adding margin below the map box
  '& .MuiSvgIcon-root': { // Targeting the icon within the map box
    marginRight: theme.spacing(2), // Adding margin to the right of the icon
    color: theme.palette.primary.main, // Setting icon color to primary theme color
    fontSize: '2rem', // Setting icon size
    marginTop: '4px', // Adding margin to the top of the icon
  },
}));

// Defining the InteractiveMap functional component
const InteractiveMap = () => {
  return (
    <Box>  {/* Main container for the component */}
      <Typography variant="h4" gutterBottom> {/* Header for the interactive map */}
        Interactive Map
      </Typography>
      <Grid container spacing={3}> {/* Grid container for layout */}
        <Grid item xs={12}> {/* Grid item taking full width */}
          <StyledPaper elevation={1}> {/* Using the styled Paper component */}
            <MapBox> {/* Box for the map title */}
              <MapIcon /> {/* Map icon */}
              <Box> {/* Box for text content */}
                <Typography variant="h6" gutterBottom> {/* Subheader for the map */}
                  Drone Location Map
                </Typography>
                <Typography variant="body2" color="text.secondary"> {/* Body text for additional information */}
                  The interactive map will be displayed here, showing real-time drone location and flight path.
                </Typography>
              </Box>
            </MapBox>
            {/* Map component will be added here */}
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Exporting the InteractiveMap component for use in other parts of the application
export default InteractiveMap;