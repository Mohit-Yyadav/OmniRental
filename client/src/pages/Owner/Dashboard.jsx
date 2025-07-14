// src/pages/owners/Dashboard.jsx
import React from 'react';
import { Card, Button, Progress, Table, Tag } from 'antd';

const Dashboard = () => {
  const propertyDetails = {
    propertyName: 'Sunshine Apartments',
    totalUnits: 24,
    occupiedUnits: 18,
    address: '456 Sunshine Ave, New York, NY 10002',
    monthlyRevenue: 21600, // 18 units * $1200
  };

  const tenantRequests = [
    {
      id: 1,
      unit: '304',
      type: 'Maintenance',
      date: '2024-06-15',
      status: 'pending',
      description: 'Kitchen sink is leaking',
    },
    {
      id: 2,
      unit: '205',
      type: 'Lease Extension',
      date: '2024-06-10',
      status: 'processing',
      description: 'Extend lease by 6 months',
    },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Rent Collected',
      message: 'Rent payment received from unit 304',
      date: '2024-06-28',
      read: false,
    },
    {
      id: 2,
      title: 'Maintenance Update',
      message: 'Maintenance request completed for unit 205',
      date: '2024-06-18',
      read: true,
    },
  ];

  const requestColumns = [
    { title: 'Unit', dataIndex: 'unit', key: 'unit' },
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
      <h2>Owner Dashboard</h2>

      <div className="dashboard-cards">
        <Card title="Revenue Status" className="dashboard-card">
          <div className="revenue-status">
            <Progress type="circle" percent={75} format={() => `${18}/${24}`} />
            <div className="revenue-info">
              <p>Occupancy Rate: <strong>75%</strong></p>
              <p>Monthly Revenue: <strong>${propertyDetails.monthlyRevenue}</strong></p>
              <Button type="primary">View Financials</Button>
            </div>
          </div>
        </Card>

        <Card title="Property Summary" className="dashboard-card">
          <p><strong>Property:</strong> {propertyDetails.propertyName}</p>
          <p><strong>Total Units:</strong> {propertyDetails.totalUnits}</p>
          <p><strong>Occupied Units:</strong> {propertyDetails.occupiedUnits}</p>
          <p><strong>Address:</strong> {propertyDetails.address}</p>
        </Card>

        <Card title="Tenant Requests" className="dashboard-card">
          <Table
            dataSource={tenantRequests}
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