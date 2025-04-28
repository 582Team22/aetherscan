/*
 * Author: Kyle Spragg
 * File: App.jsx
 * Purpose: This component serves as the main application entry point, 
 *          setting up routing and theming for the application.
 */
// Import necessary libraries and components
// import { useState, useEffect } from 'react' // Uncomment if needed
import '../assets/App.css'; // Importing main CSS styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // Importing FontAwesome icons
import { Routes, Route, HashRouter, Navigate } from "react-router-dom"; // Importing routing components
import Login from '../pages/Login'; // Importing Login page component
import SignUp from '../pages/SignUp'; // Importing SignUp page component
import HomePage from '../pages/HomePage'; // Importing HomePage component
import PrivateRoute from '../router/PrivateRoute'; // Importing PrivateRoute for protected routes
import { AuthProvider } from '../hooks/AuthProvider'; // Importing AuthProvider for authentication context
import { ThemeProvider, CssBaseline } from '@mui/material'; // Importing Material-UI components
import { theme } from '../theme/theme'; // Importing custom theme

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Providing theme to the application */}
      <CssBaseline /> {/* Applying baseline CSS styles */}
      <HashRouter> {/* Using HashRouter for routing */}
        <AuthProvider> {/* Providing authentication context */}
          <Routes> {/* Defining application routes */}
            <Route element={<PrivateRoute />}> {/* Protecting the root route */}
              <Route path="/" element={<Navigate to="/homepage" replace />} /> {/* Redirecting to homepage */}
            </Route>
            <Route path='/login' element={<Login />} /> {/* Login route */}
            <Route path='/signup' element={<SignUp />} /> {/* SignUp route */}
            <Route element={<PrivateRoute />}> {/* Protecting the homepage route */}
              <Route path="/homepage/*" element={<HomePage />} /> {/* Homepage route */}
            </Route>
          </Routes>
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App; // Exporting the App component
