// client/src/pages/History.jsx
import React, { useEffect, useState } from 'react';
import {
  Table,
  Tag,
  Typography,
  Spin,
  message,
  Button,
  Drawer,
  Descriptions,
  Row,
  Col,
  Space,
} from 'antd';
import axios from 'axios';

const { Title } = Typography;

// Helper functions
const fmt = (v) => `₹${Number(v || 0).toLocaleString()}`;
const num = (v) => Number(v || 0);

const History = () => {
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    fetchRentalHistory();
  }, []);

  const fetchRentalHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/tenants/my-invoices', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRentalHistory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      message.error('Failed to load rental history');
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async (invoice) => {
    setPaying(true);
    try {
      const ok = await loadRazorpayScript();
      if (!ok) {
        message.error('Failed to load Razorpay SDK.');
        setPaying(false);
        return;
      }

      const token = localStorage.getItem('token');

      const orderRes = await axios.post(
        '/api/payments/order',
        { amount: invoice.totalAmount, invoiceId: invoice._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: invoice.totalAmount * 100,
        currency: 'INR',
        name: invoice.property?.name || 'OmniRental',
        description: `Invoice for ${invoice.month}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
              '/api/tenants/verify-invoice-payment',
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: invoice.totalAmount,
                tenantId: invoice.tenant?._id || invoice.tenantId,
                ownerId: invoice.ownerId?._id || invoice.ownerId,
                propertyId: invoice.property?._id || invoice.propertyId,
                paymentType: 'rent',
                month: invoice.month || '',
                note: invoice.note || '',
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            message.success('Payment successful!');
            fetchRentalHistory();
            setDrawerVisible(false);
          } catch (err) {
            console.error('❌ Verification failed:', err);
            message.error('Payment verification failed.');
          }
        },
        prefill: {
          name: invoice.tenant?.name || invoice.tenantName || 'Tenant',
          email: invoice.tenant?.email || invoice.tenantEmail || 'tenant@example.com',
        },
        theme: { color: '#1890ff' },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error('❌ Payment error:', err);
      message.error('Payment initialization failed.');
    } finally {
      setPaying(false);
    }
  };

  const openDrawer = (invoice) => {
    setSelectedInvoice(invoice);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedInvoice(null);
  };

  const columns = [
    { title: 'Month', dataIndex: 'month', key: 'month', render: (m) => m || 'N/A' },
    { title: 'Property', dataIndex: 'property', key: 'property', render: (p) => p?.name || 'N/A' },
    { title: 'Rent', dataIndex: 'rent', key: 'rent', render: (r) => fmt(r) },
    { title: 'Prev Reading', dataIndex: 'previousReading', key: 'previousReading', render: (v) => v ?? '—' },
    { title: 'New Reading', dataIndex: 'newMeterReading', key: 'newMeterReading', render: (v) => v ?? '—' },
    { title: 'Units', dataIndex: 'meterUnits', key: 'meterUnits', render: (u) => num(u) },
    { title: 'Electricity', dataIndex: 'electricityCharge', key: 'electricityCharge', render: (v) => fmt(v) },
    { title: 'Extra', dataIndex: 'extraCharges', key: 'extraCharges', render: (v) => fmt(v) },
    { title: 'Total', dataIndex: 'totalAmount', key: 'totalAmount', render: (v) => <b>{fmt(v)}</b> },
    { title: 'Status', dataIndex: 'isPaid', key: 'isPaid', render: (isPaid) => (isPaid ? <Tag color="blue">Paid</Tag> : <Tag color="red">Unpaid</Tag>) },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openDrawer(record)}>View</Button>
          {!record.isPaid ? <Button type="primary" loading={paying} onClick={() => handlePayment(record)}>Pay Now</Button> : <Tag color="green">✔</Tag>}
        </Space>
      ),
    },
  ];

  return (
    <div className="tenant-history" style={{ padding: 20 }}>
      <Title level={3}>📜 Rental History</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={rentalHistory.map((item, idx) => ({ key: item._id || idx, ...item }))}
          pagination={{ pageSize: 8 }}
          scroll={{ x: true }}
        />
      )}

      {/* Drawer for detailed invoice */}
      <Drawer
        title={selectedInvoice ? `Invoice — ${selectedInvoice.month || ''}` : 'Invoice'}
        width={520}
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
      >
        {selectedInvoice ? (
          <>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Property">{selectedInvoice.property?.name || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Month">{selectedInvoice.month || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Rent">{fmt(selectedInvoice.rent)}</Descriptions.Item>
              <Descriptions.Item label="Previous Reading">{selectedInvoice.previousReading ?? '—'}</Descriptions.Item>
              <Descriptions.Item label="New Reading">{selectedInvoice.newMeterReading ?? '—'}</Descriptions.Item>
              <Descriptions.Item label="Units">{num(selectedInvoice.meterUnits)}</Descriptions.Item>
              <Descriptions.Item label="Electricity">{fmt(selectedInvoice.electricityCharge)}</Descriptions.Item>
              <Descriptions.Item label="Extra">{fmt(selectedInvoice.extraCharges)}</Descriptions.Item>
              <Descriptions.Item label="Total">{fmt(selectedInvoice.totalAmount)}</Descriptions.Item>
              <Descriptions.Item label="Status">{selectedInvoice.isPaid ? <Tag color="green">Paid</Tag> : <Tag color="red">Unpaid</Tag>}</Descriptions.Item>
            </Descriptions>

           <Row justify="end" style={{ marginTop: 16 }}>
  <Col>
    <Space>
      {!selectedInvoice.isPaid && (
        <Button type="primary" loading={paying} onClick={() => handlePayment(selectedInvoice)}>
          Pay Now
        </Button>
      )}
      <Button onClick={() => window.print()}>Print</Button>
    </Space>
  </Col>
</Row>

          </>
        ) : (
          <Spin />
        )}
      </Drawer>
    </div>
  );
};

export default History;
