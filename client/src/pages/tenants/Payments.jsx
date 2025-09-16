import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Table,
  Tag,
  Space,
  Statistic,
  Row,
  Col,
  DatePicker,
  Select,
  Button,
  message
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import {
  FileDoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined
} from "@ant-design/icons";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [stats, setStats] = useState({
    totalPayments: 0,
    totalAmount: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    fetchMyPayments();
  }, []);

  const fetchMyPayments = async (params = {}) => {
    try {
      setTableLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URI}/api/payments/my`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setPayments(res.data);
      calculateStats(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load payment history");
    } finally {
      setTableLoading(false);
    }
  };

  const calculateStats = (data) => {
    const totalAmount = data.reduce((sum, payment) => sum + payment.amount, 0);
    const completed = data.filter(
      (p) => p.status === "paid" || p.status === "completed"
    ).length;
    const pending = data.filter((p) => p.status === "pending").length;

    setStats({
      totalPayments: data.length,
      totalAmount,
      completed,
      pending,
    });
  };

  const handleDateFilter = (dates) => {
    if (dates && dates.length === 2) {
      fetchMyPayments({
        from: dates[0].toISOString(),
        to: dates[1].toISOString(),
      });
    } else {
      fetchMyPayments();
    }
  };

  const handleStatusFilter = (status) => {
    fetchMyPayments(status ? { status } : {});
  };

  const handleTypeFilter = (type) => {
    fetchMyPayments(type ? { paymentType: type } : {});
  };

  const columns = [
    {
      title: "Property",
      dataIndex: ["propertyId", "title"],
      key: "propertyName",
      render: (title, record) => (
        <Space direction="vertical">
          <Text strong>{title || "N/A"}</Text>
          <Text type="secondary">{record.propertyId?.address || "N/A"}</Text>
        </Space>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amt) => (
        <Statistic value={amt} prefix="₹" valueStyle={{ fontSize: 16 }} />
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Type",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (type) => (
        <Tag
          color={
            type === "monthly rent"
              ? "blue"
              : type === "deposit"
              ? "purple"
              : "cyan"
          }
        >
          {type ? type.toUpperCase() : "N/A"}
        </Tag>
      ),
      filters: [
        { text: "Monthly Rent", value: "monthly rent" },
        { text: "Deposit", value: "deposit" },
        { text: "Maintenance", value: "maintenance" },
      ],
      onFilter: (value, record) => record.paymentType === value,
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      render: (month) => month || "N/A",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("DD MMM YYYY, hh:mm A"),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          icon={
            status === "paid" || status === "completed" ? (
              <CheckCircleOutlined />
            ) : (
              <ClockCircleOutlined />
            )
          }
          color={
            status === "completed" || status === "paid"
              ? "green"
              : status === "failed"
              ? "red"
              : "orange"
          }
        >
          {status ? status.toUpperCase() : "PENDING"}
        </Tag>
      ),
      filters: [
        { text: "Paid", value: "paid" },
        { text: "Pending", value: "pending" },
        { text: "Failed", value: "failed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Payment History
      </Title>

      {/* ✅ Responsive Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic
              title="Total Payments"
              value={stats.totalPayments}
              prefix={<FileDoneOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic
              title="Total Amount"
              value={stats.totalAmount}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic
              title="Completed"
              value={stats.completed}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={stats.pending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
      </Row>

      {/* ✅ Responsive Filters */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Date Range:</Text>
              <RangePicker
                onChange={handleDateFilter}
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
              />
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Status:</Text>
              <Select
                placeholder="Filter by status"
                style={{ width: "100%" }}
                onChange={handleStatusFilter}
                allowClear
              >
                <Option value="paid">Paid</Option>
                <Option value="pending">Pending</Option>
                <Option value="failed">Failed</Option>
              </Select>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Type:</Text>
              <Select
                placeholder="Filter by type"
                style={{ width: "100%" }}
                onChange={handleTypeFilter}
                allowClear
              >
                <Option value="monthly rent">Monthly Rent</Option>
                <Option value="deposit">Deposit</Option>
                <Option value="maintenance">Maintenance</Option>
              </Select>
            </Space>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Button block onClick={() => fetchMyPayments()}>
              Reset Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* ✅ Payment Table */}
      <Card>
        <Table
          dataSource={payments}
          columns={columns}
          rowKey="_id"
          loading={tableLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} payments`,
          }}
          scroll={{ x: true }}
          bordered
        />
      </Card>
    </div>
  );
};

export default Payments;
