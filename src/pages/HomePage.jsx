/*
 * Author: Kyle Spragg
 * File: HomePage.jsx
 * Purpose: This component serves as the main layout for the application, 
 *          providing a navigation drawer and routing to various pages 
 *          such as the dashboard, alerts summary, live video feed, 
 *          interactive map, and detection log.
 */

import React from "react"; // Importing React library to create the component
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Importing routing components
import { 
  Box, 
  Drawer, 
  List, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Typography, 
  useTheme 
} from '@mui/material'; // Importing Material-UI components for layout and styling
import { styled } from '@mui/material/styles'; // Importing styled utility from Material-UI for custom styling
import {
  Home as HomeIcon,
  NotificationsActive as AlertsIcon,
  Videocam as VideoIcon,
  Map as MapIcon,
  Description as LogIcon,
  Settings as SettingsIcon,
  Help as SupportIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material'; // Importing icons for navigation
import AlertsSummary from "./AlertsSummary"; // Importing AlertsSummary component
import LiveVideoFeed from "./LiveVideoFeed"; // Importing LiveVideoFeed component
import InteractiveMap from "./InteractiveMap"; // Importing InteractiveMap component
import Settings from "./Settings"; // Importing Settings component
import Support from "./Support"; // Importing Support component
import Dashboard from "./Dashboard"; // Importing Dashboard component
import { useAuth } from '../hooks/AuthProvider'; // Importing authentication context
import DetectionLog from "./DetectionLog"; // Importing DetectionLog component

const DRAWER_WIDTH = 260; // Setting the width for the drawer

// Creating a styled Drawer component with custom styles
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH, // Setting the width of the drawer
  flexShrink: 0, // Preventing the drawer from shrinking
  '& .MuiDrawer-paper': { // Styling the drawer paper
    width: DRAWER_WIDTH, // Setting the width of the drawer paper
    boxSizing: 'border-box', // Setting box-sizing to border-box
    backgroundColor: theme.palette.grey[900], // Setting background color
    color: theme.palette.common.white, // Setting text color
  },
}));

// Creating a styled Box component for the logo
const Logo = styled(Box)(({ theme }) => ({
  display: 'flex', // Using flexbox for layout
  alignItems: 'center', // Aligning items to the center
  padding: theme.spacing(2), // Adding padding
  borderBottom: `1px solid ${theme.palette.grey[800]}`, // Adding bottom border
  '& i': { // Targeting the icon within the logo
    marginRight: theme.spacing(1), // Adding margin to the right of the icon
    fontSize: '1.5rem', // Setting icon size
  },
}));

// Creating a styled Box component for the content area
const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1, // Allowing the content area to grow
  padding: theme.spacing(3), // Adding padding
  backgroundColor: theme.palette.background.default, // Setting background color
  minHeight: '100vh', // Setting minimum height to 100vh
}));

// Creating a styled ListItemButton component with custom styles
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  marginBottom: theme.spacing(0.5), // Adding margin below each button
  borderRadius: theme.shape.borderRadius, // Customizing border radius
  '&:hover': { // Styling on hover
    backgroundColor: theme.palette.grey[800], // Changing background color on hover
  },
}));

// Defining the HomePage functional component
function HomePage() {
  const auth = useAuth(); // Accessing authentication context
  const theme = useTheme(); // Accessing theme
  const location = useLocation(); // Getting the current location

  // Function to handle user logout
  const handleLogout = async (e) => {
    e.preventDefault(); // Preventing default behavior
    await auth.logOut(); // Calling the logout function from auth context
  };

  // Defining menu items for the navigation drawer
  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/homepage/dashboard' },
    { text: 'Alerts Summary', icon: <AlertsIcon />, path: '/homepage/alerts-summary' },
    { text: 'Live Video Feed', icon: <VideoIcon />, path: '/homepage/live-video-feed' },
    { text: 'Interactive Map', icon: <MapIcon />, path: '/homepage/interactive-map' },
    { text: 'Detection Log', icon: <LogIcon />, path: '/homepage/drone-detection' },
  ];

  // Defining bottom menu items for the navigation drawer
  const bottomMenuItems = [
    { text: 'Support', icon: <SupportIcon />, path: '/homepage/support' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/homepage/settings' },
  ];

  // Rendering the HomePage component
  return (
    <Box sx={{ display: 'flex' }}> {/* Main container for the component */}
      <StyledDrawer variant="permanent"> {/* Using the styled Drawer component */}
        <Logo> {/* Logo section */}
          <i className="fas fa-drone" /> {/* Drone icon */}
          <Typography variant="h6" noWrap> {/* Application title */}
            AetherScan
          </Typography>
        </Logo>
        
        <List sx={{ px: 2 }}> {/* List for menu items */}
          {menuItems.map((item) => ( // Mapping through menu items
            <StyledListItemButton
              key={item.text} // Unique key for each item
              component={Link} // Making the button a link
              to={item.path} // Setting the path for the link
              selected={location.pathname === item.path} // Highlighting the selected item
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}> {/* Icon for the menu item */}
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />  {/* Text for the menu item */}
            </StyledListItemButton>
          ))}
        </List>

        <Box sx={{ mt: 'auto', pb: 2 }}> {/* Box for bottom menu items */}
          <List sx={{ px: 2 }}> {/* List for bottom menu items */}
            {bottomMenuItems.map((item) => ( // Mapping through bottom menu items
              <StyledListItemButton
                key={item.text} // Unique key for each item
                component={Link} // Making the button a link
                to={item.path} // Setting the path for the link
                selected={location.pathname === item.path} // Highlighting the selected item
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}> {/* Icon for the bottom menu item */}
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} /> {/* Text for the bottom menu item */}
              </StyledListItemButton>
            ))}
            <StyledListItemButton // Button for logging out
              onClick={handleLogout} // Handling logout click
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}> {/* Logout icon */}
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" /> {/* Text for the logout button */}
            </StyledListItemButton>
          </List>
        </Box>
      </StyledDrawer>

      <ContentArea> {/* Content area for routing */}
        <Routes> {/* Defining routes for the application */}
          <Route path="/" element={<Navigate to="/homepage/dashboard" replace />} /> {/* Redirecting to dashboard */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard */}
          <Route path="/alerts-summary" element={<AlertsSummary />} /> {/* Route for Alerts Summary */}
          <Route path="/live-video-feed" element={<LiveVideoFeed />} /> {/* Route for Live Video Feed */}
          <Route path="/interactive-map" element={<InteractiveMap />} /> {/* Route for Interactive Map */}
          <Route path="/support" element={<Support />} /> {/* Route for Support */}
          <Route path="/settings" element={<Settings />} /> {/* Route for Settings */}
          <Route path="/drone-detection" element={<DetectionLog />} /> {/* Route for Detection Log */}
        </Routes>
      </ContentArea>
    </Box>
  );
}

// Exporting the HomePage component for use in other parts of the application
export default HomePage;