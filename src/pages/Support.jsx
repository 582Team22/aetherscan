/*
 * Author: Kyle Spragg
 * File: Support.jsx
 * Purpose: This component provides a support page for users, 
 *          offering various resources such as documentation, 
 *          contact support, community forums, and issue reporting.
 */

import React from 'react'; // Importing React library to create the component
import { Box, Typography, Paper, Grid, List, ListItem, ListItemIcon, ListItemText, Button, Link } from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling
import {
  Help as HelpIcon,
  Email as EmailIcon,
  Book as DocumentationIcon,
  Forum as CommunityIcon,
  BugReport as BugIcon,
} from '@mui/icons-material'; // Importing icons for various support resources

// Creating a styled Paper component with custom styles
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3), // Adding padding to the Paper component
  height: '100%', // Setting height to 100%
  width: '100%', // Setting width to 100%
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

// Creating a styled Box component for support resources
const SupportBox = styled(Box)(({ theme }) => ({
  display: 'flex', // Using flexbox for layout
  alignItems: 'flex-start', // Aligning items to the start
  marginBottom: theme.spacing(2), // Adding margin below each support resource
  '& .MuiSvgIcon-root': { // Customizing icon styles
    marginRight: theme.spacing(2), // Adding margin to the right of icons
    color: theme.palette.primary.main, // Setting icon color
    fontSize: '2rem', // Setting icon size
    marginTop: '4px', // Adding margin to the top of icons
  },
}));

// Creating a styled ListItem component with custom styles
const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2), // Adding padding to the ListItem
  marginBottom: theme.spacing(2), // Adding margin below each ListItem
  borderRadius: theme.shape.borderRadius, // Customizing border radius
  backgroundColor: theme.palette.background.default, // Setting background color
  '&:hover': { // Adding hover effect
    backgroundColor: theme.palette.grey[100], // Changing background color on hover
  },
  '& .MuiListItemIcon-root': { // Customizing icon color in ListItem
    color: theme.palette.primary.main, // Setting icon color
  },
}));

// Defining the Support functional component
const Support = () => {
  // Array of support resources
  const supportResources = [
    {
      icon: <DocumentationIcon />, // Icon for documentation
      title: 'Documentation', // Title for documentation resource
      description: 'Access comprehensive guides and documentation', // Description for documentation
      action: 'View Documentation', // Action text for documentation
      link: '#', // Link for documentation
    },
    {
      icon: <EmailIcon />, // Icon for contact support
      title: 'Contact Support', // Title for contact support resource
      description: 'Get in touch with our support team', // Description for contact support
      action: 'Send Email', // Action text for contact support
      link: 'mailto:support@aetherscan.com', // Email link for contact support
    },
    {
      icon: <CommunityIcon />, // Icon for community forum
      title: 'Community Forum', // Title for community forum resource
      description: 'Connect with other users and share experiences', // Description for community forum
      action: 'Join Discussion', // Action text for community forum
      link: '#', // Link for community forum
    },
    {
      icon: <BugIcon />, // Icon for reporting issues
      title: 'Report an Issue', // Title for reporting issues
      description: 'Submit bug reports or feature requests', // Description for reporting issues
      action: 'Report Issue', // Action text for reporting issues
      link: '#', // Link for reporting issues
    },
  ];

  // Rendering the Support component
  return (
    <Box> // Main container for the component
      <Typography variant="h4" gutterBottom> // Header for the support page
        Support
      </Typography>
      <Grid container spacing={3}> // Grid container for layout
        <Grid item xs={12}> // Grid item taking full width
          <StyledPaper elevation={1}> // Using the styled Paper component
            <TitleBox> // Title box for help center
              <Typography variant="h6"> // Subheader for help center
                Help Center
              </Typography>
            </TitleBox>
            <Typography variant="body2" color="text.secondary" align="center" gutterBottom> // Body text for instructions
              Find help and resources for using AetherScan.
            </Typography>

            <List sx={{ mt: 2 }}> // List of support resources
              {supportResources.map((resource, index) => ( // Mapping through support resources
                <StyledListItem key={index} component={Link} href={resource.link} underline="none"> // Styled ListItem for each resource
                  <ListItemIcon>
                    {resource.icon} // Rendering the resource icon
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" color="text.primary"> // Primary text for resource title
                        {resource.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary"> // Secondary text for resource description
                        {resource.description}
                      </Typography>
                    }
                  />
                  <Button
                    variant="outlined" // Button variant
                    color="primary" // Button color
                    size="small" // Button size
                    sx={{ ml: 2 }} // Adding margin to the left of the button
                  >
                    {resource.action} // Button text for action
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

// Exporting the Support component for use in other parts of the application
export default Support;