/*
 * Author: Kyle Spragg
 * File: main.jsx
 * Purpose: This file serves as the entry point for the React application, 
 *          rendering the main App component wrapped in an ErrorBoundary 
 *          to catch any errors that occur during rendering.
 */

import { createRoot } from 'react-dom/client'; // Importing createRoot for rendering the React application
import ErrorBoundary from './ErrorBound.jsx'; // Importing the ErrorBoundary component to handle errors
import '../assets/index.css'; // Importing global CSS styles for the application
import App from './App.jsx'; // Importing the main App component
import React from 'react'; // Importing React library

// Rendering the application into the DOM
createRoot(document.getElementById('base')).render(
  <ErrorBoundary> // Wrapping the App component in ErrorBoundary
    <App/> // Rendering the main App component
  </ErrorBoundary>
);
