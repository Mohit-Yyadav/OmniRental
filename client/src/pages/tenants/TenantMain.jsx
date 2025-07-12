// src/pages/TenantMain.jsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './TenantDashboard'; // example content component
import Profile from './Profile';
import Property from './Property';
import Payments from './Payments';
import Requests from './Requests';
import History from './History';
import './TenantDashboard.css';

const { Content } = Layout;

const TenantMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const tenantProfile = {
    name: 'John Doe',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  const notifications = [
    { id: 1, title: 'Payment Reminder', read: false },
    { id: 2, title: 'Lease Ending Soon', read: true },
  ];

  const handleLogout = () => {
    console.log('Logged out');
    // Add logout logic (clear auth, redirect, etc.)
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
          user={tenantProfile}
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
