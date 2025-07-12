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
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
