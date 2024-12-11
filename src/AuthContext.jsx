/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";

// Create a Context for authentication
const AuthContext = createContext();

// This is the provider component that will wrap our entire app
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Whether user is logged in or not
  const [accessToken, setAccessToken] = useState(null); // Store the access token when logged in

  // Function to log in
  const login = (token) => {
    console.log("Context Token : ", token);
    setAccessToken(token); // Save the access token
    setIsAuthenticated(true); // Set the authentication status to true
    console.log("isAuthenticated : ", isAuthenticated);
  };

  // Function to log out
  const logout = () => {
    setAccessToken(null); // Clear the access token
    setIsAuthenticated(false); // Set the authentication status to false
  };

  return (
    // Provide these functions and state to the rest of the app
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in other components
export const useAuth = () => {
  return useContext(AuthContext); // Allows components to access the authentication state
};
