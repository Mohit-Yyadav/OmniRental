// src/pages/tenants/Property.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Divider,
  Tag,
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

const Property = () => {
  const [form] = Form.useForm();
  const [propertyData, setPropertyData] = useState({
    propertyName: "Sunshine Apartments",
    roomNumber: "304",
    address: "456 Sunshine Ave, New York, NY 10002",
    rentAmount: 1200,
    deposit: 2400,
    leaseStart: "2023-01-15",
    leaseEnd: "2024-01-14",
    amenities: ["WiFi", "Laundry", "Parking"],
    status: "approved",
  });

  useEffect(() => {
    form.setFieldsValue({
      ...propertyData,
      leaseStart: dayjs(propertyData.leaseStart),
      leaseEnd: dayjs(propertyData.leaseEnd),
    });
  }, [form, propertyData]);

  const handleSave = () => {
    const updated = form.getFieldsValue();
    setPropertyData({
      ...updated,
      leaseStart: updated.leaseStart.format("YYYY-MM-DD"),
      leaseEnd: updated.leaseEnd.format("YYYY-MM-DD"),
    });
    console.log("Saved property details:", updated);
  };

  const statusColor = {
    approved: "green",
    pending: "orange",
    rejected: "red",
  };

  return (
    <div className="property-page" style={{ padding: "10px" }}>
      <Card
        title="Property Details"
        extra={
          <Button type="primary" onClick={handleSave}>
            Save Changes
          </Button>
        }
      >
        <div style={{ marginBottom: 20 }}>
          <Tag color={statusColor[propertyData.status]}>
            {propertyData.status.toUpperCase()}
          </Tag>
        </div>

        <Form layout="vertical" form={form}>
          <Form.Item label="Property Name" name="propertyName">
            <Input />
          </Form.Item>

          <Form.Item label="Room Number" name="roomNumber">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <TextArea rows={2} />
          </Form.Item>

          <Divider orientation="left">Lease Information</Divider>

          {/* Rent + Deposit */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Monthly Rent" name="rentAmount">
                <Input prefix="$" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Security Deposit" name="deposit">
                <Input prefix="$" type="number" />
              </Form.Item>
            </Col>
          </Row>

          {/* Lease Dates */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Lease Start Date" name="leaseStart">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Lease End Date" name="leaseEnd">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Amenities" name="amenities">
            <Select mode="multiple" placeholder="Select available amenities">
              <Option value="WiFi">WiFi</Option>
              <Option value="Laundry">Laundry</Option>
              <Option value="Parking">Parking</Option>
              <Option value="Gym">Gym</Option>
              <Option value="Pool">Swimming Pool</Option>
              <Option value="AC">Air Conditioning</Option>
            </Select>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Property;
