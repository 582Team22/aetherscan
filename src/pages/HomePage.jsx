import React from "react";
import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Typography, 
  useTheme 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Home as HomeIcon,
  NotificationsActive as AlertsIcon,
  Videocam as VideoIcon,
  Map as MapIcon,
  Description as LogIcon,
  Settings as SettingsIcon,
  Help as SupportIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import AlertsSummary from "./AlertsSummary";
import LiveVideoFeed from "./LiveVideoFeed";
import InteractiveMap from "./InteractiveMap";
import Settings from "./Settings";
import Support from "./Support";
import Dashboard from "./Dashboard";
import { useAuth } from '../hooks/AuthProvider';
import DetectionLog from "./DetectionLog";

const DRAWER_WIDTH = 260;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[800]}`,
  '& i': {
    marginRight: theme.spacing(1),
    fontSize: '1.5rem',
  },
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.grey[800],
  },
}));

function HomePage() {
  const auth = useAuth();
  const theme = useTheme();
  const location = useLocation();

  const handleLogout = async (e) => {
    e.preventDefault();
    await auth.logOut();
  };

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/homepage/dashboard' },
    { text: 'Alerts Summary', icon: <AlertsIcon />, path: '/homepage/alerts-summary' },
    { text: 'Live Video Feed', icon: <VideoIcon />, path: '/homepage/live-video-feed' },
    { text: 'Interactive Map', icon: <MapIcon />, path: '/homepage/interactive-map' },
    { text: 'Detection Log', icon: <LogIcon />, path: '/homepage/drone-detection' },
  ];

  const bottomMenuItems = [
    { text: 'Support', icon: <SupportIcon />, path: '/homepage/support' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/homepage/settings' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledDrawer variant="permanent">
        <Logo>
          <i className="fas fa-drone" />
          <Typography variant="h6" noWrap>
            AetherScan
          </Typography>
        </Logo>
        
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <StyledListItemButton
              key={item.text}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItemButton>
          ))}
        </List>

        <Box sx={{ mt: 'auto', pb: 2 }}>
          <List sx={{ px: 2 }}>
            {bottomMenuItems.map((item) => (
              <StyledListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItemButton>
            ))}
            <StyledListItemButton
              onClick={handleLogout}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </StyledListItemButton>
          </List>
        </Box>
      </StyledDrawer>

      <ContentArea>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alerts-summary" element={<AlertsSummary />} />
          <Route path="/live-video-feed" element={<LiveVideoFeed />} />
          <Route path="/interactive-map" element={<InteractiveMap />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/drone-detection" element={<DetectionLog />} />
        </Routes>
      </ContentArea>
    </Box>
  );
}

export default HomePage;
