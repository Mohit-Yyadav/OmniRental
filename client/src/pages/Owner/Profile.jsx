// src/pages/owners/Profile.jsx
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Upload, 
  Select, 
  Row, 
  Col,
  Divider,
  Tabs,
  Tag
} from 'antd';
import { 
  EditOutlined, 
  SaveOutlined, 
  UploadOutlined,
  BankOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import useAuth from '../../context/useAuth';
import './OwnerDashboard.css';

const { Option } = Select;
const { TabPane } = Tabs;

const OwnerProfile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const [profileData, setProfileData] = useState({
    name: user.name || 'Property Owner',
    email: user.email || 'owner@example.com',
    phone: user.phone || '+1 234 567 890',
    address: user.address || '456 Business Ave, New York, NY',
    companyName: user.companyName || 'Omni Properties LLC',
    taxId: user.taxId || '12-3456789',
    licenseNumber: user.licenseNumber || 'RE123456',
    insurancePolicy: user.insurancePolicy || 'POL987654',
    bankDetails: user.bankDetails || 'Chase •••• 6789',
    portfolioSize: user.portfolioSize || '15 properties',
    yearsExperience: user.yearsExperience || '8 years',
    profilePic: user.profilePic || 'https://randomuser.me/api/portraits/men/10.jpg',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
     
      if (!token) {
        console.warn("No token found in localStorage");
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/owner/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch owner data');

        const data = await res.json();
        setProfileData(data.owner);
        form.setFieldsValue(data.owner);
      } catch (error) {
        console.error('Error fetching owner data:', error.message);
      }
    };

    fetchProfile();
  }, [form]);

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    const updated = form.getFieldsValue();

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/owner/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error('Failed to update');

      const data = await res.json();
      setProfileData(data.owner);
      setEditMode(false);
      console.log('Profile Updated:', data);
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const renderVerificationBadge = () => (
    <Tag icon={<SafetyCertificateOutlined />} color="green">
      Verified Owner
    </Tag>
  );

  return (
    <div className="owner-profile-page">
      <Card
        title="Owner Profile"
        extra={
          editMode ? (
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              Save Changes
            </Button>
          ) : (
            <Button icon={<EditOutlined />} onClick={handleEdit}>
              Edit Profile
            </Button>
          )
        }
      >
        <Row gutter={32}>
          <Col span={6} style={{ textAlign: 'center' }}>
            <Avatar size={128} src={profileData.profilePic} />
            <h3 style={{ marginTop: 16 }}>{profileData.name}</h3>
            <p>{profileData.companyName}</p>
            {renderVerificationBadge()}
            <Divider />
            <div className="owner-stats">
              <p><strong>Portfolio:</strong> {profileData.portfolioSize}</p>
              <p><strong>Experience:</strong> {profileData.yearsExperience}</p>
            </div>
          </Col>

          <Col span={18}>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="Personal Info" key="personal">
                <Form form={form} layout="vertical" disabled={!editMode}>
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
                      <Form.Item label="Company Name" name="companyName">
                        <Input prefix={<BankOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Business Address" name="address">
                        <Input.TextArea rows={2} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </TabPane>

              <TabPane tab="Business Details" key="business">
                <Form form={form} layout="vertical" disabled={!editMode}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Tax ID (EIN)" name="taxId">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Real Estate License" name="licenseNumber">
                        <Input prefix={<IdcardOutlined />} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Insurance Policy" name="insurancePolicy">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Bank Details" name="bankDetails">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Upload License Document">
                        <Upload
                          fileList={profileData.licenseDoc ? [profileData.licenseDoc] : []}
                          onChange={({ fileList }) => setProfileData(prev => ({ ...prev, licenseDoc: fileList[0] }))}
                          beforeUpload={() => false}
                          maxCount={1}
                        >
                          <Button icon={<UploadOutlined />}>Upload License</Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default OwnerProfile;