// src/components/Sidebar.jsx
import React, { useEffect, useState } from 'react';
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
  mobileOpen,
  setMobileOpen,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setMobileOpen]);

  // Sidebar menu items
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: collapsed ? <Tooltip title="Dashboard"><DashboardOutlined /></Tooltip> : 'Dashboard',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: collapsed ? <Tooltip title="My Profile"><UserOutlined /></Tooltip> : 'My Profile',
    },
    {
      key: 'property',
      icon: <HomeOutlined />,
      label: collapsed ? <Tooltip title="Property Details"><HomeOutlined /></Tooltip> : 'Property Details',
    },
    {
      key: 'payments',
      icon: <DollarOutlined />,
      label: collapsed ? <Tooltip title="Payments"><DollarOutlined /></Tooltip> : 'Payments',
    },
    {
      key: 'requests',
      icon: <EditOutlined />,
      label: collapsed ? <Tooltip title="My Requests"><EditOutlined /></Tooltip> : 'My Requests',
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: collapsed ? <Tooltip title="Rental History"><HistoryOutlined /></Tooltip> : 'Rental History',
    },
  ];

  // Sidebar content (logo + menu)
  const SidebarContent = (
    <>
      <div className="logo-container">
        <Link to="/">
          <img
            src="../../assets/images/infinity.png"
            alt="logo"
            className="logo-img"
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
          if (mobileOpen) setMobileOpen(false);
        }}
        items={menuItems}
      />
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={220}
          className="custom-sidebar"
        >
          {SidebarContent}
        </Sider>
      )}

      {/* Mobile Drawer Sidebar */}
      {isMobile && (
      <Drawer
  placement="left"
  closable={false}
  mask
  onClose={() => setMobileOpen(false)}
  open={mobileOpen}
  drawerStyle={{ backgroundColor: '#001529', maxWidth: 220 }}
  width={220}
  zIndex={2000}
>
  {SidebarContent}
</Drawer>

      )}
    </>
  );
};

export default Sidebar;
