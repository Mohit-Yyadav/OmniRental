import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  message,
  Descriptions,
  Table,
  Tag,
  Select,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;
const { Option } = Select;

const Payments = () => {
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState("");
  const [upiRef, setUpiRef] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [month, setMonth] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [propertyId, setPropertyId] = useState('');
const [ownerId, setOwnerId] = useState('');


useEffect(() => {
  const id = localStorage.getItem("paymentBookingId");
  const amt = localStorage.getItem("paymentAmount");
  const propId = localStorage.getItem("paymentPropertyId");
  const ownId = localStorage.getItem("paymentOwnerId");

  setBookingId(id);
  setAmount(amt);
  setPropertyId(propId);
  setOwnerId(ownId);

  fetchMyPayments();
}, []);


  const fetchMyPayments = async () => {
    try {
      setTableLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/payments/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load payment history");
    } finally {
      setTableLoading(false);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!upiRef.trim() || !paymentType || !month) {
      return message.warning("Please fill all required fields");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
  'http://localhost:5000/api/payments',
  {
    bookingId,
    amount,
    method: 'UPI',
    status: 'paid',
    upiReference: upiRef,
    paymentType,
    month,
    note,
    propertyId,
    ownerId
  },
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);


      message.success("✅ Payment recorded successfully!");
      localStorage.removeItem("paymentBookingId");
      localStorage.removeItem("paymentAmount");
      setUpiRef("");
      setPaymentType("");
      setMonth("");
      setNote("");
      fetchMyPayments();
    } catch (err) {
      console.error(err);
      message.error("❌ Payment submission failed");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Property",
      dataIndex: ['propertyId', 'title'],
      key: "propertyName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt) => `₹${amt}`,
    },
    {
      title: "Type",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (type) => (
        <Tag color="blue">{type ? type.toUpperCase() : "N/A"}</Tag>
      ),
    },
    {
      title: 'Month',
  dataIndex: 'month',
  key: 'month',
  render: (month) => month || 'N/A',
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "completed" || status === "paid" ? "green" : "orange"
          }
        >
          {status ? status.toUpperCase() : "PENDING"}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* UPI Payment Card */}
      <Card style={{ marginBottom: 32 }}>
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
          📲 Please pay using any UPI app (PhonePe, GPay, Paytm) to{" "}
          <strong>omnirental@upi</strong>.
        </p>

        <Select
          placeholder="Select Payment Type"
          value={paymentType}
          onChange={setPaymentType}
          style={{ marginBottom: 16, width: "100%" }}
        >
          <Option value="deposit">Deposit</Option>
          <Option value="monthly rent">Monthly Rent</Option>
          <Option value="maintenance">Maintenance</Option>
        </Select>

        <Input
          placeholder="Month (e.g., July 2025)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        <Input
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ marginBottom: 16 }}
        />

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
          disabled={!upiRef || !paymentType || !month}
        >
          Submit Payment
        </Button>
      </Card>

      {/* Payment History */}
      <Card>
        <Title level={4}>📜 My Payment History</Title>
        <Table
          dataSource={payments}
          columns={columns}
          rowKey="_id"
          loading={tableLoading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Payments;
