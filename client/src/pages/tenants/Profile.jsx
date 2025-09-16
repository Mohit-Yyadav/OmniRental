// src/pages/tenants/Profile.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Upload,
  Select,
  Row,
  Col,
  message,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  SaveOutlined,
  UploadOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import useAuth from "../../context/useAuth";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URL;
const { Option } = Select;

const Profile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [idProofFile, setIdProofFile] = useState(null);

  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "",
    address: user?.address || "",
    emergencyContact: user?.emergencyContact || "",
    idProofNumber: user?.idProofNumber || "",
    occupation: user?.occupation || "",
    age: user?.age || "",
    gender: user?.gender || "",
    familyMembers: user?.familyMembers || "",
    idProofDoc: user?.idProofDoc || null,
    profilePic:
      user?.profilePic ||
      "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(`${BACKEND_URI}/api/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        if (!data?.user) throw new Error("Invalid profile response");
        setProfileData(data.user);
        form.setFieldsValue(data.user);
      } catch (error) {
        console.error(error);
        message.error(error.message || "Could not load profile");
      }
    };
    fetchProfile();
  }, [form]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, value);
      });
      if (avatarFile) formData.append("profilePic", avatarFile);
      if (idProofFile) formData.append("idProofDoc", idProofFile);

      const token = localStorage.getItem("token");
      const res = await fetch(`${BACKEND_URI}/api/user/me/upload`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");

      setProfileData(data.user);
      setEditMode(false);
      setAvatarFile(null);
      setIdProofFile(null);
      message.success("Profile updated successfully");
    } catch (error) {
      message.error(error.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(profileData);
    setEditMode(false);
    setAvatarFile(null);
    setIdProofFile(null);
  };

  const handleAvatarChange = ({ file }) => {
    if (file && file.originFileObj) {
      setAvatarFile(file.originFileObj);
      setProfileData((prev) => ({
        ...prev,
        profilePic: URL.createObjectURL(file.originFileObj),
      }));
    }
  };

  const handleIdProofChange = ({ file }) => {
    if (file && file.originFileObj) {
      setIdProofFile(file.originFileObj);
    }
  };

  const getAvatarSrc = () => {
    if (avatarFile instanceof File) return URL.createObjectURL(avatarFile);
    if (profileData?.profilePic?.startsWith("http"))
      return profileData.profilePic;
    return `${BACKEND_URI}${profileData.profilePic}`;
  };

  return (
    <div className="profile-page" style={{ padding: "10px" }}>
      <Card
        title="Tenant Profile"
        extra={
          editMode ? (
            <>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
                loading={loading}
                style={{ marginRight: 8 }}
              >
                Save
              </Button>
              <Popconfirm
                title="Discard changes?"
                onConfirm={handleCancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Cancel</Button>
              </Popconfirm>
            </>
          ) : (
            <Button icon={<EditOutlined />} onClick={() => setEditMode(true)}>
              Edit
            </Button>
          )
        }
      >
        <Row gutter={[16, 16]}>
          {/* Avatar Section */}
          <Col xs={24} sm={24} md={8} lg={6} style={{ textAlign: "center" }}>
            <div style={{ position: "relative" }}>
              <Avatar size={128} src={getAvatarSrc()} />
              {editMode && (
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleAvatarChange}
                >
                  <Button
                    type="link"
                    icon={<CameraOutlined />}
                    style={{ position: "absolute", bottom: 0, right: 40 }}
                  />
                </Upload>
              )}
            </div>
            <p style={{ marginTop: 10 }}>{profileData.name}</p>
          </Col>

          {/* Form Section */}
          <Col xs={24} sm={24} md={16} lg={18}>
            <Form
              form={form}
              layout="vertical"
              disabled={!editMode}
              initialValues={profileData}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Occupation" name="occupation">
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Age" name="age">
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Gender" name="gender">
                    <Select allowClear>
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Address" name="address">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Emergency Contact" name="emergencyContact">
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="ID Proof Number" name="idProofNumber">
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item label="Upload ID Proof Document">
                    <Upload
                      fileList={
                        idProofFile
                          ? [
                              {
                                uid: "1",
                                name: idProofFile.name,
                                status: "done",
                              },
                            ]
                          : []
                      }
                      onChange={handleIdProofChange}
                      beforeUpload={() => false}
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item label="Family Members Details" name="familyMembers">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
