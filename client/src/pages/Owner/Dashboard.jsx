// src/pages/owners/Dashboard.jsx
import React from 'react';
import { Card, Button, Progress, Table, Tag, Row, Col } from 'antd';

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
      <h2 style={{ marginBottom: 24 }}>Owner Dashboard</h2>

      <Row gutter={[24, 24]}>
        {/* Revenue Status */}
        <Col xs={24} md={12} lg={8}>
          <Card title="Revenue Status">
            <div style={{ textAlign: 'center' }}>
              <Progress 
                type="circle" 
                percent={(propertyDetails.occupiedUnits / propertyDetails.totalUnits) * 100} 
                format={() => `${propertyDetails.occupiedUnits}/${propertyDetails.totalUnits}`} 
              />
              <p style={{ marginTop: 16 }}>
                Occupancy Rate: <strong>{((propertyDetails.occupiedUnits / propertyDetails.totalUnits) * 100).toFixed(1)}%</strong>
              </p>
              <p>
                Monthly Revenue: <strong>${propertyDetails.monthlyRevenue.toLocaleString()}</strong>
              </p>
              <Button type="primary">View Financials</Button>
            </div>
          </Card>
        </Col>

        {/* Property Summary */}
        <Col xs={24} md={12} lg={8}>
          <Card title="Property Summary">
            <p><strong>Property:</strong> {propertyDetails.propertyName}</p>
            <p><strong>Total Units:</strong> {propertyDetails.totalUnits}</p>
            <p><strong>Occupied Units:</strong> {propertyDetails.occupiedUnits}</p>
            <p><strong>Address:</strong> {propertyDetails.address}</p>
          </Card>
        </Col>

        {/* Tenant Requests */}
        <Col xs={24} md={24} lg={8}>
          <Card title="Tenant Requests">
            <Table
              dataSource={tenantRequests}
              columns={requestColumns}
              rowKey="id"
              size="small"
              pagination={false}
              scroll={{ x: 500 }}
            />
          </Card>
        </Col>

        {/* Notifications */}
        <Col xs={24}>
          <Card title="Notifications">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: 12,
                  marginBottom: 8,
                  borderRadius: 4,
                  backgroundColor: !notification.read ? '#e6f7ff' : '#f5f5f5',
                }}
              >
                <h4 style={{ marginBottom: 4 }}>{notification.title}</h4>
                <p style={{ margin: 0 }}>{notification.message}</p>
                <small>{notification.date}</small>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OwnerDashboard;
