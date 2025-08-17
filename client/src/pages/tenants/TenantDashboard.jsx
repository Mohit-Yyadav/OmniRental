// src/pages/tenants/Dashboard.jsx
import React from 'react';
import { Card, Button, Progress, Table, Tag } from 'antd';

const Dashboard = () => {
  const propertyDetails = {
    propertyName: 'Sunshine Apartments',
    roomNumber: '304',
    address: '456 Sunshine Ave, New York, NY 10002',
    rentAmount: 1200,
    leaseStart: '2023-01-15',
    leaseEnd: '2024-01-14',
    status: 'approved',
  };

  const pendingRequests = [
    {
      id: 1,
      type: 'Maintenance',
      date: '2024-06-15',
      status: 'pending',
      description: 'Kitchen sink is leaking',
    },
    {
      id: 2,
      type: 'Lease Extension',
      date: '2024-06-10',
      status: 'processing',
      description: 'Extend lease by 6 months',
    },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Rent Due Reminder',
      message: 'Your rent payment of $1200 is due in 3 days',
      date: '2024-06-28',
      read: false,
    },
    {
      id: 2,
      title: 'Maintenance Update',
      message: 'Your maintenance request has been scheduled',
      date: '2024-06-18',
      read: true,
    },
  ];

  const requestColumns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          color={
            status === 'pending'
              ? 'orange'
              : status === 'processing'
              ? 'blue'
              : 'green'
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
  ];

  return (
    <div className="dashboard-content">
      <h2>Tenant Dashboard</h2>

      <div className="dashboard-cards">
        <Card title="Rent Status" className="dashboard-card">
          <div className="rent-status">
            <Progress type="circle" percent={100} status="success" format={() => 'Paid'} />
            <div className="rent-info">
              <p>Next Payment Due: <strong>July 1, 2024</strong></p>
              <p>Amount: <strong>${propertyDetails.rentAmount}</strong></p>
              <Button type="primary">Pay Now</Button>
            </div>
          </div>
        </Card>

        <Card title="Property Summary" className="dashboard-card">
          <p><strong>Property:</strong> {propertyDetails.propertyName}</p>
          <p><strong>Room:</strong> {propertyDetails.roomNumber}</p>
          <p><strong>Address:</strong> {propertyDetails.address}</p>
          <p><strong>Lease:</strong> {propertyDetails.leaseStart} → {propertyDetails.leaseEnd}</p>
        </Card>

        <Card title="Pending Requests" className="dashboard-card">
          <Table
            dataSource={pendingRequests}
            columns={requestColumns}
            rowKey="id"
            size="small"
            pagination={false}
          />
        </Card>

        <Card title="Notifications" className="dashboard-card">
          <div className="notifications-list">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
              >
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <small>{notification.date}</small>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
