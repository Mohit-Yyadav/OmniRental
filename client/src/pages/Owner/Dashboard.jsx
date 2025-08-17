// src/pages/owners/Dashboard.jsx
import React from 'react';
import { Card, Button, Progress, Table, Tag } from 'antd';

const OwnerDashboard = () => {
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
    <div className="owner-dashboard">
      <h2 className="owner-dashboard__title">Owner Dashboard</h2>

      <div className="owner-dashboard__grid">
        <Card title="Revenue Status" className="owner-dashboard__card">
          <div className="owner-dashboard__revenue-status">
            <Progress 
              type="circle" 
              percent={75} 
              format={() => `${18}/${24}`} 
              className="owner-dashboard__progress"
            />
            <div className="owner-dashboard__revenue-info">
              <p>Occupancy Rate: <strong>75%</strong></p>
              <p>Monthly Revenue: <strong>${propertyDetails.monthlyRevenue.toLocaleString()}</strong></p>
              <Button type="primary" className="owner-dashboard__button">
                View Financials
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Property Summary" className="owner-dashboard__card">
          <div className="owner-dashboard__property-info">
            <p><strong>Property:</strong> {propertyDetails.propertyName}</p>
            <p><strong>Total Units:</strong> {propertyDetails.totalUnits}</p>
            <p><strong>Occupied Units:</strong> {propertyDetails.occupiedUnits}</p>
            <p><strong>Address:</strong> {propertyDetails.address}</p>
          </div>
        </Card>

        <Card title="Tenant Requests" className="owner-dashboard__card">
          <Table
            dataSource={tenantRequests}
            columns={requestColumns}
            rowKey="id"
            size="small"
            pagination={false}
            className="owner-dashboard__table"
          />
        </Card>

        <Card title="Notifications" className="owner-dashboard__card">
          <div className="owner-dashboard__notifications">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`owner-dashboard__notification ${
                  !notification.read ? 'owner-dashboard__notification--unread' : ''
                }`}
              >
                <h4 className="owner-dashboard__notification-title">
                  {notification.title}
                </h4>
                <p className="owner-dashboard__notification-message">
                  {notification.message}
                </p>
                <small className="owner-dashboard__notification-date">
                  {notification.date}
                </small>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;