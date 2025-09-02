import React from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Mail, Phone, MapPin, Send } from 'lucide-react';


const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail size={24} className="text-primary" />,
      title: "Email Us",
      details: "info@omnirental.com",
      action: "Send a message"
    },
    {
      icon: <Phone size={24} className="text-primary" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      action: "Call now"
    },
    {
      icon: <MapPin size={24} className="text-primary" />,
      title: "Visit Us",
      details: "123 Property St, Rental City, RC 10001",
      action: "Get directions"
    }
  ];

return (
    <>
     
      <Container className="my-5 py-4">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-3">Contact OmniRental</h1>
          <p className="lead text-muted">
            Have questions? We're here to help! Reach out to our team anytime.
          </p>
        </div>

        <Row className="g-4">
          {/* Contact Form Column */}
          <Col lg={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="h4 mb-4">Send us a message</h2>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className='ms-1'>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Your first name" required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className='ms-1'>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Your last name" required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label className='ms-1'>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="your.email@example.com" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className='ms-1'>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="(123) 456-7890" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className='ms-1' >Subject</Form.Label>
                    <Form.Select>
                      <option>General Inquiry</option>
                      <option>Property Listing</option>
                      <option>Technical Support</option>
                      <option>Feedback</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className='ms-1'>Your Message</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="How can we help you?" required />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="d-flex align-items-center gap-2">
                    <Send size={18} /> Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Info Column */}
          <Col lg={6}>
            <div className="h-100 d-flex flex-column">
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h2 className="h4 mb-4">Contact Information</h2>
                  <p className="text-muted mb-4">
                    Our team typically responds within 24 hours. For urgent matters, please call us directly.
                  </p>
                  
                  {contactMethods.map((method, index) => (
                    <div key={index} className="d-flex mb-4">
                      <div className="me-3">
                        <div className="bg-primary bg-opacity-10 rounded-circle p-2">
                          {method.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="h6 mb-1">{method.title}</h3>
                        <p className="mb-1">{method.details}</p>
                        <Button variant="link" size="sm" className="p-0 text-decoration-none">
                          {method.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm flex-grow-1">
                <Card.Body className="p-4">
                  <h2 className="h4 mb-4">Business Hours</h2>
                  <ul className="list-unstyled">
                    <li className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      <span className="text-muted">Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default Contact;