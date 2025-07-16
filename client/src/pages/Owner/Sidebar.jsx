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
      icon: <DashboardOutlined className="owner-sidebar__menu-icon" />,
      label: collapsed ? (
        <Tooltip title="Dashboard Overview" placement="right">
          <DashboardOutlined className="owner-sidebar__menu-icon" />
        </Tooltip>
      ) : (
        'Dashboard'
      ),
    },
    {
      key: 'properties',
      icon: <PropertySafetyOutlined className="owner-sidebar__menu-icon" />,
      label: collapsed ? (
        <Tooltip title="My Properties" placement="right">
          <PropertySafetyOutlined className="owner-sidebar__menu-icon" />
        </Tooltip>
      ) : (
        'My Properties'
      ),
    },
     {
      key: 'booking-requests',
      icon: <PropertySafetyOutlined className="owner-sidebar__menu-icon" />,
      label: collapsed ? (
        <Tooltip title="Booking Requests" placement="right">
          <PropertySafetyOutlined className="owner-sidebar__menu-icon" />
        </Tooltip>
      ) : (
        'Booking Requests'
      ),
      
    },
    {
      key: 'tenants',
      icon: <TeamOutlined className="owner-sidebar__menu-icon" />,
      label: collapsed ? (
        <Tooltip title="Tenant Management" placement="right">
          <TeamOutlined className="owner-sidebar__menu-icon" />
        </Tooltip>
      ) : (
        'Tenants'
      ),
    },
    {
      key: 'financials',
      icon: <WalletOutlined className="owner-sidebar__menu-icon" />,
      label: collapsed ? (
        <Tooltip title="Financial Reports" placement="right">
          <WalletOutlined className="owner-sidebar__menu-icon" />
        </Tooltip>
      ) : (
        'Financials'
      ),
    },
    {
      key: 'requests',
      icon: (
        <Badge count={pendingRequestsCount} size="small" offset={[-5, 5]}>
          <ToolOutlined className="owner-sidebar__menu-icon" />
        </Badge>
      ),
      label: collapsed ? (
        <Tooltip title="Maintenance Requests" placement="right">
          <Badge count={pendingRequestsCount} size="small" offset={[-5, 5]}>
            <ToolOutlined className="owner-sidebar__menu-icon" />
          </Badge>
        </Tooltip>
      ) : (
        <span className="owner-sidebar__menu-label">
          Maintenance
          {pendingRequestsCount > 0 && (
            <Badge 
              count={pendingRequestsCount} 
              size="small" 
              className="owner-sidebar__badge"
            />
          )}
        </span>
      ),
    },
    {
      key: 'reports',
      icon: <PieChartOutlined className="owner-sidebar__menu-icon" />,
      label: collapsed ? (
        <Tooltip title="Analytics & Reports" placement="right">
          <PieChartOutlined className="owner-sidebar__menu-icon" />
        </Tooltip>
      ) : (
        'Reports'
      ),
    },
    {
      key: 'documents',
      icon: <FileTextOutlined className="owner-sidebar__menu-icon" />,
      label: collapsed ? (
        <Tooltip title="Lease Documents" placement="right">
          <FileTextOutlined className="owner-sidebar__menu-icon" />
        </Tooltip>
      ) : (
        'Documents'
      ),
    },
    {
      key: 'settings',
      icon: <SettingOutlined className="owner-sidebar__menu-icon" />,
      label: collapsed ? (
        <Tooltip title="Account Settings" placement="right">
          <SettingOutlined className="owner-sidebar__menu-icon" />
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
      collapsedWidth={80}
    >
      <div className="owner-sidebar__logo">
        <Link to="/owner" className="owner-sidebar__logo-link">
          <PropertySafetyOutlined className="owner-sidebar__logo-icon" />
          {!collapsed && (
            <h2 className="owner-sidebar__logo-text">
              Omni<span className="owner-sidebar__logo-highlight">Owner</span>
            </h2>
          )}
        </Link>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeMenu]}
        onClick={handleMenuClick}
        className="owner-sidebar__menu"
        items={menuItems}
      />
    </Sider>
  );
};

export default OwnerSidebar;