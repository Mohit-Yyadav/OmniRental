// src/pages/TenantMain.jsx
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
//import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './TenantDashboard';
import Profile from './Profile';
import Property from './Property';
import Payments from './Payments';
import Requests from './Requests';
import History from './History';
import './TenantDashboard.css';
import useAuth from '../../context/useAuth'; // ✅
import RazorpayCheckout from './RazorpayCheckout';

const { Content } = Layout;

const TenantMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // const location = useLocation();
  const { user, logout } = useAuth();

  // ✅ Redirect to Payments if ?payment=true is in URL
useEffect(() => {
  const switchToPayments = () => setActiveMenu('payments');
  const switchToRazorpay = () => setActiveMenu('razorpay');

  window.addEventListener('switchToPayments', switchToPayments);
  window.addEventListener('switchToRazorpay', switchToRazorpay);

  return () => {
    window.removeEventListener('switchToPayments', switchToPayments);
    window.removeEventListener('switchToRazorpay', switchToRazorpay);
  };
}, []);




  const notifications = [
    { id: 1, title: 'Payment Reminder', read: false },
    { id: 2, title: 'Lease Ending Soon', read: true },
  ];

  const handleLogout = () => {
    logout();
  };

  const renderPageContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <Dashboard />;
      case 'profile': return <Profile />;
      case 'property': return <Property />;
      case 'payments': return <Payments />;
      case 'requests': return <Requests />;
      case 'history': return <History />;
      case 'razorpay': return <RazorpayCheckout />;

      default: return <h2>404 - Page Not Found</h2>;
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
          user={user}
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
