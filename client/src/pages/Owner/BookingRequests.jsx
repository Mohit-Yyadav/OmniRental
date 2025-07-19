import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Typography, Tooltip, Space, message, Badge } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const statusColors = {
    pending: 'orange',
    approved: 'green',
    rejected: 'red'
  };

  const statusIcons = {
    pending: <SyncOutlined spin />,
    approved: <CheckCircleOutlined />,
    rejected: <CloseCircleOutlined />
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/booking-requests/owner", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(res.data);
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      message.error("Failed to load booking requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/booking-requests/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success(`Request ${status}`);
      fetchRequests();
    } catch {
      message.error('Status update failed');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const columns = [
    {
      title: 'Property',
      dataIndex: 'propertyId',
      key: 'property',
     render: (prop, record) => (
  <div>
    <strong>{prop?.name || 'N/A'}</strong><br />
    <Text type="secondary" style={{ fontSize: 12 }}>
      Room: {prop?.roomNo?.toString().trim() || '—'} | ₹{(record?.rent || 0).toLocaleString()}
    </Text>
  </div>
)

    },
    {
      title: 'Tenant',
      dataIndex: 'tenantId',
      key: 'tenant',
      render: (t) => <>{t?.name || 'N/A'}<br /><Text type="secondary">{t?.email}</Text></>
    },
    {
      title: 'Move-In',
      dataIndex: 'moveInDate',
      key: 'moveInDate',
      render: (d) => dayjs(d).format('DD MMM YYYY')
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (d) => `${d} month(s)`
    },
    {
      title: 'Persons',
      dataIndex: 'numPersons',
      key: 'numPersons'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag icon={statusIcons[status]} color={statusColors[status]}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            type="primary"
            onClick={() => handleStatusChange(record._id, 'approved')}
            disabled={record.status === 'approved'}
          >
            Approve
          </Button>
          <Button
            size="small"
            danger
            onClick={() => handleStatusChange(record._id, 'rejected')}
            disabled={record.status === 'rejected'}
          >
            Reject
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>📥 Incoming Booking Requests</Title>

      <Table
        dataSource={requests}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
        expandable={{
expandedRowRender: (req) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    padding: 24,
  }}>
    <div style={{
      background: '#fff',
      border: '1px solid #f0f0f0',
      borderRadius: 10,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: 800,
      padding: 24,
      display: 'flex',
      gap: 24,
      alignItems: 'flex-start'
    }}>
      {/* Profile Picture */}
      <div style={{ flexShrink: 0 }}>
        <img
          src={req.tenantId?.profilePic || 'https://via.placeholder.com/100'}
          alt="Profile"
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #1890ff'
          }}
        />
        <div style={{ marginTop: 8, textAlign: 'center', fontWeight: 'bold' }}>
          {req.tenantId?.name}
        </div>
      </div>

      {/* Profile Info */}
      <div style={{ flex: 1 }}>
        <Title level={5}>👤 Tenant Profile</Title>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20
        }}>
          <div>
            <Text type="secondary">📞 Phone</Text>
            <div>{req.tenantId?.phone || 'N/A'}</div>
          </div>
          <div>
            <Text type="secondary">🧑 Gender</Text>
            <div>{req.tenantId?.gender || 'N/A'}</div>
          </div>
          <div>
            <Text type="secondary">🎂 Age</Text>
            <div>{req.tenantId?.age || 'N/A'}</div>
          </div>
          <div>
            <Text type="secondary">🏠 Address</Text>
            <div>{req.tenantId?.address || 'N/A'}</div>
          </div>
          <div>
            <Text type="secondary">📟 Emergency Contact</Text>
            <div>{req.tenantId?.emergencyContact || 'N/A'}</div>
          </div>
          <div>
            <Text type="secondary">👨‍👩‍👧‍👦 Family Members</Text>
            <div>{req.tenantId?.familyMembers || 'N/A'}</div>
          </div>
          <div>
            <Text type="secondary">🪪 ID Proof</Text>
            <div>{req.tenantId?.idProofNumber || 'N/A'}</div>
          </div>
          <div>
            <Text type="secondary">📝 Additional Info</Text>
            <div>{req.additionalInfo || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)



        }}
      />
    </div>
  );
};

export default BookingRequests;
