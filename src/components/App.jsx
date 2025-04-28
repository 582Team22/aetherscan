/*
 * Author: Kyle Spragg
 * File: App.jsx
 * Purpose: This component serves as the main application entry point, 
 *          setting up routing and theming for the application.
 */
// import { useState, useEffect } from 'react'
import '../assets/App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import HomePage from '../pages/HomePage';
import PrivateRoute from '../router/PrivateRoute';
import { AuthProvider } from '../hooks/AuthProvider';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Navigate to="/homepage" replace />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/homepage/*" element={<HomePage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
