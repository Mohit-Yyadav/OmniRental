// src/pages/OwnerMain.jsx
import React, { useState } from "react";
import { Layout, Drawer } from "antd";
import OwnerSidebar from "./Sidebar";
import OwnerNavbar from "./Navbar";
import OwnerDashboard from "./Dashboard";
import OwnerProfile from "./Profile";
import TenantManagement from "./TenantManagement";
import Documents from "./Documents";
import Settings from "./Settings";
import MyProperties from "./MyProperties";
import Financials from "./Financials";
import Maintenance from "./Maintenance";
import Reports from "./Reports";
import Payments from "./Payments";
import BookingRequests from "./BookingRequests";
import "./OwnerDashboard.css";
import useAuth from "../../context/useAuth";

const { Content } = Layout;

const OwnerMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // 👈 for mobile drawer
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
        return <OwnerProfile />;
      case "payments":
        return <Payments />;
      default:
        return <h2 className="owner-main__not-found">404 - Page Not Found</h2>;
    }
  };

  return (
    <Layout className="owner-main__layout">
      {/* Desktop Sidebar */}
      <div className=" d-none d-lg-block owner-sidebar-desktop">
        <OwnerSidebar
          className="owner-sidebar"
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
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <Drawer
        placement="left"
        closable={true}
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        bodyStyle={{ padding: 0 }}
        width={230} 
      >
        <OwnerSidebar
          className="owner-sidebar"
          collapsed={false} // Drawer always full width
          setCollapsed={setCollapsed}
          activeMenu={activeMenu}
          pendingRequestsCount={
            notifications.filter(
              (n) => !n.read && n.title.includes("Maintenance")
            ).length
          }
          handleMenuClick={(e) => {
            setActiveMenu(e.key);
            setMobileOpen(false); // close drawer on click
          }}
        />
      </Drawer>

      {/* Main Layout */}
      <Layout className="owner-main__content-layout">
        <OwnerNavbar
          className="owner-navbar"
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}  // 👈 pass here
          user={user}
          notifications={notifications}
          onLogout={handleLogout}
          setActiveMenu={setActiveMenu}
        />
        <Content 
  className="owner-main__content" 
  style={{ width: "100%" }}
>
  {renderPageContent()}
</Content>

      </Layout>
    </Layout>
  );
};

export default OwnerMain;
