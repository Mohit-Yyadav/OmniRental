// src/pages/TenantMain.jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './TenantDashboard';
import Profile from './Profile';
import Property from './Property';
import Payments from './Payments';
import Requests from './Requests';
import History from './History';
import './TenantDashboard.css';
 import useAuth from '../../context/useAuth';// ✅

const { Content } = Layout;

const TenantMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // ✅ Get user and logout function from context
  const { user, logout } = useAuth();

  const notifications = [
    { id: 1, title: 'Payment Reminder', read: false },
    { id: 2, title: 'Lease Ending Soon', read: true },
  ];

  const handleLogout = () => {
    logout(); // ✅ Call logout from context
  };

  const renderPageContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <Profile />;
      case 'property':
        return <Property />;
      case 'payments':
        return <Payments />;
      case 'requests':
        return <Requests />;
      case 'history':
        return <History />;
      default:
        return <h2>404 - Page Not Found</h2>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        
        handleMenuClick={(e) => setActiveMenu(e.key)}
      />
      <Layout>
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={user} // ✅ Pass actual logged-in user data
          notifications={notifications}
          onLogout={handleLogout}
        />
        <Content className="site-content">
          {renderPageContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TenantMain;
