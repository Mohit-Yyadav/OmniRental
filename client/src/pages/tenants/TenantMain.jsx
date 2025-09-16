import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Dashboard from './TenantDashboard';
import Profile from './Profile';
import Property from './Property';
import Payments from './Payments';
import Requests from './Requests';
import History from './History';
import RazorpayCheckout from './RazorpayCheckout';
import useAuth from '../../context/useAuth';

const { Content } = Layout;

const TenantMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // ✅ mobile state
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [notifications, setNotifications] = useState([]); // ✅ FIX: added notifications state

  const { user, logout } = useAuth();

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

  const handleLogout = () => logout();

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
      {/* ✅ Sidebar works for both desktop & mobile */}
      <Sidebar
      className='tenant-sidebar'
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        handleMenuClick={(e) => setActiveMenu(e.key)}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        
      />

      <Layout>
        {/* ✅ Navbar passes mobile toggle */}
        <Navbar 
  collapsed={collapsed}
  setCollapsed={setCollapsed}
  notifications={notifications}
  user={user}
  onLogout={handleLogout}
  onToggleMobile={() => setMobileOpen(prev => !prev)} // toggle mobile sidebar
/>


        {/* Main Content */}
        <Content
          className="site-content"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            padding: '16px',
          }}
        >
          {renderPageContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TenantMain;
