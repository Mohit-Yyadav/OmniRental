// src/components/OwnerNavbar.jsx
import React from "react";
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  PropertySafetyOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Avatar, Badge, Button, Tooltip, Dropdown, Menu } from "antd";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;
const { Header } = Layout;

const OwnerNavbar = ({
  collapsed,
  setCollapsed,
  setMobileOpen,
  notifications = [],
  user = {},
  onLogout = () => {},
  setActiveMenu = () => {},
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const menu = (
    <Menu className="owner-navbar__dropdown-menu">
      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => setActiveMenu("profile")}
      >
        My Profile
      </Menu.Item>

      <Menu.Item
        key="settings"
        icon={<SettingOutlined />}
        onClick={() => setActiveMenu("settings")}
      >
        Account Settings
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={onLogout}
        className="owner-navbar__logout-item"
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={`owner-navbar ${collapsed ? "collapsed" : ""} `}>
      <div className="owner-navbar__left">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => {
            if (window.innerWidth < 992) {
              if (typeof setMobileOpen === "function") {
                setMobileOpen((prev) => !prev); // toggle mobile sidebar
              }
            } else {
              setCollapsed(!collapsed);
            }
          }}
          className="owner-navbar__toggle-btn  "
        />
        <div className="owner-navbar__brand">
          <PropertySafetyOutlined className="owner-navbar__brand-icon" />
          <h1 className="owner-navbar__title">Owner Portal</h1>
        </div>
      </div>

      <div className="owner-navbar__right">
        <Tooltip title="Quick View">
          <Button
            type="text"
            icon={<DashboardOutlined />}
            className="owner-navbar__quick-view d-none d-md-block"
          />
        </Tooltip>

        <Tooltip title="Notifications">
          <Badge
            count={unreadCount}
            offset={[-5, 5]}
            className="owner-navbar__badge d-none d-md-block"
          >
            <Button
              type="text"
              icon={<BellOutlined />}
              size="large"
              className="owner-navbar__notifications-btn "
            />
          </Badge>
        </Tooltip>

        <Dropdown
          overlay={menu}
          trigger={["click"]}
          overlayClassName="owner-navbar__dropdown"
        >
          <div className="owner-navbar__user">
            <Avatar
              src={
                user?.profilePic
                  ? user.profilePic.startsWith("http")
                    ? user.profilePic
                    : `${BACKEND_URI}${user.profilePic}`
                  : null
              }
              size="large"
              className="owner-navbar__avatar"
              icon={!user?.profilePic ? <UserOutlined /> : null}
            />

            <div className="owner-navbar__user-info">
              <span className="owner-navbar__username">
                {user?.username || "Owner"}
              </span>
              <span className="owner-navbar__role d-none d-md-block">
                Property Owner
              </span>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default OwnerNavbar;
