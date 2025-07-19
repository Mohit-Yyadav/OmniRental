import React, { useEffect, useState } from 'react';
import { Card, Typography, Input, Button, message, Descriptions } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Payments = () => {
  const [bookingId, setBookingId] = useState('');
  const [amount, setAmount] = useState('');
  const [upiRef, setUpiRef] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('paymentBookingId');
    const amt = localStorage.getItem('paymentAmount');
    setBookingId(id);
    setAmount(amt);
  }, []);

  const handlePaymentSubmit = async () => {
    if (!upiRef.trim()) {
      return message.warning('Please enter your UPI transaction reference ID');
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      await axios.post(
        'http://localhost:5000/api/payments',
        {
          bookingId,
          amount,
          method: 'UPI',
          status: 'paid',
          upiReference: upiRef,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      message.success('✅ Payment recorded successfully!');
      localStorage.removeItem('paymentBookingId');
      localStorage.removeItem('paymentAmount');
      setUpiRef('');
    } catch (err) {
      console.error(err);
      message.error('❌ Payment submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={3}>💳 UPI Payment</Title>

        <Descriptions bordered column={1} style={{ marginBottom: 16 }}>
          <Descriptions.Item label="Booking ID">{bookingId}</Descriptions.Item>
          <Descriptions.Item label="Amount to Pay (₹)">
            ₹{parseInt(amount || 0).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="UPI ID to Pay To">
            <strong>omnirental@upi</strong>
          </Descriptions.Item>
        </Descriptions>

        <p>
          📲 Please make the payment using any UPI app (PhonePe, GPay, Paytm) to <strong>omnirental@upi</strong>.
        </p>

        <Input
          placeholder="Enter your UPI transaction reference ID"
          value={upiRef}
          onChange={(e) => setUpiRef(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <Button
          type="primary"
          onClick={handlePaymentSubmit}
          loading={loading}
          disabled={!upiRef}
        >
          Submit Payment
        </Button>
      </Card>
    </div>
  );
};

export default Payments;
