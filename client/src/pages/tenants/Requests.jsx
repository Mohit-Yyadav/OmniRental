// src/pages/tenants/Requests.jsx
import React from 'react';
import { Table, Button, Card, Tag } from 'antd';

const Requests = () => {
  const requestData = [
    {
      id: 1,
      type: 'Maintenance',
      date: '2024-06-10',
      status: 'pending',
      description: 'Fix bathroom leak',
    },
    {
      id: 2,
      type: 'Lease Extension',
      date: '2024-05-20',
      status: 'processing',
      description: 'Extend lease for 6 months',
    },
  ];

  const columns = [
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
    <div className="requests-content">
      <Card
        title="My Requests"
        extra={<Button type="primary">New Request</Button>}
      >
        <Table dataSource={requestData} columns={columns} rowKey="id" />
      </Card>
    </div>
  );
};

export default Requests;
