// src/pages/tenants/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Avatar, Upload, Select, Row, Col, message } from 'antd';
import { EditOutlined, SaveOutlined, UploadOutlined, CameraOutlined } from '@ant-design/icons';
import useAuth from '../../context/useAuth';

const { Option } = Select;

const Profile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);

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
    profilePic: user.profilePic || 'https://randomuser.me/api/portraits/men/1.jpg',
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


      if (!data?.user) throw new Error("User not found in response");

      setProfileData(data.user);
      form.setFieldsValue(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      message.error('Could not load profile');
    }
  };

  fetchProfile();
}, [form]);


  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Append all text fields
      Object.keys(values).forEach(key => {
        if (values[key] !== undefined) {
          formData.append(key, values[key]);
        }
      });

      // Append avatar if changed
      if (avatarFile) {
        formData.append('profilePic', avatarFile);
      }

      // Append ID proof if changed
      if (idProofFile) {
        formData.append('idProofDoc', idProofFile);
      }

      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5000/api/user/me/upload', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update profile');

      const data = await res.json();
      setProfileData(data.user);
      setEditMode(false);
      setAvatarFile(null);
      setIdProofFile(null);
      message.success('Profile updated successfully');
    } catch (error) {
      console.error('Upload error:', error.message);
      message.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

const handleAvatarChange = (info) => {
  const file = info?.fileList?.[0]?.originFileObj;

  if (!(file instanceof Blob)) {
    console.warn('❌ Not a valid file:', file);
    return;
  }

  setAvatarFile(file);
  setProfileData((prev) => ({
    ...prev,
    profilePic: URL.createObjectURL(file),
  }));
};




  const handleIdProofChange = (info) => {
    if (info.file) {
      setIdProofFile(info.file.originFileObj);
    }
  };

const getAvatarSrc = () => {
  if (avatarFile instanceof File) {
    return URL.createObjectURL(avatarFile);
  }
  return profileData?.profilePic
    ? profileData.profilePic.startsWith("http")
      ? profileData.profilePic
      : `http://localhost:5000${profileData.profilePic}`
    : null;
};


  return (
    <div className="profile-page">
      <Card
        title="Tenant Profile"
        extra={
          editMode ? (
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={handleSave}
              loading={loading}
            >
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
            <div style={{ position: 'relative' }}>
              <Avatar 
                size={128} 
                src={getAvatarSrc()} 
              />
              {editMode && (
             <Upload
  accept="image/*"
  showUploadList={false}
  beforeUpload={() => false} // prevent auto upload
  onChange={handleAvatarChange}
>
  <Button
    type="link"
    icon={<CameraOutlined />}
    style={{ position: 'absolute', bottom: 0, right: 40 }}
  />
</Upload>


              )}
            </div>
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
                  <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Email" name="email" rules={[{ type: 'email' }]}>
                    <Input disabled/>
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
                      fileList={idProofFile ? [{
                        uid: '1',
                        name: idProofFile.name,
                        status: 'done',
                      }] : []}
                      onChange={handleIdProofChange}
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