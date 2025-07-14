// src/pages/OwnerMain.jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import OwnerSidebar from './Sidebar';
import OwnerNavbar from './Navbar';
import OwnerDashboard from './Dashboard';
import OwnerProfile from './Profile';
import Portfolio from './Portfolio';
import Revenue from './Revenue';
import TenantManagement from './TenantManagement';
import MaintenanceCenter from './MaintenanceCenter';
import Documents from './Documents';
import Analytics from './Analytics';
import Settings from './Settings';
import './OwnerDashboard.css';
import useAuth from '../../context/useAuth';

const { Content } = Layout;

const OwnerMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const { user, logout } = useAuth();

  const notifications = [
    { id: 1, title: 'Rent Payment Received', read: false },
    { id: 2, title: 'Maintenance Request', read: true },
    { id: 3, title: 'Lease Renewal Reminder', read: false },
    { id: 4, title: 'New Tenant Application', read: false },
  ];

  const handleLogout = () => {
    logout();
  };

  const renderPageContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <OwnerDashboard />;
      case 'profile':
        return <OwnerProfile />;
      case 'portfolio':
        return <Portfolio />;
      case 'revenue':
        return <Revenue />;
      case 'tenants':
        return <TenantManagement />;
      case 'maintenance':
        return <MaintenanceCenter />;
      case 'documents':
        return <Documents />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <h2>404 - Page Not Found</h2>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <OwnerSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        pendingRequestsCount={notifications.filter(n => !n.read && n.title.includes('Maintenance')).length}
        handleMenuClick={(e) => setActiveMenu(e.key)}
      />
      <Layout>
        <OwnerNavbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={user}
          notifications={notifications}
          onLogout={handleLogout}
        />
        <Content className="owner-site-content">
          {renderPageContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerMain;