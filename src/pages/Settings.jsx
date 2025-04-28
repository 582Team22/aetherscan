/*
 * Author: Kyle Spragg
 * File: Settings.jsx
 * Purpose: This component allows users to configure their system settings, 
 *          including the OBS server address. It fetches current settings 
 *          from the database and provides functionality to update them.
 */
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Settings as SettingsIcon, Save as SaveIcon } from '@mui/icons-material';
import supabase from '../utils/supabase';
import { useAuth } from '../hooks/AuthProvider';

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

const FormBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const Settings = () => {
  const [obsServer, setObsServer] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const curUser = useAuth().curUser;

  useEffect(() => {
    const fetchSettings = async () => {
      console.log("Fetching settings for user ID:", curUser.id);
      const { data, error } = await supabase
        .from('settings')
        .select()
        .eq('uid', curUser.id);

      if (error) {
        console.error('Error fetching settings:', error);
        const { data: insertData, error: insertError } = await supabase
          .from('settings')
          .insert({ uid: curUser.id, obs_server: '98.84.14.247' });
        if (insertError) {
          console.error('Error inserting default settings:', insertError);
          return;
        }
        console.log('Default settings inserted:', insertData);
      } else {
        console.log('Settings data:', data);
        if (data.length > 0) {
          setObsServer(data[0].obs_server);
        }
      }
    };
    fetchSettings();
  }, [curUser.id]);

  const handleObsServerChange = async (obsServerValue) => {
    if (!obsServerValue) {
      return "Please enter a valid OBS server address.";
    }

    const { error } = await supabase
      .from('settings')
      .update({ obs_server: obsServerValue })
      .eq('uid', curUser.id);

    if (error) {
      console.error('Error updating OBS server:', error);
      return "Failed to update OBS server: " + error.message;
    }
    return null;
  };

  const handleSettingsChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const err = await handleObsServerChange(obsServer);
    if (err) {
      setError(err);
    } else {
      setSuccess('Settings updated successfully!');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={1}>
            <TitleBox>
              <Typography variant="h6">
                System Settings
              </Typography>
            </TitleBox>
            <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
              Configure your drone monitoring system settings.
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <FormBox component="form" onSubmit={handleSettingsChange}>
              <TextField
                fullWidth
                label="AWS Server IP"
                value={obsServer}
                onChange={(e) => setObsServer(e.target.value)}
                placeholder="http://localhost:5001/video_feed"
                helperText="Enter the AWS Public IP address"
                sx={{ mb: 3 }}
              />
              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                >
                  Save Settings
                </Button>
              </Box>
            </FormBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;