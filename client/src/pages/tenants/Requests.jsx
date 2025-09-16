import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Badge,
  Popconfirm,
  message,
  Tooltip,
  Typography,
} from "antd";
import {
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;
const { Text, Title } = Typography;

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const statusColors = {
    pending: "orange",
    approved: "green",
    rejected: "red",
    cancelled: "gray",
  };

  const statusIcons = {
    pending: <SyncOutlined spin />,
    approved: <CheckCircleOutlined />,
    rejected: <CloseCircleOutlined />,
    cancelled: <ExclamationCircleOutlined />,
  };

  /** ✅ Proceed to Payment handler */
  const handleProceedToPayment = (record) => {
    console.log("🔍 Booking Record:", record);

    const bookingId = record._id;
    const depositAmount = record.rent;
    const propertyId = record.propertyId?._id;
    const ownerId = record.propertyId?.owner?._id || record.ownerId;
    const tenantId = record.tenantId;

    if (!propertyId || !ownerId || !tenantId) {
      console.error("propertyId:", propertyId);
      console.error("ownerId:", ownerId);
      console.error("tenantId:", tenantId);
      return message.error("Missing property, owner, or tenant info");
    }

    localStorage.setItem("paymentBookingId", bookingId);
    localStorage.setItem("paymentAmount", depositAmount);
    localStorage.setItem("paymentPropertyId", propertyId);
    localStorage.setItem("paymentOwnerId", ownerId);
    localStorage.setItem("paymentTenantId", tenantId);

    // 👉 Option 1: Dispatch global event (if Razorpay UI handled elsewhere)
    window.dispatchEvent(new CustomEvent("switchToRazorpay"));

    // 👉 Option 2: Navigate to dedicated payment page
    // navigate("/tenant/payments");
  };

  /** ✅ Fetch Requests */
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URI}/api/booking-requests/tenant`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Cancel Request */
  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${BACKEND_URI}/api/booking-requests/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Request cancelled");
      fetchRequests();
    } catch {
      message.error("Cancel failed");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /** ✅ Table Columns */
  const columns = [
    {
      title: "Property",
      dataIndex: "propertyId",
      key: "property",
      render: (prop) => (
        <div>
          <Text strong>{prop?.name || "Untitled"}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            Room No: {prop?.roomNo || "—"} | {prop?.address || "—"}
          </Text>
        </div>
      ),
    },
    {
      title: "Move-In",
      dataIndex: "moveInDate",
      key: "moveInDate",
      render: (date) => (date ? dayjs(date).format("DD MMM YYYY") : "—"),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (d) => (d ? `${d} months` : "—"),
    },
    {
      title: "Persons",
      dataIndex: "numPersons",
      key: "numPersons",
      align: "center",
    },
    {
      title: "Rent (₹)",
      dataIndex: "rent",
      key: "rent",
      render: (r) => (r ? r.toLocaleString() : "—"),
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag icon={statusIcons[status]} color={statusColors[status]}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Owner Response",
      dataIndex: "ownerResponse",
      key: "ownerResponse",
      render: (response) =>
        response ? (
          <Tooltip title={response}>
            <Tag icon={<InfoCircleOutlined />} color="blue">
              Response
            </Tag>
          </Tooltip>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "pending" ? (
          <Popconfirm
            title="Cancel this request?"
            onConfirm={() => handleCancel(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small">
              Cancel
            </Button>
          </Popconfirm>
        ) : record.status === "approved" ? (
          <Button
            type="primary"
            size="small"
            onClick={() => handleProceedToPayment(record)}
          >
            Proceed to Payment
          </Button>
        ) : null,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>📋 My Booking Requests</Title>

      {/* ✅ Status Legend */}
      <div style={{ marginBottom: 16, flexWrap: "wrap" }}>
        <Badge color={statusColors.pending} text="Pending" style={{ marginRight: 8 }} />
        <Badge color={statusColors.approved} text="Approved" style={{ marginRight: 8 }} />
        <Badge color={statusColors.rejected} text="Rejected" style={{ marginRight: 8 }} />
        <Badge color={statusColors.cancelled} text="Cancelled" />
      </div>

      {/* ✅ Responsive Table */}
      <Table
        dataSource={requests}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        bordered
      />
    </div>
  );
};

export default Requests;
