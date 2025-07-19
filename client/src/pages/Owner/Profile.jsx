import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  Row,
  Col,
  message
} from 'antd';
import {
  EditOutlined,
  SaveOutlined,
  UploadOutlined,
  CameraOutlined
} from '@ant-design/icons';
import useAuth from '../../context/useAuth';

const Profile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    emergencyContact: '',
    idProofNumber: '',
    profilePic: '',
    idProofDoc: null,
  });

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
     const res = await fetch('http://localhost:5000/api/user/me', {

        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch profile data');

      const data = await res.json();
      setProfileData(data.user);
      form.setFieldsValue(data.user);
    } catch (err) {
      console.error(err.message);
      message.error('Could not load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [form]);

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

      if (avatarFile) formData.append('profilePic', avatarFile);
      if (idProofFile) formData.append('idProofDoc', idProofFile);

      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/user/me/upload', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update profile');

      const data = await res.json();
      setProfileData(data.user);
      form.setFieldsValue(data.user);
      setEditMode(false);
      setAvatarFile(null);
      setIdProofFile(null);
      message.success('Profile updated successfully');
    } catch (err) {
      console.error('Upload error:', err.message);
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info) => {
    const file = info?.fileList?.[0]?.originFileObj;
    if (file instanceof Blob) {
      setAvatarFile(file);
      setProfileData(prev => ({
        ...prev,
        profilePic: URL.createObjectURL(file),
      }));
    }
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
      : 'https://randomuser.me/api/portraits/men/10.jpg';
  };

  return (
    <div className="owner-profile-page">
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
              <Avatar size={128} src={getAvatarSrc()} />
              {editMode && (
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={() => false}
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
                  <Form.Item label="Email" name="email">
                    <Input
                      addonAfter={
                        <Button
                          type="link"
                          size="small"
                          onClick={fetchProfile}
                        >
                          Refresh
                        </Button>
                      }
                      disabled={!editMode}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="ID Proof Number" name="idProofNumber">
                    <Input />
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

                <Col span={24}>
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
  {!editMode && profileData?.idProofDoc?.url && (
  <Button
    type="link"
    target="_blank"
    href={`http://localhost:5000${profileData.idProofDoc.url}`}
    icon={<UploadOutlined />}
  >
    See Uploaded
  </Button>
)}

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
