import TenantDashboard from '../pages/tenants/TenantDashboard';
import TenantProfile from '../pages/tenants/TenantProfile';
import TenantHistory from '../pages/tenants/RentalHistory';
const tenantRoutes = [
  { path: '/tenant/dashboard', element: <TenantDashboard /> },
  { path: '/tenant/profile', element: <TenantProfile /> },
  {path: '/tenant/history', element: <TenantHistory />},
];

export default tenantRoutes;