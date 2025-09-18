// src/pages/tenants/TenantDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Progress,
  Table,
  Tag,
  Button,
  Spin,
  Typography,
  message,
} from "antd";
import { DollarCircleOutlined, HomeOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const TenantDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [history, setHistory] = useState([]); // keep full arrays for logic
  const [payments, setPayments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [paying, setPaying] = useState(false);

  const navigate = useNavigate();

  // helper to extract property id from various shapes
  const getPropertyId = (prop) =>
    prop?._id || prop?.property?._id || prop?.id || prop?.propertyId || null;

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Login required");

        const [
          { data: propertyData },
          { data: historyData },
          { data: paymentsData },
          { data: requestsData },
        ] = await Promise.all([
          axios.get("/api/tenants/my-property", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/tenants/my-history", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/tenants/my-invoices", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/booking-requests/tenant", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Normalize property (some backends return { property, tenant } )
        let normalizedProperty = propertyData;
        if (propertyData && propertyData.property) normalizedProperty = propertyData.property;

        setProperty(normalizedProperty || null);
        setHistory(Array.isArray(historyData) ? historyData : (historyData?.records || []));
        setPayments(Array.isArray(paymentsData) ? paymentsData : (paymentsData?.invoices || []));
        setRequests(Array.isArray(requestsData) ? requestsData : (requestsData?.requests || []));
      } catch (err) {
        console.error(err);
        message.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Pay Rent (latest unpaid invoice)
  const handlePayRent = async () => {
    setPaying(true);
    try {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        await new Promise((res) => (script.onload = res));
      }

      const token = localStorage.getItem("token");

      // Get latest unpaid invoice from full payments array
      const latestInvoice = payments.find((p) => !p.isPaid);
      if (!latestInvoice) {
        message.info("No unpaid invoices available.");
        setPaying(false);
        return;
      }

      // Send paise to backend
      const orderRes = await axios.post(
        "/api/payments/order",
        { amount: latestInvoice.totalAmount * 100, invoiceId: latestInvoice._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = orderRes.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: latestInvoice.totalAmount * 100,
        currency: "INR",
        name: property?.propertyName || property?.name || "OmniRental",
        description: `Rent for ${latestInvoice.month || dayjs().format("MMMM YYYY")}`,
        order_id: order.id,
        handler: async (response) => {
          try {
            await axios.post(
              "/api/tenants/verify-invoice-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: latestInvoice.totalAmount * 100, // paise
                invoiceId: latestInvoice._id,
                propertyId: getPropertyId(property),
                paymentType: "rent",
                month: latestInvoice.month,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            message.success("Payment successful!");
            // refresh quickly — you can replace with a smarter state update
            window.location.reload();
          } catch (err) {
            console.error("Verification error:", err);
            message.error("Payment verification failed.");
          }
        },
        prefill: {
          name: "Tenant",
          email: "tenant@example.com",
        },
        theme: { color: "#1890ff" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      message.error("Payment initialization failed.");
    } finally {
      setPaying(false);
    }
  };

  // Table Columns
  const historyColumns = [
    { title: "Month", dataIndex: "month", key: "month" },
    {
      title: "Rent",
      dataIndex: "rent",
      key: "rent",
      render: (amt) => `₹${Number(amt)?.toLocaleString()}`,
    },
    { title: "Electricity Units", dataIndex: "meterUnits", key: "meterUnits" },
    {
      title: "Status",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (paid) => (
        <Tag color={paid ? "green" : "red"}>{paid ? "PAID" : "UNPAID"}</Tag>
      ),
    },
  ];

  const paymentColumns = [
    { title: "Invoice No", dataIndex: "_id", key: "_id" },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amt) => `₹${Number(amt)?.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (paid) => (
        <Tag color={paid ? "green" : "red"}>{paid ? "PAID" : "UNPAID"}</Tag>
      ),
    },
  ];

  const requestColumns = [
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "pending" ? "orange" : "green"}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
  ];

  if (loading)
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );

  // property id (safe)
  const propertyId = getPropertyId(property);

  return (
    <div style={{ padding: 16 }}>
      <Title level={3}>🏠 Tenant Dashboard</Title>

      <Row gutter={[16, 16]}>
        {/* Rent Status */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Progress
                type="circle"
                percent={property?.isRentPaid ? 100 : 0}
                status={property?.isRentPaid ? "success" : "exception"}
                format={() => (property?.isRentPaid ? "Paid" : "Unpaid")}
              />
              <div>
                <Text strong>Next Due:</Text>{" "}
                {property?.nextDueDate
                  ? dayjs(property.nextDueDate).format("DD/MM/YYYY")
                  : "N/A"}
                <br />
                <Text strong>
                  Amount: ₹{Number(property?.rentAmount)?.toLocaleString()}
                </Text>
                <br />
                {payments.some((p) => !p.isPaid) && (
                  <Button
                    type="primary"
                    loading={paying}
                    onClick={handlePayRent}
                    style={{ marginTop: 8 }}
                  >
                    Pay Latest Rent
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </Col>

        {/* Property Summary */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <Card title={<span><HomeOutlined /> Property Summary</span>}>
            {property ? (
              <>
                <p>
                  <strong>Name:</strong>{" "}
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => propertyId && navigate(`/property/${propertyId}`)}
                  >
                    {property.propertyName || property.name || "Unnamed Property"}
                  </a>
                </p>

                <p><strong>Room No:</strong> {property.roomNumber || property.roomNo || "-"}</p>
                <p><strong>Address:</strong> {property.address || "-"}</p>
                <p>
                  <strong>Lease:</strong>{" "}
                  {property.leaseStart ? dayjs(property.leaseStart).format("DD/MM/YYYY") : "N/A"} {" → "}
                  {property.leaseEnd ? dayjs(property.leaseEnd).format("DD/MM/YYYY") : "N/A"}
                </p>

                <div style={{ marginTop: 8 }}>
                  <Button
                    type="default"
                    size="small"
                    onClick={() => propertyId && navigate(`/property/${propertyId}`)}
                  >
                    View Property
                  </Button>
                </div>
              </>
            ) : (
              <Text type="secondary">No property assigned</Text>
            )}
          </Card>
        </Col>

        {/* Requests */}
        <Col xs={24} sm={24} md={24} lg={8}>
      <Card
  title={<span><DollarCircleOutlined /> My Requests</span>}
  extra={
    <Button size="small" onClick={() => navigate("/tenant/requests")}>
  View More
</Button>

  }
>
 <Table
  dataSource={requests.slice(0, 3)}  // show only first 3 requests
  columns={requestColumns}
  rowKey={(r) => r._id || r.id}
  size="small"
  pagination={false}
  locale={{ emptyText: "No requests" }}
/>

</Card>

        </Col>

        {/* Rental History */}
        <Col xs={24}>
          <Card
            title="Rental History"
            extra={
              <Button size="small" onClick={() => navigate("/tenant/history")}>
                View More
              </Button>
            }
          >
            <Table
              dataSource={history.slice(0, 5)}
              columns={historyColumns}
              rowKey={(r) => r._id || r.id}
              size="small"
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: "No history found" }}
            />
          </Card>
        </Col>

        {/* Payments */}
        <Col xs={24}>
          <Card
            title="Payments / Invoices"
            extra={
              <Button size="small" onClick={() => navigate("/tenant/payments")}>
                View More
              </Button>
            }
          >
            <Table
              dataSource={payments.slice(0, 5)}
              columns={paymentColumns}
              rowKey={(r) => r._id || r.id}
              size="small"
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: "No payments found" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TenantDashboard;
