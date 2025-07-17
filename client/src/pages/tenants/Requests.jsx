// src/pages/tenants/Requests.jsx
import React, { useEffect, useState } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Button, 
  Space, 
  Popconfirm, 
  message, 
  Divider,
  Badge,
  Tooltip
} from 'antd';
import { 
  SyncOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusColors = {
    pending: 'orange',
    approved: 'green',
    rejected: 'red',
    cancelled: 'gray'
  };

  const statusIcons = {
    pending: <SyncOutlined spin />,
    approved: <CheckCircleOutlined />,
    rejected: <CloseCircleOutlined />,
    cancelled: <ExclamationCircleOutlined />
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/booking-requests/tenant', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (error) {
      console.error('❌ Error fetching requests:', error);
      message.error('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleCancelRequest = async (requestId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/booking-requests/${requestId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success('Request cancelled successfully');
      fetchRequests();
    } catch (error) {
      console.error('❌ Error cancelling request:', error);
      message.error('Failed to cancel request');
    }
  };

  const columns = [
    {
      title: 'Property',
      dataIndex: ['propertyId', 'title'],
      key: 'property',
      render: (title, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{title || 'Unknown Property'}</div>
          <div style={{ fontSize: 12, color: '#666' }}>
            {record?.propertyId?.address || 'Address not available'}
          </div>
        </div>
      ),
    },
    {
      title: 'Move-In Date',
      dataIndex: 'moveInDate',
      key: 'moveInDate',
      render: (date) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => `${duration} months`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          icon={statusIcons[status]} 
          color={statusColors[status]}
          style={{ display: 'flex', alignItems: 'center', gap: 4 }}
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Owner Response',
      dataIndex: 'ownerResponse',
      key: 'ownerResponse',
      render: (response, record) => (
        response ? (
          <Tooltip title={response}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <InfoCircleOutlined /> Response
            </span>
          </Tooltip>
        ) : (
          <span style={{ color: '#999' }}>No response yet</span>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending' && (
            <Popconfirm
              title="Are you sure you want to cancel this request?"
              icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => handleCancelRequest(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" danger>Cancel</Button>
            </Popconfirm>
          )}
          {record.status === 'approved' && (
            <Button type="primary" size="small">
              Proceed to Payment
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="requests-page">
      <Card
        title="My Booking Requests"
        extra={
          <Button 
            icon={<SyncOutlined />} 
            onClick={fetchRequests}
            loading={loading}
          >
            Refresh
          </Button>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Badge color={statusColors.pending} text="Pending" />
            <Badge color={statusColors.approved} text="Approved" />
            <Badge color={statusColors.rejected} text="Rejected" />
            <Badge color={statusColors.cancelled} text="Cancelled" />
          </Space>
        </div>

        <Divider style={{ margin: '16px 0' }} />

        <Table
          dataSource={requests}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default Requests;