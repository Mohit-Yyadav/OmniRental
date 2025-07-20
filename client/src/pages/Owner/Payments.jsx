
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Tabs, 
  Select, 
  Tag, 
  message, 
  Statistic,
  Row, 
  Button,
  Col,
  DatePicker
} from 'antd';
import { 
  DownloadOutlined,
  FilePdfOutlined,
  FileExcelOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Payments = () => {
  // Deposited Tenants State
  const [depositedTenants, setDepositedTenants] = useState([]);
  const [depositedLoading, setDepositedLoading] = useState(false);
  
  // Property Payments State
  const [ownerProperties, setOwnerProperties] = useState([]);
  const [propertyPayments, setPropertyPayments] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [dateRange, setDateRange] = useState([]);

  // Fetch Deposited Tenants
  useEffect(() => {
    const fetchDepositedTenants = async () => {
      try {
        setDepositedLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/payments/owner/deposits", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDepositedTenants(res.data);
      } catch (err) {
        console.error(err);
        message.error("Failed to fetch deposited tenants");
      } finally {
        setDepositedLoading(false);
      }
    };

    fetchDepositedTenants();
  }, []);

  // Fetch Owner Properties
  useEffect(() => {
    const fetchOwnerProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOwnerProperties(res.data);
      } catch (err) {
        console.error(err);
        message.error("Failed to fetch properties");
      }
    };

    fetchOwnerProperties();
  }, []);

  // Fetch Property Payments when property or date range changes
  useEffect(() => {
    if (selectedProperty) {
      fetchPropertyPayments(selectedProperty);
    }
  }, [selectedProperty, dateRange]);

  const fetchPropertyPayments = async (propertyId) => {
    try {
      setPaymentsLoading(true);
      const token = localStorage.getItem("token");
      let url = `http://localhost:5000/api/payments/property/${propertyId}`;
      
      // Add date range to URL if specified
      if (dateRange && dateRange.length === 2) {
        const params = {
          startDate: dayjs(dateRange[0]).format('YYYY-MM-DD'),
          endDate: dayjs(dateRange[1]).format('YYYY-MM-DD')
        };
        url += `?startDate=${params.startDate}&endDate=${params.endDate}`;
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPropertyPayments(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch property payments");
    } finally {
      setPaymentsLoading(false);
    }
  };

  // Calculate statistics
  const totalDeposits = depositedTenants.reduce((sum, tenant) => sum + tenant.amount, 0);
  const totalPayments = propertyPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedPayments = propertyPayments.filter(p => p.status === 'completed').length;

  // Columns for Deposited Tenants
  const depositedTenantColumns = [
    { title: 'Tenant Name', dataIndex: 'tenantName', key: 'tenantName' },
    { title: 'Email', dataIndex: 'tenantEmail', key: 'tenantEmail' },
    { title: 'Phone', dataIndex: 'tenantPhone', key: 'tenantPhone' },
    { title: 'Property', dataIndex: 'propertyName', key: 'propertyName' },
    { title: 'Room No.', dataIndex: 'roomNo', key: 'roomNo' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { 
      title: 'Amount (₹)', 
      dataIndex: 'amount', 
      key: 'amount',
      render: amount => amount.toLocaleString('en-IN') 
    },
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date', 
      render: date => dayjs(date).format('DD MMM YYYY') 
    },
    { title: 'Note', dataIndex: 'note', key: 'note' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <DownloadOutlined 
          onClick={() => downloadDepositReceipt(record)} 
          style={{ cursor: 'pointer' }}
        />
      ),
    },
  ];

  // Columns for Property Payments
  const propertyPaymentsColumns = [
    { title: 'Tenant', dataIndex: 'tenantName', key: 'tenantName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { 
      title: 'Type', 
      dataIndex: 'paymentType', 
      key: 'paymentType',
      render: type => <Tag color={type === 'rent' ? 'blue' : 'green'}>{type}</Tag>
    },
    { title: 'Month', dataIndex: 'month', key: 'month' },
    { 
      title: 'Amount (₹)', 
      dataIndex: 'amount', 
      key: 'amount',
      render: amount => amount.toLocaleString('en-IN')
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status', 
      render: status => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ) 
    },
    { 
      title: 'Date', 
      dataIndex: 'date', 
      key: 'date', 
      render: date => dayjs(date).format('DD MMM YYYY') 
    },
    { title: 'Note', dataIndex: 'note', key: 'note' },
    {
      title: 'Invoice',
      key: 'invoice',
      render: (_, record) => (
        <DownloadOutlined 
          onClick={() => downloadPaymentInvoice(record)} 
          style={{ cursor: 'pointer' }}
        />
      ),
    },
  ];

  const downloadDepositReceipt = (record) => {
    message.info(`Downloading deposit receipt for ${record.tenantName}`);
    // Implement actual download logic here
  };

  const downloadPaymentInvoice = (record) => {
    message.info(`Downloading invoice for ${record.tenantName}`);
    // Implement actual download logic here
  };

  const exportToPDF = () => {
    message.info('Exporting to PDF');
    // Implement PDF export logic
  };

  const exportToExcel = () => {
    message.info('Exporting to Excel');
    // Implement Excel export logic
  };

  return (
    <div className="owner-dashboard">
      <Card title="Owner Dashboard">
        <Tabs defaultActiveKey="deposits">
          {/* Deposited Tenants Tab */}
          <TabPane tab="Deposited Tenants" key="deposits">
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Total Deposits"
                    value={totalDeposits}
                    precision={2}
                    prefix="₹"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Total Tenants"
                    value={depositedTenants.length}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button icon={<FilePdfOutlined />} onClick={exportToPDF}>
                      PDF
                    </Button>
                    <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>
                      Excel
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>

            <Table
              columns={depositedTenantColumns}
              dataSource={depositedTenants}
              loading={depositedLoading}
              rowKey="id"
              scroll={{ x: true }}
            />
          </TabPane>

          {/* Property Payments Tab */}
          <TabPane tab="Property Payments" key="payments">
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={6}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Property"
                  onChange={setSelectedProperty}
                  loading={!ownerProperties.length}
                >
                  {ownerProperties.map(property => (
                    <Option key={property._id} value={property._id}>
                      {property.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={10}>
                <RangePicker 
                  style={{ width: '100%' }}
                  onChange={setDateRange}
                  disabled={!selectedProperty}
                />
              </Col>
              <Col span={8}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button icon={<FilePdfOutlined />} onClick={exportToPDF}>
                    PDF
                  </Button>
                  <Button icon={<FileExcelOutlined />} onClick={exportToExcel}>
                    Excel
                  </Button>
                </div>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Total Payments"
                    value={totalPayments}
                    precision={2}
                    prefix="₹"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Completed Payments"
                    value={completedPayments}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Pending Payments"
                    value={propertyPayments.length - completedPayments}
                  />
                </Card>
              </Col>
            </Row>

            <Table
              columns={propertyPaymentsColumns}
              dataSource={propertyPayments}
              loading={paymentsLoading}
              rowKey="id"
              scroll={{ x: true }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Payments;

