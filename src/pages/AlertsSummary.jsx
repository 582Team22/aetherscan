/*
 * Author: Kyle Spragg
 * File: AlertsSummary.jsx
 * Purpose: This component displays a summary of alerts, showing the current 
 *          status of alerts in the system. It informs users if there are 
 *          no active alerts and provides a notification icon.
 */
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Notifications as NotificationsIcon } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
}));

const AlertBox = styled(Box)(({ theme }) => ({
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

const AlertsSummary = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alerts Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={1}>
            <AlertBox>
              <NotificationsIcon />
              <Box>
                <Typography variant="h6" gutterBottom>
                  No Active Alerts
                </Typography>
                <Typography variant="body2" color="text.secondary">
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

export default AlertsSummary;
