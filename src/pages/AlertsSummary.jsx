/*
 * Author: Kyle Spragg
 * File: AlertsSummary.jsx
 * Purpose: This component displays a summary of alerts, showing the current 
 *          status of alerts in the system. It informs users if there are 
 *          no active alerts and provides a notification icon.
 */

import React from 'react'; // Importing React library to create the component
import { Box, Typography, Paper, Grid } from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling
import { Notifications as NotificationsIcon } from '@mui/icons-material'; // Importing notifications icon

// Creating a styled Paper component with custom styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Adding padding to the Paper component
  height: '100%', // Setting height to 100%
  display: 'flex', // Using flexbox for layout
  flexDirection: 'column', // Arranging children in a column
  borderRadius: theme.shape.borderRadius * 2, // Customizing border radius
}));

// Creating a styled Box component for alerts
const AlertBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Using flexbox for layout
  alignItems: 'flex-start', // Aligning items to the start
  marginBottom: theme.spacing(2), // Adding margin below the alert box
  '& .MuiSvgIcon-root': { // Targeting the icon within the alert box
    marginRight: theme.spacing(2), // Adding margin to the right of the icon
    color: theme.palette.primary.main, // Setting icon color to primary theme color
    fontSize: '2rem', // Setting icon size
    marginTop: '4px', // Adding margin to the top of the icon
  },
}));

// Defining the AlertsSummary functional component
const AlertsSummary = () => {
  return (
    <Box> // Main container for the component
      <Typography variant="h4" gutterBottom> // Header for the alerts summary
        Alerts Summary
      </Typography>
      <Grid container spacing={3}> // Grid container for layout
        <Grid item xs={12}> // Grid item taking full width
          <StyledPaper elevation={1}> // Using the styled Paper component
            <AlertBox> // Alert box for displaying notifications
              <NotificationsIcon /> // Notifications icon
              <Box> // Box for text content
                <Typography variant="h6" gutterBottom> // Subheader for alerts
                  No Active Alerts
                </Typography>
                <Typography variant="body2" color="text.secondary"> // Body text for additional information
                  The system is operating normally. You will be notified here when there are any alerts.
                </Typography>
              </Box>
            </AlertBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Exporting the AlertsSummary component for use in other parts of the application
export default AlertsSummary;