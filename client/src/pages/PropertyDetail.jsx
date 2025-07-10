import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Ruler, Heart, Share2, Phone, Mail, User } from 'lucide-react';
import { Carousel, Button, Badge, Tab, Tabs, Form } from 'react-bootstrap';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProperty = {
      id: id,
      title: "Luxury Villa with Private Pool",
      description: "This stunning 4-bedroom villa offers breathtaking ocean views, a private infinity pool, and luxurious modern amenities. Perfect for families or groups looking for a premium vacation experience.",
      location: "Goa, India",
      price: "35,000",
      type: "Villa",
      beds: 4,
      baths: 3,
      area: 2200,
      yearBuilt: 2018,
      amenities: ["Swimming Pool", "Air Conditioning", "WiFi", "Parking", "Gym", "Sea View"],
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      ],
      agent: {
        name: "Rahul Sharma",
        phone: "+91 98765 43210",
        email: "rahul@omnirental.com",
        photo: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    };
    
    setProperty(mockProperty);
    
    // Actual API call would look like:
    // fetch(`/api/properties/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => setProperty(data))
    //   .catch((err) => console.error('Failed to fetch property', err));
  }, [id]);

  if (!property) return (
    <div className="container mt-5 py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Loading property details...</p>
    </div>
  );

  return (
    <div className="container my-4">
      {/* Property Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">{property.title}</h1>
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" size="sm">
            <Heart size={18} className="me-1" /> Save
          </Button>
          <Button variant="outline-secondary" size="sm">
            <Share2 size={18} className="me-1" /> Share
          </Button>
        </div>
      </div>

      {/* Location and Price */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center text-muted">
          <MapPin size={18} className="me-1" />
          <span>{property.location}</span>
        </div>
        <Badge bg="light" text="dark" className="fs-6">
          {property.type}
        </Badge>
      </div>

      {/* Image Gallery */}
      <div className="row mb-5">
        <div className="col-lg-8">
          <Carousel activeIndex={activeImageIndex} onSelect={setActiveImageIndex} interval={null}>
            {property.images.map((img, index) => (
              <Carousel.Item key={index}>
                <div 
                  className="rounded-3 overflow-hidden" 
                  style={{ height: '450px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-lg-4 mt-3 mt-lg-0">
          <div className="d-grid gap-2 h-100">
            {property.images.slice(0, 4).map((img, index) => (
              <div 
                key={index}
                className={`rounded-3 overflow-hidden cursor-pointer ${activeImageIndex === index ? 'border border-primary border-2' : ''}`}
                style={{ 
                  height: index === 0 ? '250px' : '100px',
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="row">
        <div className="col-lg-8">
          {/* Price Card */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">₹{property.price} <span className="text-muted fs-6">/ month</span></h3>
                <Button variant="primary" size="lg">Book Viewing</Button>
              </div>
            </div>
          </div>

          {/* Property Details Tabs */}
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="details" title="Details">
              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body p-4">
                  <h4 className="mb-4">Property Details</h4>
                  <p>{property.description}</p>
                  
                  <div className="row mt-4">
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                          <Bed size={20} className="text-primary" />
                        </div>
                        <div>
                          <h6 className="mb-0">Bedrooms</h6>
                          <p className="mb-0 text-muted">{property.beds}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                          <Bath size={20} className="text-primary" />
                        </div>
                        <div>
                          <h6 className="mb-0">Bathrooms</h6>
                          <p className="mb-0 text-muted">{property.baths}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                          <Ruler size={20} className="text-primary" />
                        </div>
                        <div>
                          <h6 className="mb-0">Area</h6>
                          <p className="mb-0 text-muted">{property.area} sq.ft</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                          <User size={20} className="text-primary" />
                        </div>
                        <div>
                          <h6 className="mb-0">Year Built</h6>
                          <p className="mb-0 text-muted">{property.yearBuilt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="amenities" title="Amenities">
              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body p-4">
                  <h4 className="mb-4">Amenities</h4>
                  <div className="row">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span>{amenity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="location" title="Location">
              <div className="card border-0 shadow-sm mt-3">
                <div className="card-body p-4">
                  <h4 className="mb-4">Location</h4>
                  <div className="ratio ratio-16x9 bg-light rounded-3 overflow-hidden">
                    {/* Replace with actual map component */}
                    <div className="d-flex justify-content-center align-items-center h-100 bg-primary bg-opacity-10 text-primary">
                      <MapPin size={48} />
                    </div>
                  </div>
                  <p className="mt-3 mb-0">
                    <MapPin size={16} className="me-1" />
                    {property.location}
                  </p>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Sidebar - Contact Form */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <img 
                  src={property.agent.photo} 
                  alt={property.agent.name} 
                  className="rounded-circle" 
                  width="60" 
                  height="60" 
                />
                <div>
                  <h5 className="mb-1">{property.agent.name}</h5>
                  <p className="text-muted mb-0">Property Agent</p>
                </div>
              </div>

              <div className="d-grid gap-2 mb-4">
                <Button variant="outline-primary" className="d-flex align-items-center justify-content-center gap-2">
                  <Phone size={18} /> {property.agent.phone}
                </Button>
                <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center gap-2">
                  <Mail size={18} /> Email Agent
                </Button>
              </div>

              <h5 className="mb-3">Contact Agent</h5>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Your Name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Your Email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="tel" placeholder="Phone Number" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={3} placeholder="Your Message" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Send Message
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;