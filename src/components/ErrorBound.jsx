/*
 * Author: Kyle Spragg
 * File: ErrorBound.jsx
 * Purpose: This component serves as an error boundary to catch JavaScript errors 
 *          in its child component tree and display a fallback UI instead of crashing.
 */

import React from 'react'; // Importing React library to create a component

// Defining the ErrorBoundary class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props); // Calling the parent constructor
    this.state = { hasError: false }; // Initial state indicating no error
  }
  
  // Lifecycle method to update state when an error is caught
  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true }; // Setting hasError to true
  }
  
  // Lifecycle method to log error information
  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by Error Boundary:", error, errorInfo); // Logging the error
  }
  
  // Render method to display UI
  render() {
    if (this.state.hasError) { // Check if there is an error
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>; // Fallback UI when an error occurs
    }
    return this.props.children; // Render child components if no error
  }
}

// Exporting the ErrorBoundary component for use in other parts of the application
export default ErrorBoundary;