import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Spinner, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaStar, FaCalendarAlt } from 'react-icons/fa';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    location: '',
    type: ''
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('/api/tenders', {
          params: filters
        });
        setProperties(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <h5>Filter Properties</h5>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Min Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="$ Min"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Max Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="$ Max"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="City or Zip"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Row xs={1} md={2} lg={3} className="g-4">
        {properties.map((property) => (
          <Col key={property._id}>
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={property.images[0] || '/property-placeholder.jpg'} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <Badge bg="info">{property.category}</Badge>
                  <div className="d-flex align-items-center">
                    <FaStar className="text-warning me-1" />
                    <span>{property.rating || 'New'}</span>
                  </div>
                </div>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text className="text-muted">
                  {property.description.substring(0, 100)}...
                </Card.Text>
                <div className="d-flex align-items-center text-muted mb-2">
                  <FaMapMarkerAlt className="me-2" />
                  <small>{property.location.formattedAddress}</small>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-primary">${property.pricePerDay}/day</h5>
                  <Button 
                    as={Link} 
                    to={`/property/${property._id}`} 
                    variant="outline-primary" 
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PropertyList;