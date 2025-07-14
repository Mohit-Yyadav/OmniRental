// src/components/OwnerNavbar.jsx
import React from 'react';
import { 
  BellOutlined, 
  LogoutOutlined, 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  DashboardOutlined,
  PropertySafetyOutlined,
  SettingOutlined 
} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

import { Layout, Avatar, Badge, Button, Tooltip, Dropdown, Menu } from 'antd';
import './OwnerDashboard.css';

const { Header } = Layout;

const OwnerNavbar = ({
  collapsed,
  setCollapsed,
  notifications = [],
  user = {},
  onLogout = () => {}
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        My Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Account Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="owner-site-header">
      <div className="header-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="menu-toggle"
        />
        <div className="header-brand">
          <PropertySafetyOutlined className="brand-icon" />
          <h1 className="dashboard-title">Property Owner Portal</h1>
        </div>
      </div>

      <div className="header-right">
        <Tooltip title="Quick View">
          <Button 
            type="text" 
            icon={<DashboardOutlined />} 
            className="quick-view-btn"
          />
        </Tooltip>

        <Tooltip title="Notifications">
          <Badge count={unreadCount} offset={[-5, 5]}>
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              size="large" 
              className="notif-btn"
            />
          </Badge>
        </Tooltip>

        <Dropdown overlay={menu} trigger={['click']}>
          <div className="owner-user-info">
            <Avatar 
              src={user?.profilePic} 
              className="owner-avatar"
              size="large"
            />
            <div className="owner-user-details">
              <span className="user-name">{user?.username || 'Owner'}</span>
              <span className="user-role">Property Owner</span>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default OwnerNavbar;