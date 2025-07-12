// src/pages/tenants/History.jsx
import React from 'react';
import { Table, Tag, Card } from 'antd';

const rentalHistory = [
  {
    key: '1',
    property: 'Sunshine Apartments',
    room: '304',
    duration: 'Jan 2022 - Jan 2023',
    rent: 1200,
    status: 'completed',
  },
  {
    key: '2',
    property: 'Green Villa',
    room: 'B12',
    duration: 'Feb 2021 - Jan 2022',
    rent: 1100,
    status: 'completed',
  },
];

const columns = [
  {
    title: 'Property',
    dataIndex: 'property',
    key: 'property',
  },
  {
    title: 'Room',
    dataIndex: 'room',
    key: 'room',
  },
  {
    title: 'Lease Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Rent (Monthly)',
    dataIndex: 'rent',
    key: 'rent',
    render: (amount) => `$${amount}`,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'completed' ? 'green' : 'orange'}>
        {status.toUpperCase()}
      </Tag>
    ),
  },
];

const History = () => {
  return (
    <div className="history-page">
      <Card title="Rental History" bordered={false}>
        <Table columns={columns} dataSource={rentalHistory} />
      </Card>
    </div>
  );
};

export default History;
