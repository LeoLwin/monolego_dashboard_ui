/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// This component protects routes that require the user to be authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Check if the user is authenticated

  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, render the protected component
};

export default ProtectedRoute;
