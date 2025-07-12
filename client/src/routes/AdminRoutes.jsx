import Dashboard from '../pages/admin/Dashboard';
import TenantList from '../Pages/admin/TenantList';
import AddTenant from '../pages/admin/AddTenant';
import Edittenant from '../pages/admin/Edittenant';
import OwnerProfile from '../pages/admin/ownerProfile';
import OwnerForm from '../pages/admin/OwnerForm';
const adminRoutes = [
  { path: '/owner/dashboard', element: <Dashboard /> },
  { path: '/owner/list-tenants', element: <TenantList /> },
  { path: '/owner/add-tenant', element: <AddTenant /> },
  { path: '/owner/edit-tenant/:id', element: <Edittenant /> },
  { path: '/owner/my-profile', element: <OwnerProfile /> },
  { path: '/owner/edit-profile', element: <OwnerForm /> },
];

export default adminRoutes;
