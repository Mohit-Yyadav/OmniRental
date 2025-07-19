// src/components/Navbar.jsx
import React from 'react';
import { BellOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Avatar, Badge, Button, Tooltip } from 'antd';
import './TenantDashboard.css'; // Optional, style provided below

const { Header } = Layout;

const Navbar = ({
  collapsed,
  setCollapsed,
  notifications = [],
  user = {},
  onLogout = () => {}
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    
    <Header className="site-header">
      <div className="header-left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="menu-toggle"
        />
        <h1 className="dashboard-title">Tenant Portal</h1>
      </div>

      <div className="header-right">
        <Tooltip title="Notifications">
          <Badge count={unreadCount}>
            <Button type="text" icon={<BellOutlined />} size="large" />
          </Badge>
        </Tooltip>

        <div className="user-info">
<Avatar
  size={40}
  src={
    user?.profilePic?.startsWith('http')
      ? user.profilePic
      : user?.profilePic
      ? `http://localhost:5000${user.profilePic}`
      : 'https://randomuser.me/api/portraits/men/1.jpg'
  }
/>



<span className="user-name">{user?.name || user?.username}</span>
 {/* ✅ Fixed */}
</div>



        <Tooltip title="Logout">
          <Button type="text" icon={<LogoutOutlined />} onClick={onLogout} />
        </Tooltip>
      </div>
    </Header>
  );
};

export default Navbar;
