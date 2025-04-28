/*
 * Author: Kyle Spragg
 * File: PrivateRoute.jsx
 * Purpose: This component checks if the user is authenticated before allowing 
 *          access to certain routes. If the user is not authenticated, they 
 *          are redirected to the login page.
 */

import React from "react"; // Importing React library to create the component
import { Navigate, Outlet } from "react-router-dom"; // Importing Navigate for redirection and Outlet for rendering child routes
import { useAuth } from "../hooks/AuthProvider"; // Importing authentication context to access user authentication status

// Defining the PrivateRoute functional component
const PrivateRoute = () => {
  const user = useAuth().curUser; // Accessing the current user from authentication context
  console.log("PrivateRoute user: ", user); // Logging the current user for debugging

  // If there is no user (not authenticated), redirect to the login page
  if (!user) return <Navigate to="/login" />; // Redirecting to the login page if user is not authenticated

  return <Outlet />; // Rendering child routes if user is authenticated
};

// Exporting the PrivateRoute component for use in other parts of the application
export default PrivateRoute;