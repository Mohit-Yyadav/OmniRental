import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Card, Button, Badge, Alert, Spinner, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User, Home, Clock, Bell, Settings, LogOut } from 'lucide-react';

import RentalHistory from '../../components/tenants/RentalHistory'; // Fixed import path
import PropertyList from  './PropertyList'
const TenantDashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, notificationsRes] = await Promise.all([
          axios.get('/api/tenants/me', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          }),
          axios.get('/api/notifications', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
        ]);
        
        setProfile(profileRes.data);
        setNotifications(notificationsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  // Inline CSS styles
  const styles = {
    tenantDashboard: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    },
    dashboardHeader: {
      backgroundColor: '#3a86ff',
      color: 'white',
      padding: '1rem 0',
      marginBottom: '1.5rem'
    },
    dashboardTabs: {
      marginBottom: '1.5rem'
    },
    navLink: {
      color: '#495057',
      fontWeight: '500'
    },
    navLinkActive: {
      color: '#3a86ff',
      borderBottom: '3px solid #3a86ff'
    },
    statCard: {
      transition: 'transform 0.2s',
      border: 'none',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '1rem'
    },
    statCardHover: {
      transform: 'translateY(-5px)'
    },
    statValue: {
      color: '#3a86ff'
    },
    dropdownMenu: {
      right: '0',
      left: 'auto'
    }
  };

  return (
    <div style={styles.tenantDashboard}>
      {/* Header Section */}
      <div style={styles.dashboardHeader}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold mb-0">
                <Home size={28} className="me-2" />
                Tenant Dashboard
              </h1>
            </Col>
            <Col md={6} className="text-md-end">
              <div className="d-flex align-items-center justify-content-end gap-3">
                <Button variant="outline-light" className="position-relative">
                  <Bell size={20} />
                  {notifications.length > 0 && (
                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
                
                <div className="dropdown">
                  <Button variant="light" className="d-flex align-items-center gap-2" id="profileDropdown">
                    <img 
                      src={profile?.photo || '/default-avatar.png'} 
                      alt="Profile" 
                      width="36" 
                      height="36" 
                      className="rounded-circle"
                    />
                    <span>{profile?.name || 'User'}</span>
                  </Button>
                  
                  <div className="dropdown-menu" style={styles.dropdownMenu} aria-labelledby="profileDropdown">
                    <Link className="dropdown-item" to="/profile">
                      <User size={16} className="me-2" /> My Profile
                    </Link>
                    <Link className="dropdown-item" to="/settings">
                      <Settings size={16} className="me-2" /> Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <LogOut size={16} className="me-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="mb-5">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          style={styles.dashboardTabs}
        >
          <Tab 
            eventKey="properties" 
            title={
              <span style={activeTab === 'properties' ? styles.navLinkActive : styles.navLink}>
                <Home size={18} className="me-1" /> Available Properties
              </span>
            }
          >
            <div className="mt-4">
              <PropertyList />
            </div>
          </Tab>
          
          <Tab 
            eventKey="history" 
            title={
              <span style={activeTab === 'history' ? styles.navLinkActive : styles.navLink}>
                <Clock size={18} className="me-1" /> Rental History
              </span>
            }
          >
            <div className="mt-4">
              <RentalHistory />
            </div>
          </Tab>
          
          <Tab 
            eventKey="profile" 
            title={
              <span style={activeTab === 'profile' ? styles.navLinkActive : styles.navLink}>
                <User size={18} className="me-1" /> My Profile
              </span>
            }
          >
            <Card className="mt-4" style={styles.statCard}>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <div className="text-center mb-4">
                      <img 
                        src={profile?.photo || '/default-avatar.png'} 
                        alt="Profile" 
                        width="120" 
                        height="120" 
                        className="rounded-circle mb-3"
                      />
                      <h4>{profile?.name}</h4>
                      <p className="text-muted">{profile?.email}</p>
                    </div>
                  </Col>
                  <Col md={8}>
                    <h5 className="mb-3">Personal Information</h5>
                    <Row>
                      <Col md={6} className="mb-3">
                        <p className="text-muted mb-1">Phone</p>
                        <p>{profile?.phone || 'Not provided'}</p>
                      </Col>
                      <Col md={6} className="mb-3">
                        <p className="text-muted mb-1">Member Since</p>
                        <p>{new Date(profile?.createdAt).toLocaleDateString()}</p>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end mt-3">
                      <Button as={Link} to="/profile/edit" variant="primary">
                        Edit Profile
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>

        {/* Quick Stats Section */}
        <Row className="g-3 mb-4">
          <Col md={3}>
            <Card style={styles.statCard}>
              <Card.Body>
                <h6 className="text-muted">Active Rentals</h6>
                <h3 style={styles.statValue} className="mb-0">2</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={styles.statCard}>
              <Card.Body>
                <h6 className="text-muted">Total Rent Paid</h6>
                <h3 style={styles.statValue} className="mb-0">₹85,000</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={styles.statCard}>
              <Card.Body>
                <h6 className="text-muted">Properties Viewed</h6>
                <h3 style={styles.statValue} className="mb-0">12</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card style={styles.statCard}>
              <Card.Body>
                <h6 className="text-muted">Upcoming Payments</h6>
                <h3 style={styles.statValue} className="mb-0">1</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TenantDashboard;