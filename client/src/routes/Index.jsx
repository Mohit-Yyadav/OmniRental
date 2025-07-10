import { Routes, Route, Navigate } from 'react-router-dom';
import publicRoutes from './PublicRoutes';
import tenantRoutes from './TenantRoutes';
import adminRoutes from './adminRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {/* Tenant Routes */}
      {tenantRoutes.map((route, index) => (
        <Route key={`tenant-${index}`} path={route.path} element={route.element} />
      ))}

      {/* Admin Routes */}
      {adminRoutes.map((route, index) => (
        <Route key={`admin-${index}`} path={route.path} element={route.element} />
      ))}

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
