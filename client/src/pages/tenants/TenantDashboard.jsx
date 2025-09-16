// src/pages/tenants/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Card, Button, Progress, Table, Tag, Row, Col, Spin, message } from "antd";
import axios from "axios";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Example: Replace with your backend API routes
        const { data: property } = await axios.get("/api/tenant/property");
        const { data: requests } = await axios.get("/api/tenant/requests");
        const { data: notes } = await axios.get("/api/tenant/notifications");

        setPropertyDetails(property);
        setPendingRequests(requests);
        setNotifications(notes);
      } catch (error) {
        console.error(error);
        message.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const requestColumns = [
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "pending"
              ? "orange"
              : status === "processing"
              ? "blue"
              : "green"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
  ];

  if (loading) return <Spin size="large" style={{ display: "block", margin: "100px auto" }} />;

  return (
    <div className="dashboard-content">
      <h2>Tenant Dashboard</h2>

      <Row gutter={[16, 16]}>
        {/* Rent Status */}
        <Col xs={24} md={12} lg={8}>
          <Card title="Rent Status" className="dashboard-card">
            <div className="rent-status" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <Progress type="circle" percent={100} status="success" format={() => "Paid"} />
              <div className="rent-info">
                <p>
                  Next Payment Due:{" "}
                  <strong>{propertyDetails?.nextDueDate || "N/A"}</strong>
                </p>
                <p>
                  Amount:{" "}
                  <strong>₹{propertyDetails?.rentAmount?.toLocaleString()}</strong>
                </p>
                <Button type="primary">Pay Now</Button>
              </div>
            </div>
          </Card>
        </Col>

        {/* Property Summary */}
        <Col xs={24} md={12} lg={8}>
          <Card title="Property Summary" className="dashboard-card">
            <p>
              <strong>Property:</strong> {propertyDetails?.propertyName}
            </p>
            <p>
              <strong>Room:</strong> {propertyDetails?.roomNumber}
            </p>
            <p>
              <strong>Address:</strong> {propertyDetails?.address}
            </p>
            <p>
              <strong>Lease:</strong> {propertyDetails?.leaseStart} → {propertyDetails?.leaseEnd}
            </p>
          </Card>
        </Col>

        {/* Pending Requests */}
        <Col xs={24} lg={8}>
          <Card title="Pending Requests" className="dashboard-card">
            <Table
              dataSource={pendingRequests}
              columns={requestColumns}
              rowKey="id"
              size="small"
              pagination={false}
            />
          </Card>
        </Col>

        {/* Notifications */}
        <Col xs={24}>
          <Card title="Notifications" className="dashboard-card">
            <div className="notifications-list">
              {notifications.length ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${!notification.read ? "unread" : ""}`}
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #f0f0f0",
                      background: !notification.read ? "#f6f9ff" : "transparent",
                    }}
                  >
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <small>{notification.date}</small>
                  </div>
                ))
              ) : (
                <p>No notifications</p>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
