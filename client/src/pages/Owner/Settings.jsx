import React, { useState } from 'react';
import { 
  Tabs, 
  Card, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  Divider,
  notification,
  Row,
  Col,
  Avatar,
  Upload,
  message
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  MailOutlined,
  CreditCardOutlined,
  TeamOutlined,
  CloudUploadOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const Settings = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    setLoading(true);
    console.log('Received values:', values);
    // Here you would typically make an API call
    setTimeout(() => {
      setLoading(false);
      notification.success({
        message: 'Settings Updated',
        description: 'Your changes have been saved successfully.',
      });
    }, 1500);
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].status === 'done') {
      message.success(`${newFileList[0].name} file uploaded successfully`);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div className="settings-container">
      <Card 
        title="System Settings" 
        className="settings-card"
        bordered={false}
      >
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabPosition="left"
          className="settings-tabs"
        >
          <TabPane 
            tab={
              <span>
                <UserOutlined />
                Profile
              </span>
            } 
            key="profile"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                name: 'Property Owner',
                email: 'owner@example.com',
                phone: '+1 234 567 8900',
                company: 'Omni Properties LLC',
                notifications: true,
                newsletter: true
              }}
            >
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <div className="profile-upload-container">
                    <Avatar 
                      size={128} 
                      src={fileList[0]?.thumbUrl} 
                      icon={<UserOutlined />}
                      className="profile-avatar"
                    />
                    <Upload
                      fileList={fileList}
                      beforeUpload={beforeUpload}
                      onChange={handleUploadChange}
                      showUploadList={false}
                      accept="image/*"
                      className="profile-upload"
                    >
                      <Button 
                        icon={<CloudUploadOutlined />} 
                        className="upload-button"
                      >
                        Change Photo
                      </Button>
                    </Upload>
                    <p className="upload-hint">
                      JPG or PNG, max 2MB
                    </p>
                  </div>
                </Col>
                <Col xs={24} md={16}>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Company"
                    name="company"
                  >
                    <Input prefix={<TeamOutlined />} />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  className="save-button"
                >
                  Save Profile
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <BellOutlined />
                Notifications
              </span>
            } 
            key="notifications"
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                emailNotifications: true,
                smsNotifications: false,
                rentReminders: true,
                maintenanceAlerts: true,
                newLeaseAlerts: true
              }}
            >
              <h3 className="section-title">Notification Preferences</h3>
              <Form.Item
                name="emailNotifications"
                label="Email Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="smsNotifications"
                label="SMS Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Divider />
              
              <h3 className="section-title">Alert Types</h3>
              <Form.Item
                name="rentReminders"
                label="Rent Payment Reminders"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="maintenanceAlerts"
                label="Maintenance Request Alerts"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="newLeaseAlerts"
                label="New Lease Agreement Alerts"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Divider />
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  className="save-button"
                >
                  Save Notification Settings
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <LockOutlined />
                Security
              </span>
            } 
            key="security"
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
            >
              <h3 className="section-title">Password</h3>
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Please input your current password' }]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: 'Please input your new password' }]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              
              <Divider />
              
              <h3 className="section-title">Two-Factor Authentication</h3>
              <Form.Item
                name="twoFactorAuth"
                label="Enable Two-Factor Authentication"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Divider />
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  className="save-button"
                >
                  Update Security Settings
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <CreditCardOutlined />
                Billing
              </span>
            } 
            key="billing"
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                plan: 'premium',
                cardNumber: '•••• •••• •••• 4242',
                cardExpiry: '12/24',
                invoiceEmail: 'accounting@omniproperties.com'
              }}
            >
              <h3 className="section-title">Subscription Plan</h3>
              <Form.Item
                name="plan"
                label="Current Plan"
              >
                <Select>
                  <Option value="basic">Basic</Option>
                  <Option value="standard">Standard</Option>
                  <Option value="premium">Premium</Option>
                </Select>
              </Form.Item>
              
              <Divider />
              
              <h3 className="section-title">Payment Method</h3>
              <Form.Item
                name="cardNumber"
                label="Card Number"
                rules={[{ required: true, message: 'Please input your card number' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="cardExpiry"
                label="Expiration Date"
                rules={[{ required: true, message: 'Please input expiration date' }]}
              >
                <Input />
              </Form.Item>
              
              <Divider />
              
              <h3 className="section-title">Billing Information</h3>
              <Form.Item
                name="invoiceEmail"
                label="Invoice Email"
                rules={[{ type: 'email', message: 'Please enter a valid email' }]}
              >
                <Input prefix={<MailOutlined />} />
              </Form.Item>
              
              <Divider />
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  className="save-button"
                >
                  Update Billing Information
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane 
            tab={
              <span>
                <SafetyOutlined />
                Privacy
              </span>
            } 
            key="privacy"
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                dataSharing: false,
                analytics: true,
                marketingEmails: false
              }}
            >
              <h3 className="section-title">Data Privacy</h3>
              <Form.Item
                name="dataSharing"
                label="Allow anonymous data sharing for product improvement"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Divider />
              
              <h3 className="section-title">Analytics</h3>
              <Form.Item
                name="analytics"
                label="Enable usage analytics"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Divider />
              
              <h3 className="section-title">Marketing Preferences</h3>
              <Form.Item
                name="marketingEmails"
                label="Receive marketing emails"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Divider />
              
              <h3 className="section-title">Data Export</h3>
              <p className="privacy-description">
                You can request an export of all your personal data stored in our systems.
              </p>
              <Button type="default" className="export-button">
                Request Data Export
              </Button>
              
              <Divider />
              
              <h3 className="section-title">Account Deletion</h3>
              <p className="privacy-description">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button danger className="delete-button">
                Delete Account
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;