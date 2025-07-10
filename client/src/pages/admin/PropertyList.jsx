// src/components/PropertyList.jsx
import React from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';

const PropertyList = () => {
  // You would typically fetch properties here
  const properties = []; // Your property data
  
  return (
    <Row className="g-4">
      {properties.length > 0 ? (
        properties.map(property => (
          <Col key={property.id} md={4}>
            <Card>
              <Card.Img variant="top" src={property.image} />
              <Card.Body>
                <Card.Title>{property.title}</Card.Title>
                <Card.Text>{property.description}</Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading properties...</p>
        </div>
      )}
    </Row>
  );
};

export default PropertyList;