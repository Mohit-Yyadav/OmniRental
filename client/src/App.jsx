import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import TenantList from './Pages/Dashboard/TenantList';
import AddTenant from './pages/Dashboard/AddTenant';
import Edittenant from './pages/Dashboard/Edittenant';
// Note: filename is Edittenant.jsx (with two 't's)

// Auth Route
import AuthRoute from './components/AuthRoute';

// Tenant Components
// File: src/App.jsx

import TenantSignup from './pages/Dashboard/TenantSignup';
import TenantProfile from './pages/Dashboard/TenantProfile';
import TenantDashboard from './pages/Dashboard/TenantDashboard';
import Home from './pages/Home';
import Properties from './pages/Properties';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PropertyDetail from './pages/PropertyDetail';
import ProtectedRoute from './components/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/DashboardCss/Dashboard.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property/:id" element={<PropertyDetail />} />

        {/* Tenant Routes */}
        <Route path="/tenant/signup" element={<TenantSignup />} />
        {/* <Route 
          path="/tenant/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <TenantDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tenant/profile" 
          element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <TenantProfile />
            </ProtectedRoute>
          } 
        /> */}

        {/* Admin/Owner Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthRoute allowedRoles={['admin', 'owner']}>
              <Dashboard />
            </AuthRoute>
          }
        />
        {/* <Route
          path="/tenants"
          element={
            <ProtectedRoute allowedRoles={['admin', 'owner']}>
              <TenantList />
            </ProtectedRoute>
          }
        /> */}
          
        {/* <Route
          path="/add-tenant"
          element={
            <ProtectedRoute allowedRoles={['admin', 'owner']}>
              <AddTenant />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-tenant/:id"
          element={
            <ProtectedRoute allowedRoles={['admin', 'owner']}>
              <Edittenant />
            </ProtectedRoute>
          }
        /> */}

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
