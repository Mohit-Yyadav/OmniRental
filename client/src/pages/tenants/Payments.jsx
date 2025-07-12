// src/pages/tenants/Payments.jsx
import React from 'react';
import { Table, Button, Card, Tag } from 'antd';

const Payments = () => {
  const paymentHistory = [
    {
      id: 1,
      date: '2024-06-01',
      amount: 1200,
      method: 'Credit Card',
      status: 'completed',
      invoice: 'INV-2024-06-001',
    },
    {
      id: 2,
      date: '2024-05-01',
      amount: 1200,
      method: 'Bank Transfer',
      status: 'completed',
      invoice: 'INV-2024-05-001',
    },
    {
      id: 3,
      date: '2024-04-01',
      amount: 1200,
      method: 'UPI',
      status: 'pending',
      invoice: 'INV-2024-04-001',
    },
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
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
    {
      title: 'Invoice',
      dataIndex: 'invoice',
      key: 'invoice',
      render: (text) => <a href="#">{text}</a>,
    },
  ];

  return (
    <div className="payments-content">
      <Card
        title="Payment History"
        extra={<Button type="primary">Make Payment</Button>}
      >
        <Table
          dataSource={paymentHistory}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Payments;
