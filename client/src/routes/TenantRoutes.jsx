import TenantDashboard from '../pages/admin/TenantDashboard';
import TenantProfile from '../components/tenants/TenantProfile';

const tenantRoutes = [
  { path: '/tenant/dashboard', element: <TenantDashboard /> },
  { path: '/tenant/profile', element: <TenantProfile /> },
];

export default tenantRoutes;