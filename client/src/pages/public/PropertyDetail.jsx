import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  MapPin, Bed, Bath, Ruler, Heart, Share2, Phone, Mail, User, 
  Home, Layers, CheckCircle, Wifi, Tv, Car, Snowflake, Star, ChevronLeft
} from 'lucide-react';
import { Carousel, Button, Badge, Tab, Tabs, Form, Alert, Container } from 'react-bootstrap';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
const baseImageUrl = "http://localhost:5000/uploads/";

  const fetchProperty = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/properties/public/${id}`);
      setProperty(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch property');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    alert('Your inquiry has been submitted successfully!');
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const renderAmenityIcon = (amenity) => {
    switch(amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi size={18} className="text-primary" />;
      case 'ac':
      case 'air conditioning':
        return <Snowflake size={18} className="text-primary" />;
      case 'parking':
        return <Car size={18} className="text-primary" />;
      case 'tv':
        return <Tv size={18} className="text-primary" />;
      default:
        return <CheckCircle size={18} className="text-primary" />;
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading property details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 py-5 text-center">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-primary" className="mt-3" onClick={() => window.history.back()}>
          <ChevronLeft size={18} className="me-1" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <Container fluid="lg" className="my-4 px-3 px-md-4">
      {/* Back Button */}
      <Button variant="link" className="text-decoration-none mb-3 ps-0" onClick={() => window.history.back()}>
        <ChevronLeft size={20} className="me-1" /> Back to listings
      </Button>

      {/* Property Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h1 className="fw-bold mb-1">{property.name}</h1>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center text-muted">
              <MapPin size={18} className="me-1" />
              <span>{ property.address}</span>
            </div>
            <Badge bg={property.status === 'Vacant' ? 'success' : 'danger'} className="fs-6">
              {property.status}
            </Badge>
          </div>
        </div>
        <div className="d-flex gap-2">
          <Button 
            variant={isSaved ? 'primary' : 'outline-secondary'} 
            size="sm"
            onClick={toggleSave}
          >
            <Heart size={18} className="me-1" fill={isSaved ? 'white' : 'none'} /> 
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          <Button variant="outline-secondary" size="sm">
            <Share2 size={18} className="me-1" /> Share
          </Button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="row mb-5 g-3">
        <div className="col-lg-8">
          {property.images && property.images.length > 0 ? (
            <Carousel 
              activeIndex={activeImageIndex} 
              onSelect={setActiveImageIndex} 
              interval={null}
              indicators={property.images.length > 1}
              controls={property.images.length > 1}
              className="rounded-3 overflow-hidden shadow-sm"
            >
 {property.images.map((img, index) => (
  <Carousel.Item key={index}>
    <img 
  src={`${baseImageUrl}${img}`} 
  alt={`Property ${index}`} 
  className="d-block w-100 rounded-3"
  style={{ height: '450px', objectFit: 'cover' }}
/>

    
  </Carousel.Item>
))}


            </Carousel>
          ) : (
            <div 
              className="rounded-3 overflow-hidden bg-light d-flex align-items-center justify-content-center shadow-sm"
              style={{ height: '450px' }}
            >
              <Home size={64} className="text-muted" />
            </div>
          )}
        </div>
        
        {/* Price Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="mb-0">₹{property.rent.toLocaleString()}<span className="text-muted fs-6 fw-normal">/month</span></h2>
                {property.rating && (
                  <Badge bg="light" text="dark" className="d-flex align-items-center">
                    <Star size={16} className="text-warning me-1" fill="currentColor" />
                    {property.rating}
                  </Badge>
                )}
              </div>
              
              <div className="d-flex flex-wrap gap-3 mb-4">
                <div className="d-flex align-items-center gap-1 text-muted">
                  <Home size={16} />
                  <span>{property.type}</span>
                </div>
                <div className="d-flex align-items-center gap-1 text-muted">
                  <Layers size={16} />
                  <span>{property.roomNo}</span>
                </div>
                <div className="d-flex align-items-center gap-1 text-muted">
                  <Bed size={16} />
                  <span>{property.beds || 'N/A'} Beds</span>
                </div>
                <div className="d-flex align-items-center gap-1 text-muted">
                  <Bath size={16} />
                  <span>{property.baths || 'N/A'} Baths</span>
                </div>
              </div>
              
              <div className="d-flex flex-wrap gap-2 mb-4">
                <Badge bg="light" text="dark" className="d-flex align-items-center">
                  <CheckCircle size={16} className="text-primary me-1" />
                  {property.furnished || 'Not specified'}
                </Badge>
                <Badge bg="light" text="dark" className="d-flex align-items-center">
                  <User size={16} className="text-primary me-1" />
                  {property.sharing || 'Not specified'}
                </Badge>
              </div>
              
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" className="mb-2">
                  <Phone size={18} className="me-2" /> Book Viewing
                </Button>
                
                <Button variant="outline-primary" size="lg">
                  <Mail size={18} className="me-2" /> Contact Owner
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row g-4">
        <div className="col-lg-8">
          {/* Property Details Tabs */}
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            fill
          >
            <Tab eventKey="details" title="Details">
              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body p-4">
                  <h4 className="mb-4">Property Description</h4>
                  <p className="text-muted mb-4">
                    {property.description || 'No description provided.'}
                  </p>
                  
                  <h4 className="mb-4">Property Features</h4>
                  <div className="row g-3">
                    {[
                      { icon: <Home size={20} />, label: 'Property Type', value: property.type },
                      { icon: <Layers size={20} />, label: 'Room Number', value: property.roomNo },
                      { icon: <Bed size={20} />, label: 'Bedrooms', value: property.beds || 'N/A' },
                      { icon: <Bath size={20} />, label: 'Bathrooms', value: property.baths || 'N/A' },
                      { icon: <Ruler size={20} />, label: 'Area', value: property.area ? `${property.area} sq.ft` : 'N/A' },
                      { icon: <CheckCircle size={20} />, label: 'Furnishing', value: property.furnished || 'Not specified' }
                    ].map((feature, index) => (
                      <div key={index} className="col-md-6">
                        <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 h-100">
                          <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                            {React.cloneElement(feature.icon, { className: "text-primary" })}
                          </div>
                          <div>
                            <h6 className="mb-0">{feature.label}</h6>
                            <p className="mb-0 text-muted">{feature.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab eventKey="amenities" title="Amenities">
              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body p-4">
                  <h4 className="mb-4">Amenities</h4>
                  {property.amenities && property.amenities.length > 0 ? (
                    <div className="row g-3">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="col-md-6">
                          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                              {renderAmenityIcon(amenity)}
                            </div>
                            <span>{amenity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No amenities listed.</p>
                  )}
                </div>
              </div>
            </Tab>
            
            <Tab eventKey="location" title="Location">
              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body p-4">
                  <h4 className="mb-4">Location</h4>
                  <div className="ratio ratio-16x9 bg-light rounded-3 overflow-hidden mb-3 shadow-sm">
                    {/* Replace with actual map component */}
                    <div className="d-flex justify-content-center align-items-center h-100 bg-primary bg-opacity-10 text-primary">
                      <MapPin size={48} />
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2 p-3 bg-light rounded-3">
                    <MapPin size={20} className="text-primary" />
                    <span>{property.location || property.address || 'Location not specified'}</span>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Sidebar - Contact Form */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '80px' }}>
            <div className="card-body p-4">
              <h4 className="mb-4">Contact Owner</h4>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="John Doe"
                    required 
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    required 
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+91 9876543210"
                    required 
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="I'm interested in this property..."
                    required 
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Send Inquiry
                </Button>
              </Form>
              
              <div className="mt-4 pt-3 border-top">
                <h5 className="mb-3">Safety Tips</h5>
                <ul className="list-unstyled small">
                  <li className="mb-2 d-flex align-items-start">
                    <CheckCircle size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                    <span>Never pay without visiting the property</span>
                  </li>
                  <li className="mb-2 d-flex align-items-start">
                    <CheckCircle size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                    <span>Check all documents before finalizing</span>
                  </li>
                  <li className="mb-2 d-flex align-items-start">
                    <CheckCircle size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                    <span>Meet in safe, public locations</span>
                  </li>
                  <li className="mb-2 d-flex align-items-start">
                    <CheckCircle size={16} className="text-success me-2 mt-1 flex-shrink-0" />
                    <span>Beware of deals that sound too good to be true</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PropertyDetail;