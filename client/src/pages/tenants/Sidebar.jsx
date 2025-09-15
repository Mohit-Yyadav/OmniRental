// src/components/Sidebar.jsx
import React from 'react';
import {
  DashboardOutlined,
  HomeOutlined,
  EditOutlined,
  DollarOutlined,
  HistoryOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Tooltip, Drawer } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({
  collapsed,
  setCollapsed,
  activeMenu,
  handleMenuClick,
  mobileOpen,       // ✅ mobile Drawer open state
  setMobileOpen,    // ✅ function to close mobile Drawer
}) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: collapsed ? (
        <Tooltip title="Dashboard" placement="right">
          <DashboardOutlined />
        </Tooltip>
      ) : (
        'Dashboard'
      ),
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: collapsed ? (
        <Tooltip title="My Profile" placement="right">
          <UserOutlined />
        </Tooltip>
      ) : (
        'My Profile'
      ),
    },
    {
      key: 'property',
      icon: <HomeOutlined />,
      label: collapsed ? (
        <Tooltip title="Property Details" placement="right">
          <HomeOutlined />
        </Tooltip>
      ) : (
        'Property Details'
      ),
    },
    {
      key: 'payments',
      icon: <DollarOutlined />,
      label: collapsed ? (
        <Tooltip title="Payments" placement="right">
          <DollarOutlined />
        </Tooltip>
      ) : (
        'Payments'
      ),
    },
    {
      key: 'requests',
      icon: <EditOutlined />,
      label: collapsed ? (
        <Tooltip title="My Requests" placement="right">
          <EditOutlined />
        </Tooltip>
      ) : (
        'My Requests'
      ),
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: collapsed ? (
        <Tooltip title="Rental History" placement="right">
          <HistoryOutlined />
        </Tooltip>
      ) : (
        'Rental History'
      ),
    },
  ];

  // Sidebar content (menu + logo)
  const SidebarContent = (
    <>
      <div className="logo-container" style={{ padding: '16px', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
          <img
            src="../../assets/images/OmniRentalwhitetext.png"
            alt="logo"
            style={{ width: collapsed ? 36 : 120, transition: 'width 0.3s' }}
          />
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeMenu]}
        onClick={(e) => {
          handleMenuClick(e);
          if (mobileOpen) setMobileOpen(false); // close drawer on mobile click
        }}
        items={menuItems}
      />
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="d-none d-lg-block">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={220}
          style={{ minHeight: '100vh' }}
        >
          {SidebarContent}
        </Sider>
      </div>

      <Drawer
  placement="left"
  closable={true}
  mask={false}   // overlay background हटाने के लिए
  onClose={() => setMobileOpen(false)}
  open={mobileOpen}
  // bodyStyle={{ padding: 0, minHeight: '100vh' }}
  drawerStyle={{ backgroundColor: '#001529' }}
  width={220}
  zIndex={1} // content से पीछे रखने के लिए
  style={{ position: 'fixed' }} // sidebar fix रहेगा
>
        {SidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
