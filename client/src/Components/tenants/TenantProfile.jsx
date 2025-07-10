import React, { useState } from 'react';
import { Container, Card, Button, Form, Row, Col, Tab, Tabs, Image, Badge } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Edit, Lock, CreditCard, Bell, LogOut } from 'lucide-react';

const TenantProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  
  // Sample tenant data
  const [tenant, setTenant] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    address: '123 Sunshine Apartments, Mumbai, 400001',
    bio: 'Software engineer with 5+ years experience. Looking for a peaceful apartment near my workplace.',
    memberSince: '2022-06-15',
    verified: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenant(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    // Here you would typically make an API call to update the profile
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body className="text-center">
              <Image 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                roundedCircle 
                width={120}
                height={120}
                className="mb-3 border border-3 border-primary"
              />
              <h4>{tenant.name}</h4>
              <p className="text-muted mb-2">
                <Mail size={16} className="me-1" /> {tenant.email}
              </p>
              {tenant.verified && (
                <Badge bg="success" className="mb-3">
                  Verified Tenant
                </Badge>
              )}
              <div className="d-grid gap-2">
                <Button 
                  variant={editMode ? "outline-danger" : "outline-primary"} 
                  onClick={() => setEditMode(!editMode)}
                >
                  <Edit size={16} className="me-1" /> 
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h6 className="mb-3">Tenant Information</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <small className="text-muted d-block">Member Since</small>
                  {new Date(tenant.memberSince).toLocaleDateString()}
                </li>
                <li className="mb-2">
                  <small className="text-muted d-block">Last Login</small>
                  Today, 10:45 AM
                </li>
                <li>
                  <small className="text-muted d-block">Account Status</small>
                  <Badge bg="success">Active</Badge>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="profile" title="Profile">
              <Card className="shadow-sm">
                <Card.Body>
                  {editMode ? (
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={tenant.name}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={tenant.email}
                          onChange={handleInputChange}
                          disabled
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={tenant.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="address"
                          value={tenant.address}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="bio"
                          value={tenant.bio}
                          onChange={handleInputChange}
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <h5 className="mb-4">Personal Information</h5>
                      <Row className="mb-3">
                        <Col sm={6}>
                          <p className="text-muted mb-1">
                            <Mail size={16} className="me-2" /> Email
                          </p>
                          <p>{tenant.email}</p>
                        </Col>
                        <Col sm={6}>
                          <p className="text-muted mb-1">
                            <Phone size={16} className="me-2" /> Phone
                          </p>
                          <p>{tenant.phone}</p>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <p className="text-muted mb-1">
                            <MapPin size={16} className="me-2" /> Address
                          </p>
                          <p>{tenant.address}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="text-muted mb-1">About Me</p>
                          <p>{tenant.bio}</p>
                        </Col>
                      </Row>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="security" title="Security">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-4">Security Settings</h5>
                  
                  <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
                    <div>
                      <h6 className="mb-1">
                        <Lock size={18} className="me-2" /> Password
                      </h6>
                      <p className="mb-0 text-muted">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline-primary" size="sm">
                      Change Password
                    </Button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                    <div>
                      <h6 className="mb-1">
                        <Bell size={18} className="me-2" /> Login Alerts
                      </h6>
                      <p className="mb-0 text-muted">Receive notifications for new logins</p>
                    </div>
                    <Form.Check 
                      type="switch"
                      id="login-alerts"
                      defaultChecked
                    />
                  </div>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="payment" title="Payment Methods">
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-4">Payment Methods</h5>
                  
                  <Card className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <div>
                          <CreditCard size={20} className="me-2" />
                          <span className="fw-bold">VISA •••• 4242</span>
                        </div>
                        <Button variant="outline-danger" size="sm">
                          Remove
                        </Button>
                      </div>
                      <p className="mt-2 mb-0 text-muted">Expires 12/2025</p>
                    </Card.Body>
                  </Card>

                  <Button variant="outline-primary">
                    <CreditCard size={16} className="me-1" /> Add Payment Method
                  </Button>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>

          <div className="text-end">
            <Button variant="outline-danger">
              <LogOut size={16} className="me-1" /> Logout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TenantProfile;