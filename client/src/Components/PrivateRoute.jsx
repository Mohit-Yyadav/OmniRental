// PrivateRoute.jsx (for tenants)
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return token && role === 'tenant' ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
