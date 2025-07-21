import React, { useEffect, useState } from 'react';
import { Button, message, Typography, Card } from 'antd';
import axios from 'axios';


const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

const { Title } = Typography;

const RazorpayCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [amount, setAmount] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [tenantId, setTenantId] = useState('');

  useEffect(() => {
    setAmount(localStorage.getItem('paymentAmount'));
    setBookingId(localStorage.getItem('paymentBookingId'));
    setOwnerId(localStorage.getItem('paymentOwnerId'));
    setPropertyId(localStorage.getItem('paymentPropertyId'));
    setTenantId(localStorage.getItem('paymentTenantId')); // ✅ FIXED HERE

    const storedPayment = localStorage.getItem('lastPaymentData');
    if (storedPayment) {
      try {
        setPaymentData(JSON.parse(storedPayment));
      } catch {
        console.warn('Invalid payment data in localStorage');
      }
    }
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const loadRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      message.error('❌ Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        `${BACKEND_URI}/api/payments/order`,
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
            const paymentType = localStorage.getItem('paymentType') || 'deposit';
            const note = localStorage.getItem('paymentNote') || '';
            const month = localStorage.getItem('paymentMonth') || '';

            const verifyRes = await axios.post(
              `${BACKEND_URI}/api/payments/verify`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount,
                ownerId,
                propertyId,
                tenantId, // ✅ SEND tenantId to backend
                bookingId,
                paymentType,
                month,
                note,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            localStorage.setItem('lastPaymentData', JSON.stringify(verifyRes.data.payment));
            setPaymentData(verifyRes.data.payment);
            message.success('✅ Payment successful and verified!');

            // Optional: clear temporary data
            localStorage.removeItem('paymentTenantId');
            localStorage.removeItem('paymentBookingId');
            localStorage.removeItem('paymentOwnerId');
            localStorage.removeItem('paymentPropertyId');
            localStorage.removeItem('paymentAmount');

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

        {paymentData ? (
          <>
            {/* <p><strong>Booking ID:</strong> {bookingId || '—'}</p>
            <p><strong>Tenant ID:</strong> {paymentData.tenantId || '—'}</p>
            <p><strong>Owner ID:</strong> {paymentData.ownerId}</p>
            <p><strong>Property ID:</strong> {paymentData.propertyId}</p> */}
            <p><strong>Amount:</strong> ₹{paymentData.amount}</p>
            <p><strong>Method:</strong> {paymentData.method}</p>
            <p><strong>Status:</strong> {paymentData.status}</p>
            <p><strong>Payment Type:</strong> {paymentData.paymentType}</p>
            <p><strong>Month:</strong> {paymentData.month || '—'}</p>
            <p><strong>Note:</strong> {paymentData.note || '—'}</p>
            <p><strong>Payment ID:</strong> {paymentData.razorpay_payment_id}</p>
            <p><strong>Order ID:</strong> {paymentData.razorpay_order_id}</p>
            <p><strong>Date:</strong> {new Date(paymentData.date).toLocaleString('en-IN', {
              dateStyle: 'long',
              timeStyle: 'short',
              timeZone: 'Asia/Kolkata',
            })}</p>
          </>
        ) : (
          <>
            <p><strong>Booking ID:</strong> {bookingId || '—'}</p>
            <p><strong>Amount to Pay:</strong> ₹{amount || '—'}</p>
          </>
        )}

        <Button type="primary" onClick={loadRazorpay} loading={loading} style={{ marginTop: 16 }}>
          Pay with Razorpay
        </Button>
      </Card>
    </div>
  );
};

export default RazorpayCheckout;
