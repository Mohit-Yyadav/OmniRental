// src/pages/tenants/RazorpayCheckout.jsx
import React, { useEffect, useState } from 'react';
import { Button, message, Typography, Card } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const RazorpayCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [propertyId, setPropertyId] = useState('');

  useEffect(() => {
    setAmount(localStorage.getItem('paymentAmount'));
    setBookingId(localStorage.getItem('paymentBookingId'));
    setOwnerId(localStorage.getItem('paymentOwnerId'));
    setPropertyId(localStorage.getItem('paymentPropertyId'));
  }, []);

  const loadRazorpay = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        'http://localhost:5000/api/payments/order',
        { amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: 'INR',
        name: 'OmniRental',
        description: 'Property Booking Payment',
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              'http://localhost:5000/api/payments/verify',
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount,
                ownerId,
                propertyId,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            message.success('✅ Payment successful and verified!');
          } catch (err) {
            console.error(err);
            message.error('❌ Payment verification failed');
          }
        },
        theme: {
          color: '#1890ff',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      message.error('❌ Razorpay initialization failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={3}>💳 Razorpay Payment</Title>
        <p><strong>Booking ID:</strong> {bookingId}</p>
        <p><strong>Amount to Pay:</strong> ₹{amount}</p>
        <Button type="primary" onClick={loadRazorpay} loading={loading}>
          Pay with Razorpay
        </Button>
      </Card>
    </div>
  );
};

export default RazorpayCheckout;
