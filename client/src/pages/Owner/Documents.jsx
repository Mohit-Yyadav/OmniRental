// src/pages/owners/Documents.jsx
import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Input, 
  Tag, 
  Typography, 
  Space, 
  Divider,
  Upload,
  message,
  Popconfirm,
  Badge
} from 'antd';
import { 
  UploadOutlined, 
  FilePdfOutlined, 
  FileWordOutlined, 
  FileExcelOutlined, 
  FileImageOutlined,
  SearchOutlined,
  DeleteOutlined,
  DownloadOutlined
} from '@ant-design/icons';


const { Title, Text } = Typography;
const { Search } = Input;

const OwnerDocuments = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [documents, setDocuments] = useState([
    {
      key: '1',
      name: 'Lease Agreement - Unit 301',
      type: 'Lease',
      category: 'Legal',
      fileType: 'pdf',
      uploaded: '2023-10-15',
      status: 'active',
      size: '2.4 MB'
    },
    {
      key: '2',
      name: 'Property Insurance 2023',
      type: 'Insurance',
      category: 'Financial',
      fileType: 'pdf',
      uploaded: '2023-09-28',
      status: 'expiring',
      size: '1.8 MB'
    },
    {
      key: '3',
      name: 'Maintenance Log Q3',
      type: 'Maintenance',
      category: 'Operations',
      fileType: 'xlsx',
      uploaded: '2023-11-02',
      status: 'active',
      size: '0.9 MB'
    },
    {
      key: '4',
      name: 'Tenant Application - John Smith',
      type: 'Application',
      category: 'Tenant',
      fileType: 'docx',
      uploaded: '2023-11-15',
      status: 'pending',
      size: '1.2 MB'
    },
    {
      key: '5',
      name: 'Building Blueprint',
      type: 'Property',
      category: 'Operations',
      fileType: 'jpg',
      uploaded: '2023-08-10',
      status: 'active',
      size: '3.5 MB'
    },
  ]);

  const fileTypeIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#f5222d' }} />;
      case 'docx':
        return <FileWordOutlined style={{ color: '#1890ff' }} />;
      case 'xlsx':
        return <FileExcelOutlined style={{ color: '#52c41a' }} />;
      default:
        return <FileImageOutlined style={{ color: '#faad14' }} />;
    }
  };

  const statusTag = (status) => {
    switch (status) {
      case 'active':
        return <Tag color="green">Active</Tag>;
      case 'expiring':
        return <Tag color="orange">Expiring Soon</Tag>;
      case 'pending':
        return <Tag color="blue">Pending Review</Tag>;
      case 'expired':
        return <Tag color="red">Expired</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDelete = (key) => {
    setDocuments(documents.filter(item => item.key !== key));
    message.success('Document deleted successfully');
  };

  const handleBulkDelete = () => {
    setDocuments(documents.filter(item => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
    message.success('Selected documents deleted successfully');
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Document Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {fileTypeIcon(record.fileType)}
          <Text strong>{text}</Text>
        </Space>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Lease', value: 'Lease' },
        { text: 'Insurance', value: 'Insurance' },
        { text: 'Maintenance', value: 'Maintenance' },
        { text: 'Application', value: 'Application' },
        { text: 'Property', value: 'Property' },
      ],
      onFilter: (value, record) => record.type.includes(value),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Uploaded',
      dataIndex: 'uploaded',
      key: 'uploaded',
      sorter: (a, b) => new Date(a.uploaded) - new Date(b.uploaded),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: statusTag,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Expiring Soon', value: 'expiring' },
        { text: 'Pending Review', value: 'pending' },
        { text: 'Expired', value: 'expired' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => parseFloat(a.size) - parseFloat(b.size),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<DownloadOutlined />} 
            onClick={() => message.info(`Downloading ${record.name}`)}
          />
          <Popconfirm
            title="Are you sure to delete this document?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredData = documents.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.type.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        // Add the new document to state
        setDocuments([
          ...documents,
          {
            key: `${documents.length + 1}`,
            name: info.file.name,
            type: 'New',
            category: 'Uploaded',
            fileType: info.file.name.split('.').pop(),
            uploaded: new Date().toISOString().split('T')[0],
            status: 'active',
            size: `${(info.file.size / 1024 / 1024).toFixed(1)} MB`
          }
        ]);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="owner-documents">
      <div className="owner-documents__header">
        <Title level={2}>Document Management</Title>
        <Text type="secondary">
          Store and organize all property-related documents
        </Text>
      </div>

      <Card className="owner-documents__toolbar">
        <Space size="large">
          <Upload {...uploadProps}>
            <Button type="primary" icon={<UploadOutlined />}>
              Upload Documents
            </Button>
          </Upload>
          
          <Search
            placeholder="Search documents..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            className="owner-documents__search"
          />

          {selectedRowKeys.length > 0 && (
            <Popconfirm
              title="Are you sure to delete selected documents?"
              onConfirm={handleBulkDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                danger 
                icon={<DeleteOutlined />}
              >
                Delete Selected ({selectedRowKeys.length})
              </Button>
            </Popconfirm>
          )}
        </Space>
      </Card>

      <Card className="owner-documents__stats">
        <Space size="large">
          <div className="owner-documents__stat">
            <Text type="secondary">Total Documents</Text>
            <Title level={3}>{documents.length}</Title>
          </div>
          <Divider type="vertical" />
          <div className="owner-documents__stat">
            <Text type="secondary">Active</Text>
            <Title level={3}>
              {documents.filter(d => d.status === 'active').length}
            </Title>
          </div>
          <Divider type="vertical" />
          <div className="owner-documents__stat">
            <Text type="secondary">Pending</Text>
            <Title level={3}>
              {documents.filter(d => d.status === 'pending').length}
            </Title>
          </div>
          <Divider type="vertical" />
          <div className="owner-documents__stat">
            <Text type="secondary">Expiring Soon</Text>
            <Title level={3}>
              {documents.filter(d => d.status === 'expiring').length}
            </Title>
          </div>
        </Space>
      </Card>

      <Card className="owner-documents__table">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 8 }}
          scroll={{ x: true }}
          rowClassName={(record) => 
            record.status === 'expiring' ? 'owner-documents__row--expiring' : ''
          }
        />
      </Card>
    </div>
  );
};

export default OwnerDocuments;