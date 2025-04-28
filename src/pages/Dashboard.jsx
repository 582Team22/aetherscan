/*
 * Author: Kyle Spragg
 * File: Dashboard.jsx
 * Purpose: This component displays the current status of the drone, including 
 *          metrics such as battery level, location, speed, and altitude. 
 *          It provides a visual summary of the drone's operational status.
 */
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Battery90 as BatteryIcon,
  MyLocation as LocationIcon,
  Speed as SpeedIcon,
  Height as AltitudeIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
}));

const TitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

const MetricBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
    fontSize: '2rem',
    marginTop: '4px',
  },
}));

const MetricLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  marginBottom: '4px',
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

const Dashboard = () => {
  // Mock data, replace with real data eventually
  const droneMetrics = {
    battery: '85%',
    coordinates: 'N/A',
    speed: '15 m/s',
    altitude: '120 m',
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Drone Status
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={1}>
            <TitleBox>
              <Typography variant="h6">
                Current Status
              </Typography>
            </TitleBox>
            <MetricBox>
              <BatteryIcon />
              <Box>
                <MetricLabel>
                  Battery Level
                </MetricLabel>
                <MetricValue>
                  {droneMetrics.battery}
                </MetricValue>
              </Box>
            </MetricBox>
            <MetricBox>
              <LocationIcon />
              <Box>
                <MetricLabel>
                  Current Location
                </MetricLabel>
                <MetricValue>
                  {droneMetrics.coordinates}
                </MetricValue>
              </Box>
            </MetricBox>
            <MetricBox>
              <SpeedIcon />
              <Box>
                <MetricLabel>
                  Current Speed
                </MetricLabel>
                <MetricValue>
                  {droneMetrics.speed}
                </MetricValue>
              </Box>
            </MetricBox>
            <MetricBox>
              <AltitudeIcon />
              <Box>
                <MetricLabel>
                  Current Altitude
                </MetricLabel>
                <MetricValue>
                  {droneMetrics.altitude}
                </MetricValue>
              </Box>
            </MetricBox>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={1}>
            <TitleBox>
              <Typography variant="h6">
                Recent Activity
              </Typography>
            </TitleBox>
            {/* Add a timeline or activity feed here */}
            <Typography variant="body2" color="text.secondary">
              No recent activity to display.
            </Typography>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
