import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

/**
 * ProtectedRoute - protects routes based on token presence and optional role.
 * 
 * @param {ReactNode} children - Component(s) to render if authenticated and authorized.
 * @param {string} requiredRole - (optional) Role required to access this route (e.g., 'tenant' or 'owner').
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check token expiry
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to="/login" replace />;
    }

    // Check role if required
    if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    console.error("Token error:", error.message);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
