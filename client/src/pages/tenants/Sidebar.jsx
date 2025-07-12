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
import { Layout, Menu, Tooltip } from 'antd';
import './TenantDashboard.css';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed, activeMenu, handleMenuClick }) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
    },
    {
      key: 'property',
      icon: <HomeOutlined />,
      label: 'Property Details',
    },
    {
      key: 'payments',
      icon: <DollarOutlined />,
      label: 'Payments',
    },
    {
      key: 'requests',
      icon: <EditOutlined />,
      label: 'My Requests',
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: 'Rental History',
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={220}
      className="custom-sidebar"
    >
      <div className="logo-container">
        <img
          src="/logo192.png"
          alt="logo"
          className="logo-img"
          style={{ width: collapsed ? 36 : 120, transition: 'width 0.3s' }}
        />
        {!collapsed && <h2 className="logo-text">Rental Portal</h2>}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeMenu]}
        onClick={handleMenuClick}
        className="sidebar-menu"
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon} className="sidebar-menu-item">
            {collapsed ? (
              <Tooltip title={item.label} placement="right">
                {item.icon}
              </Tooltip>
            ) : (
              item.label
            )}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
