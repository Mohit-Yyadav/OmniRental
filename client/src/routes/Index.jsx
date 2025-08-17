import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../context/ProtectedRoute'; // ✅ No curly braces
import publicRoutes from './PublicRoutes';
import tenantRoutes from './TenantRoutes';
import adminRoutes from './AdminRoutes';

const renderNestedRoutes = (routes, requiredRole = null) => {
  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        requiredRole ? (
          <ProtectedRoute roles={[requiredRole]}>
            {route.element}
          </ProtectedRoute>
        ) : (
          route.element
        )
      }
    >
      {route.children?.map((child) => (
        <Route
          key={child.path || 'index'}
          index={child.index}
          path={child.path}
          element={
            requiredRole ? (
              <ProtectedRoute roles={[requiredRole]}>
                {child.element}
              </ProtectedRoute>
            ) : (
              child.element
            )
          }
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
      
      {/* Tenant Routes - Protected */}
      {renderNestedRoutes(tenantRoutes, 'tenant')}
      
      {/* Admin/Owner Routes - Protected */}
      {renderNestedRoutes(adminRoutes, 'owner')}
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;