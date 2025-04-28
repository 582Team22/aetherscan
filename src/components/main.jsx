/*
 * Author: Kyle Spragg
 * File: main.jsx
 * Purpose: This file serves as the entry point for the React application, 
 *          rendering the main App component wrapped in an ErrorBoundary 
 *          to catch any errors that occur during rendering.
 */
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './ErrorBound.jsx';
import '../assets/index.css'
import App from './App.jsx'
import React from 'react';

createRoot(document.getElementById('base')).render(
  <ErrorBoundary>
    <App/>
  </ErrorBoundary>
)
