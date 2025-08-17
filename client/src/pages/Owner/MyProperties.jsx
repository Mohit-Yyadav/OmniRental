// src/components/owner/MyProperties.jsx
import React, { useState, useEffect } from "react";
import { Avatar } from 'antd';
import { EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Row,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  Divider,
  Empty,
  Spin,
  message,
  Upload,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  HomeOutlined,
  DollarOutlined,
  AreaChartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const { Option } = Select;
const { RangePicker } = DatePicker;

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [searchParams, setSearchParams] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKEND_URL}/api/properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProperties(res.data);
      } catch (error) {
        console.error("❌ Error fetching properties:", error);
        message.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleAddProperty = () => {
    setEditingProperty(null);
    form.resetFields();
    setIsModalVisible(true);
  };

const handleEditProperty = (property) => {
  setEditingProperty(property);
  form.setFieldsValue({
  ...property,
  roomNo: property.roomNo || "",
  amenities: Array.isArray(property.amenities)
      ? property.amenities
      : (property.amenities || "").split(","),
  images: (property.images || []).map((filename, index) => ({
    uid: index.toString(),
    name: filename,
    status: 'done',
    url: `${BACKEND_URL}/uploads/${filename}`, // ✅ Full URL
  })),
});

  setIsModalVisible(true);
};


const handleDeleteProperty = async (id) => {
  Modal.confirm({
    title: "Are you sure you want to delete this property?",
    content: "This action cannot be undone.",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    async onOk() {
      try {
        const token = localStorage.getItem("token");
        
        // 1. Make the API call
        const response = await axios.delete(
          `${BACKEND_URL}/api/properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 2. Check if deletion was successful
        if (response.status === 200 || response.status === 204) {
          // 3. Update the state
          setProperties(prevProperties => 
            prevProperties.filter(property => property._id !== id)
          );
          message.success("Property deleted successfully");
        } else {
          throw new Error("Failed to delete property");
        }
      } catch (error) {
        console.error("Delete error:", error);
        message.error(
          error.response?.data?.message || "Failed to delete property"
        );
      }
    },
    onCancel() {
      console.log("Delete cancelled");
    },
  });
};


  const handleSearch = (values) => {
    setSearchParams(values);
    // Implement search functionality here
  };

  const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) return e;
  return e && e.fileList ? e.fileList : [];
};


  const columns = [
    {
      title: "Room No",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    // {
    //   title: "Property Name",
    //   dataIndex: "name",
    //   key: "name",
    //   render: (text, record) => (
    //     <Link
    //       to={`/owner/properties/${record.id}`}
    //       className="owner-properties__property-link"
    //     >
    //       <HomeOutlined className="owner-properties__property-icon" /> {text}
    //     </Link>
    //   ),
    // },
      {
  title: "Property",
  dataIndex: "name",
  key: "name",
  render: (text, record) => (
    <Link to={`/owner/properties/${record._id}`} className="property-link">
      <div className="d-flex align-items-center">
        <Avatar
          src={
            record.images?.[0]
              ? `${BACKEND_URL}/uploads/${record.images[0]}`
              : null
          }
          icon={<HomeOutlined />}
          className="me-3"
        />
        <div>
          <div className="font-weight-bold">{text}</div>
          <div className="text-muted small">{record.type}</div>
        </div>
      </div>
    </Link>
  ),
},


    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Occupied" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Monthly Rent",
      dataIndex: "rent",
      key: "rent",
      render: (rent, record) => {
  const baseRent = record.rent || record.personRents?.[0]?.rent || 0;
  return (
    <span className="owner-properties__rent-value">
      <DollarOutlined /> {baseRent.toLocaleString()}
    </span>
  );
}

    },
   {
  title: "Actions",
  key: "actions",
  render: (_, record) => (
    <Space size="middle">
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => window.open(`/property/${record._id}`, '_blank')}
        title="View"
      />
      <Button
        type="text"
        icon={<EditOutlined className="owner-properties__action-icon" />}
        onClick={() => handleEditProperty(record)}
        className="owner-properties__edit-btn"
        title="Edit"
      />
     <Button
  type="text"
  danger
  icon={<DeleteOutlined />}
  onClick={() => handleDeleteProperty(record._id)}
  title="Delete"
/>

    </Space>
  ),
}

  ];

  return (
    <div className="owner-properties__container">
      <div className="owner-properties__header">
        <h2 className="owner-properties__title">My Properties</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddProperty}
          className="owner-properties__add-btn"
        >
          Add Property
        </Button>
      </div>

      <Card className="owner-properties__search-card">
        <Form form={form} layout="vertical" onFinish={handleSearch}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="search" label="Search">
                <Input
                  placeholder="Property name or address"
                  prefix={
                    <SearchOutlined className="owner-properties__search-icon" />
                  }
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="type" label="Property Type">
                <Select placeholder="All Types">
                  <Option value="apartment">Apartment</Option>
                  <Option value="house">House</Option>
                  <Option value="condo">Condo</Option>
                  <Option value="commercial">Commercial</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="status" label="Status">
                <Select placeholder="All Statuses">
                  <Option value="occupied">Occupied</Option>
                  <Option value="vacant">Vacant</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item name="dateRange" label="Purchased Date">
                <RangePicker className="owner-properties__date-picker" />
              </Form.Item>
            </Col>
          </Row>
          <div className="owner-properties__search-actions">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setSearchParams({});
              }}
              className="owner-properties__reset-btn"
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card>

      <div className="owner-properties__stats">
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="owner-properties__stat-card">
              <div className="owner-properties__stat-content">
                <AreaChartOutlined className="owner-properties__stat-icon" />
                <div>
                  <p className="owner-properties__stat-label">
                    Total Properties
                  </p>
                  <h3 className="owner-properties__stat-value">
                    {properties.length}
                  </h3>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="owner-properties__stat-card">
              <div className="owner-properties__stat-content">
                <HomeOutlined className="owner-properties__stat-icon" />
                <div>
                  <p className="owner-properties__stat-label">Occupied Units</p>
                  <h3 className="owner-properties__stat-value">
                    {properties.filter((p) => p.status === "Occupied").length}
                  </h3>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="owner-properties__stat-card">
              <div className="owner-properties__stat-content">
                <HomeOutlined className="owner-properties__stat-icon" />
                <div>
                  <p className="owner-properties__stat-label">Vacant Units</p>
                  <h3 className="owner-properties__stat-value">
                    {properties.filter((p) => p.status === "Vacant").length}
                  </h3>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card className="owner-properties__stat-card">
              <div className="owner-properties__stat-content">
                <DollarOutlined className="owner-properties__stat-icon" />
                <div>
                  <p className="owner-properties__stat-label">Monthly Income</p>
                  <h3 className="owner-properties__stat-value">
                    $
                    {properties
  .reduce(
    (sum, p) =>
      sum + (p.status === "Occupied" && typeof p.rent === "number" ? p.rent : 0),
    0
  )
  .toLocaleString()}

                  </h3>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Card className="owner-properties__list-card">
        {loading ? (
          <div className="owner-properties__loading">
            <Spin size="large" />
          </div>
        ) : properties.length > 0 ? (
          <Table
            columns={columns}
            dataSource={properties}
            rowKey="_id"
            className="owner-properties__table"
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
            }}
          />
        ) : (
          <Empty
            description="No properties found"
            className="owner-properties__empty"
          >
            <Button type="primary" onClick={handleAddProperty}>
              Add Your First Property
            </Button>
          </Empty>
        )}
      </Card>

      <Modal
        title={editingProperty ? "Edit Property" : "Add New Property"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        className="owner-properties__modal"
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={editingProperty || {}}
onFinish={async (values) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
console.log("🛂 Token before request:", token);
console.log("📦 FormData preview:");
for (let pair of formData.entries()) {
  console.log(pair[0] + ":", pair[1]);
}

    // ✅ Append non-image fields
    for (const key in values) {
  if (key === "amenities" && Array.isArray(values[key])) {
    formData.append("amenities", values[key].join(','));
  } else if (key === "personRents") {
    formData.append("personRents", JSON.stringify(values.personRents));
  } else if (key !== "images") {
    formData.append(key, values[key]);
  }
}



    // ✅ Append image files
    (values.images || []).forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    let response;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // ❌ REMOVE Content-Type to let Axios handle it
      },
    };

    if (editingProperty) {
      response = await axios.put(
        `${BACKEND_URL}/api/properties/${editingProperty._id}`,
        formData,
        config
      );

      setProperties((prev) =>
        prev.map((property) =>
          property._id === editingProperty._id ? response.data : property
        )
      );
      message.success("Property updated successfully");
    } else {
      response = await axios.post(
       `${BACKEND_URL}/api/properties`,
        formData,
        config
      );

      setProperties([...properties, response.data]);
      message.success("Property added successfully");
    }

    setIsModalVisible(false);
    form.resetFields();
  } catch (error) {
    console.error("❌ Error saving property:", error);
    message.error("Failed to save property");
  }
}}


        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="roomNo"
                label="Room No"
                rules={[
                  { required: true, message: "Please enter room number" },
                ]}
              >
                <Input placeholder="Enter room number (e.g., 101, A-1)" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="name"
                label="Property Name"
                rules={[
                  { required: true, message: "Please enter property name" },
                ]}
              >
                <Input placeholder="Enter property name" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="address"
                label="Address / Location"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input.TextArea rows={3} placeholder="Enter full address" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.List name="personRents">
  {(fields, { add, remove }) => (
    <>
      <label style={{ fontWeight: 600 }}>Rent Per Number of Persons</label>
      {fields.map(({ key, name, ...restField }) => (
        <Row gutter={16} key={key} style={{ marginBottom: 12 }}>
          <Col span={12}>
            <Form.Item
              {...restField}
              name={[name, 'persons']}
              rules={[{ required: true, message: 'Enter number of persons' }]}
            >
              <Input type="number" min={1} placeholder="e.g. 1, 2, 3" />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              {...restField}
              name={[name, 'rent']}
              rules={[{ required: true, message: 'Enter rent amount' }]}
            >
              <Input type="number" placeholder="e.g. 5000" />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button
              type="text"
              danger
              onClick={() => remove(name)}
              icon={<DeleteOutlined />}
            />
          </Col>
        </Row>
      ))}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() => add()}
          block
          icon={<PlusOutlined />}
        >
          Add Rent Slab
        </Button>
      </Form.Item>
    </>
  )}
</Form.List>

            </Col>

            <Col span={12}>
              <Form.Item
                name="type"
                label="Room Type"
                rules={[{ required: true, message: "Please select room type" }]}
              >
                <Select placeholder="Select room type">
                  <Option value="Flate">Flat</Option>
                  <Option value="House">House</Option>
                  <Option value="Room">Room</Option>
                  <Option value="1RK">1RK</Option>
                  <Option value="1BHK">1BHK</Option>
                  <Option value="2BHK">2BHK</Option>
                  <Option value="Commercial">3BHK</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="furnished"
                label="Furnished Status"
                rules={[
                  { required: true, message: "Please select furnished status" },
                ]}
              >
                <Select placeholder="Select furnished status">
                  <Option value="Fully Furnished">Fully Furnished</Option>
                  <Option value="Semi Furnished">Semi Furnished</Option>
                  <Option value="Unfurnished">Unfurnished</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="sharing"
                label="Sharing"
                rules={[
                  { required: true, message: "Please select sharing type" },
                ]}
              >
                <Select placeholder="Select sharing type">
                  <Option value="Single">Single</Option>
                  <Option value="Shared">Shared</Option>
                  <Option value="Whole Unit">Whole Unit</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea
                  rows={4}
                  placeholder="Enter property description"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="amenities" label="Amenities">
                <Select
                  mode="multiple"
                  placeholder="Select amenities"
                  optionLabelProp="label"
                >
                  <Option value="wifi" label="WiFi">
                    WiFi
                  </Option>
                  <Option value="ac" label="AC">
                    Air Conditioning
                  </Option>
                  <Option value="parking" label="Parking">
                    Parking
                  </Option>
                  <Option value="laundry" label="Laundry">
                    Laundry
                  </Option>
                  <Option value="gym" label="Gym">
                    Gym
                  </Option>
                  <Option value="pool" label="Pool">
                    Swimming Pool
                  </Option>
                  <Option value="security" label="Security">
                    24/7 Security
                  </Option>
                   <Option value="water Coller" label="Water Coller">
                    Water Coller
                  </Option>
                   <Option value="library" label="Library">
                    Library
                  </Option>
                   <Option value="mesh" label="Mesh">
                    Mesh
                  </Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
  name="images"
  label="Images"
  valuePropName="fileList"
  getValueFromEvent={normFile}
>
  <Upload
    listType="picture-card"
    beforeUpload={() => false}
    multiple
  >
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  </Upload>
</Form.Item>

            </Col>

            <Col span={24}>
              <Form.Item name="location" label="Google Location">
                <Input placeholder="Enter Google Maps link or coordinates" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingProperty ? "Update Property" : "Add Property"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyProperties;
