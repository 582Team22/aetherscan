/*
 * Author: Kyle Spragg
 * File: LiveVideoFeed.jsx
 * Purpose: This component displays a live video feed from the drone's camera, 
 *          allowing users to view real-time footage. It integrates with the 
 *          Supabase authentication context to manage user sessions.
 */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Videocam as VideocamIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/AuthProvider';
import supabase from '../utils/supabase';

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

const VideoBox = styled(Box)(({ theme }) => ({
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

const VideoContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

// This component will display the live video feed from the drone.
const LiveVideoFeed = () => {
    // State to hold the OBS server address
    const [obsServer, setObsServer] = useState('');

    // Get the user from the AuthProvider
    const curUser = useAuth().curUser;
    // Fetch the current OBS server from the database when the component mounts
    useEffect(() => {
        // Try to lookup the row using the user ID
        console.log('Current User:', curUser);
        const fetchSettings = async () => {
            console.log("Fetching settings for user ID:", curUser.id);
            const { data, error } = await supabase
                .from('settings')
                .select()
                .eq('uid', curUser.id);
            // get uid from supabase auth
            if (error) {
                console.error('Error fetching settings:', error);
                setObsServer('http://localhost:5001/video_feed');
            } else {
                console.log('Settings data:', data);
                if (data.length > 0) {
                    setObsServer(data[0].obs_server);
                }
            }
        };
        fetchSettings();
    }, [curUser.id]);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Live Video Feed
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <StyledPaper elevation={1}>
                        <TitleBox>
                            <Typography variant="h6">
                                Drone Camera Feed
                            </Typography>
                        </TitleBox>
                        <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
                            Real-time video stream from the drone's camera.
                        </Typography>
                        <VideoContainer>
                            <img 
                                src={obsServer ? ("http://" + obsServer + ":5001/video_feed") 
                                               : 'http://localhost:5001/video_feed'} 
                                alt="Live Drone Feed"
                            />
                        </VideoContainer>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LiveVideoFeed;
