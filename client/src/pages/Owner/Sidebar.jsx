// src/components/OwnerSidebar.jsx
import React from 'react';
import {
  DashboardOutlined,
  PropertySafetyOutlined,
  TeamOutlined,
  WalletOutlined,
  ToolOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Tooltip, Badge } from 'antd';
import './OwnerDashboard.css';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const OwnerSidebar = ({ 
  collapsed, 
  setCollapsed, 
  activeMenu, 
  handleMenuClick,
  pendingRequestsCount = 0 
}) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: collapsed ? (
        <Tooltip title="Dashboard Overview" placement="right">
          <DashboardOutlined />
        </Tooltip>
      ) : (
        'Dashboard'
      ),
    },
    {
      key: 'properties',
      icon: <PropertySafetyOutlined />,
      label: collapsed ? (
        <Tooltip title="My Properties" placement="right">
          <PropertySafetyOutlined />
        </Tooltip>
      ) : (
        'My Properties'
      ),
    },
    {
      key: 'tenants',
      icon: <TeamOutlined />,
      label: collapsed ? (
        <Tooltip title="Tenant Management" placement="right">
          <TeamOutlined />
        </Tooltip>
      ) : (
        'Tenants'
      ),
    },
    {
      key: 'financials',
      icon: <WalletOutlined />,
      label: collapsed ? (
        <Tooltip title="Financial Reports" placement="right">
          <WalletOutlined />
        </Tooltip>
      ) : (
        'Financials'
      ),
    },
    {
      key: 'requests',
      icon: (
        <Badge count={pendingRequestsCount} size="small" offset={[-5, 5]}>
          <ToolOutlined />
        </Badge>
      ),
      label: collapsed ? (
        <Tooltip title="Maintenance Requests" placement="right">
          <Badge count={pendingRequestsCount} size="small" offset={[-5, 5]}>
            <ToolOutlined />
          </Badge>
        </Tooltip>
      ) : (
        <span>
          Maintenance
          {pendingRequestsCount > 0 && (
            <Badge 
              count={pendingRequestsCount} 
              size="small" 
              style={{ marginLeft: 8 }} 
            />
          )}
        </span>
      ),
    },
    {
      key: 'reports',
      icon: <PieChartOutlined />,
      label: collapsed ? (
        <Tooltip title="Analytics & Reports" placement="right">
          <PieChartOutlined />
        </Tooltip>
      ) : (
        'Reports'
      ),
    },
    {
      key: 'documents',
      icon: <FileTextOutlined />,
      label: collapsed ? (
        <Tooltip title="Lease Documents" placement="right">
          <FileTextOutlined />
        </Tooltip>
      ) : (
        'Documents'
      ),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: collapsed ? (
        <Tooltip title="Account Settings" placement="right">
          <SettingOutlined />
        </Tooltip>
      ) : (
        'Settings'
      ),
    }
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={240}
      className="owner-sidebar"
      breakpoint="lg"
    >
      <div className="owner-logo-container">
        <Link to="/owner" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <PropertySafetyOutlined className="owner-logo-icon" />
          {!collapsed && (
            <h2 className="owner-logo-text">
              Omni<span className="logo-highlight">Owner</span>
            </h2>
          )}
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeMenu]}
        onClick={handleMenuClick}
        className="owner-sidebar-menu"
        items={menuItems}
      />
    </Sider>
  );
};

export default OwnerSidebar;