// src/pages/tenants/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Avatar } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';

const Profile = () => {
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);

  // Mock profile data (replace with props/API if needed)
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, New York, NY',
    emergencyContact: 'Jane Doe - +1 345 678 901',
    idProof: 'A1234567',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
  });

  useEffect(() => {
    form.setFieldsValue(profileData);
  }, [form, profileData]);

  const handleEdit = () => setEditMode(true);

  const handleSave = () => {
    const updated = form.getFieldsValue();
    setProfileData(updated);
    setEditMode(false);
    console.log('Profile Updated:', updated);
  };

  return (
    <div className="profile-page">
      <Card
        title="My Profile"
        extra={
          editMode ? (
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </Button>
          )
        }
      >
        <div className="profile-details" style={{ display: 'flex', gap: '40px' }}>
          <div className="avatar-section" style={{ textAlign: 'center' }}>
            <Avatar size={128} src={profileData.profilePic} />
            <p style={{ marginTop: 10 }}>{profileData.name}</p>
          </div>

          <Form
            form={form}
            layout="vertical"
            style={{ flex: 1 }}
            disabled={!editMode}
          >
            <Form.Item label="Full Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Phone Number" name="phone">
              <Input />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Emergency Contact" name="emergencyContact">
              <Input />
            </Form.Item>
            <Form.Item label="ID Proof Number" name="idProof">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
