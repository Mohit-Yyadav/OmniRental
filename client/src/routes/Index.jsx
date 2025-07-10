// src/routes/AppRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import publicRoutes from './PublicRoutes';
import tenantRoutes from './TenantRoutes';
import adminRoutes from './AdminRoutes';

const renderNestedRoutes = (routes) => {
  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={route.element}
    >
      {/* Render child routes if they exist */}
      {route.children?.map((child) => (
        <Route
          key={child.path || 'index'}
          index={child.index}
          path={child.path}
          element={child.element}
        />
      ))}
    </Route>
  ));
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {renderNestedRoutes(publicRoutes)}
      
      {/* Tenant Routes - Now accessible to everyone */}
      {renderNestedRoutes(tenantRoutes)}
      
      {/* Admin/Owner Routes - Now accessible to everyone */}
      {renderNestedRoutes(adminRoutes)}
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;