// src/pages/tenants/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Avatar, Upload, Select, Row, Col } from 'antd';
import { EditOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
 import useAuth from '../../context/useAuth';// ✅


const { Option } = Select;
 // ✅ This gives you logged-in user data

const Profile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user.name || 'John Doe',
    email: user.email || 'john.doe@example.com',
    phone: user.phone || '+1 234 567 890',
    address: user.address || '123 Main St, New York, NY',
    emergencyContact: user.emergencyContact || 'Jane Doe - +1 345 678 901',
    idProofNumber: user.idProofNumber || 'A1234567',
    occupation: user.occupation || 'Software Engineer',
    age: user.age || 30,
    gender: user.gender || 'Male',
    familyMembers: user.familyMembers || 'Wife: Jane, Son: Alex',
    idProofDoc: user.idProofDoc || null,
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
  });

useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
   
    if (!token) {
      console.warn("No token found in localStorage");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/user/me', {
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
    }
  };

  fetchProfile();
}, [form]);



  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    const updated = form.getFieldsValue();

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/user/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error('Failed to update');

      const data = await res.json();
      setProfileData(data.user);
      setEditMode(false);
      console.log('Profile Updated:', data);
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <div className="profile-page">
      <Card
        title="Tenant Profile"
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
        <Row gutter={32}>
          <Col span={6} style={{ textAlign: 'center' }}>
            <Avatar size={128} src={profileData.profilePic || 'https://randomuser.me/api/portraits/men/1.jpg'} />

            <p style={{ marginTop: 10 }}>{profileData.name}</p>
          </Col>

          <Col span={18}>
            <Form
              form={form}
              layout="vertical"
              disabled={!editMode}
              initialValues={profileData}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Full Name" name="name">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Email" name="email">
                    <Input type="email" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Occupation" name="occupation">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Age" name="age">
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Gender" name="gender">
                    <Select>
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label="Address" name="address">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item label="Emergency Contact" name="emergencyContact">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="ID Proof Number" name="idProofNumber">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                 <Form.Item label="Upload ID Proof Document">
  <Upload
    fileList={profileData.idProofDoc ? [profileData.idProofDoc] : []}
    onChange={({ fileList }) => setProfileData(prev => ({ ...prev, idProofDoc: fileList[0] }))}
    beforeUpload={() => false}
    maxCount={1}
  >
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
</Form.Item>

                </Col>

                <Col span={24}>
                  <Form.Item label="Family Members Details" name="familyMembers">
                    <Input.TextArea rows={2} />
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

export default Profile;