/*
 * Author: Kyle Spragg
 * File: AuthProvider.jsx
 * Purpose: This component provides authentication context to the application, 
 *          managing user login, logout, and session state using Supabase. 
 *          It allows components to access the current user and perform 
 *          authentication actions.
 */
import { useContext, createContext, useState, useEffect } from "react"; // Importing necessary hooks and functions from React
import { useNavigate } from "react-router-dom"; // Importing useNavigate for programmatic navigation
import supabase from '../utils/supabase'; // Importing the Supabase client for authentication

const AuthContext = createContext(); // Creating a context for authentication

// Defining the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [curUser, setUser] = useState(null); // State for storing the current user
  const [loading, setLoading] = useState(true); // State for loading status

  // Effect to handle authentication state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null); // Setting the current user based on the session
      setLoading(false); // Setting loading to false after checking auth state
    });
    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const navigate = useNavigate(); // Hook for navigation
  // Function to handle user login
  const loginAction = async (data) => {
    setLoading(true); // Setting loading to true while logging in
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: data.email, // Email input from the login form
        password: data.password, // Password input from the login form
      });
      
      if (error) throw error; // Throwing error if login fails
      
      console.log("User logged in: ", user); // Logging the logged-in user
      localStorage.setItem("site", JSON.stringify(user)); // Storing user info in local storage
      setUser(user); // Setting the current user
      setLoading(false); // Setting loading to false after login
      navigate("/homepage"); // Navigating to the homepage after successful login
    } catch (error) {
      console.error("Login error: ", error); // Logging any login errors
      setLoading(false); // Setting loading to false if there's an error
    }
  };

  // Function to handle user logout
  const logOut = async () => {
    localStorage.removeItem("site"); // Removing user info from local storage
    setUser(null); // Resetting the current user to null
    setLoading(true); // Setting loading to true while logging out
    await supabase.auth.signOut() // Signing out from Supabase
    .then(() => {
      console.log("Successfully signed out"); // Logging successful sign-out
    })
    .catch((error) => {
      console.error("Sign out error: ", error); // Logging any sign-out errors
    });
    navigate("/login"); // Navigating to the login page after sign-out
    setLoading(false); // Setting loading to false after logout
  };

  // Providing the AuthContext to children components
  return (
    <AuthContext.Provider value={{ curUser, loginAction, logOut }}>
      {!loading && children} {/* Rendering children only when not loading */}
    </AuthContext.Provider>
  );
};

// Exporting the AuthProvider component as default
export default AuthProvider;

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // Returning the context value
};