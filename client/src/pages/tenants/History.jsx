import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Spin, message, Button } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const History = () => {
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentalHistory();
  }, []);

  const fetchRentalHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/tenants/my-invoices', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('🔍 Data from backend:', res.data);
      setRentalHistory(res.data);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      message.error('Failed to load rental history');
    } finally {
      setLoading(false);
    }
  };

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


const handlePayment = async (invoice) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    message.error('Failed to load Razorpay. Check your internet.');
    return;
  }

  try {
    const token = localStorage.getItem('token');

    const orderRes = await axios.post(
      '/api/payments/order',
      { amount: invoice.totalAmount },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { order } = orderRes.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: invoice.totalAmount * 100,
      currency: 'INR',
      name: 'OmniRental',
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
    tenantId: invoice.tenant?._id || invoice.tenantId || fallbackUserId,

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
        } catch (err) {
          console.error('❌ Verification failed:', err);
          message.error('Payment verification failed.');
        }
      },
      prefill: {
        name: 'Tenant',
        email: 'tenant@example.com',
      },
      theme: {
        color: '#1890ff',
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.error('❌ Payment error:', err);
    message.error('Payment failed.');
  }
};





  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      render: (val) => val || 'N/A',
    },
    {
      title: 'Property',
      dataIndex: 'property',
      key: 'property',
      render: (property) => property?.name || 'N/A',
    },
    {
      title: 'Rent',
      dataIndex: 'rent',
      key: 'rent',
      render: (val) => `₹${Number(val || 0).toLocaleString()}`,
    },
    {
      title: 'Units',
      dataIndex: 'meterUnits',
      key: 'meterUnits',
      render: (val) => Number(val || 0),
    },
    {
      title: 'Electricity (₹)',
      dataIndex: 'electricityCharge',
      key: 'electricityCharge',
      render: (val) => `₹${Number(val || 0).toLocaleString()}`,
    },
    {
      title: 'Extra',
      dataIndex: 'extraCharges',
      key: 'extraCharges',
      render: (val) => `₹${Number(val || 0).toLocaleString()}`,
    },
    {
      title: 'Total',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (val) => `₹${Number(val || 0).toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid) =>
        isPaid ? <Tag color="blue">Paid</Tag> : <Tag color="red">Unpaid</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        !record.isPaid ? (
          <Button type="primary" onClick={() => handlePayment(record)}>
            Pay Now
          </Button>
        ) : (
          <Tag color="green">✔</Tag>
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
          dataSource={rentalHistory.map((item, index) => ({
            key: item._id || index,
            ...item,
          }))}
          pagination={false}
          scroll={{ x: true }}
        />
      )}
    </div>
  );
};

export default History;
