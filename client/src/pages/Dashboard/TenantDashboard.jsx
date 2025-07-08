import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropertyList from '../../components/PropertyList';
import RentalHistory from '../../components/RentalHistory';

const TenantDashboard = () => {
  const [key, setKey] = useState('properties');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/tenants/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tenant Dashboard</h2>
        {profile && (
          <div className="d-flex align-items-center">
            <img 
              src={profile.photo || '/default-avatar.png'} 
              alt="Profile" 
              width="40" 
              height="40" 
              className="rounded-circle me-2"
            />
            <span>Welcome, {profile.name}</span>
          </div>
        )}
      </div>

      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4"
      >
        <Tab eventKey="properties" title="Available Properties">
          <PropertyList />
        </Tab>
        <Tab eventKey="history" title="Rental History">
          <RentalHistory />
        </Tab>
        <Tab eventKey="profile" title="My Profile">
          <Card className="mt-3">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <h5>Profile Information</h5>
                  <p className="text-muted">Manage your personal details</p>
                </div>
                <Button as={Link} to="/profile" variant="outline-primary">
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TenantDashboard;