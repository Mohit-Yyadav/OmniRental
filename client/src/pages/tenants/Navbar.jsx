// src/components/Navbar.jsx
import React from 'react';
import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Avatar, Badge, Button, Tooltip, Dropdown, Menu } from 'antd';
import './TenantDashboard.css';

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;
const { Header } = Layout;

const Navbar = ({
  collapsed,
  setCollapsed,
  notifications = [],
  user = {},
  onLogout = () => {},
  onToggleMobile // mobile toggle function
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-header">
      <div className="header-left">
        {/* Sidebar toggle */}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => {
            // Detect mobile by window width
            if (window.innerWidth < 992 && onToggleMobile) {
              onToggleMobile(); // toggle drawer
            } else {
              setCollapsed(!collapsed); // toggle desktop collapse
            }
          }}
          className="menu-toggle"
        />
        <h1 className="dashboard-title">Tenant Portal</h1>
      </div>

      <div className="header-right">
        {/* Notifications */}
        <Tooltip title="Notifications">
          <Badge count={unreadCount}>
            <Button type="text" icon={<BellOutlined />} size="large" />
          </Badge>
        </Tooltip>

        {/* User dropdown */}
        <Dropdown overlay={userMenu} placement="bottomRight">
          <div className="user-info" style={{ cursor: 'pointer' }}>
            <Avatar
              size={40}
              icon={!user?.profilePic && <UserOutlined />}
              src={
                user?.profilePic
                  ? user.profilePic.startsWith('http')
                    ? user.profilePic
                    : `${BACKEND_URI}${user.profilePic}`
                  : null
              }
            />
            <span className="user-name">{user?.name || user?.username || 'Guest'}</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;
