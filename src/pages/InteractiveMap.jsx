/*
 * Author: Kyle Spragg
 * File: InteractiveMap.jsx
 * Purpose: This component displays an interactive map that shows the real-time 
 *          location of the drone and its flight path. It provides users with 
 *          a visual representation of the drone's movements and status.
 */
import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Map as MapIcon } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
}));

const MapBox = styled(Box)(({ theme }) => ({
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

const InteractiveMap = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Interactive Map
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={1}>
            <MapBox>
              <MapIcon />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Drone Location Map
                </Typography>
                <Typography variant="body2" color="text.secondary">
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

export default InteractiveMap;
