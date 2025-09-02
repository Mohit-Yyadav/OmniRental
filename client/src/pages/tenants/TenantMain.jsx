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
  const [mobileOpen, setMobileOpen] = useState(false); // ✅ Mobile overlay state
  
  const [activeMenu, setActiveMenu] = useState('dashboard');
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
      {/* Desktop Sidebar */}
      <div className="d-none d-lg-block">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeMenu={activeMenu}
          handleMenuClick={(e) => setActiveMenu(e.key)}
          mobileOpen={false}
          setMobileOpen={() => {}}
        />
      </div>
       {/* Mobile Sidebar only */}
<div className="d-lg-none">
  <Sidebar
    collapsed={collapsed}
    setCollapsed={setCollapsed}
    activeMenu={activeMenu}
    handleMenuClick={(e) => {
      setActiveMenu(e.key);
      setMobileOpen(false); // close drawer after menu click
    }}
    mobileOpen={mobileOpen}
    setMobileOpen={setMobileOpen}
    style={{ zIndex: 2000, position: "fixed", top: 0, left: 0 }} // ✅ Sidebar always on top
  />
</div>



      <Layout>
        {/* Navbar */}
        <Navbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={user}
          onLogout={handleLogout}
          onToggleMobile={() => setMobileOpen(true)}
        />

       
        {/* Main Content */}
        <Content
          className="site-content"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
          }}
        >
         {/* Mobile view */}
<div
  className="d-lg-none"
  style={{
    position: 'fixed',
    top: '56px', // navbar height
    left: 0,
    width: '100%',
    height: `calc(100% - 56px)`,
    overflowY: 'auto',
    zIndex: 0, // ✅ Content stays behind sidebar
    backgroundColor: '#f8f9fa',
    padding: '16px',
  }}
>
  {renderPageContent()}
</div>


          {/* Desktop view */}
          <div className="d-none d-lg-block" style={{ padding: '16px' }}>
            {renderPageContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TenantMain;
