// src/pages/OwnerMain.jsx
import React, { useState } from "react";
import { Layout } from "antd";
import OwnerSidebar from "./Sidebar";
import OwnerNavbar from "./Navbar";
import OwnerDashboard from "./Dashboard";
import OwnerProfile from "./Profile";
import TenantManagement from "./TenantManagement";
import Documents from "./Documents";
import Profile from "./Profile";
import Settings from "./Settings";
import MyProperties from "./MyProperties";
import Financials from "./Financials";
import Maintenance from "./Maintenance";
import Reports from "./Reports";
import BookingRequests from "./BookingRequests";
import "./OwnerDashboard.css"; // Changed from OwnerDashboard.css to OwnerMain.css
import useAuth from "../../context/useAuth";

const { Content } = Layout;

const OwnerMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const { user, logout } = useAuth();

  const notifications = [
    { id: 1, title: "Rent Payment Received", read: false },
    { id: 2, title: "Maintenance Request", read: true },
    { id: 3, title: "Lease Renewal Reminder", read: false },
    { id: 4, title: "New Tenant Application", read: false },
  ];

  const handleLogout = () => {
    logout();
  };

  const renderPageContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <OwnerDashboard />;
      case "booking-requests":
        return <BookingRequests />;
      case "tenants":
        return <TenantManagement />;

      case "documents":
        return <Documents />;

      case "settings":
        return <Settings />;
      case "properties":
        return <MyProperties />;
      case "financials":
        return <Financials />;
      case "requests":
        return <Maintenance />;
      case "reports":
        return <Reports />;
      case "profile":
        return <Profile />;

      default:
        return <h2 className="owner-main__not-found">404 - Page Not Found</h2>;
    }
  };

  return (
    <Layout className="owner-main__layout">
      <OwnerSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        pendingRequestsCount={
          notifications.filter(
            (n) => !n.read && n.title.includes("Maintenance")
          ).length
        }
        handleMenuClick={(e) => setActiveMenu(e.key)}
      />
      <Layout className="owner-main__content-layout">
        <OwnerNavbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          user={user}
          notifications={notifications}
          onLogout={handleLogout}
          setActiveMenu={setActiveMenu}
        />
        <Content className="owner-main__content">{renderPageContent()}</Content>
      </Layout>
    </Layout>
  );
};

export default OwnerMain;
