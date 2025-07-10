import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Row, Col, Tab, Tabs, Image, Badge, Alert, ProgressBar } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Edit, Lock, CreditCard, Bell, LogOut, CheckCircle } from 'lucide-react';

const TenantProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileCompletion, setProfileCompletion] = useState(0);
  
  // Initialize tenant data with empty values
  const [tenant, setTenant] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    memberSince: new Date().toISOString(),
    verified: false
  });

  // Check if profile is complete
  const isProfileComplete = () => {
    return tenant.name && tenant.email && tenant.phone && tenant.address;
  };

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let completed = 0;
    const totalFields = 4; // name, email, phone, address
    
    if (tenant.name) completed++;
    if (tenant.email) completed++;
    if (tenant.phone) completed++;
    if (tenant.address) completed++;
    
    return Math.round((completed / totalFields) * 100);
  };

  // Load profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/tenant/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch profile');
        }
        
        setTenant(data.profile);
        setProfileCompletion(calculateCompletion());
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTenant(prev => ({ ...prev, [name]: value }));
    setProfileCompletion(calculateCompletion());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!isProfileComplete()) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/tenant/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tenant)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Profile update failed');
      }
      
      // Update local storage with profile completion status
      const user = JSON.parse(localStorage.getItem('user'));
      user.profileComplete = true;
      localStorage.setItem('user', JSON.stringify(user));
      
      setSuccess('Profile updated successfully!');
      setEditMode(false);
      
      // Redirect if this was initial profile setup
      if (window.location.pathname.includes('setup')) {
        navigate('/tenant/dashboard');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
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
              <h4>{tenant.name || 'Your Name'}</h4>
              <p className="text-muted mb-2">
                <Mail size={16} className="me-1" /> {tenant.email || 'your@email.com'}
              </p>
              {tenant.verified && (
                <Badge bg="success" className="mb-3">
                  Verified Tenant
                </Badge>
              )}
              
              <div className="mb-3">
                <small className="text-muted">Profile Completion</small>
                <ProgressBar 
                  now={profileCompletion} 
                  label={`${profileCompletion}%`} 
                  variant={profileCompletion === 100 ? 'success' : 'primary'}
                  className="mt-1"
                />
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  variant={editMode ? "outline-danger" : "outline-primary"} 
                  onClick={() => setEditMode(!editMode)}
                  disabled={loading}
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
                  {tenant.memberSince ? new Date(tenant.memberSince).toLocaleDateString() : 'N/A'}
                </li>
                <li className="mb-2">
                  <small className="text-muted d-block">Last Login</small>
                  Today, 10:45 AM
                </li>
                <li>
                  <small className="text-muted d-block">Account Status</small>
                  <Badge bg={isProfileComplete() ? "success" : "warning"}>
                    {isProfileComplete() ? "Active" : "Setup Required"}
                  </Badge>
                </li>
              </ul>
            </Card.Body>
          </Card>
          
          {!isProfileComplete() && (
            <Card className="shadow-sm mb-4 border-warning">
              <Card.Body>
                <h6 className="text-warning mb-3">
                  <CheckCircle size={18} className="me-2" />
                  Complete Your Profile
                </h6>
                <p className="small text-muted">
                  Please complete your profile to access all features. You need to provide:
                </p>
                <ul className="small">
                  {!tenant.name && <li>Your full name</li>}
                  {!tenant.phone && <li>Phone number</li>}
                  {!tenant.address && <li>Current address</li>}
                </ul>
              </Card.Body>
            </Card>
          )}
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
                        <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={tenant.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={tenant.email}
                          onChange={handleInputChange}
                          disabled={!!tenant.email}
                          required
                          placeholder="Enter your email"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={tenant.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your phone number"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="address"
                          value={tenant.address}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your current address"
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
                          placeholder="Tell us about yourself"
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-between">
                        <Button 
                          variant="primary" 
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        {!isProfileComplete() && (
                          <span className="text-danger small align-self-center">
                            * Required fields must be filled
                          </span>
                        )}
                      </div>
                    </Form>
                  ) : (
                    <>
                      <h5 className="mb-4">Personal Information</h5>
                      <Row className="mb-3">
                        <Col sm={6}>
                          <p className="text-muted mb-1">
                            <Mail size={16} className="me-2" /> Email
                          </p>
                          <p>{tenant.email || 'Not provided'}</p>
                        </Col>
                        <Col sm={6}>
                          <p className="text-muted mb-1">
                            <Phone size={16} className="me-2" /> Phone
                          </p>
                          <p>{tenant.phone || 'Not provided'}</p>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <p className="text-muted mb-1">
                            <MapPin size={16} className="me-2" /> Address
                          </p>
                          <p>{tenant.address || 'Not provided'}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p className="text-muted mb-1">About Me</p>
                          <p>{tenant.bio || 'No bio provided'}</p>
                        </Col>
                      </Row>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="security" title="Security" disabled={!isProfileComplete()}>
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

            <Tab eventKey="payment" title="Payment Methods" disabled={!isProfileComplete()}>
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