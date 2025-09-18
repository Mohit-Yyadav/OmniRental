// src/pages/tenants/Property.jsx
import React, { useEffect, useState } from "react";
import {
  Card,
  Tag,
  Descriptions,
  Image,
  Spin,
  Alert,
  Divider,
  Collapse,
  Row,
  Col,
  List,
  Button,
} from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;

const Property = () => {
  const [data, setData] = useState(null); // { tenant, property }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenantProperty = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // JWT token
        if (!token) throw new Error("No token found. Please login.");

        const res = await axios.get("/api/tenants/my-property", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(res.data);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch property");
      } finally {
        setLoading(false);
      }
    };

    fetchTenantProperty();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" tip="Loading property details..." />
      </div>
    );
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  if (!data) return <p>No property data available.</p>;

  const { property: prop, tenant: tenantData } = data;

  const statusColor = {
    Occupied: "green",
    Vacant: "orange",
    Pending: "blue",
    Rejected: "red",
    active: "green",
  };

  const handleSeeProperty = () => {
    if (prop?._id) {
      navigate(`/property/${prop._id}`);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: 1200, margin: "0 auto" }}>
      <Row gutter={[24, 24]}>
        {/* Property Card */}
        <Col xs={24} md={12}>
          <Card
            title={`${prop.name} (${prop.roomNo})`}
            bordered
            extra={
              <Button type="primary" onClick={handleSeeProperty}>
                See Property
              </Button>
            }
          >
            <Tag color={statusColor[prop.status]} style={{ marginBottom: 20 }}>
              {prop.status.toUpperCase()}
            </Tag>

            <Descriptions bordered column={1} size="middle" layout="vertical">
              <Descriptions.Item label="Address">{prop.address}</Descriptions.Item>
              <Descriptions.Item label="Status">{prop.status}</Descriptions.Item>
              <Descriptions.Item label="Location">
                {prop.location ? (
                  <a href={prop.location} target="_blank" rel="noopener noreferrer">
                    View on Map
                  </a>
                ) : (
                  <p>Not available</p>
                )}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Collapse ghost>
              <Panel header="Property Features" key="1">
                {prop.personRents?.length > 0 ? (
                  <List
                    dataSource={prop.personRents}
                    renderItem={(person) => (
                      <List.Item>
                        <strong>{person.type}</strong> - {person.furnished}, Sharing: {person.sharing}, Description: {person.description}
                      </List.Item>
                    )}
                    size="small"
                  />
                ) : (
                  <p>No features listed</p>
                )}
              </Panel>

              <Panel header="Amenities" key="2">
                {prop.amenities?.length > 0 ? (
                  <List
                    dataSource={prop.amenities}
                    renderItem={(item) => <List.Item>- {item}</List.Item>}
                    size="small"
                  />
                ) : (
                  <p>No amenities listed</p>
                )}
              </Panel>

              <Panel header="Images" key="3">
                {prop.images?.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {prop.images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        width="100%"
                        style={{
                          marginBottom: 10,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <p>No images available</p>
                )}
              </Panel>
            </Collapse>
          </Card>
        </Col>

        {/* Tenant Card */}
        <Col xs={24} md={12}>
          <Card title={`Tenant: ${tenantData.tenantId?.name || "-"}`} bordered>
            <Descriptions bordered column={1} size="middle" layout="vertical">
              <Descriptions.Item label="Name">{tenantData.tenantId?.name || "-"}</Descriptions.Item>
              <Descriptions.Item label="Members">{tenantData.members}</Descriptions.Item>
              <Descriptions.Item label="Rent Amount">₹{tenantData.rent}</Descriptions.Item>
              <Descriptions.Item label="Meter Number">{tenantData.meterNumber}</Descriptions.Item>
              <Descriptions.Item label="Price per Unit">₹{tenantData.pricePerUnit}</Descriptions.Item>
              <Descriptions.Item label="Lease Start Date">
                {dayjs(tenantData.startDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="Lease End Date">
                {dayjs(tenantData.endDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="Status">{tenantData.status}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Property;
