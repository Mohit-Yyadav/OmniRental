import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import TenantList from './Components/TenantList';
import AddTenant from './Components/AddTenant';
import EditTenant from './Components/Edittenant';

import ProtectedRoute from './Components/ProtectedRoute'; // ✅ Don't forget this

import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/Dashboard.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Dashboard & Others */}
        
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
       
        <Route
          path="/tenants"
          element={
            <ProtectedRoute>
              <TenantList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-tenant"
          element={
            <ProtectedRoute>
              <AddTenant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-tenant/:id"
          element={
            <ProtectedRoute>
              <EditTenant />
            </ProtectedRoute>
          }
        />
         

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
