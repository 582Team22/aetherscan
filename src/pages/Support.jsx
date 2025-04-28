/*
 * Author: Kyle Spragg
 * File: Support.jsx
 * Purpose: This component provides a support page for users, 
 *          offering various resources such as documentation, 
 *          contact support, community forums, and issue reporting.
 */
import React from 'react';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Help as HelpIcon,
  Email as EmailIcon,
  Book as DocumentationIcon,
  Forum as CommunityIcon,
  BugReport as BugIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  width: '100%',
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

const SupportBox = styled(Box)(({ theme }) => ({
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

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  '& .MuiListItemIcon-root': {
    color: theme.palette.primary.main,
  },
}));

const Support = () => {
  const supportResources = [
    {
      icon: <DocumentationIcon />,
      title: 'Documentation',
      description: 'Access comprehensive guides and documentation',
      action: 'View Documentation',
      link: '#',
    },
    {
      icon: <EmailIcon />,
      title: 'Contact Support',
      description: 'Get in touch with our support team',
      action: 'Send Email',
      link: 'mailto:support@aetherscan.com',
    },
    {
      icon: <CommunityIcon />,
      title: 'Community Forum',
      description: 'Connect with other users and share experiences',
      action: 'Join Discussion',
      link: '#',
    },
    {
      icon: <BugIcon />,
      title: 'Report an Issue',
      description: 'Submit bug reports or feature requests',
      action: 'Report Issue',
      link: '#',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Support
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledPaper elevation={1}>
            <TitleBox>
              <Typography variant="h6">
                Help Center
              </Typography>
            </TitleBox>
            <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
              Find help and resources for using AetherScan.
            </Typography>

            <List sx={{ mt: 2 }}>
              {supportResources.map((resource, index) => (
                <StyledListItem key={index} component={Link} href={resource.link} underline="none">
                  <ListItemIcon>
                    {resource.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" color="text.primary">
                        {resource.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {resource.description}
                      </Typography>
                    }
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ ml: 2 }}
                  >
                    {resource.action}
                  </Button>
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Support;