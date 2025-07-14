// src/pages/owners/Profile.jsx
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Select, 
  Row, 
  Col,
  Divider,
  message,
  Spin,
  Tag
} from 'antd';
import { 
  EditOutlined, 
  SaveOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import useAuth from '../../context/useAuth';

const { Option } = Select;

const OwnerProfile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    idProofNumber: '',
    emergencyContact: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
     
      if (!token) {
        console.warn("No token found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch user data');

        const data = await res.json();
        setProfileData(data.user);
        form.setFieldsValue(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        message.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const token = localStorage.getItem('token');
      
      const res = await fetch('http://localhost:5000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Failed to update');

      const data = await res.json();
      setProfileData(data.user);
      setEditMode(false);
      message.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      message.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const renderVerificationBadge = () => (
    <Tag icon={<SafetyCertificateOutlined />} color="green">
      Verified Owner
    </Tag>
  );

  if (loading && !profileData.name) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title="Owner Profile"
        extra={
          editMode ? (
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={handleSave}
              loading={loading}
            >
              Save Changes
            </Button>
          ) : (
            <Button 
              icon={<EditOutlined />} 
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          )
        }
      >
        <Row gutter={32}>
          <Col xs={24} md={6}>
            <div style={{ textAlign: 'center' }}>
              <Avatar 
                size={128} 
                src="https://randomuser.me/api/portraits/men/10.jpg" 
                style={{ marginBottom: '16px' }}
              />
              <h3>{profileData.name || 'Property Owner'}</h3>
              {renderVerificationBadge()}
            </div>
          </Col>

          <Col xs={24} md={18}>
            <Form form={form} layout="vertical" disabled={!editMode}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item 
                    label="Full Name" 
                    name="name"
                    rules={[{ required: true, message: 'Please input your name' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item 
                    label="Email" 
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input type="email" disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item 
                    label="Phone Number" 
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item 
                    label="ID Proof Number" 
                    name="idProofNumber"
                    rules={[{ required: true, message: 'Please input your ID number' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item 
                    label="Address" 
                    name="address"
                    rules={[{ required: true, message: 'Please input your address' }]}
                  >
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item 
                    label="Emergency Contact" 
                    name="emergencyContact"
                    rules={[{ required: true, message: 'Please input emergency contact' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default OwnerProfile;