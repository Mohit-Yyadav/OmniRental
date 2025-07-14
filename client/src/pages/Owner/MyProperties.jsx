// src/components/owner/MyProperties.jsx
import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  Col, 
  Row, 
  Table, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker,
  Space,
  Divider,
  Empty,
  Spin,
  message
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined,
  HomeOutlined,
  DollarOutlined,
  AreaChartOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
``

const { Option } = Select;
const { RangePicker } = DatePicker;

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    // Simulate API call
    const fetchProperties = async () => {
      try {
        // Replace with actual API call
        const mockProperties = [
          {
            id: '1',
            name: 'Sunshine Villa',
            address: '123 Main St, San Francisco, CA',
            type: 'Apartment',
            status: 'Occupied',
            units: 5,
            rent: 3500,
            purchasedDate: '2020-05-15'
          },
          {
            id: '2',
            name: 'Ocean View Condo',
            address: '456 Beach Blvd, Miami, FL',
            type: 'Condo',
            status: 'Vacant',
            units: 1,
            rent: 2800,
            purchasedDate: '2021-01-20'
          }
        ];
        setProperties(mockProperties);
      } catch (error) {
        message.error('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsModalVisible(true);
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setIsModalVisible(true);
  };

  const handleDeleteProperty = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this property?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        // Replace with actual API call
        setProperties(properties.filter(prop => prop.id !== id));
        message.success('Property deleted successfully');
      }
    });
  };

  const handleSearch = (values) => {
    setSearchParams(values);
    // Implement search functionality here
  };

  const columns = [
    {
      title: 'Property Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`/owner/properties/${record.id}`} className="owner-properties__property-link">
          <HomeOutlined className="owner-properties__property-icon" /> {text}
        </Link>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Occupied' ? 'green' : 'orange'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Monthly Rent',
      dataIndex: 'rent',
      key: 'rent',
      render: (rent) => (
        <span className="owner-properties__rent-value">
          <DollarOutlined /> {rent.toLocaleString()}
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined className="owner-properties__action-icon" />} 
            onClick={() => handleEditProperty(record)}
            className="owner-properties__edit-btn"
          />
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined className="owner-properties__action-icon" />} 
            onClick={() => handleDeleteProperty(record.id)}
            className="owner-properties__delete-btn"
          />
        </Space>
      )
    }
  ];

  return (
    <div className="owner-properties__container">
      <div className="owner-properties__header">
        <h2 className="owner-properties__title">My Properties</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddProperty}
          className="owner-properties__add-btn"
        >
          Add Property
        </Button>
      </div>

      <Card className="owner-properties__search-card">
        <Form form={form} layout="vertical" onFinish={handleSearch}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="search" label="Search">
                <Input 
                  placeholder="Property name or address" 
                  prefix={<SearchOutlined className="owner-properties__search-icon" />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="type" label="Property Type">
                <Select placeholder="All Types">
                  <Option value="apartment">Apartment</Option>
                  <Option value="house">House</Option>
                  <Option value="condo">Condo</Option>
                  <Option value="commercial">Commercial</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="status" label="Status">
                <Select placeholder="All Statuses">
                  <Option value="occupied">Occupied</Option>
                  <Option value="vacant">Vacant</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="dateRange" label="Purchased Date">
                <RangePicker className="owner-properties__date-picker" />
              </Form.Item>
            </Col>
          </Row>
          <div className="owner-properties__search-actions">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button 
              onClick={() => {
                form.resetFields();
                setSearchParams({});
              }}
              className="owner-properties__reset-btn"
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card>

      <div className="owner-properties__stats">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="owner-properties__stat-card">
              <div className="owner-properties__stat-content">
                <AreaChartOutlined className="owner-properties__stat-icon" />
                <div>
                  <p className="owner-properties__stat-label">Total Properties</p>
                  <h3 className="owner-properties__stat-value">{properties.length}</h3>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="owner-properties__stat-card">
              <div className="owner-properties__stat-content">
                <HomeOutlined className="owner-properties__stat-icon" />
                <div>
                  <p className="owner-properties__stat-label">Occupied Units</p>
                  <h3 className="owner-properties__stat-value">
                    {properties.filter(p => p.status === 'Occupied').length}
                  </h3>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="owner-properties__stat-card">
              <div className="owner-properties__stat-content">
                <HomeOutlined className="owner-properties__stat-icon" />
                <div>
                  <p className="owner-properties__stat-label">Vacant Units</p>
                  <h3 className="owner-properties__stat-value">
                    {properties.filter(p => p.status === 'Vacant').length}
                  </h3>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="owner-properties__stat-card">
              <div className="owner-properties__stat-content">
                <DollarOutlined className="owner-properties__stat-icon" />
                <div>
                  <p className="owner-properties__stat-label">Monthly Income</p>
                  <h3 className="owner-properties__stat-value">
                    ${properties.reduce((sum, p) => sum + (p.status === 'Occupied' ? p.rent : 0), 0).toLocaleString()}
                  </h3>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Card className="owner-properties__list-card">
        {loading ? (
          <div className="owner-properties__loading">
            <Spin size="large" />
          </div>
        ) : properties.length > 0 ? (
          <Table 
            columns={columns} 
            dataSource={properties} 
            rowKey="id"
            className="owner-properties__table"
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20', '50']
            }}
          />
        ) : (
          <Empty
            description="No properties found"
            className="owner-properties__empty"
          >
            <Button type="primary" onClick={handleAddProperty}>
              Add Your First Property
            </Button>
          </Empty>
        )}
      </Card>

      <Modal
        title={editingProperty ? 'Edit Property' : 'Add New Property'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        className="owner-properties__modal"
        destroyOnClose
      >
        
      </Modal>
    </div>
  );
};

export default MyProperties;