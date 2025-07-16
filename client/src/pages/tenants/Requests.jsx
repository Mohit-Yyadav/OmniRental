import React, { useState, useEffect } from 'react';
import { Table, Button, Card, Tag, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:5000/api/requests/tenant/${user._id}`)
        .then((res) => {
          setRequests(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          message.error('Failed to load requests.');
          setLoading(false);
        });
    }
  }, [user]);

  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'orange',
      processing: 'blue',
      approved: 'green',
      rejected: 'red',
    };
    return statusColors[status] || 'default';
  };

  const columns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) =>
        new Intl.DateTimeFormat('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).format(new Date(date)),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
  ];

  return (
    <div className="container mt-4">
      <Card
        title="My Requests"
        extra={
          <Button type="primary" onClick={() => navigate('/tenant/new-request')}>
            New Request
          </Button>
        }
      >
        <Table
          dataSource={requests}
          columns={columns}
          rowKey="_id"
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default Requests;
