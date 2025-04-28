/*
 * Author: Kyle Spragg
 * File: Dashboard.jsx
 * Purpose: This component displays the current status of the drone, including 
 *          metrics such as battery level, location, speed, and altitude. 
 *          It provides a visual summary of the drone's operational status.
 */

import React from 'react'; // Importing React library to create the component
import { Grid, Paper, Typography, Box } from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling
import {
  Battery90 as BatteryIcon,
  MyLocation as LocationIcon,
  Speed as SpeedIcon,
  Height as AltitudeIcon,
} from '@mui/icons-material'; // Importing icons for battery, location, speed, and altitude

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

// Creating a styled Box component for metrics
const MetricBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Using flexbox for layout
  alignItems: 'flex-start', // Aligning items to the start
  marginBottom: theme.spacing(2), // Adding margin below each metric box
  '& .MuiSvgIcon-root': { // Targeting the icon within the metric box
    marginRight: theme.spacing(2), // Adding margin to the right of the icon
    color: theme.palette.primary.main, // Setting icon color to primary theme color
    fontSize: '2rem', // Setting icon size
    marginTop: '4px', // Adding margin to the top of the icon
  },
}));

// Creating a styled Typography component for metric labels
const MetricLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary, // Setting label color to secondary text color
  fontSize: '0.875rem', // Setting font size for the label
  marginBottom: '4px', // Adding margin below the label
}));

// Creating a styled Typography component for metric values
const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem', // Setting font size for the value
  fontWeight: 500, // Setting font weight for the value
  color: theme.palette.text.primary, // Setting value color to primary text color
}));

// Defining the Dashboard functional component
const Dashboard = () => {
  // Mock data, replace with real data eventually
  const droneMetrics = {
    battery: '85%', // Mock battery level
    coordinates: 'N/A', // Mock coordinates
    speed: '15 m/s', // Mock speed
    altitude: '120 m', // Mock altitude
  };

  return (
    <Box> {/* Main container for the component */}
      <Typography variant="h4" gutterBottom> {/* Header for the dashboard */}
        Drone Status
      </Typography>
      <Grid container spacing={3}> {/* Grid container for layout */}
        <Grid item xs={12} md={6}> {/* Grid item taking full width on small screens and half on medium */}
          <StyledPaper elevation={1}> {/* Using the styled Paper component */}
            <TitleBox> {/* Title box for the current status */}
              <Typography variant="h6"> {/* Subheader for current status */}
                Current Status
              </Typography>
            </TitleBox>
            <MetricBox> {/* Box for battery metric */}
              <BatteryIcon /> {/* Battery icon */}
              <Box> {/* Box for text content */}
                <MetricLabel> {/* Label for battery level */}
                  Battery Level
                </MetricLabel>
                <MetricValue> {/* Value for battery level */}
                  {droneMetrics.battery}
                </MetricValue>
              </Box>
            </MetricBox>
            <MetricBox> {/* Box for location metric */}
              <LocationIcon /> {/* Location icon */}
              <Box> {/* Box for text content */}
                <MetricLabel> {/* Label for current location */}
                  Current Location
                </MetricLabel>
                <MetricValue> {/* Value for current location */}
                  {droneMetrics.coordinates}
                </MetricValue>
              </Box>
            </MetricBox>
            <MetricBox> {/* Box for speed metric */}
              <SpeedIcon /> {/* Speed icon */}
              <Box> {/* Box for text content */}
                <MetricLabel> {/* Label for current speed */}
                  Current Speed
                </MetricLabel>
                <MetricValue> {/* Value for current speed */}
                  {droneMetrics.speed}
                </MetricValue>
              </Box>
            </MetricBox>
            <MetricBox> {/* Box for altitude metric */}
              <AltitudeIcon /> {/* Altitude icon */}
              <Box> {/* Box for text content */}
                <MetricLabel> {/* Label for current altitude */}
                  Current Altitude
                </MetricLabel>
                <MetricValue> {/* Value for current altitude */}
                  {droneMetrics.altitude}
                </MetricValue>
              </Box>
            </MetricBox>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}> {/* Grid item taking full width on small screens and half on medium */}
          <StyledPaper elevation={1}> {/* Using the styled Paper component */}
            <TitleBox> {/* Title box for recent activity */}
              <Typography variant="h6"> {/* Subheader for recent activity */}
                Recent Activity
              </Typography>
            </TitleBox>
            {/* Add a timeline or activity feed here */}
            <Typography variant="body2" color="text.secondary"> {/* Body text for no recent activity */}
              No recent activity to display.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Exporting the Dashboard component for use in other parts of the application
export default Dashboard;