import Dashboard from '../pages/admin/Dashboard';
import TenantList from '../Pages/admin/TenantList';
import AddTenant from '../pages/admin/AddTenant';
import Edittenant from '../pages/admin/Edittenant';

const adminRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/list-tenants', element: <TenantList /> },
  { path: '/add-tenant', element: <AddTenant /> },
  { path: '/edit-tenant/:id', element: <Edittenant /> },
];

export default adminRoutes;
