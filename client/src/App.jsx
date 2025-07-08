import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth Components
import Login from './components/Login';
import Register from './components/Register';

// Dashboard Components
import Dashboard from './components/Dashboard';
import TenantList from './components/TenantList';
import AddTenant from './components/AddTenant';
import Edittenant from './components/Edittenant'; // Note: filename is Edittenant.jsx (with two 't's)

// Auth Route
import AuthRoute from './components/AuthRoute';

// Tenant Components
import TenantSignup from './components/TenantSignup';
import TenantDashboard from './pages/TenantDashboard';
import TenantProfile from "./components/TenantProfile";  // Most likely correct

// Public Pages
import Home from './pages/Home';
import Properties from './pages/Properties';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PropertyDetail from './pages/PropertyDetail';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/Dashboard.css';

function App() {
  return (
  
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
        <Route 
          path="/tenant/dashboard" 
          element={
            <AuthRoute allowedRoles={['tenant']}>
              <TenantDashboard />
            </AuthRoute>
          } 
        />
        <Route 
          path="/tenant/profile" 
          element={
            <AuthRoute allowedRoles={['tenant']}>
              <TenantProfile />
            </AuthRoute>
          } 
        />

        {/* Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthRoute allowedRoles={['admin', 'owner']}>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="/tenants"
          element={
            <AuthRoute allowedRoles={['admin', 'owner']}>
              <TenantList />
            </AuthRoute>
          }
        />
        <Route
          path="/add-tenant"
          element={
            <AuthRoute allowedRoles={['admin', 'owner']}>
              <AddTenant />
            </AuthRoute>
          }
        />
        <Route
          path="/edit-tenant/:id"
          element={
            <AuthRoute allowedRoles={['admin', 'owner']}>
              <Edittenant />
            </AuthRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
 
  );
}

export default App;